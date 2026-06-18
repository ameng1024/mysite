---
title: RESTful API 设计规范
description: RESTful API 设计原则、最佳实践、资源命名规范、HTTP 方法使用指南及安全配置
published: 2026-03-12
updated: 2026-03-12
tags: [RESTful, API设计, 网络协议, 后端开发, 接口规范]
category: 网络
draft: false
---


## 概述
REST（Representational State Transfer）是一种软件架构风格，RESTful API 是基于 REST 原则设计的 Web API。它使用标准的 HTTP 方法，以资源为中心，实现客户端与服务器的无状态交互。

## 核心原则

### 1. 统一接口 (Uniform Interface)
- **资源标识**：每个资源有唯一的 URI
- **资源操作**：通过标准 HTTP 方法操作资源
- **自描述消息**：消息包含足够的信息让接收方处理
- **超媒体驱动**：API 响应包含相关资源的链接

### 2. 无状态 (Stateless)
- 每个请求包含处理所需的所有信息
- 服务器不保存客户端状态
- 会话状态由客户端维护

### 3. 可缓存 (Cacheable)
- 响应明确标识是否可缓存
- 合理使用缓存提高性能
- 客户端可以重用缓存响应

### 4. 分层系统 (Layered System)
- 客户端不知道是否直接连接最终服务器
- 中间层可以提高可扩展性和安全性
- 负载均衡、缓存、安全层透明

### 5. 按需代码 (Code on Demand，可选)
- 服务器可以传输可执行代码
- 扩展客户端功能
- 不是 REST 架构的必需约束

## 资源设计

### 1. 资源命名
```bash
# 好的命名
/users
/users/{id}/orders
/products/{id}/reviews

# 避免的命名
/getAllUsers
/createNewUser
/deleteUserById/{id}
```
### 2. URI 设计规范
- 使用名词，而不是动词
- 使用小写字母
- 使用连字符 `-` 分隔单词
- 避免文件扩展名
- 版本化 API

### 3. 资源关系
```bash
# 一对一关系
/users/{userId}/profile

# 一对多关系  
/users/{userId}/orders
/users/{userId}/orders/{orderId}

# 多对多关系
/users/{userId}/roles
/roles/{roleId}/users
```
## HTTP 方法使用

### 1. GET - 获取资源
```http
GET /api/v1/users
GET /api/v1/users/{id}
GET /api/v1/users?page=1&limit=20&sort=name
```
### 2. POST - 创建资源
```http
POST /api/v1/users
Content-Type: application/json

{
  "name": "张三",
  "email": "zhangsan@example.com"
}
```
### 3. PUT - 更新完整资源
```http
PUT /api/v1/users/{id}
Content-Type: application/json

{
  "name": "张三",
  "email": "zhangsan@example.com",
  "age": 30
}
```
### 4. PATCH - 部分更新资源
```http
PATCH /api/v1/users/{id}
Content-Type: application/json

{
  "age": 31
}
```
### 5. DELETE - 删除资源
```http
DELETE /api/v1/users/{id}
```
### 6. HEAD - 获取响应头
```http
HEAD /api/v1/users/{id}
```
### 7. OPTIONS - 查询支持的方法
```http
OPTIONS /api/v1/users
```
## 响应设计

### 1. 状态码规范
```http
# 成功响应
200 OK - GET、PUT、PATCH 成功
201 Created - POST 成功，资源已创建
204 No Content - DELETE 成功，无返回内容

# 客户端错误
400 Bad Request - 请求参数错误
401 Unauthorized - 未认证
403 Forbidden - 无权限
404 Not Found - 资源不存在
409 Conflict - 资源冲突

# 服务器错误
500 Internal Server Error - 服务器内部错误
503 Service Unavailable - 服务不可用
```
### 2. 响应格式
```json
{
  "status": "success",
  "data": {
    "id": 1,
    "name": "张三",
    "email": "zhangsan@example.com"
  },
  "meta": {
    "timestamp": "2026-03-12T14:30:00Z",
    "version": "v1"
  }
}
```
### 3. 错误响应
```json
{
  "status": "error",
  "code": "VALIDATION_ERROR",
  "message": "邮箱格式不正确",
  "details": {
    "field": "email",
    "reason": "必须为有效的邮箱地址"
  },
  "meta": {
    "timestamp": "2026-03-12T14:30:00Z",
    "requestId": "req_123456"
  }
}
```
## 分页与过滤

### 1. 分页参数
```http
GET /api/v1/users?page=2&limit=20&sort=name&order=asc
```
### 2. 分页响应
```json
{
  "status": "success",
  "data": [...],
  "pagination": {
    "page": 2,
    "limit": 20,
    "total": 150,
    "pages": 8,
    "hasNext": true,
    "hasPrev": true
  },
  "links": {
    "self": "/api/v1/users?page=2&limit=20",
    "first": "/api/v1/users?page=1&limit=20",
    "prev": "/api/v1/users?page=1&limit=20",
    "next": "/api/v1/users?page=3&limit=20",
    "last": "/api/v1/users?page=8&limit=20"
  }
}
```
### 3. 过滤与搜索
```http
# 精确匹配
GET /api/v1/users?status=active

# 范围查询
GET /api/v1/users?createdAt[gte]=2026-01-01&createdAt[lte]=2026-03-31

# 模糊搜索
GET /api/v1/users?q=张三

# 多条件
GET /api/v1/users?status=active&role=admin&sort=createdAt&order=desc
```
## 版本管理

### 1. URI 版本化
```bash
# 路径版本
/api/v1/users
/api/v2/users

# 查询参数版本（不推荐）
/api/users?version=1
```
### 2. 头部版本
```http
GET /api/users
Accept: application/vnd.example.v1+json
```
### 3. 版本策略
- 保持向后兼容
- 弃用旧版本时提供足够过渡期
- 文档化版本变更

## 安全设计

### 1. 认证
```http
# Bearer Token
Authorization: Bearer {token}

# API Key
X-API-Key: {api_key}
```
### 2. 授权
- 基于角色的访问控制（RBAC）
- 基于资源的访问控制
- 细粒度权限控制

### 3. 速率限制
```http
HTTP/1.1 429 Too Many Requests
Retry-After: 60
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 0
X-RateLimit-Reset: 1617032400
```
### 4. CORS 配置
```javascript
// Express.js 示例
app.use(cors({
  origin: ['https://example.com'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  maxAge: 86400 // 24小时
}));
```
## 文档与测试

### 1. API 文档工具
- **OpenAPI/Swagger**：标准 API 描述格式
- **Postman**：API 测试与文档
- **Redoc**：OpenAPI 文档生成器

### 2. OpenAPI 示例
```yaml
openapi: 3.0.0
info:
  title: 用户管理 API
  version: 1.0.0
paths:
  /users:
    get:
      summary: 获取用户列表
      parameters:
        - name: page
          in: query
          schema:
            type: integer
            default: 1
        - name: limit
          in: query
          schema:
            type: integer
            default: 20
      responses:
        '200':
          description: 成功
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/UserList'
```
### 3. 测试策略
- 单元测试：验证业务逻辑
- 集成测试：验证 API 端点
- 性能测试：验证响应时间
- 安全测试：验证安全漏洞

## 最佳实践

### 1. 设计原则
- 保持简单直观
- 遵循约定优于配置
- 提供清晰的错误信息
- 支持内容协商

### 2. 性能优化
- 启用 HTTP 缓存
- 使用 ETag 和 Last-Modified
- 实现分页和懒加载
- 压缩响应数据

### 3. 监控与日志
- 记录所有 API 请求
- 监控响应时间和错误率
- 设置告警阈值
- 分析 API 使用模式

## 常见反模式

### 1. 避免的操作
```bash
# ❌ 错误：使用动词
/getAllUsers
/createUser
/updateUser/{id}

# ✅ 正确：使用名词和 HTTP 方法
GET /users
POST /users  
PUT /users/{id}
```
### 2. 避免过度设计
- 不要过早优化
- 避免过度抽象
- 保持 API 简单可用

## 总结
设计良好的 RESTful API 需要遵循统一接口、无状态、可缓存等核心原则。合理的资源设计、正确的 HTTP 方法使用、清晰的响应格式和严格的安全控制是构建高质量 API 的关键。

---
*创建时间：2026-03-12*
*分类：前端网络*
*标签：RESTful, API设计, 网络协议, 后端开发*
