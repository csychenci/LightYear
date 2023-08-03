---
title: 指令与过滤器
date: 2020-09-07 10:30:36
categories: Vue
tags:
  - JavaScript框架
  - Vue
---

## ~~过滤器~~(过滤器已被弃用)

---

1. 过滤器的作用

- 用于一些常见的文本格式化

```html
<span>{{ item +'str'}}</span>
```

2. 使用场景

- 双花括号插值和 `v-bind` 表达式，将过滤器添加在 `JavaScript` 表达式的尾部，由管道符来指示
- 双花括号

```html
{{ msg | filtername}}
```

- v-bind 绑定自由属性中

```html
<span v-bind:id="rawid | formatId"></span>
```

3. 全局过滤器

- 创建 Vue 实例之前全局定义过滤器

```css
#Rawid {
  color: red;
}
#rAWID {
  color: blue;
}
```

```html
// 定义一个过滤器，使value首字母小写，其余字母大写
<body>
  <div id="app">
    <span v-bind:id="raw | filterthis">我是蓝色</span>
    <!--   在过滤器作用下绑定上 `rAWID` 的id选择器 -->
  </div>
</body>
<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
<script type="text/javascript">
  Vue.filter('filterthis', function (value) {
    if (!value) {
      return '';
    }
    value = value.toString();
    return value.toLowerCase().slice(0, 1) + value.toUpperCase().slice(1);
  });
  var app = new Vue({
    el: '#app',
    data: {
      raw: 'rawid',
    },
  });
</script>
```

```html
<!-- 定义一个过滤器，使value首字母大写 -->
<body>
  <div id="app">
    <span>{{content | filterthis}}</span>
    <!--   在过滤器作用下绑定上 `Rawid` 的id选择器 -->
  </div>
</body>
<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
<script type="text/javascript">
  Vue.filter('filterthis', function (value) {
    if (!value) {
      return '';
    }
    value = value.toString();
    return value.charAt(0).toUpperCase() + value.slice(1);
  });
  var app = new Vue({
    el: '#app',
    data: {
      raw: 'rawid',
      content: 'hello world',
    },
  });
</script>
```

4. 局部过滤器

- 局部过滤器只能用于挂载 dom 内的元素使用，当全局过滤器与局部过滤器重名时，组件内部会采用局部过滤器

```html
<body>
  <div id="app">
    <span>{{content | filterthis}}</span>
  </div>
</body>
<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
<script type="text/javascript">
  var app = new Vue({
    el: '#app',
    data: {
      raw: 'rawid',
      content: 'hello world',
    },
    // 书写方式
    filters: {
      filterthis: function (value) {
        if (!value) {
          return '';
        }
        value = value.toString();
        return value.charAt(0).toUpperCase() + value.slice(1);
      },
    },
  });
</script>
```

5. 过滤器函数

- 过滤器函数总接收表达式的值（之前操作的结果）作为第一个参数

```js
<span>{{msg | filterA}}</span>
// msg的值会作为过滤器fliterA的第一个参数传入到filterA中
```

- 过滤器可以串联

```js
<span> {{ msg | filterA | filterB }} </span>
<span v-bind:id="rawid | filterThs | filterThsA">字体</span>
// msg的值会作为filterA过滤器的第一个参数传入到filterA中
// filterA调用的结果会传入到filterB中作为filterB的参数
```

- 过滤器是 JavaScript 函数，因此可以直接接收参数

```js
<span> {{ msg | filterA('arg1',arg2) }} </span>
// filterA 被定义为接收三个参数的过滤器函数
// 其中 msg 的值作为第一个参数
// 普通字符串 'arg1' 作为第二个参数
// 表达式 arg2 的值作为第三个参数
```

---

## 自定义指令

---

1. 怎么自定义指令

- 全局指令

```js
Vue.directive('focus', function (el, binding) {
  el.style.outline = 'none';
  el.style.color = 'red';
});
// 使用v-focus指令
```

- 局部指令

```js
// 指令 v-focus
var app = new Vue({
  el: '#app',
  directives: {
    focus: function (el, binding) {
      el.style.outline = 'none';
      el.style.color = binding.value;
    },
  },
});
```

2. 自定义指令中的钩子函数

|钩子函数|描述|
|---|---|
|bind|只调用一次，指令第一次绑定到元素时调用，可用于一次性的初始化设置|
|inserted|被绑定的函数插入到父节点时调用，仅保证父节点存在，但不一定已被插入到文档中|
|update|所有组件的 Vnode 更新时调用，但是可能发生在其子 Vnode 更新之前，指令的值可能发生了改变，也可能没有。但是可以通过比较更新前后的值来忽略不必要的模板更新|
|componentUpdated|指令所在组件的 Vnode 及其子 Vnode 全部更新后调用|
|unbind|只调用一次，指令与元素解绑时调用|

3. 钩子函数的参数

- `el`：指令所绑定的元素，可以直接用来操作 DOM
- `binding`：这是一个对象，具有多个属性，其中 `name` 表示指令名，不包括 v-前缀，`value` 是指令的绑定值

```js
<span v-some="'red'"></span>
// 这里binding.value等于'red'
```

- `oldValue`：指令绑定的前一个值/上一个虚拟节点，仅在 `update` 和 `componentUpdated` 钩子中可用。无论值是否可用
- `expression`：字符串形式的指令表达式

```js
<span v-my-directive="1 + 1"></span>
// 这里binding.expression等于'1 + 1'
```

- `argument`：传给指令的参数，可选。例如 `vi-my-directive:foo` 中，参数为 `foo`，参数可以接收所有合法的 `JavaScript` 表达式，如对象等
- `modifiers`：一个包括修饰符的对象。例如：`v-my-directive.foo.bar` 中，修饰对象为 `{foo:true,bar:true}`
- `vnode`：Vue 编译生成的虚拟节点
- 参数中除了 `el` 之外，其他参数都是只读的

```html
<div id="hook-arguments-example" v-demo:foo.a.b="message"></div>
```

```js
Vue.directive('demo', {
  bind: function (el, binding, vnode) {
    var s = JSON.stringify;
    el.innerHTML =
      'name: ' +
      s(binding.name) +
      '<br>' +
      'value: ' +
      s(binding.value) +
      '<br>' +
      'expression: ' +
      s(binding.expression) +
      '<br>' +
      'argument: ' +
      s(binding.arg) +
      '<br>' +
      'modifiers: ' +
      s(binding.modifiers) +
      '<br>' +
      'vnode keys: ' +
      Object.keys(vnode).join(', ');
  },
});

new Vue({
  el: '#hook-arguments-example',
  data: {
    message: 'hello!',
  },
});
```

4. 动态指令

```html
<div id="hook-arguments-example" v-demo:[argument]="value"></div>
```
