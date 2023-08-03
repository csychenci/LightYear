---
title: JavaScript
date: 2020-04-01 08:23:38
categories: JavaScript
sidemenu: true
toc: 'content'
order: 1
author: chencicsy
tags:
  - 前端
  - JavaScript
description:
---

## API

---

1. getClientRects

- 用于获取元素占据页面的所有矩形区域

```js
var rectCollection = object.getClientRects();
```

- `getClientRects()` 返回一个 `TextRectangle` 集合（TextRectangleList 对象），该对象中包括 `top`、`left`、`bottom`、`right`、`width`、`height` 六个属性。常用于获取鼠标的位置，可用于实现放大镜效果、微信的用户信息卡等

2. getBoundingClientRect

- 获得页面中某个元素的左、上、右和下分别相对浏览器视窗的位置
- `getBoundingClientRect()` 是 DOM 元素到浏览器可视范围的距离(不包括页面看不见的部分)
- 该方法会返回一个 `object` 对象，该对象中包括 `top`、`left`、`bottom`、`right`、`width`、`height` 六个属性。其中 `left` 与 `top` 指该元素的左边框与上边框到页面左边与页面上边的距离；`right` 与 `bottom` 指该元素的右边框与下边框到页面左边与上边的距离
- 与 `getClientRects` 的区别：`getClientRects` 返回一个 `TextRectangle`集合，就是 `TextRectangleList` 对象。`getBoundingClientRect` 返回 一个 `TextRectangle` 对象，即使 DOM 里没有文本也能返回 `TextRectangle` 对象

3. encodeURI/decodeURI

- 用于编码或者解码字符串，但有兼容问题，可以使用更好的方式：`encodeURIComponent/decodeURIComponent`

```js
var url = window.eocodeURIComponent(location.href); // url的编码，比encodeURI转换更彻底
var url = window.decodeURIComponent(location.href); //url的解码
```

4. document.write

- 将内容在页面输出并且显示在页面上

5. typeof

- 打印一个变量的数据类型

6. instanceof

- 用于判断对象类型

---

## 奇思妙想

---

1. [![]==!{}为什么相等呢?](https://www.zhihu.com/question/61745873?utm_source=wechat_session&utm_medium=social&s_r=0)

---

## cookie 与 localstorage

---

### cookie

---

1. 简介

- 一般的 http 请求与响应都会携带 cookie
- 以字符串的形式进行存储
- 在字符串中以 key=value 的形式出现，也就是说，一条 key=value 就是一条数据
- 多个数据之间以;分割

```JavaScript
"item1='item1';item2='item2'"
```

2. cookie 的特点

- 存储大小有限制，一般是 4K 左右
- 数量大小一般限制在 50 条左右
- 时效性，有过期时间，一般是会话级别(浏览器关闭就过期了)
- 有域名限制，谁设置的谁才能读取，也就是不能跨域访问
- 随 http 请求一起发送到服务器
- 没有设置文件访问路径的情况下不能跨文本访问

3. cookie 的使用

- 读取：document.cookie

```JavaScript
console.log(document.cookie)
```

- 存储：直接使用 document.cookie 设置就行

```JavaScript
document.cookie='item="item1"'
// 设置一个有过期时间的 cookie
document.cookie = "item1='item1';item2='item2', 18 Dec 2019 12:00:00 GMT;"
```

- 删除：cookie 不能直接删除
- 可以设置过期时间为当前时间之前，浏览器会自动删除

```JavaScript
// 设置一个有过期时间的 cookie
document.cookie = "item2='item2', 18 Dec 2019 12:00:00 GMT;"
```

---

### localStorage

---

1. 简介

- 属于 HTML5 的一个新特性，主要用于作为本地存储来使用
- 它解决了 cookie 存储空间不足的问题
- 每条 cookie 的存储空间为 4K，localStorage 一般浏览器支持的大小为 5M
- localStorage 的存储空间在不同的浏览器中会有所差别
- 数据永久保存在硬盘中(如果不清除)，安全性理论上不高
- 以字符串类型进行保存

2. 优势

- 拓展了 cookie 的 4K 限制
- localStorage 可以将第一次存储的数据直接存储到本地
- 相当于一个 5M 大小的针对前端页面的数据库
- 相对于 cookie 来说可节约带宽，一般用于高版本浏览器中才能使用

3. 限制

- 一般只有 ie8 以上的 ie 版本才支持该特性
- 所有的浏览器都会把 localstorage 的值类型限定为 string 类型，需要使用 JSON 对象类型进行转换
- localstorage 在浏览器的隐私模式下不可读取
- 本质上是对字符串的读取，存储内容过多会消耗内存空间、导致页面变卡
- 爬虫无法爬取到 localstorage

4. 存储值

- 第一种方式

```JavaScript
var storage = window.localStorage;
storage.item = '存储一条字符串'
```

- 第二种方式

```JavaScript
var storage = window.localStorage;
storage.['item'] = '存储一条字符串'
```

- 第三种方式

```JavaScript
var storage = window.localStorage;
storage.setItem('item','存储一条字符串')
// 推荐方式
```

5. 读取值

- 第一种方式

```JavaScript
var item = storage.item
```

- 第二种方式

```JavaScript
var item = storage['item']
```

- 第三种方式

```JavaScript
var item = storage.getItem('item')
// 推荐方式
```

6. 修改值

- 直接使用 getItem 修改某一个存储的值

```JavaStorage
var storage = window.localStorage;
storage.setItem('item','存储一条字符串')
```

7. 删除值

- 清空 localstorage

```JavaScript
var storage = window.localStorage;
storage.clear()
// 清空localstorage中的所有内容
```

- 删除某个值

```JavaScript
var storage = window.localStorage;
storage.removeItem('item')
// 清空某一个存储的值
```

8. 获取键

- 使用 localstorage 的 key 来获取

```JavaScript
var storage = window.localStorage;
for(var i=0;i<storage.length;i++)
{var item = storage.key(i)}
// 获取localstorage的每一个键
```

9. 注意事项

- localstorage 存放的值的类型是 string
- 可以配合使用 JSON 的 stringify 与 parse 实现字符串与其他类型的转换再对 local storage 的值进行读写

10. sessionstorage

- 与 localstorage 的用法与 api 基本一致
- 区别的是 local storage 是永久存储，而 sessionstorage 是临时存储
- localstorage 在浏览器关闭后数据依然存在，而 sessionstorage 在浏览器关闭后数据将被清空
