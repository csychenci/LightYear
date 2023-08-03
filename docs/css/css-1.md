---
title: 盒模型与flex布局
date: 2020-06-14 11:31:51
categories: CSS
tags:
  - CSS
  - 三贱客
description:
---

<!-- more -->

---

## 盒模型

---

1. 什么是盒模型

- 可以这样来认为，每个 `html标签` 都是一个方块，然后这个方块又包着几个小方块，如同盒子一层层的包裹着，这就是盒模型

2. 盒模型的分类

- `W3C标准盒模型`：属性 `width/height` 只包括内容 `content`，不包括 `border` 和 `padding`
- `IE怪异盒模型`：属性 `width/height` 包括 `border` 和 `padding`，也就是 `content+padding+border`
- 可以使用 `box-sizing` 属性来自由的控制是采用标准盒模型还是怪异盒模型

| ie8+ | ie6/7/8 |
| --- | --- |
| 使用 `box-sizing` 控制，默认值为 `content-box`，即标准盒模型；属性值改为 `border-box`，则触发怪异盒模型 | `DOCTYPE` 缺失会触发 IE 怪异盒模型 |

3. 标准盒模型与怪异盒模型的区别

| content-box          | border-box                              |
| -------------------- | --------------------------------------- |
| `width`：内容的宽度  | `width`：`border`+`padding`+内容的宽度  |
| `height`：内容的高度 | `height`：`border`+`padding`+内容的高度 |

- 对于 `标准盒模型` 来说，盒子的大小为 `content` + `border` + `padding`，即内容的(width)+内边距的再加上边框，而不加上 `margin`。
- 对于 `怪异盒模型` 来说，盒子的大小 `content`，也就是内容的 `width/height`
- css 的盒模型由 `content(内容)`、`padding(内边距)`、`border(边框)`、`margin(外边距)` 组成。但盒子的大小由 `content+padding+border` 这几部分决定，把 `margin` 算进去的那是盒子占据的位置，而不是盒子的大小

4. 使用盒模型实现一个三角形

- 给盒模型上加的边框线，其实这四条边框线是相切的，在块元素长度为 0 时，边框是以四个三角形的方式相切的

```html
<!-- 四个在盒模型中相切的三角形 -->
<div
  style="width: 0px;height: 0px;border: 60px solid black;border-color: green red blue black;"
></div>
```

- 注意：在块元素中，`width:0 != width==none`，当 `width` 不写时，块元素将会占满整个屏幕，即自适应

```html
<!-- 绿色三角形 -->
<div style="width: 0px;height: 0px;border: 60px solid white;border-top-color: green;"></div>
```

```html
<!-- 圆型扇区 -->
<div
  style="width: 0px;height: 0px;border: 60px solid black;border-color: green red blue black;border-radius:50%;"
></div>
```

---
## 网格布局
---
1. grid
- 