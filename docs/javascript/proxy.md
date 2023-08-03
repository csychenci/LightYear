---
title: Proxy
date: 2021-04-02 15:07:48
categories: JavaScript
sidemenu: true
toc: 'content'
order: 21
author: chencicsy
tags:
  - proxy
  - JavaScript
description:
---

## proxy

---

1. 代理

- `ES6` 新引入的 `Proxy` 对象可以拦截某些操作并实现自定义行为。它用于创建一个对象的代理，从而实现基本操作的拦截和自定义（属性查找、赋值、枚举、函数调用等）

- 通过 Proxy 构造器创建一个新的 Proxy 对象。构造器接收两个主要参数

```js
/** 
  * @target
  * @handler
  * target：被代理的对象
  * handler：被代理对象上的自定义行为
*/
new Proxy(target, handler)
```

- *target*：Proxy 会对 target 对象进行包装。它可以是任何类型的 **对象**，包括内置的数组、函数甚至是另一个代理对象
- *handler*：它是一个对象，他的属性提供了 **某些操作发生时** 所对应的处理函数。当 handler 参数为空时，Proxy 将会创建一个与被代理对象行为几乎完全相同的代理对象

2. 使用方法
- 定义一个 get() 自定义被代理对象的访问器属性

```js
let target = {
  name: '小明',
  enName: 'xiaoming'
}

let proxy = new Proxy(target,{
  /**
    * target 表示被代理的原对象
    * prop 表示访问代理器对象的哪一个属性
    * receiver 表示代理对象
   */
  get:function(target,prop,receiver){
    return Reflect.ownKeys(...arguments)
  }
})

console.log(proxy.name)
```

3. 处理函数
- 代理函数可以在代理对象发生某些行为时被调用
- **handler.apply**：用于拦截函数的调用。它会拦截目标对象的以下操作

|被拦截的操作|
|---|
|proxy(...args)|
|Function.prototype.apply()|
|Function.prototype.call()|
|Reflect.apply()|


```js
/** 
  * target：目标对象/函数，apply里面的target必须是可调用的
  * thisArg：被调用时的上下文对象
  * arguments：被调用时的参数数组
  * @returnValue : any
*/
const proxyFn = (...rest) => {
  console.log(rest)
  return rest.reduce((prev,curr)=>{
    return prev + curr
  },0)
}

const handler = {
  apply:function(target,thisArg,arguments) {
    return target(...arguments.map(item => item * 2))
  }
}

const proxy = new Proxy(proxyFn,handler)

proxy(1,2,3,4,5); // 30

proxyFn(1,2,3,4,5); // 15
```

- **handler.construct**：用于拦截当代理对象被 new 操作符调用时。为了使 new 在 proxy 对象上生效，用于初始化代理的 **目标对象** 必须具有 `[[Construct]]` 内部方法(**new target 必须是有效的**)

|被拦截的操作|
|---|
|new proxy(...args)|
|Reflect.construct()|

```js
/** 
  * target：目标对象
  * arguments：constructor 的参数列表
  * newTarget：最初被调用的构造函数，在下面例子中是 proxy1
  * @returnValue : 可以手动返回一个对象或者 new Target
*/
function Person (name,age) {
  this.name = name;
  this.age = age;
}

let proxy1 = new Proxy(function() {}, {
  construct: function(target, arguments, newTarget) {
    return new target(...arguments)
  }
});

new proxy1()
```
