---
title: CSS3
date: 2020-06-23 09:05:22
categories: WEB
tags:
  - 前端
  - css
  - 三贱客
  - css3
description:
---

<div style="text-align: center;font-weight: 900;"> CSS3-CSS新特性 </div>

<!-- more -->

# CSS3

---

## 概念

---

1. css 技术的升级版本，css3 语言开发是朝着模块化开发的
2. 模块 a. 盒子模型 b. 列表模型 c. 超链接方式 d. 语言模块 e. 背景和边框 f. 文字特效 g. 多栏布局
3. 兼容性 a. css3 支持向后兼容

---

### 渐进增强和优雅降级

---

1. 渐进增强 a. 针对低版本浏览器构建页面 b. 先保证最基本的功能(低版本)，再完善高版本的新功能 c. 实现难度大，使用较少
2. 优雅降级 a. 先构建完整的站点功能

---

### css3 选择器

---

1. 属性选择器 a. 属性：当前标签后面的都是该标签的属性 b. E[attr]：标签名称[属性] c. E[attr="value"]：标签名称[属性="值"] d. E[attr~="value"]：选中标签中的属性，这个属性有一个或多个 多个属性中的属性值只要被包含，选择器中的 css 样式就能生效 e. E[attr^="value"]：选中当前标签中的属性，以属性值的开头的任意一个字符，既能被选中(开头模糊匹配) f. E[attr$="value"]：选中当前标签中的属性，开始的属性值与结束的属性值的任意一个属性 g. E[attr|="value"]：选中当前标签中的属性，格式为 value-xxx(value-1 value-a) h. E[attr*="value"]：选中当前标签中的属性，属性值中的任何一个字符都可以(模糊匹配/) i. \*[attr]{}：选中所有的 attr 属性，每一个使用了该属性的当前标签，都将应用该属性的 css 声明

```bash
<!-- 对应属性选择器第b条，右侧复制本例替换html文件内容可查看  -->
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title></title>
		<style type="text/css">
			span[class]{
				color: red;
				font-size: 30px;
			}
		</style>
	</head>
	<body>
		<div>
			<div>
				<span class="span1">我是第一个span</span>
				<span class="span2">我是第一个span</span>

				<text class="text1">我是第二个text</text>
			</div>
			<div>
				<span class="span1">我是第一个span</span>
				<h1 class="h11">我是一个h1</h1>
				<a href="#" class="a1">我是第一个a1</a>
				<text class="text1">我是第二个text</text>
			</div>
		</div>
	</body>
</html>
```

<!-- ![sxxz1](sxxz1.png) -->

```bash
<!-- 对应属性选择器第c条，右侧复制本例替换html文件内容可查看  -->
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title></title>
		<style type="text/css">
			a[href="#"]{
				color: pink;
				font-style: italic;
			}
			span[class="span1"]{
				color: blue;
				font-size: 30px;
				background: yellow;
			}
			text[class="text2"]{
				color: white;
				font-size: 25px;
				background-color: black;
			}
		</style>
	</head>
	<body>
		<div>
			<div>
				<span class="span1">我是第一个span</span>
				<span class="span2">我是第二个span</span>

				<text class="text1">我是第一个text</text>
			</div>
			<div>
				<span class="span1">我是第一个span</span>
				<h1 class="h11">我是一个h1</h1>
				<a href="#" class="a1">我是第一个a1</a>
				<text class="text2">我是第二个text</text>
			</div>
		</div>
	</body>
</html>
```

<!-- ![sxxz2](sxxz2.png) -->

```bash
<!-- 对应属性选择器第c条，右侧复制本例替换html文件内容可查看  -->
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title></title>
		<style type="text/css">
			span[class="span1"]{
				color: blue;
				font-size: 30px;
				background: yellow;
			}
			span[class="span1"][title="spantitle1"]{
				color: #ADFF2F;
				font-size: 22px;
				background: beige;
			}
			text[class="text2"]{
				color: white;
				font-size: 25px;
				background-color: black;
			}
			a[href="#"][class="a1"]{
				color: pink;
				font-style: italic;
			}
		</style>
	</head>
	<body>
		<div>
			<div>
				<span class="span1" title="spantitle1">我是第一个span</span>
				<span class="span2">我是第二个span</span>
				<a href="#box" class="a1">我是第一个a2</a>
				<text class="text1">我是第一个text</text>
			</div>
			<div>
				<span class="span1">我是第一个span</span>
				<h1 class="h11">我是一个h1</h1>
				<a href="#" class="a1">我是第一个a1</a>
				<text class="text2">我是第二个text</text>
			</div>
		</div>
	</body>
</html>
```

<!-- ![sxxz3](sxxz3.png) -->

```bash
<!-- 对应属性选择器第c条，右侧复制本例替换html文件内容可查看  -->
<!DOCTYPE html>
<html>
	<head>
		<style type="text/css">
			p[class~="important"] {
				color: red;
			}
		</style>
	</head>

	<body>
		<h1>可以应用样式：</h1>
		<p class="important warning">This is a paragraph.</a>
			<p class="important">This is a paragraph.</a>

				<hr />

				<h1>无法应用样式：</h1>
				<p class="warning">This is a paragraph.</a>
	</body>
</html>
```

```bash
<!-- 对应属性选择器第c条，右侧复制本例替换html文件内容可查看  -->
<!DOCTYPE html>
<html>
	<head>
		<style type="text/css">
			p[class^="i"] {
				color: red;
			}
		</style>
	</head>

	<body>
		<h1>可以应用样式：</h1>
		<p class="important warning">This is a paragraph.</a>
			<p class="important">This is a paragraph.</a>

				<hr />

				<h1>无法应用样式：</h1>
				<p class="warning">This is a paragraph.</a>
				<p class="error">This is a paragraph.</a>
	</body>
</html>
```

```bash
<!-- 对应属性选择器第c条，右侧复制本例替换html文件内容可查看  -->
<!DOCTYPE html>
<html>
	<head>
		<style type="text/css">
			p[class$="i"] {
				color: red;
			}
		</style>
	</head>

	<body>
		<h1>无法应用样式：</h1>
		<p class="important warning">This is a paragraph.</a>
			<p class="important">This is a paragraph.</a>

				<hr />

				<h1>可以应用样式：</h1>
				<p class="garnini">This is a paragraph.</a>
				<h1>无法应用样式：</h1>
				<p class="error">This is a paragraph.</a>
	</body>
</html>
```

```bash
<!-- 对应属性选择器第c条，右侧复制本例替换html文件内容可查看  -->
<!DOCTYPE html>
<html>
	<head>
		<style type="text/css">
			p[class$="g"] {
				color: red;
			}
		</style>
	</head>

	<body>
		<h1>无法应用样式：</h1>
		<p class="important warning">This is a paragraph.</a>
			<p class="important">This is a paragraph.</a>

				<hr />

				<h1>可以应用样式：</h1>
				<p class="garnini">This is a paragraph.</a>
				<h1>无法应用样式：</h1>
				<p class="error">This is a paragraph.</a>
	</body>
</html>
```

```bash
<!-- 对应属性选择器第c条，右侧复制本例替换html文件内容可查看  -->
<!DOCTYPE html>
<html>
	<head>
		<style type="text/css">
			p[class*="i"] {
				color: red;
			}
		</style>
	</head>

	<body>
		<h1>可以应用样式：</h1>
		<p class="important warning">This is a paragraph.</a>
			<p class="important">This is a paragraph.</a>

				<hr />

				<h1>可以应用样式：</h1>
				<p class="garnini">This is a paragraph.</a>
				<h1>无法应用样式：</h1>
				<p class="error">This is a paragraph.</a>
	</body>
</html>
```

```bash
<!-- 对应属性选择器第c条，右侧复制本例替换html文件内容可查看  -->
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title></title>
		<style type="text/css">
			*[class] {
				color: green;
				font-size: 20px;
			}
		</style>
	</head>
	<body>
		<div>
			<div>
				<span class="span1">我是第一个span</span>
				<text class="text1">我是第二个text</text>
			</div>
			<div>
				<h1 class="h11">我是一个h1</h1>
				<a href="#" class="a1">我是第一个a1</a>
			</div>
		</div>
	</body>
</html>
```

2. 结构性伪类选择器/(x:相同标签的集合(标签名称相同)) a. x:first-child：表示选中当前集合下的第一个子级 x:相同标签的集合(标签名称相同) 偶数 even 奇数 odd 倍数 1n 2n 3n b. x:last-child：表示选中当前集合下的最后一个子级 c. x:nth-child(n)：表示选中当前集合下的第 n 个子级 n 缺省为 1 d. x:nth-last-child(n)：表示选中当前集合下从后往前数的第 n 个子级 e. x:only-child(鸡肋)：只有一个子级元素的时候才能使用
3. 结构性伪类选择器/(x:不同标签的集合) a. x:first-of-type：不同标签下的第一个子级元素 b. x:last-og-type：不同标签下的最后一个子级元素 c. x:nth-of-type(n)：不同标签下的第 n 个子级元素 d. x:nth-last-of-type(n)：不同标签下的从后往前数的第 n 个子级元素 e. x:only--of-child(鸡肋)：该标签只有一个子级的时候才能使用 f. x:root：匹配文档的根元素(html)(html) g. x:empty：当前标签下为空时使用
4. 目标伪类选择器 a. :target 改变哪个元素就往哪个元素上加 b. target 伪类用来改变页面中锚链接 URL 所指向的 ID 元素的样式 c. #锚点名:target d. target 可用于选取当前活动的目标元素
5. ui 选择器 a. 标签::selection 无法改变文字大小 b. 标签::enabled 匹配所有用户界面（form 表单）中处于可用状态的被选中的标签 c. 标签::disabled 匹配所有用户界面（form 表单）中处于不可用状态的被选中的标签 d. 标签::checked 匹配所有用户界面（form 表单）中处于选中状态的被选中的
6. 否定伪类
7. 层级选择器 a. 大于号/>: E>F - 父级元素>子级元素 / E 下方的直接子级 b. 加号/+:E+F - 当前标签下(后面)的同级元素 c. ~:E~F: 当前元素后面的元素 F 都可以选中

---

### css3 文本属性

---

1. 浏览器前缀 a. -ms-：IE 浏览器 css 样式 b. -moz-：火狐浏览器 css 样式 c. -o-：欧朋浏览器 css 样式 d. -webkit-：谷歌浏览器 css 样式
2. 文本阴影 text-shadow a. 可以接四个属性值：x y z color/水平方向的移动 垂直方向的移动 模糊程度 阴影颜色 b. 多个属性值：x y z color，x y z color，x y z color，x y z color，x y z color，... c. 接多个时，注意不要让它们的颜色、阴影重叠
3. 盒子阴影 box-shadow a. 可以接四个属性值：x y z color/水平方向的移动 垂直方向的移动 模糊程度 阴影颜色 b. 缺省/inset：外投影/内投影
4. 多行文本隐藏(鸡肋) a. -webkit-line-clamp:2; 省略号出现在第几行 b. -webkit-box-orient:vertical; 垂直方向 c. overflow:hidden; 溢出隐藏
5. iconfont 将项目下载至本地 a. unicode 引用 b. font class 引用 c. Symbol 引用

---

### 背景属性

---

1. 背景原点 backgroup-origin a. 指定 backgroup-origin 属性应该是相对位置 b. padding-box(缺省) 背景图像填充框的相对位置 c. border-box 背景图像边界框的相对位置 d. content-box 背景图像的相对位置的内容框
2. 背景裁切 backgroup-clip a. 属性指定背景绘制区域 b. border-box (缺省)背景绘制在边框方框内(剪切成边框方框) c. padding-box 背景被裁剪到内边距框 d. content-box 背景被裁剪到内容框
3. 背景尺寸 a. backgroup-size：背景尺寸大小 属性值：100% 100% 宽高 会占满整个父级容器，图片会拉伸/缩小 cover：覆盖 等比例使图片占满整个盒子，无论这张图片是否会超出盒子 contain：将图像扩大到内容尺寸，以适应父级容器，但不会超出父级容器

---

### 颜色拓展

---

1. color:hs1(hue,saturation,lightness) / hsla(hue,saturation,lightness,alpha) a. hue:色调 0-360 120 240 b. saturaton;饱和度 0.0% - 100% c. lightness: 亮度 d. alpha: 透明度 0-1

---

### 边框属性

---

1. border-image-source a. 用在边框的图片的路径
2. border-image-slice a. 图片边框向内偏移
3. border-image-outset a. 图片边框向外偏移
4. border-image-repeat a. 图片边框是否平铺

---

### 圆角属性

---

1. border-radius a. 4 个值 左上 右上 右下 左下 b. 8 个值 左上 右上 右下 左下 1px 2px 3px 4px 四个方向的水平值 5px 6px 7px 8px 四个方向的垂直值 这两个位置用斜杠/隔开

---

## 渐变与过渡属性

---

### css3 渐变

---

1. 线性渐变 a. backgroud: linear-gradient(多个参数) 参数：方向,color1,color2,color3 ... 方向：方向缺省从上到下(to bottom)，设置 to top/bottom/left/right，表示去某某方向 斜角写法，to top right，从一个对角位置去另一个对角位置 角度：deg 30deg(标准)=60deg(兼容) 颜色：颜色值后面可跟百分比，表示该颜色占背景百分比 兼容写法：不加 to，方向为起始位置，方向与标准写法相反
2. 径向渐变 a. backgroud: radial-gradient(多个参数) 中心点向外面的点渐变 b. 参数：渐变起点位置，渐变的形状，渐变的大小，颜色值 1，颜色值 2，... c. 颜色：可在颜色后加百分比设置其占背景的百分比 d. 渐变起点位置：默认在盒子中心，可使用两个百分比分别设置水平与垂直的方向 e. 渐变的形状：默认为椭圆(ellise)，还可设置为圆形(circle)，当盒子为正方形时，两者显示为一个效果 f. 渐变大小：最远角、最近角、最远边、最近边，设置以后渐变遇到该位置即会停止渐变 g. 问题：渐变大小与形状同时设置时，会出现无法显示的问题 标准写法： 兼容写法
3. 重复渐变 a. 重复线性 repeating-linear-gradient() 参数与线性渐变一致(颜色的百分比为 0-x%,x-y%,依此类推) b. 重复径向 repeating-radial-gradient() 参数与径向渐变一致(颜色的百分比为 0-x%,x-y%,依此类推)

---

### 过渡

---

1. transition-property a. 过渡属性，当前需要参加过渡的属性 b. 修饰的属性 c. 被修饰的属性如果有多个需要用空格隔开 d. 缺省不写过渡的属性或写 all，表示当前所有属性都参加过渡过程
2. transition-duration a. 设置对象过渡的时间
3. transition-delay a. 延迟时间，设置对象延迟过渡的时间
4. transition-timimg-function a. 过渡的动画 b. linear 匀速 c. ease-in 加速 d. ease-out 减速 e. ease-in-out 先加速在减速 f. ease(缺省) 先慢再快再慢 g. 贝塞尔曲线
5. transition 可设置以上参数

---

### 2d 位移 功能函数 transform

1. translate(x/px,y/px) a. translateX 元素在水平方向进行位移 b. translateY 元素在垂直方向进行位移 c. 位移不脱离文档流 d. 对角移动：右下角移动 translate(tx,ty)、右上角移动 translate(tx,-ty)、左上角移动 translate(-tx,-ty)和左下角移动 translate(-tx,ty) e. 属性可设置当前元素的宽高的百分比，也可以是像素
2. scale a. scaleX 水平 宽度 b. scaleY 垂直 高度 c. 默认情况属性值为 1，不缩放 d. 小于 1 缩放(0.01-0.99)，大于 1 放大 e. 可接负数，但一般不这样用
3. transform-origin a. 语法：transform-origin: x-axis y-axis z-axis; b. 属性值：left center right length % c. transform-origin 是变形原点，也就是该元素围绕着那个点变形或旋转，该属性只有在设置了 transform 属性的时候起作用；
4. 拓展 a. 因为我们元素默认基点就是其中心位置，换句话说我们没有使用 transform-origin 改变元素基点位置的情况下 transform 进行的 rotate,translate,scale,skew 等操作都是以元素自己中心位置进行变化的。
5. 旋转 rotate() a. 旋转 rotate()函数通过指定的角度参数对元素根据对象原点指定一个 2D 旋转 它主要在二维空间内进行操作，接受一个角度值，用来指定旋转的幅度 如果这个值为正值，元素相对原点中心顺时针旋转；如果这个值为负值，元素相对原点中心逆时针旋转 b. rotateX() 方法，元素围绕其 X 轴以给定的度数进行旋转 c. rotateY() 方法，元素围绕其 Y 轴以给定的度数进行旋转 d. 顺时针方向旋转
6. 倾斜 skew() a. 倾斜 skew()函数能够让元素倾斜显示 它可以将一个对象以其中心位置围绕着 X 轴和 Y 轴按照一定的角度倾斜。 b. 一个参数时：表示水平方向的倾斜角度 c. 两个参数时：第一个参数表示水平方向的倾斜角度，第二个参数表示垂直方向的倾斜角度

---

### 3D 与 css 动画

1. 景深 a. 近大远小/眼睛与元素的距离 b. perspective c. 父级上使用：perspective: number(px(整百 100 200 300))/none(当前元素不使用景深属性) d. 子级元素上使用：perspective(父级上设置的 number 值) e. 设置的 transform 可能会冲突，所以当子级设置 transform 时 应在父元素设置 perspective，避免属性冲突
2. 3D 位移 a. translate(translateX、translateY、translateZ(垂直屏幕由内往外)) b. translate3d c. transform-style:preserved-3D 形成为 3D 空间
3. 3D 旋转 a. transform(rotateX,rotateY,rotateZ(直视)) b. trasform：rotate3D(x,y,z,angle) x,y,z 在这不是角度，而是矢量值(0 表示关,1 表示开)，angle 代表角度
4. 动画 a. 在一个固定宽高盒子内，控制小盒子在盒子内移动 定位属性 盒模型 css(2d)属性 b. 动画的要素和条件 动画需要声明 css 样式表内声明 @keyframes 动画名称{动画位置状态} 自定义动画名称 动画需要调用(开关) c. keyframes{ from{}; to{};  
   } keyframes{ 0%{}; 25%{}; 50%{}; 75%{}; } d. animation-name:动画名称 animation-duration 动画运动时间 animation-delay 动画延迟 animation-timing-function 运动轨迹 step-satrt 跳到每一帧动画结束的状态 animation-iteration-count 动画是否循环 number 动画循环几次 infinite 无限循环 animation-direction 动画循环是否反向运动 nonrmal 正常移动 reverse 反向移动 alternate 先正向移动在反向移动 alternate-reverse 先反向移动在正向移动 animation-play-state 指针移入的时候，动画的状态 -running e. animation 动画名称、动画时间、infinite
