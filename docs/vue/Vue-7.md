---
title: 路由管理
date: 2020-09-08 10:30:36
categories: Vue
tags:
  - JavaScript框架
  - Vue
---

<!-- more -->

# 路由管理

---

## 初探路由

---

1. 路由是什么

- `vue-router` 是一个 vue.js 下的路由组件
- 路由在 web 层面指的是控制我们在浏览器输入的 url 应该走入哪个页面的一个组件
- 针对单页面应用，根据路径的 `hash值` 来匹配显示对应的组件，在单页面模拟页面跳转，vue 当中的路由匹配的资源是我们创建的组件

2. 如何使用

- 引入 `vue-router` 的 CDN 链接或者安装 `vue-router` 的依赖
- 导入 `vue-router` 的包后，需要注册这个类

```js
import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);
```

- 实例化 router，配置它的基本参数

```js
// router.js
import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);

// 可以引入其他的组件
import home from './pages/news.vue';
import news from './pages/news.vue';
import hello from './pages/HelloWorld.vue';

// 创建路由实例（对象）
export default new VueRouter({
  mode: 'hash', //vue-router路由模式的默认方式
  // routes字段用于指定一条一条的路由匹配规则
  routes: [
    { path: '/home', component: home },
    { path: '/news', component: news },
    { path: '/', component: hello },
  ],
});
```

```js
import home from "../components/home.vue";
import news from "../components/home.vue";
import hello from "../components/home.vue";

export default createRouter({
  history: createWebHashHistory(),
  routes:[
    { path: '/home', component: home },
    { path: '/news', component: news },
    { path: '/hello', component: hello },
  ]
})
```

- 在 vue 项目程序入口文件中挂载 router 实例

```js
// main.js
import Vue from 'vue';
import App from './App.vue';
Vue.config.productionTip = false;
import router from './router.js';
new Vue({
  router, // 路由挂载
  render: (h) => h(App),
}).$mount('#app'); // 等同于el:'#app'
```

- 在组件中使用路由跳转页面

```js
<template>
  <div id="app">
    App
    <router-link to="/home" tag="span" exact-active-class="on">
      Home
    </router-link>
    <router-link to="/" tag="span" exact-active-class="on">
      HelloWORLD
    </router-link>
    <router-link to="/news" tag="span" exact-active-class="on">
      news
    </router-link>
    <router-view></router-view>
  </div>
</template>
// exact-active-class可以定义一个高亮样式，tag为添加一个标签，to为要到达的路由
```

3. router-link

- 属于 Vue 中的全局组件，_router-link_ 用来跳转（改变）路由，是声明式路由跳转
- 能触发浏览器的变化，相当于 a 标签，默认情况下进行模糊匹配
- **`模糊匹配`**（_active-class_）：`<roter-link to='/article'>` 会被路径为 `/article/1` 激活。模糊匹配仅仅是 class 被激活，并不会跳转到相应的路由，除非路径相同
- **`精准匹配`**（_exact-active-class_）：`<router-link to='/article/1'` 只会被路径名为 `/article/1` 激活

```js
// router-link的属性
<router-link to="/home" tag="span" exact-active-class="on">
  Home
</router-link>
// 1. tag：指定router-link最终被渲染成什么标签
// 2. to：指定到达的路径
// 3. exact-active-class：配置当链接被精确匹配时应该激活的class
```

4. router-view

- 属于 Vue 中的全局组件，_router-view_ 用来展示对应路由显示的组件内容
- 当点击 router-link 使路由改变了，vue-router 内部监听着路由变化，根据路由规则找到匹配的路由，然后在 router-view 显示对应的组件内容。因此，我们切换路由最终是页面的不同组件的展示，而不是页面的刷新

5. 路由懒加载

- es 提案的 `import()`

```js
const home = () => import('/home.vue');
```

- 通过异步组件的方式（vue-router 中配置路由），按需加载

```js
{
  path:"/path",
  name:"name",
  component:resolve=>require(['/home'],resolve)
}
```

- webpack 的 `require.ensure()`

```js
{
  path:'home',
  name:'name',
  component:r=>require.ensure([],()=>r(require('./home')),'demo')
}
```

6. 路由组件的本质

- 它实际上是不同路由所对应的组件的重新激发与销毁。使用 _this.router_ 访问路由器，使用 _this.route_ 访问当前路由

---

## 编程式的导航

---

1. 声明式路由三种形式

- 指定到达路径

```js
<router-link to="/home" tag="span" exact-active-class="on">
  首页
</router-link>
```

- 通过设置路由别名

```js
// router.js
routes: [
  {
    path: '/home',
    alias: '/family',
    component: (resolve) => require(['/home'], resolve),
  },
];
```

```js
<router-link to="/family" tag="span" exact-active-class="on">
  首页
</router-link>
```

- 通过设置命名路由

```js
// router.js
routes: [
  {
    path: '/home',
    component: HelloWorld,
    name: 'family',
  },
];
```

```js
<router-link to='{name:"family"}' tag="span" exact-active-class="on">
  {' '}
  首页
</router-link>
```

2. 编程式路由

- `router-push`：这个方法会向 `history栈` 添加一条新的纪录，因此，用户可以回退到之前的 URL
- 如何传递参数

```js
// 字符串
router.push('home');
// 对象
router.push({ path: '/home' });
// 命名的路由
router.push({ name: 'home', parmas: { userid: '123' } });
// 带查询参数，变成 /register?plan=private
router.push({ path: 'register', query: { plan: 'private' } });
// 也可将相应的规则应用在router-link组件的to属性，使之与router.js相匹配
```

- `router.replace`：类似于 `router-push`，但是他不会向 history 栈中添加新记录，而是将当前 history 记录替换掉
- `router.go()`：参数为正整数时，意为在当前 history 记录中前进一步；参数为负整数时，意为在当前 history 记录中后退一步

---

## 路由传参

---

1. 通过 parmas 传参

- 使用 `this.$route.params` 来获取这种方式的路由参数，类似于 `ajax` 中的 `post` 方法，参数不可见且附带在请求体里面，弊端是页面刷新以后会获取不到参数（页面刷新参数丢失）

```js
this.$router.push({ name: 'detail', params: { id: item.id, name: item.name, date: item.date } });
// 这里的params是一个对，id是属性名，item.id是值（可以从当前组件或Vue实例上获取）
```

```js
// 相应地路由设置
routes: [
  {
    path: '/detail', // 组件路径
    name: 'detail', // 路由别名
    component: detail, // 组件名
  },
];
```

2. 路由配置别名传参

- 页面刷新参数不会丢失

```js
this.$router.push(path:`/am/${item.id}/${item.name}`)
```

```js
routes: [
  {
    path: '/detail', // 组件路径
    name: 'detail', // 路由命名
    component: detail, // 组件名
    alias: '/am/:id/:name', //路由别名动态参数
  },
];
```

3. 路由路径传参

- 页面刷新参数不会消失

```js
this.$router.push({path:`/detail/${item.id/${item.moviename}/${item.date}`})
// this.$router.push('/detail/'+item.id+`/${item.moviename}/${item.date}`)
```

```js
// 相应的路由设置

routes: [
  {
    path: '/detail/:id/:name/:date"', // 组件路径
    name: 'detail', // 路由命名
    component: detail, // 组件名
  },
];
```

4. 通过 query 参数传递参数

- 类似于 ajax 的 get 方法，参数可见且附带在 url 里面，可以解决页面刷新参数消失的问题

```js
this.$router.push({
  name: 'detail',
  query: { id: item.id, name: item.moviename, date: item.date },
});
```

```js
// 相应的路由设置
routes: {　　
  path: '/detail', // 组件路径
  name: 'detail', // 路由命名
  component: detail, // 组件名
  alias:"/am" // 路径别名
}
```

5. 接收参数

- 在真实 dom 挂载完成后，获取传递过来的参数

```js
mounted(){
  console.log(this.$route)
}
```

- 使用 props 接收参数

```js
props: ['id', 'name', 'date'];
```

---

## 命名路由与路由别名

---

1. 命名路由

- 可以在 router 配置中给某个路由设置标识符，相当于给这条路由匹配规则取个名字

```js
routes: [
  {
    path: '/hello',
    component: HelloWorld,
    name: 'family',
  },
];
```

```js
// 链接到一个命名路由（声明式路由）
<router-link :to="{name:'family',params:{id:item.id}}">ID</router-link>
```

```js
// 等同于上例（编程式路由）
this.$router.push({ name: 'family', params: { id: item.id } });
```

2. 路由别名

```js
routes: [
  {
    path: '/hello',
    component: HelloWorld,
    name: 'family',
    alias: '/hi',
  },
];
```

- 在设置路由别名以后，当访问的 url 为 `/hi`，url 会保持为 `/hi`，但是路由匹配规则为 `/hello`
- 别名的功能让你可以自由地将 `UI结构` 映射到任意的 URL，而不是受限于配置的嵌套路由结构

```js
routes: [
  {
    path: '/hello',
    component: HelloWorld,
    name: 'family',
    alias: '/hi',
    children: [
      {
        path: 'jetmine',
        component: World,
        alias: '/jet',
      },
    ],
  },
];
// path: /hello/jetmine
// alias: /jet
```

3. 路由重定向

- 通过路由路径来重定向

```js
{path:'/that',redirect:'/hello'}
// 当访问 /that时，会被重定向到 /hello
```

- 通过路由命名来重定向

```js
{ path:'/that', redirect:{ name : 'he'}}
// 当访问 /that时，会被重定向到设置了该命名的路由相对应的路径
```

- 通过设置路由别名来重定向

```js
{ path:'/that', redirect:'/h'}
// 当访问 /that时，会被重定向到 /h，而 /h为某一条路由设置的别名，因此会匹配该路由对应的路径
```

- 动态重定向

```js
{ path:"/home", redirect: to => {
// 方法接受方法作为参数，retrun重定向的字符串路径/路径对象(命名路由)
}}
```

4. 命令视图

- 在一个路由中所对应的视图中在多个容器中显示

```js
<router-view class="view one"></router-view>
<router-view class="view two" name="a"></router-view>
<router-view class="view three" name="b"></router-view>
```

```js
const router = new VueRouter({
  routes: [
    {
      path: '/',
      components: {
        default: Foo,
        a: Bar,
        b: Baz,
      },
    },
  ],
});
```

- 嵌套命名视图

```js
{
  path: '/settings',
  // 你也可以在顶级路由就配置命名视图
  component: UserSettings,
  children: [{
    path: 'emails',
    component: UserEmailsSubscriptions
  }, {
    path: 'profile',
    components: {
      default: UserProfile,
      helper: UserProfilePreview
    }
  }]
}
```

5. 嵌套路由方法

- 在父组件提供一个容器，也就是 `router-view`，准备放嵌套的子组件
- 创建需要被嵌套的子组件
- 在路由配置，父组件的配置对象当中，插入 children 属性，是一个数组，里面可以放子路由配置对象
- 子路由对象跟父路由对象设置的属性基本一致，嵌套路由目的是通过 url 控制父组件中的嵌套子组件显示，
- 特点是每一个子组件显示都是在父组件当中，这个父组件一直不变，包裹着跟随 url 变化的子组件

---

## 路由模式

---

1. hash 模式（缺省）

- 使用 URL 的 hash 来模拟一个完整的 URL，于是当 URL 改变时，页面不会重新加载。这就是路由里带#的原因
- hash 模式使用 location 来实现，打包上线后，没有任何问题

2. history 模式

- 这种模式充分利用 history.pushState API 来完成 URL 跳转而无需重新加载
- history 模块打包上线后，刷新页面会出现 404，需要在后端服务上做重定向处理

---

## 路由守卫

---

1. 作用

- 把原来没有限制条件的路由跳转，添加上限制条件

2. 全局前置守卫

- 使用 _router.beforeEach_ 注册一个全局守卫。守卫会异步解析执行，此时触发的路由在所有守卫 _resolve_ 之前会一直处于等待中

```js
const router = new VueRouter({
  mode: hash,
  routes: [
    // ...
  ],
});

router.beforeEach((to, frm, next) => {
  // ...
});
```

| 参数 | 描述                   |
| ---- | ---------------------- |
| to   | 将要激活的目标路由组件 |
| from | 当前要离开的路由       |
| next | 处理当前守卫的状态     |

- _next_：_next()_ 会跳转 _to_ 指向的路由对象。_next(false)_：中断当前导航。_next(path)_ 跳转到一个其他的地址(_path_)，当前导航会中断。_next(error)_：当传入的 _error_ 是一个 _Error_ 实例时，则导航会被终止且该错误会被传递给 _router.onError()_ 注册过的回调

3. 全局解析守卫

- 使用 _router.beforeResolve_ 注册一个全局守卫，它类似于全局前置守卫，区别是在 **导航被确认** 之前，同时在 **所有组件内守卫和异步路由组件** 被解析之后，解析守卫就被调用

4. 全局后置守卫

- 全局后置钩子不会接受 _next_ 函数也不会改变导航本身。它会在导航被确认之后、Dom 更新前被调用

```js
router.afterEach((to, from) => {
  // ...
});
```

5. 组件独享守卫

- 与全局前置守卫类似，但它是属于某路由组件被激活时会调用的钩子

```js
const router = new VueRouter({
  mode: hash,
  routes: [
    {
      path: '/home',
      component: (resolve) => require(['/Home.vue'], resolve),
      beforeEnter: (to, from, next) => {
        // ...
      },
    },
  ],
});
```

6. 组件内的守卫

- _beforeRouteEnter_：发生在组件生命周期之前，如果被拦截，组件无法实例化。无法获取组件实例 this，守卫执行前，组件实例还没被创建
- _beforeRouteUpdate_：可以访问组件实例 `this`。在当前路由改变，但是该组件被复用时调用。举例来说，对于一个带有动态参数的路径 _/foo/:id_，在 _/foo/1_ 和 _/foo/2_ 之间跳转的时候，由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用
- _beforeRouteLeave_：可以访问组件实例 `this`。导航离开该组件的对应路由时调用，我们可以用来提示用户保存完数据在离开

```js
const Foo = {
  template: `...`,
  beforeRouteEnter(to, from, next) {},
  beforeRouteUpdate(to, from, next) {},
  beforeRouteLeave(to, from, next) {},
};
```

```js
beforeRouteLeave (to, from, next) {
    const contrim = confirm('Do you really want to leave? you have unsaved changes!')
    if(contrim){
      next()
    }else{
      next(false)
    }
}
```

7. 完整的导航解析流程

- 导航被触发。
- 在失活的组件里调用 beforeRouteLeave 守卫。
- 调用全局的 beforeEach 守卫。
- 在重用的组件里调用 beforeRouteUpdate 守卫 (2.2+)。
- 在路由配置里调用 beforeEnter。
- 解析异步路由组件。
- 在被激活的组件里调用 beforeRouteEnter。
- 调用全局的 beforeResolve 守卫 (2.5+)。
- 导航被确认。
- 调用全局的 afterEach 钩子。
- 触发 DOM 更新。
- 调用 beforeRouteEnter 守卫中传给 next 的回调函数，创建好的组件实例会作为回调函数的参数传入。
