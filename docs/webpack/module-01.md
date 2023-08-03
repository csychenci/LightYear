---
title: 模块规范
date: 2020-07-02 10:13:26
categories: React
order: 2
tags:
  - JavaScript框架
  - React
---


## 支持的规范

---

1. CommonJS 规范

- 一般用于 `服务端`，nodejs 是 commonjs 的一种实现。 **以同步的方式加载模块**，这是因为 nodejs 的执行机制是启动时去加载模块，而执行过程中是不需要去加载的，只会使用到模块

```js
/** 
 * 将内容作为一个整体进行导出
*/
module.exports = {
  a:1,
  b:2
};
```
```js
/** 
 * 单独导出某些模块
*/

exports.a = 1;
exports.b = 2;
```

```js
/** 
 * 使用require导入模块
*/
const moduleA = require('moduleA');
```

- 需要注意的是，从模块A导出的模块，被其他模块所引用时，这些模块引用到的都是同一个模块，也就是说，其他引用的模块可以篡改/添加模块A中的内容

```js
/**
 * modulea.js
 */

exports.a = 1;
exports.b = 2;

setTimeout(()=>{
  console.log(exports)
},2000)
```


```js
/**
 * moduleb.js
 * 运行moduleb之后，会发现modulea打印出来的 exports 对象中新增了属性
 * 这足以说明引用的是同一个对象
 */
const moduleA = require("modulea.js")

moduleA.moduleB = {
  name:"moduleb"
}
```
- 那么如果我们要导出都不是同一个引用，要怎么操作?

2. Amd 规范(Asynchronous Module Definition)
- 推崇 `依赖前置`，将文件的依赖通过数组的形式导入，然后当作函数的参数传递进函数使用，最后通过 `return` 来实现对外接口
- 属于 `异步加载模块`，一般用于客户端，requireJs 是 amd 规范的实现

```js
/** 
 * 通过 define 来定义一个模块
 * 第一个参数指明定义的模块被使用时的名字
 * 第二个参数声明当前模块被使用时所需要的依赖项
 * 第三个参数是一个函数，它的参数与导入的模块依赖项一一对应(依赖项所导出的成员)
*/
define('moduleA',['jquery', 'main.js'], function ($, main) {
  function start () {

  }
  return {
    name:'moduleA',
    start:start
  };
});
```

```js
/**
 * 加载模块时，内部会自动去创建一个 script 标签去发送对应的脚本文件的请求并且执行相应的模块代码
*/
require(["moduleA"],function (moduleA) {
  moduleA.start()
})
```

3. Cmd 规范
- 推崇 `就近依赖`，异步加载模块，当模块需要被用到时再去加载。seaJs 是 cmd 规范的实现(淘宝推出的)

```js
/**
 * 通过 define 使用
 * require(function): 是一个接收(引入)模块的标识，用于获取其他模块提供的接口
 * exports(object):  用于向外提供模块接口
 * module(object): 用于存储当前模块相关联的一些属性和方法
*/
define(function (require, exports, module) {
  var $ = require('juqery');
  var start = require("./time.");

  exports.run = function (dom) {
    $(dom).addEventListener("click",start);
  }

  module.exports = {
    // ...
  }
});
```

4. ES6 规范
- 使用 import 在文件内来导入一个模块，使用 export 在文件内导出一个模块。它是异步加载模块(特点见下面规范特性)

```js
/** 
 * moduleA.js
 * 一个模块内只能存在一个默认导出(default)
*/
const println = (value) => {
  return value
}

const add = (a, b) => {
  return a + b
}

const log = (value) => {
  console.log(value);
  return value
}

export const nameSpaced1 = 'hello modulea';

export let nameSpaced2 = 'i love coding';

export default log;
export {
  println,
  add
}
```

```js
/** 
 * moduleB.js
 * 还可以使用 as 重命名
*/
import log,{
  println,
  nameSpaced1,
  add as moduleA_add
} from 'moduleA';
```


```js
/** 
 * moduleB.js
 * 或者将导入的成员直接导出
 * 这种情况下当前作用域就不支持访问这些成员了
*/
export log,{
  println,
  nameSpaced1,
  add as moduleA_add
} from 'moduleA';

println(); // error,println is not defined
```

- esm 还支持动态加载模块，有些情况下，我们的模块路径可能是不确定的，这就需要动态的去加载它

```js
/** 
 * 返回的是一个 promise 对象
*/
import('./module.js').then(function (module) {
  console.log(module)
})
```

- esm 具有以下几个特性，一：会自动采用严格模式，忽略 use strict；二：每个 es module 都是运行在单独的私有作用域中，不同模块下的同名变量不会互相影响；三：esm 是通过 cors 的方式请求外部 js 模块的；四：esm 的 script 标签会延迟执行脚本(相当于设置了 defer 属性)

```html
<body>
  <script type="module" src="./module.js"></script>
</body>
```

```js
// module.js
alert("waiting....");
```

- esm 对外部暴露的是一个引用，并不是值的拷贝，并且引入的模块是只读的，它并不支持修改