---
title: 浏览器对象模型
date: 2020-05-03 08:33:45
categories: JavaScript
sidemenu: true
toc: 'content'
order: 24
author: chencicsy
tags:
  - 前端
  - JavaScript
  - 动态语言
description:
---

## 浏览器对象模型
---

1. 什么是浏览器对象模型
- 它代表的是一种操作浏览器的能力，它的核心是 window 对象，window 对象不仅仅代表全局作用域或者宿主对象，还可以表示浏览器窗口。它可以用于做以下事情

|-|
|---|
|获取一些浏览器的相关信息（窗口的大小）|
|操作浏览器进行页面跳转|
|获取当前浏览器地址栏的信息|
|操作浏览器的滚动条|
|浏览器的信息（浏览器的版本）|
|让浏览器出现一个弹出框（alert/confirm/prompt）|

2. 获取浏览器窗口的尺寸
- **内部宽高**：可以获取浏览器窗口的内部宽度和高度(不包括菜单栏、工具栏、边框等占位元素，但包含滚动条，网页的净宽高)，依据浏览器窗口的变化而变化

```js
// ie8以下不支持
let now_width = window.innerWidth;
let now_height = window.innerHeight;
```

3. 弹出框
- alert：弹出一个提示框
- confirm：弹出一个提示框和两个按钮
- prompt：弹出一个输入框和两个按钮，可接收用户输入的内容作为返回值

4. 页面的地址信息
- location 对象表示当前页面的 url 信息/浏览器内地址栏内 url 的信息，可以用于获取 url 内的单独信息
- location.href：获取一个页面完整的 url 信息，也可以给它赋值，会跳转赋值的地址页面

|     对象属性      | 描述                  |       示例       |
| :---------------: | :-------------------- | :--------------: |
| location.protocol | 协议信息              |       http       |
|   location.host   | 域名                  |   www.xxx.com    |
|   location.port   | 端口                  |       8080       |
| location.pathname | 路径                  | index/index.html |
|  location.search  | 提交参数              |  book=2&id=125   |
|   location.hash   | 页面内点击/选中的标签 |      #book       |

- location.assign：加载一个新页面（一般是网址内页面）
- location.reload：重新加载当前页面（写在全局会一直处在刷新状态）

5. 浏览器的历史记录
- history：专门用来存储历史记录信息
- history.back：回退历史记录，回到前一个页面，需要有上一条记录，否则不回退
- history.forword：去下一个页面，需要有回退记录，否则无下一个页面，无法回退

6. 浏览器的版本信息

|       对象属性       |           描述           |
| :------------------: | :----------------------: |
|      navigator       |    用来获取浏览器信息    |
| navigator.userAgent  |   获取浏览器的整体信息   |
|  navigator.appName   |     获取浏览器的名称     |
| navigator.appVersion |    获取浏览器的版本号    |
|  navigator.platform  | 获取当前计算机的操作系统 |
|  navigator.language  |   获取浏览器设置的语言   |

```js
console.log(window.navigator.userAgent); // Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36
console.log(window.navigator.appName); // Netscape
console.log(window.navigator.appVersion); // 5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36
console.log(window.navigator.platform); // Win32
console.log(window.navigator.language); // zh-CN
```

7. 设备屏幕的信息
- screen.width：设备屏幕的实际宽度 (px)
- screen.height：设备屏幕的实际高度 (px)
- screen.colorDepth：返回设备屏幕的颜色位数 (8,16,24)

8. window 的弹窗方法
- `open("路径","_blank","弹出窗口外观")`：外观：`width`、`height`、`left`、`top`。返回值为弹出的子窗口，其特点是子窗口和父窗口可以互相操作

```html
<body>
  <input type="text" id="number" disabled="disabled" />
  <input type="button" value="选择" onclick="openNewWindow()" />
  <script type="text/javascript">
    function openNewWindow() {
      var myWindow = window.open('TEST_39.html', '', 'width=200,height=200');
    }
  </script>
</body>
```

```html
<body>
  <table>
    <tr>
      <td><input type="text" id="int" value="default" /></td>
      <td><button onclick="selectTish()">选择</button></td>
    </tr>
    <tr>
      <td>2</td>
      <td><button onclick="selectTish()">选择</button></td>
    </tr>
  </table>
</body>
<script>
  function selectTish() {
    //1、获得打开该窗口的父窗口引用
    var first = window.opener;
    //2、获得document对象
    var doc = first.document;
    //3、改变父类标签值
    var int = document.getElementById('int');
    doc.getElementById('number').value = int.value;
    //4、关闭本窗口
    window.close();
  }
</script>
```
