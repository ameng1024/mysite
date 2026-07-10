#!/usr/bin/env node
/**
 * 上传 acme.sh 证书到腾讯云 SSL，并部署到 CDN 或 COS 自定义域名。
 */
import { readFileSync } from 'node:fs';
import tencentcloud from 'tencentcloud-sdk-nodejs';

const {
  TENCENT_SECRET_ID,
  TENCENT_SECRET_KEY,
  CERT_FILE,
  KEY_FILE,
  CDN_DOMAINS,
  TENCENT_RESOURCE_TYPE = 'cdn',
  COS_REGION,
  COS_BUCKET,
  SSL_DOMAIN,
} = process.env;

function requireEnv(name, value) {
  if (!value) {
    throw new Error(`${name} is required`);
  }
  return value;
}

requireEnv('TENCENT_SECRET_ID', TENCENT_SECRET_ID);
requireEnv('TENCENT_SECRET_KEY', TENCENT_SECRET_KEY);
requireEnv('CERT_FILE', CERT_FILE);
requireEnv('KEY_FILE', KEY_FILE);
requireEnv('CDN_DOMAINS', CDN_DOMAINS);

const SslClient = tencentcloud.ssl.v20191205.Client;
const client = new SslClient({
  credential: {
    secretId: TENCENT_SECRET_ID,
    secretKey: TENCENT_SECRET_KEY,
  },
  region: '',
  profile: {
    httpProfile: {
      endpoint: 'ssl.tencentcloudapi.com',
    },
  },
});

const publicKey = readFileSync(CERT_FILE, 'utf8');
const privateKey = readFileSync(KEY_FILE, 'utf8');
const alias = `auto-${new Date().toISOString().slice(0, 10)}`;

const uploadResult = await client.UploadCertificate({
  CertificatePublicKey: publicKey,
  CertificatePrivateKey: privateKey,
  Alias: alias,
  CertificateUse: TENCENT_RESOURCE_TYPE === 'cos' ? 'COS' : 'CDN',
  Repeatable: true,
});

const certificateId = uploadResult.CertificateId;
if (!certificateId) {
  throw new Error('UploadCertificate did not return CertificateId');
}

console.log(`Uploaded certificate: ${certificateId} (${alias})`);

const domains = CDN_DOMAINS.split(',')
  .map(item => item.trim())
  .filter(Boolean);

let instanceIdList = [];

if (TENCENT_RESOURCE_TYPE === 'cos') {
  requireEnv('COS_REGION', COS_REGION);
  requireEnv('COS_BUCKET', COS_BUCKET);
  requireEnv('SSL_DOMAIN', SSL_DOMAIN);
  instanceIdList = [`${COS_REGION}|${COS_BUCKET}|${SSL_DOMAIN}`];
} else {
  instanceIdList = domains.map(domain => `${domain}|on`);
}

const deployResult = await client.DeployCertificateInstance({
  CertificateId: certificateId,
  ResourceType: TENCENT_RESOURCE_TYPE,
  InstanceIdList: instanceIdList,
});

console.log('DeployCertificateInstance response:', JSON.stringify(deployResult, null, 2));
console.log(`Deployed to ${TENCENT_RESOURCE_TYPE}: ${instanceIdList.join(', ')}`);
