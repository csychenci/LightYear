---
title: 模板语法与属性绑定
date: 2020-09-06 10:25:36
categories: Vue
tags:
  - JavaScript框架
  - Vue
---

<!-- more -->

# 基本用法

---

## 模板语法

---

1. 插值

- 使用双大括号的文本插值

```html
<span>msg：{{msg}}</span>
```

- 使用 `v-once` 指令插值，一次性插值，当数据改变时，插值处的内容不更新，但可能会影响其他使用/绑定该数据的内容

```html
<span v-once> msg改变时这里不会改变 : {{ msg }} </span> <span> msg改变时会改变 : {{ msg }} </span>
```

- `HTML`：双大括号会将数据解析为普通文本，而不会解析 html 标签，因此需要使用指令 `v-html`，相较于双大括号可以防止 `xss`、`csrf` 攻击

```html
<span v-html="msg">这里会解析标签:</span>
<!--  v-html的内容会替换掉span的内部内容 -->
<span>这里不会解析标签:{{msg}}</span>
```

- `Attribute`：对自由属性的动态绑定应使用 `v-bind`，`attribute` 的值为布尔值的情况下，只要该属性存在即为 `true`，当值为 `false`、`null`、`undefined` 的情况下，此种属性不会被渲染在所属元素中
- `JavaScript表达式`：可以在插值中使用 JavaScript 的一些表达式用于判断、条件等，每个绑定只能包含单个表达式，其中语句、选择语句不会生效

2. 指令

- `v-if`：用于条件性地渲染一块内容，可配合 `v-else/v-else-if` 使用，中间可以嵌套多个 `v-else-if`，切换显示与隐藏，实际是真实 DOM 节点添加与移除，他所需要耗费的性能较大
- `v-show`：切换显示与隐藏，只是简单的给目标添加 `display:none/bloack`，耗费性能较小
- `v-once`：用于绑定文本，只会渲染一次，后续绑定地变量发生变化，dom 也不会发生变化，需配合文本插值来实现
- `v-on/@`：用于监听 DOM 事件，并可添加事件处理函数，参数中携带 `$event`，可以使用事件对象

3. 事件修饰符

- 可跟在 `v-on` 监听的事件后面作为该事件的修饰符，可链式调用

| 修饰符  |                                 作用                                 |
| :-----: | :------------------------------------------------------------------: |
|  stop   |                            阻止事件的冒泡                            |
| prevent |                          阻止默认事件的触发                          |
| capture |                           使用事件捕获模式                           |
|  self   |  只当在 event.target 是当前元素自身时触发处理函数，不会触发事件冒泡  |
|  once   |                         该绑定事件只触发一次                         |
| number  |                可以把文本类数字字符自动转化为数值类型                |
|  lazy   | 当表单失去焦点时才同步更新 data 中被绑定地变量，以达到性能优化的特点 |
| passive |                 会告诉浏览器你不想阻止事件的默认行为                 |

```js
@keyup.ctrl.shift.65.prevent=function(){}
```

4. 按键修饰符

- 可通过 `Vue.config.keyCodes.键名='键码'` 设置键盘某一个键地键盘码

5. 对动态参数的值约束

- 动态参数预期情况下会求出一个字符串，异常情况为 null，这个 null 可用于显性地移除绑定
- 绑定其他非字符串类型地值将会触发一个警告

```js
<!-- 这会触发一个编译警告 -->
<a v-bind:['foo' + bar]="value"> ... </a>
```

- 绑定一个 JavaScript 表达式作为 Value 值

```js
<a v-bind:[attributeName]="url"> ... </a>
// attributeName会被作为一个 JavaScript 表达式进行动态求值，求得的值作为最终参数来使用
```

- 使用动态参数为一个动态的事件名绑定处理函数

```js
<a v-on:[eventName]="doSomething"> ... </a>
// v-on的参数取决于eventName的属性值
```

- HTML 中写模板时，应避免使用大写字符来命名键名，因为浏览器会把 attribute 名全部强制转为小写

```js
<!--
在 DOM 中使用模板时这段代码会被转换为 `v-bind:[someattr]`。
除非在实例中有一个名为“someattr”的 property，否则代码不会工作。
-->
<a v-bind:[someAttr]="value"> ... </a>
```

---

## class 与 style 绑定

---
### class 绑定
---

1. 对象语法
- 可以通过 v-bind 给 class 属性传递多个字段来动态的切换 classname

```html
<div id="app" :class="{'static':isStatic,'select':isSelect}"></div>
<!-- class="static"存在与否取决于isStatic的真值，class="select"存在与否取决于isSelect的真值 -->
<!-- 当isStatic或isSelect变化时，class列表将相应的更新 -->
```

```html
<!-- 当isSelect为true，isStatic为true时，渲染结果为 -->
<div id="app" class="static select"></div>
```

- 还可以在 data 将它们作为一个对象来进行绑定

```html
<div id="app" v-bind:class="classList"></div>
```

```js
export default {
	data:function() {
		return {
			classList:{
				select:true,
				static:false
			}
		}
	}
}
```

```html
<!-- 渲染结果为 -->
<div id="app" :class="select"></div>
```

- 绑定一个返回对象地计算属性

```html
<div id="app" :class="classShow" class="app"></div>
```

```js
data:{
	isActive:true,
	hasError:null,
},
computed:{
	classShow:function () {
		return {
			select: this.isActive && !this.hasError,
			'static':this.hasError && this.hasError.type==="fatal"
		}
	},
}
```

2. 数组语法
- 以把一个数组传给 v-bind:class，以应用一个 class 列表

```html
// 1. 第一种情况，data中存在表示某class类名的变量时
<div id="app" :class="[select,static]"></div>
```

```js
data:{
	select:'select',
	'static':'static'
},
```

```html
// 被渲染为
<div id="app" :class="select static"></div>
```

```html
// 2. 第二种情况，data中不存在表示某class类名的变量时
<div id="app" :class="['select','static']"></div>
```

```js
data:{
},
```

```html
// 被渲染为
<div id="app" :class="select static"></div>
```

- 根据条件切换列表中的 class，可以使用三元表达式

```html
<div id="app" :class="[isSelect ? selectClass: '',staticClass]"></div>
```

```js
data:{
    isSelect: true/false,
    selectClass:'select',
    staticClass:'static'
}
```

- 只有 isStatic 为 true 时，class 列表会添加 select，但 class 列表会始终添加 static

```js
data:{
	isSelect: true/false,
	selectClass:'select',
	staticClass:'static'
}
```

---

### 绑定内联样式

---

1. 对象语法

- CSS property 名可以使用驼峰式或者短横线分隔

```html
<div v-bind:style="{ color: selectColor,fontSize: fontSize + 'px'}"></div>
```

2. 数组语法

- v-bind:style 的数组语法可以将多个样式对象应用到同一个元素上

```js
data:{
	selectStyles:{
		color:"red",
		border:"1px solid #333"
	}
	staticStyles:{
		background:"#fff",
		font-size:"16px"
	}
}
```

3. 自动添加前缀

- ~~当 `v-bind:style` 使用需要添加浏览器引擎前缀的 `CSS property` 时，如 transform，Vue.js 会自动侦测并添加相应的前缀~~。需要配合使用 postcss-loader 与 autoprefixer 插件来为新特性添加前缀

4. 多重值

- 可以为 style 绑定中的 property 提供一个包含多个值的数组，常用于提供多个带前缀的值

```html
<div :style="{ display: ['-webkit-box', '-ms-flexbox', 'flex'] }"></div>
```

- 这样写只会渲染数组中最后一个被浏览器支持的值
