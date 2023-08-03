---
title: 层叠样式表
date: 2020-06-10 14:28:30
categories: WEB
tags:
  - 前端
  - css
  - 三贱客
description:
---

<!-- more -->

# CSS

---

## CSS 选择器/选择符

---

1. 标签选择器

- 如 html 标签、div、p、a、img、对象

```css
div {
  width: 100px;
  height: 50px;
}
```

2. id 选择器

- 在标签上添加属性 id，在样式表内 _#属性名称_。作用：用来在网页中做外围布局，具有唯一性

```css
#box {
  width: 100px;
  height: 50px;
}
```

3. class 选择器

- 表示一个类

```css
.box {
  width: 100px;
  height: 50px;
}
```

4. 群组选择器

```css
div,
p,
html {
  /*  */
}
#id,
.class,
p {
  /*  */
}
```

5. 包含选择器

- 书写方式为：**`父级选择器 子级选择器`**

```css
ul li {
  /*  */
}
div li {
  /*  */
}
```

6. 通配符

- 表示选中所有标签，并添加一定的属性

```css
   *{margin:0;padding:0;}：清除浏览器默认间距
```

7. 伪类选择器

- _a:link {color:red;}_：未访问的链接状态
- _a:visited {color:green}_：已访问的链接状态
- _a:hover {color:blue}_：鼠标停留状态，只能改变子类或自身的状态，不能修改父类的状态
- _a:active {color:pink}_：鼠标按下去的状态

```css
a {
  color: black;
}
a:hover {
  color: red;
  text-decoration: none;
}
```

```css
/* 设置鼠标滑过父级影响子级内容 */
div:hover p {
  bgcolor: red;
}
```

8. 权重

- css 层叠指的是样式的优先级，当发生冲突时以优先级高的为主。权重使用四位数字表示

| -               | 权重                     |
| --------------- | ------------------------ |
| 内联样式表 1000 |
| id              | 0100                     |
| class           | 0010                     |
| 标签            | 0001                     |
| 群组            | 单独计算权重             |
| 包含            | 权重相加                 |
| 伪类            | 0010                     |
| !important      | 权重最高，在属性值后添加 |

---

## 伪元素选择器

---

1. ::after

- _::after{content:''}_。在定义的 class 类后面书写，content 的内容可写可不写

```css
div::after {
  content: '这是后面的内容';
}
```

2. ::before

- _::before{content:''}_。在定义的 class 类前面，content 的内容可写可不写。与::after 的共同点：用伪对象选择器添加的文本，鼠标无法选中

3. ::first-letter

- 定义第一个字样的样式

4. ::first-line

- 定义第一行的样式

5. 区分

- 伪类：:hover :link :active :visited。伪对象：::after ::before
- 写法：伪类一个冒号，伪元素两个
- 伪类只能给当前元素添加 css 样式、改变元素的样式；伪对象可以改变元素的样式还可以添加 html 结构

---

## 文本属性

---

1. 文本行高 line-height

- _ling-height > height_：文本靠下
- _ling-height = height_：文本居中
- _ling-height < height_ ：文本靠上

```html
<div style="display:flex;justify-content:center;text-align:center;margin-bottom:10px;">
  <div style="width: 100px;height: 100px;background: red;line-height: 120px;">文本靠下</div>
  <div style="width: 100px;height: 100px;background: yellow;line-height: 100px;">文本居中</div>
  <div style="width: 100px;height: 100px;background: green;line-height: 80px;">文本靠上</div>
</div>
```

2. 文本颜色 color/font-color

- 英文单词 red yellow black 等、十六进制 #开头 六位数字或字母组合
- rgb(0-255,0-255,0-255) 三原色
- rgba(0-255,0-255,0-255,0-255,0-1) 三原色的颜色深浅变化
- rgba(只会改变当前颜色) = rgb+opacity:(0-1)(整体都会产生变化)

3. 文本对齐方式 text-align

| 对齐方式 | 描述     |
| -------- | -------- |
| left     | 靠左对齐 |
| center   | 居中对齐 |
| right    | 靠右对齐 |
| justify  | 两端对齐 |

4. 文本对齐方式 vertical-align

- top middle bottom 不针对文字，针对于图片

5. 文本修饰属性 text-decortion

| 属性值       | 描述                                  |
| ------------ | ------------------------------------- |
| none         | 无/没有 针对 a，清除 a 标签的默认样式 |
| overline     | 添加上划线                            |
| underline    | 添加下划线                            |
| line-through | 添加删除线                            |

6. 首行缩进 text-indent

- 数值，可为负值，只针对第一行文本。可使文字超出浏览器，达到不可见的效果(设置为负值)

7. 字间距 letter-spacing

- 控制英文字母或汉字的间距。_word-spacing_：控制英文单词间距

8. 文本大小 font-size

| 单位                                                   | 描述                          |
| ------------------------------------------------------ | ----------------------------- |
| px                                                     | 像素                          |
| em                                                     | 相对于父级计算的单位 首行缩进 |
| pt                                                     | 磅 硬件设备上 打印机          |
| rem？相对于根 html，只在移动端使用，根据 html 进行设置 |

9. 文本拓展 a. dpi 安卓手机 b. ppi 苹果手机 c. dpr 设备像素比 = 设备像素(物理像素)/逻辑像素(css 样式) 设计图宽度为 640px 时，dpr 考虑为 2 设计图宽度为 750px 时，dpr 考虑为 2 设计图宽度为 1080px 时，dpr 考虑为 3 逻辑像素 = 设备像素/dpr = rem\*font-size(html 根元素默认) rem = 逻辑像素/font-size
10. 字体类型 font-family a. 中文、英文、数字 b. 浏览器默认字体是微软雅黑，操作系统中文是宋体/新宋体，英文是 arial c. 当属性值为英文的时候，如果属性值只有一个可以不加引号，有多个需要加引号 d. 属性值为中文的时候，需要加引号
11. 文本倾斜 font-style a. normal 正常(i/em) b. italic 斜体 c. oblique 倾斜的字体
<div style="display:flex;justify-content:center;text-align:center;margin-bottom:10px;">
   <div style="width: 100px;height: 100px;background: red;line-height: 100px;font-style:normal;">正常文本</div>
   <div style="width: 100px;height: 100px;background: yellow;line-height: 100px;font-style:italic;">斜体文本</div>
   <div style="width: 100px;height: 100px;background: green;line-height: 100px;font-style:oblique;">倾斜的文本</div>
</div>

- 拓展 前端代码从左到右为正值，从上到下为正值，反之为负值

---

### 列表属性

---

1. 设置列表符号 list-style-type a. dist 实心圆 b. circle 空心圆 c. square 实心方块 d. none 无符号
2. 使用图片作为符号 list-style-image 加图片路径作为列表的符号
3. 定义列表符号位置 list-style-position a. inside 设置符号在列表项里面 b. outside 设置符号在列表项外面
4. 清除列表默认符号样式 list-style none 清除样式

- 拓展 列表符号样式存在兼容问题，一般只在主流浏览器上能使用，版本过低可能无法实现

---

### 盒模型

---

1. 边框属性 border a. border-color 边框颜色 b. border-style 边框样式 solid 实线 dashed 虚线 dotted 点线 double 双实线 c. border-width 边框的宽度 d. border: border-width border-style border-color; 分别设置以上属性 e. border-"top/left/bottom/right" 设置某一边边框的属性

```bash
<div class="" style="display: flex;justify-content: center;align-items: middle;">
   <div style="width: 60px;height: 60px;background: black;border: 3px solid red;"></div>
</div>
```

<div class="" style="display: flex;justify-content: center;align-items: middle;">
   <div style="width: 60px;height: 60px;background: black;border: 3px solid red;"></div>
</div>
- 拓展 边框实现三角形
        a. 利用边框线相切的特点
        b. 其实在块元素长宽为0时，边框是以四个三角形的方式相切的
```bash
<div class="" style="display: flex;justify-content: center;align-items: middle;">
   <div style="width: 0px;height: 0px;border: 60px solid black;border-color: green red blue black;"></div>
</div>
```
<div class="" style="display: flex;justify-content: center;align-items: middle;">
   <div style="width: 0px;height: 0px;border: 60px solid black;border-color: green red blue black;"></div>
</div>
<div style="width:100%;height:20px;"></div>

         注意: 在块元素中，width: 0 != width==none，当width不写时，块元素会占满整个屏幕，即自适应

```bash
<div class="" style="display: flex;justify-content: center;align-items: middle;">
  <div style="width: 0px;height: 50px;border: 60px solid white;border-top-color: green;"></div>
</div>
```

<div class="" style="display: flex;justify-content: center;align-items: middle;">
  <div style="width: 0px;height: 0px;border: 60px solid white;border-top-color: green;"></div>
</div>

         圆形扇区

```bash
<div class="" style="display: flex;justify-content: center;align-items: middle;">
   <div style="width: 0px;height: 0px;border: 60px solid black;border-color: green red blue black;border-radius:50%;"></div>
</div>
```

<div class="" style="display: flex;justify-content: center;align-items: middle;">
   <div style="width: 0px;height: 0px;border: 60px solid black;border-color: green red blue black;border-radius:50%;"></div>
</div>

2. 背景属性 a. backgroud-color/backgroup 背景颜色 与 color 属性一致 b. backgroup-image: url(image/url) 背景图片 c. 背景图片不占位置，需要父级元素设置宽高 容器区域 > 背景图片大小 平铺显示占满容器 容器区域 < 背景图片大小 背景图片部分显示 容器区域 = 背景图片大小 背景图片正常显示 d. img 标签是占位置的，有自己的宽高
3. 背景平铺属性 backgroup-repeat a. repeat (缺省) 平铺 b. no-repeat 不平铺 c. repeat-x/y 在 x 轴或 y 轴上平铺显示
4. 背景定位属性 backgroup-position a. x 轴 left right center b. y 轴 top center bottom c. backgroup-position: x 轴属性 y 轴属性; d. 可以接数值属性
5. 背景图的固定 backgroup-attachment a. fixed 固定 b. scroll 滚动
6. 结合使用 a.backgroup: backgroud-color backgroup-image backgroup-repeat backgroup-position backgroup-attachment
7. Padding(填充) a. 在盒子里面，在盒子与内容之间 b. 作用：控制子元素在父元素里的位置关系 c. padding 会把盒子撑大 d. 在盒子设置固定宽高时，设置内容时，应在宽高基础上减去 padding 的间距 e. 没有设置固定宽高时，如设置宽高百分比时，会直接撑大盒子 f. padding 设置一个属性值时，会添加上右下左的 padding 属性 h. padding 设置两个属性值时，前一个属性设置上下的 padding 属性 后一个属性设置左右的 padding 属性 i. padding 设置三个属性值时，分别为上 左右 下 j. padding 设置四个属性值时，分别是上 右 下 左 l. padding 不能接负值
8. Margin(边距) a. 在元素外围，不会撑大元素的大小 b. 作用：控制元素与元素之间的间距 c. margin 设置一个属性值时，会添加上右下左的 margin 属性 d. margin 设置两个属性值时，前一个属性设置上下的 margin 属性 后一个属性设置左右的 margin 属性 e. margin 设置三个属性值时，分别为上 左右 下 f. margin 设置四个属性值时，分别是上 右 下 左 h. margin:0 auto; 让当前元素在父元素里面左右居中 i. 相邻两个元素上下的 margin 值不会叠加，以 margin 较大的为准 j. 父元素与第一个子元素未设置浮动时，为第一个元素添加 margin-top 子元素会置于父元素上面 l. margin 可以接负值
9. margin 的 bug 问题一 a. bug 的现象是父子元素嵌套时,如果子元素是块元素时,对块元素设置 margin-top ,如果父元素没有边框,那么 margin-top 会作用在父元素上 b. 解决方法 给父级添加边框(影响盒子大小，需要重新计算盒子各部分的大小) 给父级设置 over:hidden(margin-top 会正常的作用在子级元素上) 把子元素设置为内联块元素(特俗情况下可能影响页面布局)

```bash
<div class="red" style="width: 200px;height: 200px;background: red;">
	<div class="black" style="width: 100px;height: 100px;margin-left: 50px;margin-top: 50px;background: black;"></div>
</div>
<!-- black的margin-top未作用在black上，而是在red上 -->
```

<div class="red" style="width: 200px;height: 200px;background: red;">
	<div class="black" style="width: 100px;height: 100px;margin-left: 50px;margin-top: 50px;background: black;"></div>
</div>
```bash
<div class="red" style="width: 200px;height: 200px;background: red;overflow:hidden;">
	<div class="black" style="width: 100px;height: 100px;margin-left: 50px;margin-top: 50px;background: black;"></div>
</div>
<!-- black的margin-top正常作用在black上，而非red上 
-->
```
<div class="red" style="width: 200px;height: 200px;background: red;overflow:hidden;">
	<div class="black" style="width: 100px;height: 100px;margin-left: 50px;margin-top: 50px;background: black;"></div>
</div>
10. margin的bug问题二
        a. 兄弟级的块之间，margin这个属性上下边距，经常会发生重叠的情况，以数值大的为准，而不会相加
        b. 父子级的块之间，子级的上下margin会与父级上下margin重叠，以数值大的为准，而不会相加
        c. a种情况：float浮动、inline-block、或者给兄弟级之间设置一个参照元素(如设置一个边框)
        d. b种情况：给父级加 overflow:hidden、padding、border，给子级加position:absolute
 
11. 元素宽高/元素总大小
        a. div盒子的宽度：width + padding-left + padding-right + border-left + border-right
        b. div盒子的宽度：height + padding-bottom+ padding-top + border-bottom + border-top
        c. 网页上元素总宽度：width + padding-left + padding-right + border-left + border-right + margin-left + margin-right
        c. 网页上元素总宽度：height + padding-top + padding-bottom + border-top + border-bottom+ margin-top + margin-bottom
---
#### 文本溢出
---
1. overflow 
       a. visible(缺省)：内容不会被修剪，直接呈现在元素框之外
       b. hidden：内容会被修剪，并且被修剪的内容不可见
       c. scroll：内容会被修剪，但是浏览器会显示滚动条以用来查看剩余的内容
       d. auto：如果内容超出被修建，那么浏览器会显示滚动条以用来查看剩余的内容
       e. inherit：规定应该从父元素继承overflow的值
       f. 数字以及英文字母不会换行，超过父元素宽度直接超出
          英文单词以及中文字会换行，超过父元素宽度会换行
       g. overflow-x/overflow-y：如果它溢出了元素的内容区是否剪辑顶部/底部边缘内容或左右边缘是否裁剪
               visible：不裁剪内容，可能会显示在内容框之外。
               hidden：裁剪内容 - 不提供滚动机制。
               scroll：裁剪内容 - 提供滚动机制。
               auto：如果溢出框，则应该提供滚动机制。
               no-display：如果内容不适合内容框，则删除整个框。
               no-content：如果内容不适合内容框，则隐藏整个内容
2. white-space 
       a. normal(缺省)：多余空白会被浏览器忽略，只保留一个
       b. pre：空白会被保留
       c. pre-wrap：保留一部分空白符序列，但是正常的进行换行
       d. pre-line：合并空白符序列，但是保留换行符
       e. nowrap：文本不会换行，文本会在同一行上继续，直到遇到<br/>标签为止
3. text-overflow
       a. clip：不显示省略号，而是对内容进行裁剪
       b. ellipsis：当对象内文本溢出时，显示省略号(...)
4. 省略号设置
       a. text-overflow属性仅是：当文本溢出时是否显示省略标记，并不具备其它的样式属性定义，要实现溢出时产生省略号的效果还需定义以下内容
       b. 容器宽度：width:value；(px、%，都可以)
       c. 强制文本在一行内显示：white-space:nowrap;
       d. 溢出内容为隐藏：overflow:hidden；
       e. 溢出文本显示省略号：text-overflow:ellipsis;
       f. 必须是单行文本才能设置本文溢出！！！
```bash
<ul id="textFlow">
            <li class="test" style="text-overflow:ellipsis;
            overflow:hidden;
            white-space:nowrap;
            width:150px;">第一标题：文本溢出</li>
            <li class="test" style="text-overflow:ellipsis;
            overflow:hidden;
            white-space:nowrap;
            width:150px;">第二标题：2020/6/15今日文本溢出：数据测试</li>
            <li class="test" style="text-overflow:ellipsis;
            overflow:hidden;
            white-space:nowrap;
            width:150px;">第三标题：2020/6/15今日文本溢出：数据测试 </li>
</ul>
```
<ul id="textFlow">
            <li class="test" style="text-overflow:ellipsis;
            overflow:hidden;
            white-space:nowrap;
            width:150px;">第一标题：文本溢出</li>
            <li class="test" style="text-overflow:ellipsis;
            overflow:hidden;
            white-space:nowrap;
            width:150px;">第二标题：2020/6/15今日文本溢出：数据测试</li>
            <li class="test" style="text-overflow:ellipsis;
            overflow:hidden;
            white-space:nowrap;
            width:150px;">第三标题：2020/6/15今日文本溢出：数据测试 </li>
</ul>
5. 高度坍塌/高度塌陷
          a. 原因：父元素没有设置高度，子级元素含有浮动
          b. 不设置高度的原因是：高度自适应 height：auto或者不设置
          c. 会被子级元素撑开
          d. 子级元素浮动，不占位置，高度就不能被子级元素撑开
          e. 解决方法:
                  给父级添加高度(不能做到自适应)
                  给高度塌陷的容器增加 overflow:hidden(触发了BFC的规则，计算了浮动元素的高度)(如果子级元素有超出当前父级容器的就会被隐藏)
                  最后一个盒子添加一个标签，给这个标签添加clear:both(清除盒子左右的间隙/清除上方预留的空间)
                               (造成标签冗余，网页布局混乱)
                  给出现高度塌陷的容器添加以下代码(推荐)
```bash
.clear-fix::after{
                    content:''; /* - 内容，要和伪对象一起使用 */
                    width：100%;
                    height：0;
                    display：block;
                    clear：both;
                    overflow:hidden;
                    visibility:hidden;
            }
```
```bash
- 扩展
         伪对象(伪元素):::after 在某某类名之后
         content: 显示的内容
         zoom:1 兼容IE6
```
                
---
### 元素类型
---
> XHTML 元素被分为三种类型:块状元素，内联元素，可变元素/内敛块元素(Add for css2.1)
---
       块状元素(列内)
1. 块状元素在网页中就是以块的形式显示，所谓块状就是元素显示为矩形区域。
2. 默认情况下，块状元素都会占据一行
3. 通俗地说，两个相邻块状元素不会出现并列显示的现象
4. 默认情况下，块状元素会按顺序自上而下排列。
5. 块状元素都可以定义自己的宽度和高度
6. 块状元素一般都作为其他元素的容器，它可以容纳其它内联元素和其它块状元素。
```bash
div -最常用的块级元素
dl - 和dt-dd 搭配使用的块级元素
form - 交互表单
h1 -h6- 大标题
hr - 水平分隔线
ol – 有序列表
p - 段落
ul - 无序列表
li
fieldset - 表单字段集
colgroup-col - 表单列分组元素
table-tr-td  表格及行-单元格
```
       内联元素(行内)
1. 内联元素的表现形式是始终以行内逐个进行显示；
2. 内联元素没有自己的形状
3. 不能定义它的宽和高,
4. 它显示的宽度、高度只能根据所包含内容的高度和宽度来确定，
5. 它的最小内容单元也会呈现矩形形状；
6. 内联元素也会遵循盒模型基本规则，
7. 如可以定义padding,border,margin,background等属性
8. 但个别属性不能正确显示;(padding-top:;margin-top/bottom:;)
```bash
a –超链接（锚点）                               
b - 粗体(不推荐) 
br - 换行                             
i - 斜体
em - 强调                             
img - 图片                         
input - 输入框 - 可以设置宽高               
label - 表单标签                  
span - 常用内联容器，定义文本内区块
strong - 粗体强调
sub - 下标   
sup - 上标
textarea - 多行文本输入框
u - 下划线
select - 项目选择  
```
       可变元素
       根据父子级关系、上下级关系来确定是块元素还是内联元素

1. 行内块 a. 在一行内显示 b. 可设置宽高 - 块状元素 c. 常见的行内块：input、img d. input 和 img 写在一起时出现的问题 - 布局问题 原因：行内块的对齐方式 解决：vertical-align
2. 置换元素与非置换元素 - 变换/可变 a. 有自己的固定宽高 hr、img、input b. 置换标签的属性可以改变 img、input c. 可以根据标签属性的改变显示不同的样式 d. img src="地址" e. input

---

       接下一篇戳此

&nbsp;[CSS-rest](http://www.wbolg.xyz/2020/06/15/CSS-rest/)

---

### 浮动属性 float

---

1. 属性值 left 向左浮动 right 向右浮动 none (缺省值)不浮动
2. 说明 a. 浮动只能规定元素在水平方向上左右浮动 b. 浮动会使当前元素脱离文档流(正常的网页布局-从左到右，从下到上) c. 脱离文档流后初始位置就不存在了 d. 出现到浮动层(碰到浮动层/父级元素就会停止浮动) e. 后置浮动元素碰到前置浮动元素就会停止浮动 f. 当父级宽度不足以放最后一个盒子时，最后一个盒子会往下移动直到找到一个合适的空间 g. 浮动虽然脱离文档流，不影响其他元素的布局位子，但其真是结构仍在块元素中占据空间 h. 浮动会把元素转换为 block 块元素

```bash
<style>
        *{
            margin: 0;
            padding: 0;
        }
        ul{
            width: 445px;
            height: 39px;
            list-style: none;
            border-bottom: 5px solid #ccc;
            margin: 100px auto;
        }
        ul li{
            float: left;
            margin-right: 9px;
        }
        ul a{
            height: 35px;
            padding: 0 13px;
            color: #c2bcae;
            border: 1px solid #acacac;
            border-bottom: 0px;
            float: left;
            line-height: 35px;
            /* a是一个行内元素，无法直接设置宽高 */
            margin-top: 4px;
        }
        a:hover{
            height: 39px;
            margin-top: 0px;
        }
</style>
<body>
    <ul>
        <li>
            <a href="#" style="text-decoration: none;">Tab One</a></li>
        <li>
            <a href="#" style="text-decoration: none;">Tab Two</a></li>
        <li>
            <a href="#" style="text-decoration: none;">Tab Three</a></li>
        <li>
            <a href="#" style="text-decoration: none;">Tab Four</a></li>
    </ul>
</body>
```
