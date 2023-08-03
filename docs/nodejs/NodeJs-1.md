---
title: 响应对象
date: 2020-08-15 10:13:26
categories: NodeJs
tags:
  - 后端
  - JavaScript
  - NodeJs
  - 动态语言
---

<div style="text-align: center;font-weight: 900;"> NodeJs之response </div>

<!-- more -->

---

# NodeJs

---

## response

---

1. 启动一个服务器

```js
const http = require('http');
const childProcess = require('child_process');
const server = http.createServer((req, res) => {
  res.stateCode = 200;
  // 设置响应状态码
  res.setHeader('Content-Type', 'text/plain');
  // 设置响应头
  res.end('Hello World\n');
  // 响应数据
});
server.listen(3000, () => {
  console.log('Listen at 3000....');
  childProcess.exec(`start http://localhost:3000/`);
});
```

- 如此一来，我们在命令行中输入 `node server` 就启动了一个服务器。可以看到，在创建服务器时，`createServer((req,res)=>{})` 中，传入了两个参数，分别是 req `request` (请求对象)、res `response` (响应对象)

2. response.write

- 该方法可用于向前端返回数据，该方法能被调用多次，返回的数据会被 `拼接` 到一起。

3. response.end

- 必须调用该方法以用于 `结束请求`，否则前端会一直处于等待状态，同时，在结束等待状态的同时，你还可以用 `response.end(data)` 向前端返回数据。

4. 示例代码

- 在响应体里面添加以下内容

```js {4-6}
const server = http.createServer((req,res)=>{
	res.stateCode=200;
	res.setHeader('content-type','text/plain');
	res.write('the ');
	res.write('first ');
	res.write(' Js Project')
	res.end(' Hello World')
})
```

- 返回的数据内容为 `the first Js Project Hello World`
