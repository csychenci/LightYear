---
title: 组件化开发与ref
date: 2020-09-08 10:30:36
categories: Vue
tags:
  - JavaScript框架
  - Vue
---

<!-- more -->

# 动态组件与 ref

---

## $refs

---

1. 在组件或元素上添加 ref

- `ref` 是 Vue 内置属性，可以通过添加 ref 直接操作实例中所有 ref 节点（`真实DOM结构`）
- 原生或 jQuery 只能操作原生标签，无法操作自定义标签
- 通过 ref 获取的自定义组件标签是一个 Vue 组件实例，可以获取到他的方法和属性

```html
<div id="app">
  <app-component red="king" :Myprops="name"></app-component>
  <button @click="to" type="button">请求</button>
  <div></div>
</div>
```

- 通过 `this.$refs` 来获取所有绑定的 ref

```js
mounted(){
    console.log(this.$refs)
}
```

---

## keep-alive

---

1. 动态组件的使用

- 凡是被 `keep-alive` 包裹的组件，可保留组件状态，而不是销毁和重置
- 当在这些组件之间切换时，你有时会想保持这些组件的状态，以避免反复渲染导致的性能问题
- `keep-alive` 要求被切换的组件都有自己的名字，不论是通过组件的 name 选项还是局部/全局注册

2. 使用方式

- 注册 Vue 实例并定义一些组件

```js
var app = new Vue({
  el: '#app',
  data: {
    tab: 'home',
  },
  methods: {
    tabClick(tab) {
      this.tab = tab;
    },
  },
  components: {
    home: {
      template: `<div><span>首页</span><input type="text" /></div>`,
    },
    find: {
      template: `<div><span>发现</span><input type="text" /></div>`,
    },
    user: {
      template: `<div><span>我的</span><input type="text" /></div>`,
    },
  },
});
```

- 在实例中使用动态组件包裹需要保留组件状态的组件

```html
<div id="app">
  <div>
    <keep-alive>
      <!-- is属性指向谁，谁就显示出来 -->
      <component :is="tab"></component>
    </keep-alive>
    <div class="tabs">
      <span @click='tabClick("home")'>首页</span>
      <span @click='tabClick("find")'>发现</span>
      <span @click='tabClick("user")'>我的</span>
    </div>
  </div>
</div>
```

---

## 混入 mixin

---

1. 使用方式

- 混入是一种代码的复用，除了 `el` 和 `template` 均可引入混入，用于分发组件中的可复用功能
- 当组件中使用混入对象时，所有混入对象的选项将被 `混合` 进入该组件本身的选项

2. 定义一个简单的 mixin

```js
// 定义一个minxi
var Mixintest = {
  created: function () {
    this.init();
  },
  methods: {
    init() {
      this.msg = 'hello world';
    },
  },
};
// 在vue实例中引入
var app = new Vue({
  el: '#app',
  data: {
    msg: 'Vue',
  },
  mixins: [Mixintest],
});
```

```html
<div id="app">
  <h1>{{msg}}</h1>
</div>
```

3. 选项合并

- 当组件和混入对象含有同名选项时，这些选项将以恰当的方式进行合并
- 数据对象在内部会进行递归合并，当发生冲突时以组件数据为主

```js
// 定义一个minxi
var Mixintest = {
  data: {
    msg: 'Mixin',
    content: 'Jetmine Mixin',
  },
};
// 在vue实例中引入
var app = new Vue({
  el: '#app',
  data: {
    msg: 'Vue',
    content: 'Jetmin Vue',
  },
  mixins: [Mixintest],
  methods: {
    init() {
      console.log(`msg:` + this.msg, `content:` + this.content);
    },
  },
});
```

```html
<div id="app">
  <h1 v-text="msg"></h1>
  <button type="button" @click="init">点击</button>
</div>
```

- 同名钩子函数将被合并为一个数组，因此都会被调用。其中，混入对象的钩子将在组件自身钩子之前调用
- 值为对象的选项，如 `methods`、`components`、`directives`，将被合并为同一个对象。两个对象键名冲突时，取组件对象的键值对（vue.extend）也会使用相同策略进行合并

4. 全局混入

- 混入可以全局注册，全局注册的 mixin 会影响到每一个之后创建的 Vue 实例，同时包括引入的子组件

```js
Vue.component('home', {
  template: `<p>子组件</p>`,
});
Vue.mixin({
  data: function () {
    return {
      msg: 'Mixin',
      content: 'Jetmine Mixin',
    };
  },
  created: function () {
    console.log('i m mixin');
  },
});
var app = new Vue({
  el: '#app',
  data: {
    msg: 'Vue',
    content: 'Jetmin Vue',
  },
  methods: {
    init() {
      console.log(`msg:` + this.msg, `content:` + this.content);
    },
  },
  created: function () {
    console.log('i m Vue');
  },
});
```

```html
<div id="app">
  <h1 v-text="msg"></h1>
  <button type="button" @click="init">点击</button>
  <home></home>
</div>
```

---

## 异步组件

---

1. 异步组件的作用

- 在项目执行的时候不加载，而是在需要的时候加载。需要特定的触发条件，才能触发到 vue 系统中

```js
// 异步加载
const home = () => import('./components/home.vue');
const news = () => import('./components/news.vue');
```

---

## 插槽

---
1. Vue 实现了一套内容分发的 API，将 `<slot>` 元素作为承载分发内容的出口

```js
<App>
    <componentA>
        <!-- 这里可以填入模板代码/HTML、字符串文本或者其他的组件等 -->
    </componentA>
</App>
```

```js
// 在compoentA组件中使用slot
<div>
  <slot></slot>
</div>
```

- `slot` 与模板的其他地方可以访问相同的作用域，也就是父级模板里的所有内容都是在父级作用域中编译的；子模板里的所有内容都是在子作用域中编译的
- `slot` 可以理解为是由使用它（子组件）的组件传递给子组件的内容，因此具有和子组件一样的作用域。**如果你熟知 react，那么你可以将插槽看作是 react 中的 children 一样的东西；但是 slot 可以进行任意分发，通过具名插槽的方式**

2. 后备内容

- 可以为一个插槽设置默认内容，该默认内容只会在没有提供内容的时候被渲染

```js
// submit-button组件，我们希望slot默认被渲染成submit
<button type="submit">
  <slot></slot>
</button>
```

```js
<button type="submit">
  <slot>submit</slot>
</button>
// 这能让submit-button在一个父组件中被使用并且不提供插槽内容时被渲染成
<button type="submit">
  submit
</button>
```

- 如果我们为 `submit-button` 提供一个内容

```js
<submit-button>edit</submit-button>
```

- 插槽的默认内容将会被提供的插槽内容替换

3. 具名插槽

- 一个不带 `name` 的 `slot` 出口会带有隐含的名字 `default`

```js
<home>
  <template v-slot:header>
    <h1>我是一个具名插槽header</h1>
  </template>
</home>
```

```js
// home组件内
template: `<div><span>首页</span><input :value='msg' type="text" /><slot name="header"></slot></div>`;
```

```html
<style type="text/css">
  .header {
    color: red;
    font-weight: 400;
    font-size: 16px;
  }
  .footer {
    color: #00ffff;
    font-weight: 600;
    font-size: 12px;
    text-indent: 2px;
  }
  .public {
    border-radius: 5px;
  }
</style>
<body>
  <div id="app">
    <home>
      <template v-slot:header>
        <heads :prop="head"></heads>
      </template>
      <template v-slot:footer>
        <foots :prop="foot"></foots>
      </template>
    </home>
  </div>
</body>
<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
<script type="text/javascript">
  Vue.mixin({
    data: function () {
      return {
        footer: 'footer',
        public: 'public',
        header: 'header',
      };
    },
  });
  var header = {
    template: `<input :class='["header","public"]' type="text" :value="prop"></input>`,
    props: ['prop'],
  };
  var footer = {
    template: `<input :class='["footer","public"]' type="button" :value="prop"></input>`,
    props: ['prop'],
  };
  var home = {
    template: `<p><slot name='header'></slot><slot name='footer'></slot></p>`,
  };
  var app = new Vue({
    el: '#app',
    data: {
      foot: 'footer',
      head: 'header',
    },
    components: {
      home,
      foots: footer,
      heads: header,
    },
  });
</script>
```
