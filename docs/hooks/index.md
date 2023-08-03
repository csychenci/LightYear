---
title: Hooks介绍
sidemenu: true
toc: 'content'
order: 0
date: 2020-08-13 11:23:48
author: chencicsy
categories: Hooks
tags:
  - 原始数据类型
  - JavaScript
  - React
  - Hooks
---


## Hooks

---

1. React 的基本概念

- 使用组件的方式描述 ui: 在 react 中，所有的 ui 都是通过组件去描述和组织的，可以认为 react 中所有的元素都是组件。它们分为 _内置组件_ 和 _自定义组件_，这些组件通过树状结构组织在一起
- 利用 props 和 state 管理状态：react 的核心机制在于数据变化的时候自动渲染 ui，这个保存状态的机制就是 state(维护组件的状态)；而 props(组件之间的交互)类似于 html 标记上属性的概念，用于在父子组件之间传递状态
- JSX 的本质：实际上 JSX 并不是一种新的语法，而是一个语法糖，它可以我们构建组件变得更加直观和高效，但它同时具备了 js 的表达能力

```jsx | pure
<div>
  <button onClick={setCount(count + 1)}>
    <span>{count}</span>
  </button>
</div>
```

```jsx
/**
 * title: 使用hooks定义的简单计数器
 * defaultShowCode: true
 */
import React, { useState } from 'react';
// 上面的写法用js的方式写
export default () => {
  const [count, setCount] = useState(0);

  return React.createElement(
    'div', // 第一个参数表示组件的类型
    null, // 第二个参数表示传给组件的属性，也就是props
    React.createElement(
      'button',
      {
        onClick: function onClick() {
          return setCount(count + 1);
        },
      },
      React.createElement('span', null, count), // 第三个参数表示子组件
    ),
  );
};
```

2. 简单 demo

- 场景如下：页面上有一个按钮，点击后，可以发送一个请求获取一个用户列表并显示在页面上。此时需要考虑数据状态、loading 的状态、错误状态

```jsx
import React, { useState } from 'react';

export default () => {
  const [users, setUsers] = useState([]); // 保存用户列表的状态state
  const [loading, setLoading] = useState(false); // 保存加载状态的loading
  const [error, setError] = useState(null); // 保存错误状态

  const fetchUsers = async () => {
    // 函数组件重新执行，该函数会被重新定义多次
    setLoading(true);
    try {
      const res = await fetch('https://reqres.in/api/users/');
      const json = await res.json();

      setUsers(json.data);
    } catch (err) {
      setError(err);
    }
    setLoading(false);
  };

  return (
    <div className="userList">
      <button onClick={fetchUsers} disabled={loading}>
        {loading ? 'Loading...' : 'Show Users'}
      </button>
      {!users && error && <div style={{ color: 'red' }}>Failed：{String(error)}</div>}
      <ul>
        {users.length > 0 &&
          users.map((user) => {
            return <li key={user?.id}>{user?.first_name}</li>;
          })}
      </ul>
    </div>
  );
};
```

- 在 React 组件中，任何一个 state 发生变化时，整个函数组件其实是被完全执行一遍的，而且除了 state，多次的执行之间没有任何关系。因此，在考虑一个场景的实现时，首先就是要考虑这个组件 **有哪些状态(state)**，**这些状态的变化是由什么触发的**，这样才能将整个功能串联起来

3. React 组件的本质

- 它的本质其实就是从 `Model(state + props)` 到 `View` 的映射。Model 中的状态变化时，UI 会自动变化，因此，我们不用再去考虑当 _Model_ 变化时，Dom 节点应该如何变化的细节问题。我们只需要通过 JSX，根据 Model 的数据用声明的方式去描述 UI 的最终展现就可以了，因为 React 会帮助你处理所有 DOM 变化的细节
- 我们可以把 `UI` 的展现看成一个函数的执行过程。其中，`Model` 是输入参数，函数的执行结果是 `DOM` 树，也就是 View。而 `React` 要保证的，就是每当 `Model` 发生变化时，函数会重新执行，并且生成新的 `DOM` 树，然后 `React` 再把新的 `DOM` 树以最优的方式更新到浏览器
- 那么，`Class` 作为 React 组件的载体，也许并不是最适合，反而函数是更适合去描述 State => View 这样的一个映射。但是函数组件有一个局限是，无法存在内部状态，并且必须是纯函数，而且还无法提供完整的生命周期机制

4. hooks 的诞生

- 函数组件在重新渲染的时候，整个函数会重新执行，那么就无法通过一个常规的手段去 **保留这个函数多次执行之间的状态 state**。如果我们给函数组件加上状态，那么它就更有用了。但是函数与对象不同，并没有一个实例的函数能够在多次执行之间保存状态，那势必需要一个函数之外的空间来保存这个状态，而且要能够检测其变化，从而能够触发函数组件的重新渲染
- 因此我们需要这样一个机制，能够把一个外部的数据 **绑定到函数的执行**。当数据变化时，函数能够自动 _重新执行_。这样的话，任何会影响 UI 展现的外部数据，都可以通过这个机制绑定到 React 的函数组件，这就是 Hooks
- `Hooks` 只能运行在函数组件中，不能运行在类组件中，`Hooks` 只能运行在函数组件的 `内部顶层中`，不能运行在 `if/for` 等其他函数的代码体内，不允许被 `if/for` 等包裹住

5. hooks 的好处

- 那么最关键的，就是简化了逻辑复用。如果有多个组件需要用户调整浏览器窗口大小后，重新调整布局，那么我们可以把这样一个逻辑提取成一个公共的模块供多个组件使用

```jsx
import React from 'react';

const withWindowSize = (Component) => {
  // 产生一个高阶组件 WrappedComponent，只包含监听窗口大小的逻辑
  class WrappedComponent extends React.PureComponent {
    constructor(props) {
      super(props);
      this.state = {
        size: this.getSize(),
      };
    }
    componentDidMount() {
      window.addEventListener('resize', this.handleResize);
    }
    componentWillUnmount() {
      window.removeEventListener('resize', this.handleResize);
    }
    getSize() {
      return window.innerWidth > 1000 ? 'large' : 'small';
    }

    handleResize = () => {
      const currentSize = this.getSize();
      this.setState({
        size: this.getSize(),
      });
    };

    render() {
      // 将窗口大小传递给真正的业务逻辑组件
      return <Component size={this.state.size} />;
    }
  }
  return WrappedComponent;
};

export default withWindowSize((props) => {
  const { size } = props;
  return <div>{size}</div>;
});
```

- 可以看到，为了传递一个外部的状态，我们不得不定义一个没有 UI 的组件用于封装一段可重用的逻辑。并且高阶组件还是组件中实现代码逻辑复用的唯一方式，代码难理解，不直观；它还会增加很多额外的组件节点，每一个高阶组件都会多一层节点，这就会给调试带来很大的负担

```jsx
import React, { useState, useEffect } from 'react';

const getSize = () => {
  return window.innerWidth > 1000 ? 'large' : 'small';
};

const useWindowSize = () => {
  const [size, setSize] = useState(getSize());

  useEffect(() => {
    const handler = () => {
      setSize(getSize());
    };
    window.addEventListener('resize', handler);
    return () => {
      window.removeEventListener('resize', handler);
    };
  }, []);

  return size;
};

export default (props) => {
  const size = useWindowSize();
  return <div>{size}</div>;
};
```

- 窗口大小只是作为外部的一个数据状态而存在，**通过自定义 Hooks 的方式封装成一个可绑定的数据源。当数据源变化时，使用这个 Hooks 的组件都会重新渲染**，并且代码更加简洁和直观、不会产生额外的组件节点
- 除了 _逻辑复用_ 外，Hooks 还有助于 _关注分离_。Hooks 能够让针对同一个业务逻辑的代码尽可能聚合在一块儿。这是过去在 Class 组件中很难做到的。因为在 Class 组件中，你不得不把同一个业务逻辑的代码分散在类组件的不同生命周期的方法中。[官方 react-router 的例子，以路由作为数据源](https://github.com/streamich/react-use/blob/master/src/useLocation.ts)

6. StrictMode

- 开发环境下，可能会出现函数组件执行两次的情况，但严格的模式检查只在开发模式下运行，它们不会影响产品构建，只是为了预防副作用带来的影响，你也可以将 StrictMode 去掉，默认 React 会加上。一般来说，state 与 props 是一样的，那么渲染结果也会是一样的，但如果你代码里存在了副作用，可能导致重复渲染的结果不一致

---

## Hooks 的 Capture Value 特性

---

1. Function/class Component

- **_函数式组件捕获了渲染所用的值_**，就像是我关注了某个人，当我跳转至其他人的页面时，我的组件不应该对我实际关注的人是谁而感到困惑
- 类组件的 this 在重新渲染时可能导致原先的 this 丢失，this 指向新的组件实例，但是 props 是不可变的，this 本身在 `class Component` 中却是可变的，因此 `this.props` 的调用会导致每次都访问最新的 `props`

2. 每次 `render` 都有自己的 `props` 和 `state`

- 每次 `Render` 的内容都会形成一个快照并保存下来，因此当状态更新而 `Rerender` 时，就形成了很多个 `Render` 状态，而每个 `Render` 状态都拥有自己固定不变的 `props` 和 `state`
- 也就是说，每次渲染时，都是独立的

---

## 记忆函数

---

1. 什么是记忆函数

- 简而言之，就是当我们输入与上一次相同的参数时，它能返回给我们上一次的结果。因此，我们不需要它重新执行一遍，只需要 `对比` 这次的参数与上次的参数 `是否一致`，直接将结果返回给我们就行
- `hooks` 中的大部分 API 都具有记忆功能。`useState`、`useEffect`、`useReducer`、`useRef`、`useMemo`、`useCallback`
- js 中的函数在执行完毕后，调用栈中的该函数创建的上下文就会被销毁，但我们知道，只要程序不结束运行或浏览器不被关闭，全局环境中的变量对象就不会被销毁，那么，如何通过创建函数的方式来保存我们想要的保存的变量呢

```js
// 答案是通过闭包产生一个不被销毁的变量对象
function saveMemberResult() {
  let previousValue = -1;
  // 保存上一次的目标值
  let previousCount = 0;
  // 保存上一次对应的目标值的结果
  return function (target) {
    if (target === previousValue) {
      return previousCount;
    }
    console.log('传入的参数与上次不一致，我将执行一次');
    // 访问上层作用域的变量对象
    let sum = 0;
    previousValue = target;
    // 保存上一次执行的参数
    for (let i = 0; i < target; i++) {
      sum += i;
    }
    previousCount = sum;
    // 保存上一次执行的结果
    return sum;
  };
}
var result = saveMemberResult();
console.log(result(5));
console.log(result(5));
console.log(result(5));
```

|          执行体          | 结果                                     |
| :----------------------: | :--------------------------------------- |
| `console.log(result(5))` | 传入的参数与上次不一致，我将执行一次; 10 |
| `console.log(result(5))` | 10                                       |
| `console.log(result(5))` | 10                                       |

---
