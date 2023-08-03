---
title: 初探NodeJs
date: 2020-08-15 10:13:26
categories: NodeJs
tags:
  - 后端
  - JavaScript
  - NodeJs
  - 动态语言
---

---

## Nodejs 简介

---

1. `Nodejs` 其实就是运行在服务端的 `JavaScript`
2. `Nodejs` 是一个基于 `Chrome V8引擎` 的 `JavaScript` 运行环境
3. `Nodejs` 使用了一个事件驱动、非阻塞式 I/O 的模型，使其轻量又高效

---

## Nodejs 的应用场景

---

1. 由于 Nodejs 还不够成熟，一般现在不用于独立开发
2. 中间层

- 首先了解一个概念，在开发应用时，通常我们不会把后端的 `主服务器` 直接暴露给客户端，两端之间通常需要有一个 `中间层` 进行通信，这样做的好处是，如果中间层出现问题，不会影响后端的主服务器。
- 此外，`中间层` 可以做缓存，或者实现一些业务逻辑，起到降低主服务器复杂度，提高性能的作用。
- `中间层` 也可以像 `CDN` 一样在各处部署，以提高用户的访问效率。

3. 主要应用场景

- **前端工程化**：着重于开发效率的提升和开发质量的保证，如开发一些实用工具，如 `Webpack` 、`Gulp` 等
- **后端服务应用**：关注服务的稳定和安全，其次需要关注并发的性能。发挥 nodejs 的异步驱动特性，可以实现一些小型应用，或某个功能块。

---

## NodeJs 的优势

---

1. NodeJs 的语法

- NodeJs 的语法与前端的 JavaScript 相同，易于前端开发入手
- 性能高
- 易于结合前端代码，前后台代码可以共用，不需要单独开发

---

## 启动一个 NodeJs 服务器

---

1. 引入 `NodeJs` 的 `http` 模块

- 该模块可用于建立一个 `http服务器`

```js
const http = require('http');
```

2. 引入 `NodeJs` 的 `child_process` 模块

```js
const childProcess = require('child_process');
```

3. 创建一个服务器

```js
const server = http.createServer((req, res) => {
  res.stateCode = 200;
  // 设置响应状态码
  res.setHeader('Content-Type', 'text/plain');
  // 设置响应头
  res.end('Hello World\n');
  // 响应数据
});
```

4. 监听一个端口

```js
server.listen(3000, () => {
  console.log('Listen at 3000....');
  childProcess.exec(`start http://localhost:3000/`);
});
```

```js
server.listen(3000, '127.0.0.1', () => {
  // 指定服务器地址为本地地址，不指定默认为localhost
  console.log('Listen at 3000....');
  childProcess.exec(`start http://localhost:3000/`);
  // 启动服务后,自动打开浏览器访问对应地址
});
```
