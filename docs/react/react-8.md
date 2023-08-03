---
title: Context
date: 2020-08-15 10:13:26
categories: React
order: 9
tags:
  - JavaScript框架
  - React
---


## 全局状态

---

1. Context 是什么

- `Context` 提供了一种方式，能够让数据在 `组件树` 中传递时不必一级一级的手动传递
- `Context` 的目的是为了共享可以被认为是 React 组件全局树的数据。并且 Context 是可以嵌套使用的，只需要将 `Provider` 嵌套即可

2. 为什么要使用 Context

- 一般情况下，数据在组件中，需要我们一级一级的传递，它是一种 `单向数据流` 的状态，也就是我们需要将 `prop` 依次由 `祖宗组件` 传递给 `父亲组件`，再由 `父亲组件` 传递给 `子组件`

3. 使用 props

- 组件在使用的过程中，不可避免地层层嵌套，在传 `props` 的过程中，如果使用 `props` 或 `this.props.propValue`，代码可能会变得非常臃肿且难以维护


```jsx
import React from 'react';
const TestSon = (props) => (
  <div style={{ border: '1px solid red' }}>
    <p>我是Test Son</p>
    <p>{props.msg}</p>
  </div>
);

const TestFather = (props) => (
  <div style={{ border: '1px solid blue', padding: '15px' }}>
    <p>我是 Test Father</p>
    <p>{props.msg}</p>
    <TestSon msg={props.msg} />
  </div>
);

const TestGp = () => (
  <div style={{ border: '1px solid green', padding: '15px' }}>
    <p>我是Test Gp</p>
    <TestFather msg="这是Gp传递过来的" />
  </div>
);

export default TestGp
```

4. 使用 context

```jsx
import React, { createContext } from 'react';

const TestContext = createContext();

const TestSon = 
(props) =>
 <TestContext.Consumer>{(msg) => <p>{msg}</p>}</TestContext.Consumer>;

const TestFather = (props) => (
  <div style={{ border: '1px solid blue', padding: '15px' }}>
    <p>我是 Test Father</p>
    <TestSon />
  </div>
);

const TestGph = () => (
  <TestContext.Provider value="这是Gp传递过来的">
    <div style={{ border: '1px solid green', padding: '15px' }}>
      <p>我是Test Gp</p>
      <TestFather />
    </div>
  </TestContext.Provider>
);

export default TestGph
```

5. 如何使用

- 首先需要引入 `React` 内置的 `React Context Api`，然后需要创建 `Provider`，接着再创建 `Consumer`
- `React.createContext`，用于创建一个 `Context`，它为我们提供了 `{Provider,Comsumer}` 方法，用于创建 `提供者`、`消费者`
- `createContext` 可以传入默认值，当 `Consumer` 向上找不到 `Provider` 时，如果 `createContext` 没有设置默认值， `React` 也不会报错；`createContext` 有设置默认值时，将会使用这个默认值

```js
const { Provider, Comsumer } = React.createContext();
// const {Provider,Comsumer} = React.createContext('defaultValue');
```

6. { Provider,Comsumer }

- Provider 组件用于注入全局的 data，包装了一系列共享的状态，并允许 Consumer 订阅 Context 的变化，一个 Provider 可以连接到多个 Comsumer
- Consumer 组件表示要消费 Provider 传递的数据，需要某响应组件订阅 Context，当 Provider（提供的值）发生变化的时候，所有的 Consumer 都将 re-render，也就是重新渲染

7. 函数组件中与类组件中使用 Consumer 的区别

- 子组件是函数组件，需要使用 `Context` 时，需要用 `Context.Comsumer` 包裹，通过 `value` 拿到传过来的数据
- 子组件是类组件，需要使用 `Context` 时，可以使用指定 `contextType` 读取当前的 `this.context`，可以在子组件中声明静态属性 `static contextTyoe=Context`，也可以在子组件外，定义 `TestComponent.contextType=Context`，通过 `this.context` 获取数据

8. contextType

- 上面我们提到了 `contextType`，它可以简化 `context` 的操作，不用 `comsumer` 我们也可以在子组件中拿到共享的数据
- `contextType` 只能在 `类组件` 中使用，一个组件如果有多个 `Comsumer`，`contextType` 只对其中一个有效，也就是说，`contextType` 只能有一个

9. context 较于 mobx、redux

- `context` 可以很好的帮组我们，把全局的 `store` 拆分成部分 `store`，对于内存/页面性能的占用优化比较大
- `全局store`，内存占用高，访问所有页面的残留数据都被缓存起来了，因此，我们可以直接用 `context` 管理整个项目，而不需要用 `mobx` 与 `redux`

---

## 通过 context 设置一个换肤功能

---

1. 设置皮肤效果

```js
// themeView.js
const themes = [
  {
    color: '#000000',
    background: '#eeeeee',
  },
  {
    color: '#ffffff',
    background: '#222222',
  },
  {
    color: 'blue',
    background: '#333',
  },
];

export default themes;
```

2. 设置 context 传值

```js
import React, { createContext, Component } from 'react';
import themes from './themeView.js';
const TestViewsContext = createContext();

class TestView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      theme: themes[0],
    };
  }
  ThemesChange(e) {
    const num = Math.floor(Math.random() * 3);
    this.setState({
      theme: themes[num],
    });
  }
  render() {
    return (
      <TestViewsContext.Provider value={this.state.theme}>
        <div>
          <TestSonView />
          <button onClick={this.ThemesChange.bind(this)}>Click me</button>
        </div>
      </TestViewsContext.Provider>
    );
  }
}

class TestSonView extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const theme = this.context;
    console.log(this.context);
    return (
      <div style={{ background: theme.background, color: theme.color }}>
        <p>换肤</p>
      </div>
    );
  }
}

TestSonView.contextType = TestViewsContext;

export default TestView;
```
