---
title: 事件处理
date: 2020-07-10 15:34:44
categories: React
order: 7
tags:
  - JavaScript框架
  - React
---

## 事件处理

---

1. React 元素的事件处理

- react 事件 的命名采用 小驼峰式（camelCase），而不是纯小写。在使用 jsx 语法时你需要传入一个函数作为 `事件处理函数`，而不是一个字符串
- 在 jsx 中不能通过返回 `false` 的方式阻止 `默认行为`，必须显示的指定 `preventDefault`

2. 组件中事件处理的书写形式

- ES6 的书写形式，需要显示的传递事件对象

```js
class TestComponent extends React.Component {
  constructor(props) {
    super(props);
  }
  handleClick() {
    // ...
  }
  render() {
    return <button onClick={(e) => this.handleClick(arg, e)}>Click</button>;
  }
}
```

- ES5 的书写形式下，事件对象会被作为第二个参数传递

```js
class TestComponent extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(e) {
    // ...
  }
  render() {
    return <button onClick={this.handlerClick}>Click</button>;
  }
}
```

```js
class TestComponent extends React.Component {
  constructor(props) {
    super(props);
  }
  handleClick(e) {
    // ...
  }
  render() {
    return <button onClick={this.handlerClick.bind(this)}>Click</button>;
  }
}
```

- 如果通过箭头函数的方式，事件对象必须显式的进行传递，而通过 `bind` 的方式，事件对象以及更多的参数将会被隐式的进行传递
