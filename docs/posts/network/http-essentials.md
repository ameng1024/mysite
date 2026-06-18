---
title: HTTP 核心知识体系
description: 系统梳理 HTTP 报文结构、请求方法、状态码、缓存、CORS、TLS 握手、HTTP/2 等核心概念
published: 2024-03-12
tags: [HTTP, 网络, 前端]
category: 网络
draft: false
---


作为 Web 开发的基础，HTTP 几乎每天都会打交道。本文从报文结构、请求方法、状态码到缓存、CORS、TLS 握手、HTTP/2，逐一梳理关键概念。

## 001. HTTP 报文结构

HTTP 报文类似 TCP，分为头部和数据部分，具体结构为：

```
起始行 + 头部 + 空行 + 实体
```
### 起始行

**请求报文**：`方法 + 路径 + HTTP版本`

```
GET /home HTTP/1.1
```
**响应报文**（又称状态行）：`HTTP版本 + 状态码 + 原因短语`

```
HTTP/1.1 200 OK
```
起始行各部分用空格分隔，末尾换行，遵循 ABNF 语法规范。

### 头部

头部字段格式要点：

- 字段名不区分大小写
- 字段名不允许空格和下划线 `_`
- 字段名后必须紧跟 `:`

### 空行

空行用于分隔**头部**和**实体**。若在头部中间插入空行，空行后的内容会被视为实体。

### 实体

即 body 部分，请求报文对应请求体，响应报文对应响应体。

## 002. HTTP 请求方法

HTTP/1.1 规定的请求方法（均为大写）：

| 方法 | 说明 |
|------|------|
| GET | 获取资源 |
| HEAD | 获取资源元信息 |
| POST | 提交/上传数据 |
| PUT | 修改数据 |
| DELETE | 删除资源 |
| CONNECT | 建立隧道，用于代理 |
| OPTIONS | 列出可对资源实行的请求方法，常用于跨域 |
| TRACE | 追踪请求-响应的传输路径 |

### GET 与 POST 的区别

- **语义**：GET 获取资源，POST 提交数据
- **幂等性**：GET 幂等，POST 非幂等
- **参数位置**：GET 通常放在 URL，POST 放在请求体
- **编码**：GET 仅支持 URL 编码和 ASCII，POST 无此限制
- **缓存**：GET 会被浏览器缓存，POST 默认不缓存
- **TCP**：GET 一般一次性发送，POST 可能先发 header，收到 100 Continue 后再发 body（部分浏览器如 Firefox 除外）

## 003. URI 结构

URI（Uniform Resource Identifier）用于标识互联网上的资源，包含 URN 和 URL，日常所说的「网址」多指 URL。

### URI 组成

```
scheme://user:passwd@host:port/path?query#fragment
```
- **scheme**：协议名，如 `http`、`https`、`file`，后接 `://`
- **user:passwd@**：登录信息（不推荐使用）
- **host:port**：主机名和端口（http 默认 80，https 默认 443）
- **path**：路径
- **query**：查询参数，`key=val` 形式，多组用 `&` 连接
- **fragment**：锚点，用于页面内定位

### URI 编码

URI 仅支持 ASCII，非 ASCII 字符和部分界定符需编码为 `%` + 十六进制，如空格 `%20`。

## 004. HTTP 状态码

状态码为三位数，分为五类：

| 类型 | 含义 |
|------|------|
| 1xx | 协议处理的中间状态，需后续操作 |
| 2xx | 成功 |
| 3xx | 重定向，资源位置变动 |
| 4xx | 请求报文有误 |
| 5xx | 服务器错误 |

### 常见状态码

**2xx**：200 OK、204 No Content、206 Partial Content（分块下载/断点续传）

**3xx**：301 永久重定向、302 临时重定向、304 Not Modified（协商缓存命中）

**4xx**：400 Bad Request、403 Forbidden、404 Not Found、405 Method Not Allowed、429 Too Many Requests

**5xx**：500 Internal Server Error、502 Bad Gateway、503 Service Unavailable

## 005. HTTP 特点与缺点

### 特点

- **灵活可扩展**：语义自由，传输形式多样（文本、图片、视频等）
- **可靠传输**：基于 TCP/IP
- **请求-应答**：一发一收，有来有回
- **无状态**：每次请求独立，默认不保留上下文

### 缺点

- **无状态**：长连接场景需额外保存上下文
- **明文传输**：头部为文本，易被窃听（HTTPS 解决）
- **队头阻塞**：同一 TCP 连接上，前一个请求未完成会阻塞后续请求

## 006. Accept 系列字段

| 用途 | 发送端 | 接收端 |
|------|--------|--------|
| 数据格式 | Content-Type | Accept |
| 压缩方式 | Content-Encoding | Accept-Encoding（gzip、br、deflate） |
| 语言 | Content-Language | Accept-Language |
| 字符集 | Content-Type; charset=xxx | Accept-Charset |

## 007. 定长与不定长包体

### 定长包体

通过 `Content-Length` 指明包体长度。若设置错误，会导致内容被截断或无法正确解析。

### 不定长包体

使用 `Transfer-Encoding: chunked` 分块传输：

- 支持长连接下持续推送动态内容
- 设置后 `Content-Length` 会被忽略
- 响应体格式：`chunk长度(16进制)\r\n` + `chunk内容` + `0\r\n`（结束）

## 008. 大文件传输（范围请求）

服务器通过 `Accept-Ranges: bytes` 表示支持范围请求；不支持时返回 `Accept-Ranges: none`。

客户端通过 `Range` 指定范围：

- `bytes=0-499`：前 500 字节
- `bytes=500-`：从第 500 字节到末尾
- `bytes=-100`：最后 100 字节
- `bytes=0-9,30-39`：多段请求

服务器返回 206 Partial Content，并带上 `Content-Range`。多段请求时使用 `multipart/byteranges` 格式，用 boundary 分隔各段。

## 009. 表单数据提交

常见两种 `Content-Type`：

**application/x-www-form-urlencoded**：URL 编码，`key=val&key2=val2` 形式

**multipart/form-data**：多部分格式，每部分有独立头部，用 boundary 分隔，适合文件上传

## 010. HTTP/1.1 队头阻塞的缓解

- **并发连接**：同一域名允许多个长连接（如 Chrome 默认 6 个）
- **域名分片**：使用多个二级域名指向同一服务器，增加并发连接数

## 011. Cookie

Cookie 是浏览器存储的小文本，以键值对形式存储，同域名请求会自动携带。

### 属性

- **Expires / Max-Age**：生存周期
- **Domain / Path**：作用域
- **Secure**：仅 HTTPS 传输
- **HttpOnly**：禁止 JS 访问，防 XSS
- **SameSite**：Strict / Lax / None，防 CSRF

### 缺点

容量约 4KB；每次请求都会携带，可能造成性能浪费；明文传输存在安全风险。

## 012. HTTP 代理

代理服务器对客户端表现为服务器，对源服务器表现为客户端，具有双重身份。

### 功能

负载均衡、安全过滤、缓存代理等。

### 相关头部

- **Via**：记录经过的代理
- **X-Forwarded-For**：记录请求方 IP（每经一层代理会追加）
- **X-Real-IP**：记录原始客户端 IP

## 013. HTTP 缓存与代理缓存

### 缓存流程

1. 先检查强缓存（Cache-Control）
2. 未命中则走协商缓存（If-Modified-Since / If-None-Match）
3. 返回 304 则使用本地缓存，否则返回 200 和新资源

### 代理缓存控制

- **private / public**：是否允许代理缓存
- **proxy-revalidate**：代理缓存过期后需回源验证
- **s-maxage**：代理缓存的有效期
- **max-stale / min-fresh**：客户端对代理缓存的宽容度
- **only-if-cached**：仅使用代理缓存，否则返回 504

## 014. 跨域与 CORS

同源指协议、主机、端口均相同。跨域时，浏览器会限制 XHR 请求、Cookie、DOM 等访问。

### CORS

服务器通过 `Access-Control-Allow-Origin` 等响应头声明允许的源。简单请求会直接带 `Origin`；非简单请求会先发 OPTIONS 预检请求。

关键响应头：`Access-Control-Allow-Origin`、`Access-Control-Allow-Methods`、`Access-Control-Allow-Headers`、`Access-Control-Allow-Credentials`、`Access-Control-Max-Age`。

### 其他方案

- **JSONP**：利用 `<script>` 的 src 跨域，仅支持 GET
- **Nginx 反向代理**：同源访问代理，由代理转发到目标服务器

## 015. TLS 1.2 握手

HTTPS = HTTP + SSL/TLS。TLS 1.2 握手大致流程：

1. **Client Hello**：发送 client_random、TLS 版本、加密套件列表
2. **Server Hello**：返回 server_random、选定加密套件、证书、server_params
3. **Client**：验证证书，发送 client_params，用 ECDHE 计算 pre_random，生成 secret
4. **Server**：用 client_params 计算 pre_random，生成 secret
5. 双方交换 Change Cipher Spec 和 Finished 消息，之后进入加密通信

ECDHE 具备前向安全性，即使私钥泄露，历史会话也无法解密。

## 016. TLS 1.3 改进

- **安全**：废除 RSA 等弱算法，仅保留 AES、CHACHA20 等
- **性能**：1-RTT 握手，支持会话复用（Session ID / Session Ticket）、PSK 实现 0-RTT

## 017. HTTP/2 改进

- **头部压缩**：HPACK 算法，建立索引表复用字段
- **多路复用**：二进制分帧，同一 TCP 连接上并行多个流，解决 HTTP 队头阻塞
- **服务器推送**：服务器可主动推送资源
- **请求优先级**：可设置流的优先级

## 018. HTTP/2 二进制帧

帧结构：帧长度(3 字节) + 帧类型 + 帧标志 + Stream ID(4 字节) + 帧体

- **Stream ID**：标识流，相同 ID 的帧按序组装
- **END_HEADERS**：头数据结束
- **END_STREAM**：单方向数据发送结束

流具有双向性、自增 ID、可设置优先级、支持并发等特性。

---

## 参考

- 《Web 协议详解与抓包实战》—— 陶辉
- 《透视 HTTP 协议》—— Chrono
