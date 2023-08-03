---
title: Sass
date: 2020-08-24 19:34:12
categories: css
tags:
  - 前端
  - scss
  - sass
description:
---

<!-- more -->

# Sass

---

1. 初步认识

- 世界上最成熟、最稳定、最强大的专业级扩展语言
- sass 是一个 css 的预编译工具
- 更优雅的书写 css
- 需要对 sass 进行转换为 css 在浏览器中运行

2. 安装

- Node 环境下

```bash
npm install sass -g
```

3. 格式

- sass

```css
div
    width:200px
    height:200px
```

- scss

```css
div {
  width: 300px;
  height: 200px;
}
```

- _sass_ 与 _scss_ 之间的区别：scss 使用花括号包裹、分号结尾，sass 不使用这些进行包裹和结尾

4. 需要编译成 css 文件

```bash
sass index.scss index.css
```

---

## 实时编译

---

1. 实时编译

- 可以实现代码的实时编译，只要修改 index.scss 的内容，index.css 的内容就会自动更新

```bash
sass --watch index.scss:index.css
```

2. 实时监控目录

- 可以对一个文件夹的 sass 文件进行实时编译，修改和添加一个文件都会实时响应

```bash
sass --watch sass:css
```

---

## sass 语法

---

1. 变量

- 定义一个变量，可以在后面的代码中进行复用

```scss
$one_color: pink;
/* 定义一个变量，它的值是pink */
h1 {
  color: $one_color;
}
/* $one_color 属于全局变量 */
```

```scss
h1 {
  $h: 200px;
  height: $h;
}
// $h 属于h1内的私有变量
```

2. 嵌套

```scss
h1 {
  width: 100px div {
    width: 200px;
  }
}
// 编译成css
h1 {
  width: 100px;
}
h1 div {
  width: 200px;
}
```

```css
div {
  width: 200px;
  background: pink;
  .box {
    width: 100px;
    height: 100px;
    background: red;
  }
}
//被编译成css
div {
  width: 200px;
  background: pink;
}
div .box {
  width: 100px;
  height: 100px;
  background: red;
}
```

```css
div {
  width: 200px;
  background: pink;
  .box {
    width: 100px;
    height: 100px;
    background: red;
  }
  .nav {
    width: 100px;
    height: 300px;
    background: black;
  }
  :hover {
    width: 300px;
  }
}
​
/* // 我想的是 div 被鼠标悬停的时候 width 变成 300
// 但是编译结果却是 */
div {
  width: 200px;
  background: pink;
}
div .box {
  width: 100px;
  height: 100px;
  background: red;
}
div .nav {
  width: 100px;
  height: 300px;
  background: black;
}
div :hover {
  width: 300px;
}
/* // 在移入div时不变化，移入子级时子级产生变化，即宽度变为300 */
```

```css
// 解决方法
div {
  width: 200px;
  background: pink;
  .box {
    width: 100px;
    height: 100px;
    background: red;
  }
  .nav {
    width: 100px;
    height: 300px;
    background: black;
  }
  &:hover {
    width: 300px;
  }
}
​
/* // 编译结果 */
div {
  width: 200px;
  background: pink;
}
div .box {
  width: 100px;
  height: 100px;
  background: red;
}
div .nav {
  width: 100px;
  height: 300px;
  background: black;
}
div:hover {
  width: 300px;
}
```

3. 群组嵌套

- 多个标签同时嵌套

```css
div {
  width: 200px;
  background: pink;
  .box,
  .nav {
    width: 100px;
    height: 200px;
    background: red;
  }
}
```

```css
/* // 编译结果 */
div {
  width: 200px;
  background: pink;
}
div .box,
div .nav {
  width: 100px;
  height: 200px;
  background: red;
}
```

- 多个标签同时嵌套一个标签

```css
.box,
.nav {
  width: 100px;
  height: 200px;
  background: red;
  p {
    width: 50px;
    height: 100px;
    background: pink;
  }
}
```

```css
// 编译结果
.box,
.nav {
  width: 100px;
  height: 200px;
  background: red;
}
.box p,
.nav p {
  width: 50px;
  height: 100px;
  background: pink;
}
```

4. 属性嵌套

- 第一种属性嵌套

```css
p {
  width: 50px;
  height: 100px;
  background: pink;
  border: {
    width: 2px;
    color: #333;
    style: solid;
  }
}
```

```css
/* // 编译结果 */
p {
  width: 50px;
  height: 100px;
  background: pink;
  border-color: #333;
  border-style: solid;
  border-width: 2px;
}
```

- 第二种属性嵌套

```css
p {
  width: 50px;
  height: 100px;
  background: pink;
  border: 1px solid #333 {
    bottom: none;
  }
}
```

```css
/* // 编译结果 */
p {
  width: 50px;
  height: 100px;
  background: pink;
  border-color: #333;
  border-style: solid;
  border-width: 2px;
  border-bottom: none;
}
```

5. 混合器

- 定义一个函数在 scss 文件内使用

```css
/* // 定义一个混合器使用  @mixin 关键字 */
@mixin radius {
  -webkit-border-radius: 10px;
  -moz-border-radius: 10px;
  -ms-border-radius: 10px;
  -o-border-radius: 10px;
  border-radius: 10px;
}
```

- 混合器在未使用时不会被编译，只有在被使用以后才会被编译

```css
@mixin radius {
  -webkit-border-radius: 10px;
  -moz-border-radius: 10px;
  -ms-border-radius: 10px;
  -o-border-radius: 10px;
  border-radius: 10px;
}
.box,
.nav {
  width: 100px;
  height: 200px;
  background: red;
  @include radius;
}
```

```css
/* // 编译结果 */
.box,
.nav {
  width: 100px;
  height: 200px;
  background: red;
  -webkit-border-radius: 10px;
  -moz-border-radius: 10px;
  -ms-border-radius: 10px;
  -o-border-radius: 10px;
  border-radius: 10px;
}
```

- 混合器传参，类似于函数传递参数，在定义时是形参，调用时是实参

```css
@mixin mytransition($pro, $dur, $delay, $tim) {
  -webkit-transition: $pro $dur $delay $tim;
  -moz-transition: $pro $dur $delay $tim;
  -ms-transition: $pro $dur $delay $tim;
  -o-transition: $pro $dur $delay $tim;
  transition: $pro $dur $delay $tim;
}
```

```css
/* // 使用 */
@mixin mytransition($pro, $dur, $delay, $tim) {
  -webkit-transition: $pro $dur $delay $tim;
  -moz-transition: $pro $dur $delay $tim;
  -ms-transition: $pro $dur $delay $tim;
  -o-transition: $pro $dur $delay $tim;
  transition: $pro $dur $delay $tim;
}
.box,
.nav {
  width: 100px;
  height: 200px;
  background: red;
  &:hover {
    width: 300px;
  }
  @include mytransition(all, 1s, 0s, linear);
  /* // 调用函数并传递实参 */
}
```

```css
/* // 编译结果 */
.box,
.nav {
  width: 100px;
  height: 200px;
  background: red;
  -webkit-transition: all 1s 0s linear;
  -moz-transition: all 1s 0s linear;
  -ms-transition: all 1s 0s linear;
  -o-transition: all 1s 0s linear;
  transition: all 1s 0s linear;
}
.box:hover,
.nav:hover {
  width: 300px;
}
```

- 函数传参，定义了多少个参数，调用时就要传递多少个参数，否则会报错
- 定义混合器缺省值

```css
/* // 使用
// 设置一些带有默认值的参数 */
@mixin mytransition($dur: 1s, $pro: all, $delay: 0s, $tim: linear) {
  -webkit-transition: $dur $pro $delay $tim;
  -moz-transition: $dur $pro $delay $tim;
  -ms-transition: $dur $pro $delay $tim;
  -o-transition: $dur $pro $delay $tim;
  transition: $dur $pro $delay $tim;
}
.box,
.nav {
  width: 100px;
  height: 200px;
  background: red;
  &:hover {
    width: 300px;
  }
  @include mytransition(2s);
  /* // 只传递一个参数，其他的使用默认值
// 调用函数并传递实参 */
}
```

```css
/* // 编译结果 */
.box,
.nav {
  width: 100px;
  height: 200px;
  background: red;
  -webkit-transition: 2s all 0s linear;
  -moz-transition: 2s all 0s linear;
  -ms-transition: 2s all 0s linear;
  -o-transition: 2s all 0s linear;
  transition: 2s all 0s linear;
}
.box:hover,
.nav:hover {
  width: 300px;
}
```

6. 继承

- 继承可以减轻代码的重复率，增加代码的复用率，提高开发性能

```css
/* // 1. 先定义一个选择器 */
div {
 width: 100px;
 height: 50px;
 color。 white;
 background: pink;。
}

/* // 2. 在另一个选择器里继承它 */
p{
 @extend div;

 font-size:24px;
 border: 1px solid #333;
}
```

```css
/* // 编译结果 */
div,
p {
  width: 100px;
  height: 50px;
  color: white;
  background: pink;
}

p {
  font-size: 24px;
  border: 1px solid #333;
}
```

7. 注释

- 编译时不会被编译的注释

```css
// 这个注释不会被编译，在编译时会被过滤掉
```

- 编译时会被编译的注释

```css
/* 这个注释在被编译时，不会被过滤 */
```

- 强力注释

```css
/*! 这个注释是一个强力注释，不光编译的时候会被编译过去，将来压缩文件的时候也会存在 */
```

8. 导入文件

- 定义好的变量和混合器如果没有被使用，那么不会被编译
- 可以单独把变量以及混合器写在不同的文件里，然后导入后使用

```css
/* // variable.scss */
$one_color: red;
$two_color: pink;
$w: 200px;
$h: 100px;
```

```css
/* // mixin.scss */
@mixin radius {
  -webkit-border-radius: 10px;
  -moz-border-radius: 10px;
  -ms-border-radius: 10px;
  -o-border-radius: 10px;
  border-radius: 10px;
}
@mixin mytransition($dur: 1s, $pro: all, $delay: 0s, $tim: linear) {
  -webkit-transition: $dur $pro $delay $tim;
  -moz-transition: $dur $pro $delay $tim;
  -ms-transition: $dur $pro $delay $tim;
  -o-transition: $dur $pro $delay $tim;
  transition: $dur $pro $delay $tim;
}
```

```css
/* // 在文件中使用它们
// index.scss */
@import './variable.scss';
@import './mixin.scss';
div {
  width: $w;
  height: $h;
  color: white;
  background: $two_color;
  &:hover {
    width: 500px;
  }
  @include mytransition;
}
p {
  @extend div;

  font-size: 24px;
  border: 1px solid #333;
}
```

```css
/* // 编译结果 */
div,
p {
  width: 200px;
  height: 100px;
  color: white;
  background: pink;
  -webkit-transition: 1s all 0s linear;
  -moz-transition: 1s all 0s linear;
  -ms-transition: 1s all 0s linear;
  -o-transition: 1s all 0s linear;
  transition: 1s all 0s linear;
}
div:hover,
p:hover {
  width: 500px;
}

p {
  font-size: 24px;
  border: 1px solid #333;
}
```
