---
title: 从生命周期到hooks
date: 2021-08-07 16:48:55
categories: React-Hooks
order: 4
tags:
  - JavaScript框架
  - React
---

## 函数组件

---

1. 忘掉 class 的生命周期

- _React_ 的本质是从 _Model_ 到 _View_ 的映射。当状态 _state_ 永远不变时，那么实际上函数组件就相当于是一个 **`只执行一次`** 的模板引擎
- 那么当状态变化时，组件就可能重新渲染。而引起状态变化的原因基本是以下两个：一. **用户操作产生的事件，如点击了某个按钮**。二. **副作用产生的事件，如发起某个请求正确返回了**
- 而这两个事件本身并不会导致组件的重新渲染。但我们在这两种事件处理函数中，一定是因为改变了某个状态，这个状态可能是 _State_ 或者 _Context_，从而导致了 _UI_ 的重新渲染

| 情景               | class 组件                           | 函数组件                         |
| ------------------ | ------------------------------------ | -------------------------------- |
| 用户操作产生的事件 | 通过事件处理函数来改变某个 state     | 通过事件处理函数来改变某个 state |
| 副作用产生的事件   | 手动判断 props 或 state 的变化来执行 | 通过 useEffect 来执行            |

```js
class TestView extends React.Component {
  // ...
  componentDidMount() {
    // 组件第一次加载时获取详情数据
    getDetail(this.props.id);
  }
  componentDidUpdate(prevProps) {
    if (prevProps.id !== this.props.id) {
      // 当_id 发生变化时去获取详情
      getDetail(this.props.id);
    }
  }
  // ...
}
```

- 在 class 组件中，需要在两个生命周期方法中去实现副作用。一个是初始化加载时，另一个是每次 UI 更新后

```js
// 对应到函数式组件中
function TestView(props) {
  useEffect(() => {
    getDetail(props.id);
  }, [id]);
  // 根据依赖重新获取详情数据
}
```

- 因此，我们可以发现，在函数式组件中我们只需要考虑 **当某个状态变化时，我要去做什么**，而不是在 _class_ 组件中的某个生命周期方法中我要做什么

2. 组件的生命周期

- class 组件中有一个专门的方法 _constructor(构造函数)_，可以在里面做一些初始化的操作，例如 _设置 state 的初始状态_、_定义一些类的实例的成员_ 等。但函数组件只是一个函数，并不具备类的实例这样的概念，那么也不存在所谓的构造函数了
- 那么我们如果要在函数组件中去做这样一件初始化的事情呢，应该如何去做呢? 结论是 **函数组件基本上没有统一的初始化需要，因为 Hooks 自己会负责自己的初始化**

```js
import React, { useState } from 'react';
const comp = (props) => {
  const [temp, setTemp] = useState(0);
  // 接收0作为temp这个state的初始值
  return <span>{temp}</span>;
};
```

- 但是，在 class 的构造函数中，我们不只是初始化 state，还可能有其他的逻辑。而构造函数的本质其实就是 **在所有其他代码执行之前的一次性初始化工作**，因此我们只需要在函数组件实现 **一次性的代码执行** 这个机制就可以了

```jsx
import React, { useRef, useState } from 'react';

const useSingleTask = (callback) => {
  const called = useRef(false);
  // 用一个called Ref标记 callback 是否被执行过
  if (called.current) return;
  // 首次被执行过，则直接返回
  callback();
  called.current = true;
};

const Comp = () => {
  useSingleTask(() => {
    console.log('我只会在首次渲染时执行');
  });

  const [count, setCount] = useState(0);

  console.log('render');

  return (
    <div>
      <p>{count}</p>
      <button
        onClick={() => {
          setCount(count + 1);
        }}
      >
        setCount
      </button>
    </div>
  );
};

export default Comp;
```

- `useSingleTask` 这个 hooks 的核心逻辑就是定义只执行一次的代码，而是否在所有代码之前执行，取决于在哪里调用。因此在日常开发中，是无需将功能映射到传统的生命周期的构造函数的概念中的，而是要从函数的角度出发，去思考 **功能应该如何实现**

```jsx
import React, { useRef, useState } from 'react';

const useSingleTask = (callback) => {
  const [called, setCalled] = useState(false);
  // 用一个called Ref标记 callback 是否被执行过
  if (called) return;
  // 首次被执行过，则直接返回
  callback();
  setCalled(true);
};

const Comp = () => {
  useSingleTask(() => {
    console.log('我只会在首次渲染时执行');
  });

  const [count, setCount] = useState(0);

  console.log('render');

  return (
    <div>
      <p>{count}</p>
      <button
        onClick={() => {
          setCount(count + 1);
        }}
      >
        setCount
      </button>
    </div>
  );
};

export default Comp;
```

- 让我们来看看，使用 `useState` 作为标记时，会出现什么样的情况呢?我们会发现使用 `useSingleTask` 的函数组件渲染了两次，这意味当函数组件渲染完成后，因为自定义 hook 的状态变化使得函数组件重新渲染

3. 区别性

| useEffect | componentDidUpdate | componentDidMount | componentWillUnmount |
| --- | --- | --- | --- |
| useEffect(()=>{},[]) | - | 仅在组件首次渲染后执行 | - |
| useEffect(()=>{},[deps]) | 仅在依赖项变化时才执行，而 componentDidUpdate 则一定会执行，需要手动判断某个状态是否变化，再执行特定的逻辑 | - | - |
| useEffect(()=>{ return ()=>{}},[deps]) | - | - | callback 返回的函数（一般用于清理工作）在下一次依赖项发生变化(组件渲染完成，下一次副作用逻辑执行之前)以及组件销毁之前执行，而传统的 componentWillUnmount 只在组件销毁时才会执行 |
