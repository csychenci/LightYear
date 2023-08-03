---
order: 1
---
## 模块化
---
1. 解决的问题
- 如何在前端项目中高效地管理和维护项目中的每一个 **资源**，模块化就是当前最主流的组织方式，它通过按照功能的不同划分为不同的模块单独维护的这样一种方式，来提高我们的开发效率，降低维护成本

2. 模块化的演进过程
- 基于 **文件划分方式**：通过文件来划分模块，完全依靠约定的方式来实现(不可靠)，在 html 文件中引入后，就可以直接调用 模块 中的成员

```js
/** module-a.js */
var name = "module-a";
function foo() {
  // .....
}

/** module-b.js */
var name = "module-b";
function foo() {
  // .....
}
```

- 在其他文件中通过 script 标签引入，一个标签对应一个模块，再在代码中去调用这个全局成员(可能是一个变量或者函数)

```html
<!-- 在其他文件中通过 script 标签引入 -->
<body>
  <script src="module-a.js"></script>
  <script src="module-b.js"></script>
  <script>
    foo();
    console.log(name)
  </script>
</body>
```
- 这种方式的缺点非常明显，第一：多个模块工作在全局，污染全局作用域，同名的成员容易造成命名冲突，并且每个成员所属的模块也难以分辨；第二：模块与模块之间的依赖关系无法管理；第三：没有私有空间，所有模块内的成员都能在模块外被访问和修改
- **命名空间方式**：每一个模块只允许暴露一个属性到全局环境中，所有的成员都挂载到这个模块下

```js
/** module-a.js */
window.moduleA = {
  name:"module-a",
  foo:function() {
  // .....
  }
}

/** module-b.js */
window.moduleB = {
  name:"module-b",
  foo:function() {
  // .....
  }
}
```
```html
<body>
  <script src="module-a.js"></script>
  <script src="module-b.js"></script>
  <script>
    moduleA.foo();
    console.log(moduleB.name)
  </script>
</body>
```
- 这种方式虽然 **解决了命名冲突** 的问题，但其他问题依然存在
- **IIFE**：立即执行函数，做法就是将每一个模块的成员放在立即执行函数中，它能形成一个私有作用域

```js
/** module-a.js */
(function () {
  var name = "module-a";
  function foo () {
  // .....
  }
  window.moduleA = {
    foo:foo
  }
})()

/** module-b.js */
(function () {
  var name = "module-b";
  function foo () {
  // .....
  }
  window.moduleB = {
    foo:foo
  }
})()
```
```html
<body>
  <script src="module-a.js"></script>
  <script src="module-b.js"></script>
  <script>
    moduleA.foo();
    console.log(moduleB.name)
  </script>
</body>
```
- 这种方式解决了全局作用域污染和命名冲突的问题，同时，它还能通过传入参数来声明这个模块的依赖，每个模块之间的依赖关系就变得明显了

```js
/** module-b.js */
(function ($) {
  var name = "module-b";
  function foo () {
  // .....
  }
  function println() {
    console.log($('#app').style.cssText)
  }
  window.moduleB = {
    foo:foo,
    println:println
  }
})(Jquery)
```
3. 模块加载的问题
- 上面的方式都是通过 script 引入到页面中，模块的加载会不受我们的控制。因此我们就需要去考虑在页面中引入一个 js 入口文件，其余用到的模块可以通过代码控制、按需加载
- 如今 js 的标准规范也进行了统一，在 nodejs 环境下，遵循 CommonJs 规范来组织模块；在浏览器环境下，遵循 EsModules 规范

4. 模块打包工具
- 一开始模块化只针对 js 文件的模块，但作为前端应用中的资源(图片、css等)它们也应该作为一个模块来使用
- 另一个的话，并不是所有的浏览器都支持新特性，因此，要考虑环境兼容的问题

|-|
|---|
|新特性代码编译|
|模块化 js 打包|
|支持不同类型的资源模块|

- 在我们的项目当中，基本上都会散落着各种各样的资源(代码及资源文件)，webpack 会根据我们的配置找到一个文件作为打包的入口(一般是一个 js 文件)，然后去解析其中依赖的模块以及这些模块之间依赖的其他模块，形成一个依赖树
- webpack 会根据这个依赖树找到每个结点所对应的资源文件，使用对应的加载器去加载不同类型的资源文件