#!/usr/bin/env bash
# 使用 acme.sh + DNSPod 申请/续期 Let's Encrypt 证书，并部署到腾讯云 CDN/COS。
#
# 所需 GitHub Secrets:
#   DNSPOD_ID          DNSPod API Token ID
#   DNSPOD_TOKEN       DNSPod API Token
#   SECRET_ID          腾讯云 SecretId（与 COS 部署相同）
#   SECRET_KEY         腾讯云 SecretKey
#   ACME_EMAIL         Let's Encrypt 注册邮箱
#
# 可选环境变量:
#   SSL_DOMAIN         主域名，默认 iameng.cn
#   SSL_ALT_DOMAINS    额外域名，逗号分隔，默认 www.iameng.cn
#   CDN_DOMAINS        部署到 CDN 的域名，逗号分隔，默认与上面一致
#   TENCENT_RESOURCE_TYPE  cdn（默认）或 cos
#   COS_REGION         cos 部署时必填，如 ap-shanghai
#   COS_BUCKET         cos 部署时必填，如 iameng-cn-1258310295
#   FORCE_RENEW        设为 1 强制续期

set -euo pipefail

SSL_DOMAIN="${SSL_DOMAIN:-iameng.cn}"
SSL_ALT_DOMAINS="${SSL_ALT_DOMAINS:-www.${SSL_DOMAIN}}"
ACME_EMAIL="${ACME_EMAIL:?ACME_EMAIL is required}"
DP_ID="${DP_ID:?DP_ID is required}"
DP_KEY="${DP_KEY:?DP_KEY is required}"
TENCENT_SECRET_ID="${TENCENT_SECRET_ID:?TENCENT_SECRET_ID is required}"
TENCENT_SECRET_KEY="${TENCENT_SECRET_KEY:?TENCENT_SECRET_KEY is required}"

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "${SCRIPT_DIR}/.." && pwd)"
ACME_HOME="${ACME_HOME:-${HOME}/.acme.sh}"

install_acme() {
  if [[ -x "${ACME_HOME}/acme.sh" ]]; then
    return
  fi
  echo "Installing acme.sh..."
  curl -fsSL https://get.acme.sh | sh -s "email=${ACME_EMAIL}"
}

issue_cert() {
  export DP_Id="${DP_ID}"
  export DP_Key="${DP_KEY}"

  local -a domain_args=(-d "${SSL_DOMAIN}")
  local alt trimmed

  IFS=',' read -ra alt_list <<< "${SSL_ALT_DOMAINS}"
  for alt in "${alt_list[@]}"; do
    trimmed="$(echo "${alt}" | xargs)"
    [[ -n "${trimmed}" && "${trimmed}" != "${SSL_DOMAIN}" ]] && domain_args+=(-d "${trimmed}")
  done

  local -a issue_args=(--dns dns_dp --keylength ec-256 "${domain_args[@]}")

  if [[ "${FORCE_RENEW:-0}" == "1" ]]; then
    issue_args=(--force "${issue_args[@]}")
  fi

  echo "Requesting certificate for ${SSL_DOMAIN} ..."
  "${ACME_HOME}/acme.sh" --issue "${issue_args[@]}"
}

resolve_cert_paths() {
  local ecc_dir="${ACME_HOME}/${SSL_DOMAIN}_ecc"
  local rsa_dir="${ACME_HOME}/${SSL_DOMAIN}"

  if [[ -f "${ecc_dir}/fullchain.cer" && -f "${ecc_dir}/${SSL_DOMAIN}.key" ]]; then
    CERT_FILE="${ecc_dir}/fullchain.cer"
    KEY_FILE="${ecc_dir}/${SSL_DOMAIN}.key"
    return
  fi

  if [[ -f "${rsa_dir}/fullchain.cer" && -f "${rsa_dir}/${SSL_DOMAIN}.key" ]]; then
    CERT_FILE="${rsa_dir}/fullchain.cer"
    KEY_FILE="${rsa_dir}/${SSL_DOMAIN}.key"
    return
  fi

  echo "Certificate files not found under ${ACME_HOME}" >&2
  exit 1
}

deploy_to_tencent() {
  resolve_cert_paths
  export CERT_FILE KEY_FILE

  if [[ -z "${CDN_DOMAINS:-}" ]]; then
    CDN_DOMAINS="${SSL_DOMAIN}"
    if [[ -n "${SSL_ALT_DOMAINS}" ]]; then
      CDN_DOMAINS="${CDN_DOMAINS},${SSL_ALT_DOMAINS}"
    fi
  fi
  export CDN_DOMAINS

  echo "Deploying certificate to Tencent Cloud (${TENCENT_RESOURCE_TYPE:-cdn})..."
  node "${SCRIPT_DIR}/tencent-deploy-ssl.mjs"
}

main() {
  install_acme
  issue_cert
  deploy_to_tencent
  echo "SSL renew finished successfully."
}

main "$@"
