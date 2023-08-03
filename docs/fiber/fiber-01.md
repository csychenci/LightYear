---
title: Fiber源码
date: 2022-07-07 10:29:05
categories: Fiber
order: 1
tags:
  - React
  - javascript
  - fiber
---


## Fiber
---
1. 为什么React要引入fiber
- 在页面元素很多且需要频繁刷新的场景下，React15 会出现掉帧的现象，主要是 React15 的渲染机制是全量渲染的，渲染过程是不可中断。如果每次渲染的时间过长，就会出现掉帧的情况
- 针对这个情况，React 从框架层面对 web 页面的运行机制做了优化，也就是 Fiber

2. 虚拟dom
- 我们先来创建一个组件，再将组件输出出来，看下它的结构

```jsx
import React from 'react';

const Selement = (props) => {
  return (
    <div id="box">
      <div className="box1">box1</div>
      <div className="box2">box2</div>
    </div>
  )
}

export default Selement
```
- 看下输出出来的渲染出来的组件，是一个对象的结构，它就是一个虚拟Dom

```js
const Selement = {
  $$typeof: Symbol(react.element)
  key: null
  props: {}
  ref: null
  type: ƒ Selement(props)
  _owner: null
  _store: {validated: false}
  _self: null
  _source: null
}
```

3. 什么是 Fiber
- Fiber 其实就是一种数据结构，一个纯 js 对象。除此之外，它还是一个执行单元，每次执行完一个执行单元，react 就会检查现在还剩多少时间，如果没有时间就将控制权让出去
- 特性一：**增量渲染**。通过 fiber 可以将渲染任务进行拆分，分配到每一帧里面去执行
- 特性二：**暂停、终止、复用渲染任务**
- 特性三：在更新的时候可以给这些渲染的任务赋予不同的优先级，高优先级的任务先被更新，它允许对队列中的任务进行插队
- 特性四：并发方面新的基础能力。react 可以暂停高消耗、非紧急的组件的渲染，并聚焦在更加紧迫的任务中，始终保持 ui 高度响应状态