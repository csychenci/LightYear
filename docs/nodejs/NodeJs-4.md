---
title: 处理请求
date: 2020-08-15 10:13:26
categories: NodeJs
tags:
  - 后端
  - JavaScript
  - NodeJs
  - 动态语言
---

<div style="text-align: center;font-weight: 900;"> NodeJs之请求处理 </div>

<!-- more -->

---

# NodeJs

---

## 请求方式

---

1. 常见请求方式一般是 `GET` 和 `POST`，除此之外还有 `DELETE`、`HEAD`、`OPTIONS`、`PUT`、`TRACE`，但是使用的情况较少

- GET 一般用于获取服务器的数据，附带的参数(数据)被放在 `HTTP` 请求头中，通过 `URL` 进行传输，容量 ≤32K
- POST 一般用于发送数据至服务器，附带的参数(数据)被放在请求体中，容量大，上限达到 2G

2. 数据处理

- 处理 `GET` 提交到服务器的数据

```js
const querystring = require('querystring');
const [pathname, queryStr] = req.url.split('?');
// 将参数解析成字符串格式，普通对象无法使用res.end()传输
const query = querystring.parse(queryStr);
```

```js
// 用URL构造函数实例化一个url对象，从中解构出到pathname和search值，再用querystring模块解析search数据
const querystring=require('querystring')
const url=new URL(`http://localhost:3000/$`{req.url});
const [pathname,search]=url;
// 再用querystring解析
```

```js
// 使用url模块的的parse方法解析数据
const url = require('url');
const { pathname, query } = url.parse(req.url, true);
```
