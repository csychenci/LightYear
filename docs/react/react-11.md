---
title: react性能优化
date: 2021-05-08 10:13:26
order: 12
categories: React
tags:
  - JavaScript框架
  - React
---


## 虚拟 DOM 的 Diff 算法

---

1. difference 算法
- 用于比较原始虚拟 DOM 和新的虚拟 DOM 的区别，也就是两个 JS 对象的比较
- _setState_ 是异步的，为了提升 react 底层的性能，是为了防止时间间隔很短的情况下多次改变 state，React 会在这种情况下将几次改变 state 合并成一次从而提高性能
- diff 算法是同级比较，假设第一层两个虚拟 DOM 节点不一致，就不会往下比了，就会将原始页面虚拟 DOM 全部删除掉，然后用新的虚拟 DOM 进行全部的替换，虽然这有可能有一些性能的浪费，但是由于同层比对的算法性能很高，因此又弥补了性能的损耗

2. 性能优化遵循的法则
- 法则就是 *将变的部分与不变的部分分离*。其中变的部分分为三种，也就是 *props*、*state*、*context*，而 *props*、*context* 都是由 *state* 衍生出来的。我们将父组件的 *state* 传给子组件，那就是作为子组件的 *props*，而父组件的 *state* 传给子组件作为一个 *context*，那就会作为子组件的 *context*
- 将 *变的部分* 与 *不变的部分* 分离，有助于减少组件无用的渲染，也就是说，我们只需要变的部分渲染，而不变的部分维持原样
```tsx
import React,{useState} from 'react';

const TestComp1 = (props) => {
  console.time('TestComp1 render')
  for(let i = 0;i<10000;i++){

  }
  console.timeEnd('TestComp1 render')

  return <div>TestComp1</div>
}

export default () => {

  const [param,setParam] = useState('');

  return <div>
    <input value={param} onChange={(e)=>setParam(e.target.value)} />
    <TestComp1 />
  </div>
}
```
- 上面代码的问题可以很容易发现，我们对它进行改造一下
```tsx
import React,{useState} from 'react';

const TestComp1 = (props) => {
  console.time('TestComp1 render')
  for(let i = 0;i<10000;i++){

  }
  console.timeEnd('TestComp1 render')

  return <div>TestComp1</div>
}

const TestComp2 = (props) => {
  const [param,setParam] = useState('');

  return <><input value={param} onChange={(e)=>setParam(e.target.value)} /></>
}

export default () => {
  console.log('re-render')
  return <div>
    <TestComp2 />
    <TestComp1 />
  </div>
}
```
- 再来看看另一种情况，当包裹组件的父级就使用了变化的部分时，这时该如何去优化它的性能呢
```tsx
import React,{useState} from 'react';

const TestComp1 = (props) => {
  console.time('TestComp1 render')
  for(let i = 0;i<10000;i++){

  }
  console.timeEnd('TestComp1 render')

  return <div>TestComp1</div>
}

export default () => {

  const [param,setParam] = useState('');

  console.log('re-render')

  return <div title={param}>
  <input value={param} onChange={(e)=>setParam(e.target.value)} />
  <TestComp1 />
  </div>
}
```
- 此时，我们可以将这个父级作为一个容器抽离出去，在传入一个 children。我们可以发现，当改变input的时候，children的部分并不会重新渲染。在这里，变的部分全部抽离到 TestWrapper 中了，而 App 里没有 props、state、context，所以它是一个不变的部分
```tsx
import React,{useState} from 'react';

const TestComp1 = (props) => {
  console.time('TestComp1 render')
  for(let i = 0;i<10000;i++){

  }
  console.timeEnd('TestComp1 render')

  return <div>TestComp1</div>
}

const TestWrapper = ({children}) => {
  const [param,setParam] = useState('');
  return <div title={param}>
  <input value={param} onChange={(e)=>setParam(e.target.value)} />
  {children}
  </div>
}

const App = () => {
    console.log('re-render')

  return <TestWrapper>
    <TestComp1 />
  </TestWrapper>
}

export default App;
```

- 那么对于任何一个组件，当父组件满足了性能优化条件时，父组件传给子组件的 props 才是不变的，并且子组件需要满足自身的 state 和 context都不变化，子组件才可能命中性能优化
- 当父组件满足性能优化的时候，子孙组件可能命中性能优化。也就是说，state、context、props 这三者是有可能影响函数的渲染结果的，但这三者都不变时，就能保证这个函数的返回值与更新前是一样的(复用之前的更新的结果)

3. 如何判断变的部分不变