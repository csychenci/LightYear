---
title: CSS-rest
date: 2020-06-15 11:29:28
categories: WEB
tags:
  - 前端
  - css
  - 三贱客
description:
---

# CSS

---

## 说明

     css层叠指的是样式的优先级，当发生冲突时以优先级高的为主

---

## 元素类型的转换

---

- 拓展 #id>标签 取得是 id 下的直接子级标签

---

### display

---

1. display 可以改变盒模型的缺省显示类型
2. none：此元素不会被显示
3. block：显示为块状元素，元素前后会带有换行符
4. inline：显示为内联元素，元素前后没有换行符
5. inline-block：同时具备内联元素、块状元素的特点

---

#### 怪异盒模型

1. 盒模型 a. content b. padding c. margin d. border
2. 怪异盒模型/ie 盒模型(border-sizing) a. content-box(缺省) b. border-box 形成怪异盒模型 不用减去相应地 padding 值 border 边框是长在当前盒子的宽高之上 当盒子宽高已知时，自身设置的 width/height 当盒子宽高未知时，内容 + margin
3. 盒模型与怪异盒模型的区别 a. 怪异盒模型不用计算 border 和 padding 值 b. 怪异盒模型不用考虑兼容问题，一般被用在移动端(不考虑兼容) c. \*{border-sizing:border-box;} 所有的盒子都以怪异盒模型的方式组织

---

#### display:flex

1. flex：弹性布局(flexible box) a. 子元素默认沿着主轴进行排列，弹性盒默认主轴是 x 轴 b. 如果缺省主轴是 X 轴，那么侧轴(交叉轴)就是 Y 轴 如果缺省主轴是 Y 轴，那么侧轴(交叉轴)就是 X 轴 c. 父元素设置 flex 布局后，子元素(单个元素)设置 margin:auto 会在父元素中水平垂直 d. 在弹性盒里面，所有的子元素都可以直接添加宽高(针对行内元素来说，不用再给行内元素设置成块元素)
2. 设置 flex 布局后，子元素的 float、clear 和 vertical-align 属性会失效
3. flex-direction：容器内元素的排列方向(默认横向排列) a. flex-direction:row;沿水平主轴(默认主轴为 X)让元素从左到右排列

```bash
<div style="display: flex;flex-direction: row;">
   <div style="width: 100px;height: 100px;background: red;"></div>
   <div style="width: 100px;height: 100px;background: yellow"></div>
   <div style="width: 100px;height: 100px;background: green"></div>
</div>
```

<div style="display: flex;flex-direction: row;margin:0 auto;margin-bottom: 10px;">
   <div style="width: 100px;height: 100px;background: red;"></div>
   <div style="width: 100px;height: 100px;background: yellow"></div>
   <div style="width: 100px;height: 100px;background: green"></div>
</div>

         b. flex-direction:column; 让元素沿垂直主轴(默认主轴为Y)从上到下垂直排列

```bash
<div style="display: flex;flex-direction: column;">
   <div style="width: 100px;height: 100px;background: column;"></div>
   <div style="width: 100px;height: 100px;background: yellow"></div>
   <div style="width: 100px;height: 100px;background: green"></div>
</div>
```

<div style="display: flex;flex-direction: column;margin:0 auto;margin-bottom: 10px;">
    <div style="width: 100px;height: 100px;background: red;"></div>
    <div style="width: 100px;height: 100px;background: yellow"></div>
    <div style="width: 100px;height: 100px;background: green"></div>
</div>
        
         c. flex-direction:row-reverse;沿水平主轴(默认主轴为X)让元素从右向左排列
```bash
<div style="display: flex;flex-direction: row-reverse;">
   <div style="width: 100px;height: 100px;background: red;"></div>
   <div style="width: 100px;height: 100px;background: yellow"></div>
   <div style="width: 100px;height: 100px;background: green"></div>
</div>
```
<div style="display: flex;flex-direction: row-reverse;margin:0 auto;margin-bottom: 10px;">
   <div style="width: 100px;height: 100px;background: red;"></div>
   <div style="width: 100px;height: 100px;background: yellow"></div>
   <div style="width: 100px;height: 100px;background: green"></div>
</div>

         d. flex-direction:row-reverse;沿水平主轴(默认主轴为Y)让元素从下向上排列

```bash
<div style="display: flex;flex-direction: column-reverse;">
   <div style="width: 100px;height: 100px;background: red;"></div>
   <div style="width: 100px;height: 100px;background: yellow"></div>
   <div style="width: 100px;height: 100px;background: green"></div>
</div>
```

<div style="display: flex;flex-direction:column-reverse;margin:0 auto;margin-bottom: 10px;">
   <div style="width: 100px;height: 100px;background: red;"></div>
   <div style="width: 100px;height: 100px;background: yellow"></div>
   <div style="width: 100px;height: 100px;background: green"></div>
</div>
4. flex-wrap：容器内元素的换行(默认不换行)
          - 当父级区域小于子级盒子的总和时会折行，在弹性盒中默认进行挤压而不换行
          a. flex-wrap: nowrap; (默认)元素不换行,比如：一个div宽度100%，设置此属性，2个div宽度就自动变成各50%。
```bash
<div style="display: flex;flex-wrap: no-wrap;margin-bottom: 10px;width: 200px;height: 200px;">
    <div style="height: 50px;background: red;width: 50px;"></div>
    <div style="height: 50px;background: yellow;width: 50px;"></div>
    <div style="height: 50px;background: green;width: 50px;"></div>
    <div style="height: 50px;background: blue;width: 50px;"></div>
    <div style="height: 50px;background: gray;width: 50px;"></div>
    <div style="height: 50px;background: orange;width: 50px;"></div>
</div>
```
<div style="display: flex;flex-wrap: no-wrap;margin:0 auto;margin-bottom: 10px;width: 200px;height: 200px;">
    <div style="height: 50px;background: red;width: 50px;"></div>
    <div style="height: 50px;background: yellow;width: 50px;"></div>
    <div style="height: 50px;background: green;width: 50px;"></div>
    <div style="height: 50px;background: blue;width: 50px;"></div>
    <div style="height: 50px;background: gray;width: 50px;"></div>
    <div style="height: 50px;background: orange;width: 50px;"></div>
</div>

          b. flex-wrap: wrap; 元素换行,第一行在上方，比如：一个div宽度100%，设置此属性，第二个div就在第二行了。

```bash
<div style="display: flex;flex-wrap: wrap;margin-bottom: 10px;width: 200px;height: 200px;">
    <div style="height: 50px;background: red;width: 50px;"></div>
    <div style="height: 50px;background: yellow;width: 50px;"></div>
    <div style="height: 50px;background: green;width: 50px;"></div>
    <div style="height: 50px;background: blue;width: 50px;"></div>
    <div style="height: 50px;background: gray;width: 50px;"></div>
    <div style="height: 50px;background: orange;width: 50px;"></div>
</div>
```

<div style="display: flex;flex-wrap: wrap;margin:0 auto;margin-bottom: 10px;width: 200px;height: 200px;">
    <div style="height: 50px;background: red;width: 50px;"></div>
    <div style="height: 50px;background: yellow;width: 50px;"></div>
    <div style="height: 50px;background: green;width: 50px;"></div>
    <div style="height: 50px;background: blue;width: 50px;"></div>
    <div style="height: 50px;background: gray;width: 50px;"></div>
    <div style="height: 50px;background: orange;width: 50px;"></div>
</div>

          c. flex-wrap: wrap-reverse; 元素换行,第一行在下方

```bash
<div style="display: flex;flex-wrap: wrap-reverse;margin:0 auto;margin-bottom: 10px;width: 200px;height: 200px;">
    <div style="height: 50px;background: red;width: 50px;"></div>
    <div style="height: 50px;background: yellow;width: 50px;"></div>
    <div style="height: 50px;background: green;width: 50px;"></div>
    <div style="height: 50px;background: blue;width: 50px;"></div>
    <div style="height: 50px;background: gray;width: 50px;"></div>
    <div style="height: 50px;background: orange;width: 50px;"></div>
</div>
```

<div style="display: flex;flex-wrap: wrap-reverse;margin:0 auto;margin-bottom: 10px;width: 200px;height: 200px;">
    <div style="height: 50px;background: red;width: 50px;"></div>
    <div style="height: 50px;background: yellow;width: 50px;"></div>
    <div style="height: 50px;background: green;width: 50px;"></div>
    <div style="height: 50px;background: blue;width: 50px;"></div>
    <div style="height: 50px;background: gray;width: 50px;"></div>
    <div style="height: 50px;background: orange;width: 50px;"></div>
</div>
5. justify-content 元素在主轴(页面)上的排列(对齐方式)
          a. justify-content : center; 元素在主轴(页面)上居中排列
```bash
<div style="display: flex;justify-content: center;margin-bottom: 10px;width: 200px;height: 200px;background: gainsboro;">
    <div style="height: 50px;background: red;width: 50px;"></div>
    <div style="height: 50px;background: yellow;width: 50px;"></div>
    <div style="height: 50px;background: green;width: 50px;"></div>
</div
```
<div style="display: flex;justify-content: center;margin:0 auto;margin-bottom: 10px;width: 200px;height: 200px;background: gainsboro;">
    <div style="height: 50px;background: red;width: 50px;"></div>
    <div style="height: 50px;background: yellow;width: 50px;"></div>
    <div style="height: 50px;background: green;width: 50px;"></div>
</div>

        b. justify-content : space-between; 两端对齐，元素之间的间隔都相等

```bash
<div style="display: flex;justify-content: space-between;margin-bottom: 10px;width: 200px;height: 200px;background: gainsboro;">
    <div style="height: 50px;background: red;width: 50px;"></div>
    <div style="height: 50px;background: yellow;width: 50px;"></div>
    <div style="height: 50px;background: green;width: 50px;"></div>
</div
```

<div style="display: flex;justify-content: space-between;margin:0 auto;margin-bottom: 10px;width: 200px;height: 200px;background: gainsboro;">
    <div style="height: 50px;background: red;width: 50px;"></div>
    <div style="height: 50px;background: yellow;width: 50px;"></div>
    <div style="height: 50px;background: green;width: 50px;"></div>
</div>
    
       c. justify-content : space-around; 每个项目两侧的间隔相等。所以，项目之间的间隔比项目与边框的间隔大一倍
```bash
<div style="display: flex;justify-content: space-around;margin-bottom: 10px;width: 200px;height: 200px;background: gainsboro;">
    <div style="height: 50px;background: red;width: 50px;"></div>
    <div style="height: 50px;background: yellow;width: 50px;"></div>
    <div style="height: 50px;background: green;width: 50px;"></div>
</div
```
<div style="display: flex;justify-content: space-around;margin:0 auto;margin-bottom: 10px;width: 200px;height: 200px;background: gainsboro;">
    <div style="height: 50px;background: red;width: 50px;"></div>
    <div style="height: 50px;background: yellow;width: 50px;"></div>
    <div style="height: 50px;background: green;width: 50px;"></div>
</div>

       d. justify-content : flex-start;(缺省) 左对齐

```bash
<div style="display: flex;justify-content: flex-start;margin-bottom: 10px;width: 200px;height: 200px;background: gainsboro;">
    <div style="height: 50px;background: red;width: 50px;"></div>
    <div style="height: 50px;background: yellow;width: 50px;"></div>
    <div style="height: 50px;background: green;width: 50px;"></div>
</div
```

<div style="display: flex;justify-content: flex-start;margin:0 auto;margin-bottom: 10px;width: 200px;height: 200px;background: gainsboro;">
    <div style="height: 50px;background: red;width: 50px;"></div>
    <div style="height: 50px;background: yellow;width: 50px;"></div>
    <div style="height: 50px;background: green;width: 50px;"></div>
</div>

       e. justify-content : flex-end; 右对齐(末尾元素对齐父元素右边)

```bash
<div style="display: flex;justify-content: flex-start;margin-bottom: 10px;width: 200px;height: 200px;background: gainsboro;">
    <div style="height: 50px;background: red;width: 50px;"></div>
    <div style="height: 50px;background: yellow;width: 50px;"></div>
    <div style="height: 50px;background: green;width: 50px;"></div>
</div
```

<div style="display: flex;justify-content: flex-end;margin:0 auto;margin-bottom: 10px;width: 200px;height: 200px;background: gainsboro;">
    <div style="height: 50px;background: red;width: 50px;"></div>
    <div style="height: 50px;background: yellow;width: 50px;"></div>
    <div style="height: 50px;background: green;width: 50px;"></div>
</div>
6. align-items 元素在交叉轴上如何对齐
        a. align-items : center; 交叉轴的中点对齐
```bash
<div style="display: flex;align-items:center;margin-bottom: 10px;width: 200px;height: 200px;background: gainsboro;">
    <div style="height: 50px;background: red;width: 50px;"></div>
    <div style="height: 50px;background: yellow;width: 50px;"></div>
    <div style="height: 50px;background: green;width: 50px;"></div>
</div>
```
<div style="display: flex;align-items:center;margin:0 auto;margin-bottom: 10px;width: 200px;height: 200px;background: gainsboro;">
    <div style="height: 50px;background: red;width: 50px;"></div>
    <div style="height: 50px;background: yellow;width: 50px;"></div>
    <div style="height: 50px;background: green;width: 50px;"></div>
</div>
    
       b. align-items : flex-start; 交叉轴的起点对齐(与justify-content:flex-start;类似)
```bash
<div style="display: flex;align-items:flex-start;margin-bottom: 10px;width: 200px;height: 200px;background: gainsboro;">
    <div style="height: 50px;background: red;width: 50px;"></div>
    <div style="height: 50px;background: yellow;width: 50px;"></div>
    <div style="height: 50px;background: green;width: 50px;"></div>
</div>
```
<div style="display: flex;align-items:flex-start;margin:0 auto;margin-bottom: 10px;width: 200px;height: 200px;background: gainsboro;">
    <div style="height: 50px;background: red;width: 50px;"></div>
    <div style="height: 50px;background: yellow;width: 50px;"></div>
    <div style="height: 50px;background: green;width: 50px;"></div>
</div>
 
       c. align-items : flex-end; 交叉轴的终点对齐
```bash
<div style="display: flex;align-items:flex-end;margin-bottom: 10px;width: 200px;height: 200px;background: gainsboro;">
    <div style="height: 50px;background: red;width: 50px;"></div>
    <div style="height: 50px;background: yellow;width: 50px;"></div>
    <div style="height: 50px;background: green;width: 50px;"></div>
</div>
```
<div style="display: flex;align-items:flex-end;margin:0 auto;margin-bottom: 10px;width: 200px;height: 200px;background: gainsboro;">
    <div style="height: 50px;background: red;width: 50px;"></div>
    <div style="height: 50px;background: yellow;width: 50px;"></div>
    <div style="height: 50px;background: green;width: 50px;"></div>
</div>
 
       d. align-items:baseline; 默认情况下等效于flex-start
           当文本大小不一样时，项目的第一行文字的基线对齐
```bash
<div style="width: 500px;height: 500px;border: 1px solid red;margin: 0 auto;display: flex;align-items: baseline;background: gainsboro;">
    <span style="width: 100px;height: 100px;border: 1px solid #000;font-size: 18px;">文本1</span>
    <span style="width: 100px;height: 100px;border: 1px solid #000;font-size: 20px;">文本2</span>
    <span style="width: 100px;height: 100px;border: 1px solid #000;font-size: 22px;">文本3</span>
    <span style="width: 100px;height: 100px;border: 1px solid #000;font-size: 24px;">文本4</span>
    <span style="width: 100px;height: 100px;border: 1px solid #000;font-size: 26px;">文本5</span>
</div>
```
<div style="width: 200px;height: 200px;border: 1px solid red;margin: 0 auto;display: flex;align-items: baseline;background: gainsboro;">
    <span style="width: 38px;height: 100px;border: 1px solid #000;font-size: 0.4em;">文本1</span>
    <span style="width: 38px;height: 100px;border: 1px solid #000;font-size: 0.6em;">文本2</span>
    <span style="width: 38px;height: 100px;border: 1px solid #000;font-size: 0.8em;">文本3</span>
    <span style="width: 38px;height: 100px;border: 1px solid #000;font-size: 1em;">文本4</span>
    <span style="width: 38px;height: 100px;border: 1px solid #000;font-size: 1.2em;">文本5</span>
</div>
 
       e. align-items:stretch;（缺省）(拉伸)如果项目未设置高度或设为auto，将占满整个容器的高度
```bash
<div style="display: flex;align-items:stretch;margin-bottom: 10px;width: 200px;background: gainsboro;height: 200px;">
    <div style="background: red;width: 50px;"></div>
    <div style="background: yellow;width: 50px;"></div>
    <div style="background: green;width: 50px;"></div>
</div>
```
<div style="display: flex;align-items:stretch;margin:0 auto;margin-bottom: 10px;width: 200px;background: gainsboro;height: 200px;">
    <div style="background: red;width: 50px;"></div>
    <div style="background: yellow;width: 50px;"></div>
    <div style="background: green;width: 50px;"></div>
</div>
7. align-content 多根轴线的对齐方式(如果项目只有一根轴线，该属性不起作用)(配合flex-warp/flex-direction使用)
       - 行与行之间的间距：当父级区域较大的时候，子级有换行，子级之间会有默认的间距
       a. align-content:center; 与交叉轴的中点对齐
           元素被拉伸以适应容器。各行将会伸展以占用剩余的空间。如果剩余的空间是负数，该值等效于'flex-start'。
```bash
<div style="display: flex;align-content: center;flex-wrap: wrap;margin-bottom: 10px;width: 300px;height: 300px;background: gainsboro;">
        <div style="height: 70px;background: red;width: 70px;"></div>
        <div style="height: 70px;background: yellow;width: 70px;"></div>
        <div style="height: 70px;background: green;width: 70px;"></div>
        <div style="height: 70px;background: red;width: 70px;"></div>
        <div style="height: 70px;background: yellow;width: 70px;"></div>
        <div style="height: 70px;background: green;width: 70px;"></div>
</div>
```
<div style="display: flex;align-content: center;flex-wrap: wrap;margin:0 auto;margin-bottom: 10px;width: 200px;height: 200px;background: gainsboro;">
        <div style="height: 50px;background: red;width: 50px;"></div>
        <div style="height: 50px;background: yellow;width: 50px;"></div>
        <div style="height: 50px;background: green;width: 50px;"></div>
        <div style="height: 50px;background: red;width: 50px;"></div>
        <div style="height: 50px;background: yellow;width: 50px;"></div>
        <div style="height: 50px;background: green;width: 50px;"></div>
</div>

       b. align-content:flex-start; 与交叉轴的起点对齐
           元素位于容器的开头。各行向弹性盒容器的起始位置堆叠

```bash
<div style="display: flex;align-content: flex-start;flex-wrap: wrap;margin-bottom: 10px;width: 300px;height: 300px;background: gainsboro;">
        <div style="height: 70px;background: red;width: 70px;"></div>
        <div style="height: 70px;background: yellow;width: 70px;"></div>
        <div style="height: 70px;background: green;width: 70px;"></div>
        <div style="height: 70px;background: red;width: 70px;"></div>
        <div style="height: 70px;background: yellow;width: 70px;"></div>
        <div style="height: 70px;background: green;width: 70px;"></div>
</div>
```

<div style="display: flex;align-content: flex-start;flex-wrap: wrap;margin:0 auto;margin-bottom: 10px;width: 200px;height: 200px;background: gainsboro;">
        <div style="height: 50px;background: red;width: 50px;"></div>
        <div style="height: 50px;background: yellow;width: 50px;"></div>
        <div style="height: 50px;background: green;width: 50px;"></div>
        <div style="height: 50px;background: red;width: 50px;"></div>
        <div style="height: 50px;background: yellow;width: 50px;"></div>
        <div style="height: 50px;background: green;width: 50px;"></div>
</div>

       c. align-content:flex-end; 与交叉轴的终点对齐
           元素位于容器的结尾。各行向弹性盒容器的结尾位置堆叠

```bash
<div style="display: flex;align-content: flex-end;flex-wrap: wrap;margin-bottom: 10px;width: 300px;height: 300px;background: gainsboro;">
        <div style="height: 70px;background: red;width: 70px;"></div>
        <div style="height: 70px;background: yellow;width: 70px;"></div>
        <div style="height: 70px;background: green;width: 70px;"></div>
        <div style="height: 70px;background: red;width: 70px;"></div>
        <div style="height: 70px;background: yellow;width: 70px;"></div>
        <div style="height: 70px;background: green;width: 70px;"></div>
</div>
```

<div style="display: flex;align-content: flex-end;flex-wrap: wrap;margin:0 auto;margin-bottom: 10px;width: 200px;height: 200px;background: gainsboro;">
        <div style="height: 50px;background: red;width: 50px;"></div>
        <div style="height: 50px;background: yellow;width: 50px;"></div>
        <div style="height: 50px;background: green;width: 50px;"></div>
        <div style="height: 50px;background: red;width: 50px;"></div>
        <div style="height: 50px;background: yellow;width: 50px;"></div>
        <div style="height: 50px;background: green;width: 50px;"></div>
</div>

       d. align-content:space-between; 与交叉轴两端对齐，轴线之间的间隔平均分布
           元素位于各行之间留有空白的容器内。各行在弹性盒容器中平均分布。

```bash
<div style="display: flex;flex-direction: row;justify-content: space-between;margin-bottom: 10px;width: 100px;width: 700px;height: 300px;">
    <div style="display: flex;flex-flow:wrap column;align-content: space-between;width: 300px;height: 300px;background: gainsboro;">
        <div style="height: 70px;background: red;width: 70px;"></div>
        <div style="height: 70px;background: yellow;width: 70px;"></div>
        <div style="height: 70px;background: green;width: 70px;"></div>
        <div style="height: 70px;background: red;width: 70px;"></div>
        <div style="height: 70px;background: yellow;width: 70px;"></div>
        <div style="height: 70px;background: green;width: 70px;"></div>
        <div style="height: 70px;background: red;width: 70px;"></div>
        <div style="height: 70px;background: yellow;width: 70px;"></div>
        <div style="height: 70px;background: green;width: 70px;"></div>
        <div style="height: 70px;background: red;width: 70px;"></div>
        <div style="height: 70px;background: yellow;width: 70px;"></div>
        <div style="height: 70px;background: green;width: 70px;"></div>
   </div>
    <div style="display: flex;flex-flow:wrap row;align-content: space-between;width: 300px;height: 300px;background: gainsboro;">
        <div style="height: 70px;background: red;width: 70px;"></div>
        <div style="height: 70px;background: yellow;width: 70px;"></div>
        <div style="height: 70px;background: green;width: 70px;"></div>
        <div style="height: 70px;background: red;width: 70px;"></div>
        <div style="height: 70px;background: yellow;width: 70px;"></div>
        <div style="height: 70px;background: green;width: 70px;"></div>
        <div style="height: 70px;background: red;width: 70px;"></div>
        <div style="height: 70px;background: yellow;width: 70px;"></div>
        <div style="height: 70px;background: green;width: 70px;"></div>
        <div style="height: 70px;background: red;width: 70px;"></div>
        <div style="height: 70px;background: yellow;width: 70px;"></div>
        <div style="height: 70px;background: green;width: 70px;"></div>
   </div>
</div>
```

<div style="display: flex;flex-direction: row;justify-content: space-between;width: 220px;height: 300px;margin: 0 auto;margin-bottom: 10px;">
    <div style="display: flex;flex-flow:wrap column;align-content: space-between;width: 100px;height: 300px;background: gainsboro;">
        <div style="height: 40px;background: red;width:40px;"></div>
        <div style="height: 40px;background: yellow;width: 40px;"></div>
        <div style="height: 40px;background: green;width: 40px;"></div>
        <div style="height: 40px;background: red;width: 40px;"></div>
        <div style="height: 40px;background: yellow;width: 40px;"></div>
        <div style="height: 40px;background: green;width: 40px;"></div>
        <div style="height: 40px;background: red;width: 40px;"></div>
        <div style="height: 40px;background: yellow;width: 40px;"></div>
        <div style="height: 40px;background: green;width: 40px;"></div>
        <div style="height: 40px;background: red;width: 40px;"></div>
        <div style="height: 40px;background: yellow;width: 40px;"></div>
        <div style="height: 40px;background: green;width: 40px;"></div>
   </div>
    <div style="display: flex;flex-flow:wrap row;align-content: space-between;width: 100px;height: 300px;background: gainsboro;">
        <div style="height: 40px;background: red;width:40px;"></div>
        <div style="height: 40px;background: yellow;width: 40px;"></div>
        <div style="height: 40px;background: green;width: 40px;"></div>
        <div style="height: 40px;background: red;width: 40px;"></div>
        <div style="height: 40px;background: yellow;width: 40px;"></div>
        <div style="height: 40px;background: green;width: 40px;"></div>
        <div style="height: 40px;background: red;width: 40px;"></div>
        <div style="height: 40px;background: yellow;width: 40px;"></div>
        <div style="height: 40px;background: green;width: 40px;"></div>
        <div style="height: 40px;background: red;width: 40px;"></div>
        <div style="height: 40px;background: yellow;width: 40px;"></div>
        <div style="height: 40px;background: green;width: 40px;"></div>
   </div>
</div>

       e. align-content:space-around; 每根轴线两侧的间隔都相等。所以，轴线之间的间隔比轴线与边框的间隔大一倍

```bash
<div style="display: flex;align-content: space-around;flex-wrap: wrap;margin-bottom: 10px;width: 100px;height: 300px;background: gainsboro;">
        <div style="height: 70px;background: red;width: 70px;"></div>
        <div style="height: 70px;background: yellow;width: 70px;"></div>
        <div style="height: 70px;background: green;width: 70px;"></div>
</div>
```

<div style="display: flex;align-content: space-around;flex-wrap: wrap;margin:0 auto;margin-bottom: 10px;width: 100px;height: 300px;background: gainsboro;">
        <div style="height: 70px;background: red;width: 70px;"></div>
        <div style="height: 70px;background: yellow;width: 70px;"></div>
        <div style="height: 70px;background: green;width: 70px;"></div>
</div>

       f. align-content:stretch; 元素位于容器的中心。各行向弹性盒容器的中间位置堆叠

```bash
<div style="display: flex;align-content: stretch;flex-wrap: wrap;margin:0 auto;margin-bottom: 10px;width: 100px;height: 300px;background: gainsboro;">
        <div style="height: 70px;background: red;width: 70px;"></div>
        <div style="height: 70px;background: yellow;width: 70px;"></div>
        <div style="height: 70px;background: green;width: 70px;"></div>
</div>
```

<div style="display: flex;align-content: stretch;flex-wrap: wrap;margin-bottom: 10px;width: 100px;height: 300px;background: gainsboro;">
        <div style="height: 70px;background: red;width: 70px;"></div>
        <div style="height: 70px;background: yellow;width: 70px;"></div>
        <div style="height: 70px;background: green;width: 70px;"></div>
</div>
8. align-self 控制单个元素在侧轴上的对齐方式
         a. 加在子级元素上的属性，控制单个元素的位置
         b. auto(缺省) 元素继承了父级元素的对齐方式，如果父级没有对齐属性，默认为拉伸
         c. stretch 拉伸(子元素宽高不能设置)
         d. flex-start 开始位置
         e. flex-end 结束位置
         f. center 居中
9. align-items与align-self、align-content与align-items的区别
        a. align-items可以控制弹性容器中成员在当前行内的对齐方式。当成员设置了align-self 属性时，父容器的 align-items 值则不再对它生效
        b. align-content的作用对象是多行弹性盒子容器
             当弹性容器在侧轴(交叉轴)方向还存在空白时，可以控制所有行的对齐方式
             无法作用于单行弹性盒子
        c. align-items 的设置对象是行内成员
            align-content 的设置对象是所有行，且只有在多行弹性盒子容器中才生效
        d. align-items 的上下文是行内，align-content 的上下文是弹性盒子容器
            align-items 控制成员的对齐行为，align-content 控制所有行的对齐行为
        e. 仿w3c标准align-items于align-content的区别

10. order (类似于 z-index 层级 优先级) a. number 属性值越大，优先级越高，越往后排列 b. 越往后排列优先级越高
11. flex(flex-grow/flex-shrink/flex-basis) - 让所有弹性盒模型对象的子元素都有相同的长度，且忽略它们内部的内容 a. flex-grow(0/1(自动分配) number) flex-grow 定义项目的放大比例，默认为 0，即如果存在剩余空间，也不放大 规定项目 --> 当前元素 灵活的项目 --> 其他元素 当前元素相对于其他元素来说，可以设置更多的样式 number 为 2 时，表示当前元素占剩下的空间的两份(占满空间)(比如 1000-500(已占空间) = 500(剩余空间)/n(n=元素数+1)) b. flex-shrink flex-shrink 定义了项目的缩小比例，默认为 1，即如果空间不足，该项目将缩小 1 表示正常缩放 0 表示不缩放 c. flex-basis 项目在主轴上留下的空间 flex-basis 给上面两个属性分配多余空间之前, 计算项目是否有多余空间, 默认值为 auto, 即项目本身的大小 auto 正常显示 0% 根据元素自身宽高决定 d. 以上三个属性可以设置为: flex 1 (flex-grow:1 自动分配 flex-shrink:1 正常缩放 flex-basis:0% 根据元素自身宽高决定) (缺省)flex:0 1 auto 不进行放大 正常缩放 空间大小由当前元素决定 flex:auto(自动进行分配空间(前提条件要有子级))/none
12. css 多列 a. column-count 规定当前元素被分为多少列 b. column-gap 规定列之间的间隔大小 c. column-rule 设置或检索对象的列与列之间的边框 样式类似于(border) d. column-fill 设置或检索对象所有列的高度是否统一 auto：列表高度自适应 balance：所有列的高度以其中最高的一列统一 e. column-span 设置或检索对象元素是否跨越所有列(针对于标题) none：不跨列 all：横跨所有列 f. column-width 表示当前列数的宽度 与 column-count 冲突 g. columns 复合属性(column-width || column-count) 设置或检索对象的列数和每列的宽度
13. flex-flow == flex-direction + flex-wrap a. 默认值为 row nowrap
<div style="display: flex;flex-flow: row wrap;margin-bottom: 10px;width: 200px;height: 300px;background: gainsboro;">
        <div style="height: 70px;background: red;width: 70px;"></div>
        <div style="height: 70px;background: yellow;width: 70px;"></div>
        <div style="height: 70px;background: green;width: 70px;"></div>
    </div>
14. display:none、overflow:hidden、visibility:hidden 的区别 a. display:none 不占网页中的任何空间，让这个元素消失，该 html 结构被删除(看不见也摸不到) b. overflow:hidden 超出的元素隐藏，多余的部分被修剪掉(隐藏)(部分看得见部分看不见) c. visibility:hidden 该层被隐藏，但是该结构还存在于 html 结构中(看得见摸不着)

```bash
/* 部分隐藏情况拓展 */

{ display: none; /* 不占据空间，无法点击 */ }

{ visibility: hidden; /* 占据空间，无法点击 */ }

{ height: 0; overflow: hidden; /* 不占据空间，无法点击 */ }

{ position: absolute; top: -999em; /* 不占据空间，无法点击 */ }

{ position: relative; top: -999em; /* 占据空间，无法点击 */ }

{ position: absolute; visibility: hidden; /* 不占据空间，无法点击 */ }

{ opacity: 0; filter:Alpha(opacity=0); /* 占据空间，可以点击 */ }

{ position: absolute; opacity: 0; filter:Alpha(opacity=0); /* 不占据空间，可以点击 */ }


```

---

#### inline、inline-block、block 的区别

1. block a. 每个块级元素都从新的一行开始，并且其后的元素也另起一行(一个块级元素独占一行) b. 元素的高度、宽度、行高以及顶和底边距都可设置。 c. 元素宽度在不设置的情况下，是它本身父容器的 100%（和父元素的宽度一致），除非设定一个宽度。
2. inline 内联元素特点： a. 和其他元素都在一行上 b. 元素的高度、宽度及顶部和底部边距不可设置 c. 元素的宽度就是它包含的文字或图片的宽度，不可改变
3. inline-block 内联块状元素 就是同时具备内联元素、块状元素的特点。 元素特点： a. 和其他元素都在一行上 b. 元素的高度、宽度、行高以及顶和底边距都可设置

---

#### 网格布局 grid

1. display:grid
2. 形成网格布局后，高度会变化
3. 网格布局单元格的宽高设置 a. grid-template-columns 列数/宽度 b. grid-template-rows 行数/高度 c. 属性值: px 像素 % 百分比 auto 自动 上述可以混用 fr 单位(fraction:少量-css 中常用来表示自适应的单位，一系列的长度控件进行自动分配) d. 有几行几列就写几个宽高
4. 划分网格区域 - 父级 a. grid-template-ares b. 需要和当前项目子级相对应
5. 划分网格区域(单元格的选择区域) - 子级 a. grid-area b. 和父级容器相对应

```bash
"a1 a2 a3" 1fr
"a4 a5 a6" 1fr
"a7 a8 a9" 1fr
/ 1fr 1fr 1fr
<!-- 分别表示竖向与横向的宽高与单元格大小 -->
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title></title>
	</head>
	<style type="text/css">
		.box{
			width: 300px;
			height: 500px;
			display: grid;
			grid-template-columns: 1fr 2fr 1fr;
			grid-template-rows: 1fr 5fr 1fr;
			grid-template-areas:
			"header header header"
			"left main right"
			"footer footer footer"
			;
			border: 1px solid black;
		}
		.header{
			grid-area: header;
			background-color: pink;
		}
		.left{
			grid-area: left;
			background-color: red;
		}
		.main{
			grid-area: main;
			background-color: green;
		}
		.right{
			grid-area: right;
			background-color: blue;
		}
		.footer{
			grid-area: footer;
			background-color: gainsboro;
		}
	</style>
	<body>
		<div class="box">
			<div class="header"></div><div class="header"></div><div class="header"></div>
			<div class="left"></div><div class="main"></div><div class="right"></div>
			<div class="footer"></div><div class="footer"></div><div class="footer"></div>
		</div>
	</body>
</html>
```

7. 水平与垂直方向的对齐方式 a. justify-item 水品方向 b. align-item 垂直方向 c. 水平垂直方向会影响当前单元格的宽高 d. 当前内容宽高由自身元素决定 e. 属性值：start end center streth
8. place-items a. 设置水平与垂直方向的对齐方式 b. 格式：palce-items：x y; c. 与设置水平与垂直方向的对齐方式相反 d. place-items: streth end; = justify-items:end;align-items:streth;
9. 水平与垂直方向的分布设置 a. juctify-content 水平 b. align-content c. 属性值 start  
   end center streth(缺省拉伸) space-between space-around space-evenly 剩余空白部分进行平分
10. place-content(加在父元素上) a. 设置水平与垂直方向的分布方式 b. 格式：palce-content：x y; c. 与设置水平与垂直方向的对齐方式相反 d. place-content: streth end; = justify-content:start;align-content:center;
11. grid-gap a. grid-column-gap 列间距 水平方向 b. grid-row-gap 行间距 垂直方向 c. grid-gap: 行间距 列间距;
12. 项目在行和列上的起始位置与结束位置的属性 a. grip-column-start 在列上的左边框 b. grip-column-end 在列上的右边框 c. grip-row-start 在行上的上边框 d. grip-row-end 在行上的下边框 e. 数字 所在的第几个边框即可 f. grip-column / grip-row:start/end;3/4;
13. 控制子项的对齐方式 justify-self / align-self a. 水平方向单个元素的对齐方式 start end streth center b. 垂直方向单个元素的对齐方式

---

## 定位与锚点

---

### 定位 postion

---

1. CSS 文档流(定位机制) 普通流 浮动流 定位流
2. 条件 a. 元素 b. 参照物 c. 方向
3. 步骤 a. 给某元素添加定位属性 b. 确定一个参照物 c. 调整方向 left/right/top/bottom
4. 属性值 a. static(缺省)：正常显示，始终处于文档流给与的位置(忽略方向属性) b. absolute(绝对定位)：生成绝对定位的元素，相对于 static 定位(默认情况)以外的第一个父元素进行定位 如果此元素不存在设置 postion 的父元素，那么会根据 body 为定位对象，按照浏览器窗口进行定位 脱离文档流，初始位置不存在，会破坏正常的布局 c. relative(相对定位)：生成相对定位的元素，相对于其正常位置进行定位 不会破坏正常的布局，占据空间，不会脱离文档流 存在初始位置 d. fixed(固定定位)：生成绝对定位的元素，它基于 body 为定位对象 不存在初始位置，脱离文档流 按照浏览器窗口进行定位，滚动条对其无效 e. inherit(继承)：规定从父元素继承 postion 属性的值 f. sticky(粘性布局)：fixed 和 relative 的结合/使用较少
5. 定位元素层次关系 z-index a. 检索或设置对象的层叠关系 b. auto：默认值 c. 无单位的整数值。可为负数 d. 没有设置该属性时，最先写的对象优先显示在上层 e. 数值越大，层越靠上 f. 必须设置定位属性 z-index 才能生效
6. 补充 a. 在子元素设置绝对定位后，如果父级设置了 padding、margin、border 那么子元素的布局会忽略 padding，但不会忽略 margin、border 将会从 padding 开始的地方进行定位(padding 的左上角) b. 在父元素设置相对定位后，子元素一设置了绝对定位 子元素一会溢出正常的文档流，它会浮动起来 子元素二将占据子元素一的位置 c. 相对定位基于本身的位置进行移动，相对于本身进行定位 偏移量基于对象的 margin 的左上侧 d. fixed 定位常用于网页中广告效果、网页右侧返回顶部布局效果 e. absolute 和 relative 可以实现图片与文字重叠、文字在图片的任意位置 f. fixed：脱离文档流，破坏布局，会盖住其他元素，不占据位置 sticky：不脱离文档流，不会盖住其他元素，相对于自身，占据位置 当元素在屏幕内，表现为 relative 当要滚出屏幕时，表现为 fixed

---

## 宽高自适应

---

1. 宽度自适应 a. 元素宽度设置为 100%(块元素缺省为宽度 100%) b. 不设置宽度(宽度是父元素的宽度)
2. 高度自适应 a. 高度设置为 auto 或不进行设置(此情况下子元素会撑开父元素高度) b. html,body{height:100%}，设置子元素的高度跟随父元素的高度变化而变化，那么父元素必须有高度 c. 子级元素自适应父级：html,body{width:100%;height:100%;}，html 占满全屏浏览器，子级就可以设置百分比 d. 最小高度 min-height 可以设置固定的值 当元素变多时可以撑开当前容器的高度 常用于新闻、点击加载更多 问题：只能在高版本浏览器中使用 e. 最大高度 max-heigh f. 最大宽度 max-width g. 最小宽度 min-width

---

## BFC

---

1. 概念 a. 块级格式化上下文，仅针对块元素 b. 独立的渲染区域，与外面的布局没有任何关系!!! c. 一个概念，不是实际的属性
2. 布局规则(以把 html 看成 bfc 盒子为例) a. 内部的 box(块级盒子)会在垂直方向，一个一个放置 b. box 垂直方向的距离由 margin 决定，属于同一个 BFC 的两个相邻 Box 的 margin 会发生重叠（按照最大 margin 值设置） c. 每个元素的 margin box 的左边， 与包含块(父级盒子)border box 的左边相接触 d. BFC 的区域不会与 float box 重叠 由 display:flex;与 overflow:hidden 触发的 bfc 盒子不会与 float box 发生重叠 e. BFC 就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素 f. 计算 BFC 的高度时，浮动元素也参与计算 g. 父级没有高度，子级元素含有浮动 子级元素在一行显示，浮动 初始位置不存在了，漂浮在浏览器的上方 - 浮动层(不可见) 父级高度由子级元素撑开
3. 触发 BFC 的元素 a. 根元素(html) b. float 属性不为 none c. position 为 absolute 或 fixed d. display 为 inline-block, table-cell, table-caption, flex, inline-flex e. overflow 不为 visible
4. BFC 与浮动的问题 a. 先浮动与后浮动对 BFC 盒子有影响 b. 在三栏布局中，会出现以下情况 c. 实现中间盒子变化，左右盒子宽度限制的情况中 d. 在给左右盒子浮动后，中间实现 BFC 盒子，会出现左右浮动盒子相邻 e. BFC 盒子与浮动盒子重叠的情况 g. 避免此种情况的发生，应设置浮动盒子与 BFC 盒子的顺序问题 加载顺序的问题，应先浮动，再加载 BFC 盒子

```bash
<style>
	html,body{
		width: 100%;
		height: 100%;
	}
	.box1{
		width: 200px;
		height: 100%;
		background: red;
		float: left;
	}
	.box2{
		width: 200px;
		height: 100%;
		background: blue;
		float: right;
	}
	.box3{
		height: 100%;
		background: yellow;
		display: flex;
	}
	</style>
</head>
<body>
	<div class="box1"></div>
	<div class="box2"></div>
	<div class="box3"></div>
</body>
```

5. BFC 的应用 a. 自适应两栏布局 b. 清除内部浮动 c. 防止 margin 上下重叠

---

## 智能表单

---

1. 一定要在 form 表单框里使用
2. Type="email" 使用较多 限制用户必须输入 email 类型 需要提交按钮，定义在 form 里面 只能验证格式是否正确，不能确认输入框中文本是否正确

```
<form>
   <input type="email">
   <input type="submit">
</form>
```

<form>
   <input type="email">
   <input type="submit">
</form>
3. Type="number" 
        限制用户必须输入数字类型
        数字可正可负
```
<form>
    <input type="number">
   <input type="submit">
</form>
```
<form>
   <input type="number">
   <input type="submit">
</form>
4. Type="url"
        限制用户必须输入url类型
        网址前需接协议
```
<form>
    <input type="url">
   <input type="submit">
</form>
```
<form>
   <input type="url">
   <input type="submit">
</form>
5. Type=“range"
        产生一个滑动条表单
        用于滑动验证、音量条
```
<form>
   <input type="range">
   <input type="submit">
</form>
```
<form>
   <input type="range">
   <input type="submit">
</form>
6. Type=“search"
        产生一个搜索意义的表单
        自带清除的功能
```
<form>
    <input type="search">
   <input type="submit">
</form>
```
<form>
   <input type="search">
   <input type="submit">
</form>
7. Type=“color"
        产生一个颜色选择的表单
        类似于ps拾色器
```
<form>
    <input type="color">
   <input type="submit">
</form>
```
<form>
   <input type="color">
   <input type="submit">
</form>
8. Type=“time"
        限制用户必须输入时间类型
        获取当前时分(可能不准确)
```
<form>
    <input type="time">
   <input type="submit">
</form>
```
<form>
   <input type="time">
   <input type="submit">
</form>
9. Type=“date"
        限制用户必须输入日期类型
        获取当前日期/年月日(可能不准确)
```
<form>
    <input type="date">
   <input type="submit">
</form>
```
<form>
   <input type="date">
   <input type="submit">
</form>
10. Type=“month"
        限制用户必须输入月类型
        获取当前月份/年月(可能不准确)
```
<form>
   <input type="month">
   <input type="submit">
</form>
```
<form>
   <input type="month">
   <input type="submit">
</form>
11. Type=“week"
        限制用户必须输入周类型
        获取当前周数/年周(可能不准确)
```
<form>
   <input type="week">
   <input type="submit">
</form>
```
<form>
   <input type="week">
   <input type="submit">
</form>
12. Type=“datetime-local"
        选取当地时间(年/月/日/时/分)
```
<form>
   <input type="datetime-local">
   <input type="submit">
</form>
```
<form>
   <input type="datetime-local">
   <input type="submit">
</form>
13. 属性
        required 强制的让当前选项进行验证，必须要有符合格式规范的文本
        max 最大
        min 最小
        step 步幅，间隔
        ::-webkit-input placeholder 设置浏览器placeholder样式
        autofocus 给加上该属性的控件或者文本框加上聚焦效果，当打开页面时，该控件自动获得聚焦效果
                         一个页面只能存在一个
        autocomplete  当用户输入过一次就存在历史记录，下次可以单击选择记录
                          必须要有submit按钮以及被包裹在form标签内
                          默认值为off，关闭状态
                          设置为on，即为打开状态
                          设置一个name属性
        nobalidate 取消验证，通常情况加在form上
        Multiple = type="type" 不过可以提交多个文件
        pattern  正则表达式，进行验证(用在登录注册验证页面)
        datalist 模拟选项列表
```bash
<input type="text" list="box">
    <datalist id="box">
        <option value="http://www.baidu.com">百度</option>
        <option value="www.uc123.com">uc</option>
        <option value="www.hao123.com">好123</option>
        <option value="www.4399.com">小游戏</option>
        <option value="www.7k7k.com">大游戏</option>
    </datalist>
```
<input type="text" list="box">
    <datalist id="box">
        <option value="http://www.baidu.com">百度</option>
        <option value="www.uc123.com">uc</option>
        <option value="www.hao123.com">好123</option>
        <option value="www.4399.com">小游戏</option>
        <option value="www.7k7k.com">大游戏</option>
    </datalist>
```bash
<select name="" id="">
        <option value="http://www.baidu.com">百度</option>
        <option value="www.uc123.com">uc</option>
        <option value="www.hao123.com">好123</option>
        <option value="www.4399.com">小游戏</option>
        <option value="www.7k7k.com">大游戏</option>
</select>
```
<select name="" id="">
        <option value="http://www.baidu.com">百度</option>
        <option value="www.uc123.com">uc</option>
        <option value="www.hao123.com">好123</option>
        <option value="www.4399.com">小游戏</option>
        <option value="www.7k7k.com">大游戏</option>
</select>
```bash
<form>
   <input type="number" max=10 min=1 step=2>
   <input type="submit">
</form>
```
<form>
   <input type="number" max=10 min=1 step=2>
   <input type="submit">
</form>
14. 小型计算器
```bash
<form action="" oninput="c.value=parseInt(a.value)+parseInt(b.value)">
	<input type="number" id="a" />
		+
	<input type="range" id="b" max="200" min="0" />
		=
	<output  name="c"></output>
</form>
```
<form action="" oninput="c.value=parseInt(a.value)+parseInt(b.value)">
	<input type="number" id="a" />
		+
	<input type="range" id="b" max="200" min="0" />
		=
	<output  name="c"></output>
</form>
---
## 媒体查询
---
1. 根据设备显示器的特性(视口宽度、屏幕比例、设备方向:横向或纵向)
2. 只是一个工具，不属于一个属性，通过选择设备的不同的特性为其设置css样式
3. 使用方法
           a. @media 设备类型 关键字 (判断的条件){css语法}
           b. 设备类型 用户常用的设备 screen all
           c. 关键字 and only not
           d. 判断的条件 宽高、横竖屏 max-width/min-width
           e. {css语法} css声明 div{width:300px} body{backgroud:rgb(125,125,125)}
           f. 被抛弃的css2 媒体查询下法 <link rel="stylesheet" href="css.css" media="all and (pc端的条件)">
              <link rel="stylesheet" href="css2.css" media="all and (手机端的条件)">
4. 注意的点
           a. 习惯性地放在最下方(权重问题，书写在内部样式表的属性，下方的会覆盖上方的(改变相同样式))
           b. 书写媒体查询，之间要有空格
           c. 多个判断条件后面加and进行连接
5. 媒体查询
           a. 适配图
![SP](SP.PNG)

```html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title></title>
	</head>
	<style type="text/css">
                /* 改变当前浏览器窗口颜色，0-500px时为红色，501px-700px时绿色，701px以上时是蓝色 */
		body{
			background: black;
		}
		@media all and (max-width:500px) {
			body{
				background: red;
			}
		}
		@media all and (min-width:501px) and (max-width:700px) {
			body{
				background: green;
			}
		}
		@media all and (min-width:701px) {
			body{
				background: blue;
			}
		}
	</style>
	<body>
</html>
```

```bash
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title></title>
	</head>
	<style type="text/css">
                 /* 当浏览器窗口变大时，包裹图片的div盒子变小  */
	      section{
			  width: 720px;
			  height: auto;
			  margin: 100px auto;
			  display: flex;
			  flex-wrap: wrap;
		  }
		  div{
			  width: 25%;
		  }
		  img{
			  width: 100%;
			  display: block
		  }
		  @media all and (min-width: 180px){
			  div{
				  width: 100%;
			  }
		  }
		  @media all and (min-width: 360px){
			  div{
				  width: 50%;
			  }
		  }
		  @media all and (min-width: 540px){
			  div{
				  width: 25%;
			  }
		  }
	</style>
	<body>
		<section>
			<section>
				<div><img src="img_all/test/kk(1).gif" alt=""></div>
				<div><img src="img_all/test/kk(1).gif" alt=""></div>
				<div><img src="img_all/test/kk(1).gif" alt=""></div>
				<div><img src="img_all/test/kk(1).gif" alt=""></div>
				<div><img src="img_all/test/kk(1).gif" alt=""></div>
				<div><img src="img_all/test/kk(1).gif" alt=""></div>
				<div><img src="img_all/test/kk(1).gif" alt=""></div>
				<div><img src="img_all/test/kk(1).gif" alt=""></div>
				<div><img src="img_all/test/kk(1).gif" alt=""></div>
				<div><img src="img_all/test/kk(1).gif" alt=""></div>
				<div><img src="img_all/test/kk(1).gif" alt=""></div>
				<div><img src="img_all/test/kk(1).gif" alt=""></div>
			</section>
		</section>
	</body>
</html>
```

---

## 响应式布局

---

1. 特点 a. 面对不同分辨率设备灵活性强 b. 能够快捷解决多设备显示适应问题 c. 一次设计，普遍适用
2. 缺点 a. 代码累赘，加载时间加长 b. 工作量大 c. 折中性质的解决方案

---

### 流式布局

---

1. 如果用百分比写 width，那么指的是父元素 width 的百分之多少。
2. 如果用百分比写 height，那么指的是父元素 height 的百分之多少。
3. 如果用百分比写 padding，那么指的是父元素 width 的百分之多少，无论是水平的 padding 还是竖直的 padding。
4. 如果用百分比写 margin，那么指的是父元素 width 的百分之多少，无论是水平的 margin 还是竖直的 margin。
5. 不能用百分比写 border 的宽度
6. 案例

```bash
	<div style="width: 300px;height: 200px;margin: 100px auto;background-color: pink;display: flex;justify-content: center;align-items: center;">
		<p style="width: 50%;height: 50%;padding: 10%;background-color: palegreen;margin:0;"></p>
	</div>
```

<div style="width: 300px;height: 200px;margin: 100px auto;background-color: pink;display: flex;justify-content: center;align-items: center;">
	<p style="width: 50%;height: 50%;padding: 10%;background-color: palegreen;margin:0;"></p>
</div>
---
### 适配方案
---
1. 单位
         a. vh/vw/vmax/vmin
         b. 视口高度/视口宽度/
         c. vw 表示当前视口的宽度/可视窗口，1vw=1%的视口，100vw=100%
         d. 在移动端滚动条不占位置，在pc端里面滚动条是占位置的，所以100vw不一定=100%
         e. 640px --> font-size:31.25vw / 750px --> font-size:26.67vw
2. rem+媒体查询
         a. 优点：好理解
         b. 缺点：媒体查询需要写多个适配容器，得出的rem有小数点，真机测试有偏差
3. vw+rem
         a. 改进rem
         b. html{font-size:100px;}
         c. 1vw=1%
4. flexible
         a. 针对750px设计图设计
         b. 删除当前视口标签
         c. 引入flexible.js  生成自定义的dpr
         d. 物理像素/100=逻辑像素(针对flexible)
---
## 其他技术
---
1. 内核
         a. 谷歌浏览器 webkit/bink(尚未被谷歌应用)
         b. 火狐浏览器 Gecko
         c. opera bink/presto(前内核，已被废弃)
         d. safari webkit
2. css bug
         a. 将浮动元素设置边距位置的时候，在低版本浏览器，会出现边距加倍显示的错误
             css hack：给当前元素添加：dispay:inline
         b. 最小高度的问题：在低版本浏览器上，默认解析的最小高度是16px左右(html的字体font-size默认为16px)
             css hack：给元素添加font-size:0px
             给元素添加overflow:hidden
         c. 表单控件无法对齐的问题
             css bug：当有多个表单控件设置样式时，在任意浏览器上，都无法对齐，之间有间距
             css hack：让表单控件之间没有换行或空格符号
         d. css bug：设置导航的时候，列表+a标签，为了用户体验，尽量将所有的样式都设置在a标签上,在低版本浏览器上会出现阶梯bug
             css hack：给li也设置浮动即可
         e. css bug:在高版本浏览器设置透明方式(opacity),在低版本浏览器中无法解析
             css hack: filter:alpha(opacity=value) 1-100
             ie5 无法拖动/ie6/7 没有反应/ie8里进行测试
         f. css bug:在低版本浏览器中，50% + 50% > 100%  
            css hack:清除浮动元素的空间
3. 指针 cursor
          a. auto 默认样式
          b. text：文本输入框的样式
          c. pointer：鼠标变为小手
4. 可输入状态(contenteditable)
          a. 可应用到div上，使其变为可输入状态
          b. 属性值：true、flase
---
### 图片整合技术
1. css sprites
          a. 精灵图、雪碧图、图片整合、背景定位
          b. 原理：background-position
          c. 属性值：x left/center/right | y top/center/bottom
2. 优点
          a. CSS Sprites能很好地减少网页的http请求，从而大大的提高页面的性能，这是CSS Sprites最大的优点
          b. 将所有的图标集合到一张大图上，图片的体积变小，所占内存变小
3. 整合
          a. png-8
