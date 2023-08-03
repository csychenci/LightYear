---
title: 组件类型
date: 2020-07-07 22:05:46
order: 5
categories: React
tags:
  - JavaScript框架
  - React
---

## 组件的使用

---

1. 组件是什么

- 从广义上定义，组件是你网站的构建模块。它是能描述一个 `UI（用户界面）` 部分的完备的代码片段，组件允许你将 `UI` 拆分为独立可复用的代码片段，并对每个片段进行独立构思，通常我们使用 `JSX` 的方式来编写它
- 在组件构建的过程中，`CSS`、`HTML`、`JS` 三者紧紧耦合在一起，并且通常位于同一个文件里
- 例如我们使用原始 `HTML` 标签创建一个 `按钮(可理解为HTML组件)` ，并添加相应地 `CSS` 样式以及标签内内容

```html
<button class='btn'>Hello World</button>
```

- 在组件化的过程中，我们可能会封装成以下形式，并在里面添加更多的内容，以期望构建我们自己的模块

```html
<TestBtn>Hello World</TestBtn>
```

- 此时组件就成了我们的 **基础构建模块**，而不再局限于使用浏览器提供的原始标签等构建模块
- 元素是构成 react 应用的最小单位，它描述了我们在屏幕上想看到的内容，不同于浏览器的 html 节点，react 元素是创建开销极小的普通对象，react 会负责更新 dom 来与 react 元素保持一致，而元素组成了我们熟知的组件

2. 使用页面组件

- 通常我们将在浏览器中的每个页面定义在 `src/pages/*.js` 中的 react 组件

```jsx | pure
/** 
 * src/pages/index.js
 */

import React from 'react';

export default () => (
  <div style={{ color: `teal` }}>
    <h1>About Gatsby</h1>
    <p>Welcome Here</p>
  </div>
);
```

- 你还可以这样书写以在网页中使用这个组件，直接将它作为一个实例化的元素进行使用

```jsx
import React from 'react';

const ele = (
  <div>
    <h1 style={{ color: 'red' }}>Hello Gays</h1>
    <p>Welcome Here</p>
  </div>
);

export default function () {
  return <div>{ele}</div>;
}
```

3. 组件拆分

- 一般来说，页面组件 的内容是很繁杂的，这时候我们可以使用子组件，把 ui 划分成多个可复用的片段，并在不同的组件中使用它们

```jsx
/** 
 * Header、Content 可以分布在其他领域文件夹下
 * 这样就可以在多个组件中复用它们
 */
import React from 'react';

const Header = ({color,text}) => {
  return <h1 style={{ color }}>{text}</h1>
}

const Content = ({color,text}) => {
  return <p style={{color}}>{text}</p>
}

export default () => {
  return <div>
    <Header color="red" text="Hello Gays" />
    <Content color="teal" text="Welcome Here" />
  </div>
}
```

4. 组件之间的通信

- 通常，我们的可复用片段也就是这些子组件，我们希望它应该是动态化的，在不同的父组件中，它可以根据我们的需要或我们提供的数据具有不同的表现形式
- props 是 react 组件 使用的 属性（property）。组件可以接受任意类型的 props，包括原始类型、引用类型、react 元素等
- react 会将 jsx 所接收的属性(attributes)以及子组件(children)转换为单个对象传递给组件，这个对象就是 props

```jsx | pure
/** 
 * src/pages/index.js
 */
import React from 'react';
import {Header} from '../components/header';
export default () => (
  <div>
    <Header color="red" text="Hello Gays" />
    <p>Welcome Here</p>
  </div>
);
```

- 在子组件中，我们通过 props 接收传递过来的属性，你可以向子组件中传递多个 prop

```jsx | pure
/** 
 * components/header
 */
export const Header = ({color,text}) => {
  return <h1 style={{ color }}>{text}</h1>
}
```

- 因此，我们只需要利用 props 中传入不同的数据以实现组件的动态化，而不需要重写任何代码
- 组件无论是使用函数声明还是通过 class 声明，都决不能修改自身的 props。期间引入一个概念 **纯函数**，纯函数不会尝试更改入参，且 **多次调用时传入相同的入参始终返回相同的结果**。另外，react 严格要求所有 react 组件都必须像纯函数一样保护它们的 props 不被更改
- 但是，应用的 `UI` 是动态的，它会随着时间的推移而不断变化，因此，只靠 props 去传递状态显然是不够的，我们需要一个新的状态 state，它能允许组件随用户操作、网络响应或其他变化而动态的更改输出内容

---

## 组件的不同形式

---

1. 组件在 React 中的定义

- 组件，从概念上类似于 js 函数。它接收任意的入参(props)，并返回用于描述页面展示内容的 react

2. 函数组件与 class 组件

- 函数组件，通过接受唯一带有数据的 props 对象并返回一个 jsx，本质上是 js 函数的执行
- 函数式组件接收 props 作为自己的参数，而 props 的每次变动，组件都会重新渲染一次，也就是函数会重新执行。另外，函数式组件中不存在 this 指向

```jsx | pure
function TestComponentOne(props) {
  return <h1>Hello,{props.text}</h1>;
}
```

- 还可以使用 es6 的 class 来定义组件

```jsx | pure
class TestComponentOne extends React.Component {
  render() {
    return <h1>Hello,{props.text}</h1>;
  }
}
```

3. 组合组件

- 在前面的内容中，我们可以通过不同的 props 实现组件的不同表现形式。因此，我们可以利用同一组件来抽象出任意层次的细节

```jsx
import React from 'react';

function TestComponentOne(props){
  return <h1>Hello,{props.text}</h1>
}

function App(props){
  return (
    <div>
      {
        ["React","Gatsby","Redux"].map((text,idx) => {
          return <TestComponentOne text={text} key={idx} />
        })
      }
    </div>
  )
}

export default App
```

- 组件可以细分为更小的组件，用于 **描述其中某一部分的功能**。对于大型应用或复杂的组件本身来说，提取组件以构建可复用组件库将更有利于我们的代码可维护性和管理性
- 组合让组件交互方式更加简单，只有 props。而继承则比较复杂，因为存在父方法调用或者覆盖等场景

4. 阻止组件渲染

- 在有些时候，可能希望能隐藏组件，即使它已经被其他组件渲染。若要完成此操作，可以让 render 方法直接返回 null，而不进行任何渲染。在组件的 render 方法中返回 null 并不会影响组件的生命周期

```js
function OtherComponent(props) {
  return null;
}
```

---

## 受控组件与非受控组件

---

1. 受控组件
- **组件的展示完全由传入的属性决定**。比如说，如果一个输入框中的值完全由传入的 value 属性决定，而不是由用户输入决定，那么就是受控组件

```jsx
import React, { useState } from 'react';

export default () => {
  const [value, setValue] = useState('');
  const handleChange = (e) => setValue(e.target.value);

  return (
    <>
      <input value={value} onChange={handleChange} />
      {/* 只传value不传onChange事件，输入会不生效 */}
    </>
  );
};
```

2. 非受控组件
- 表单组件可以有自己的内部状态，而且它的展示值是不受控的。使用非受控组件，这时表单数据将交由 dom 节点来处理

```jsx
import React from 'react';

export default () => {
  const handleChange = (e) => {};

  return (
    <>
      <input onChange={handleChange} />
      {/* 组件内部自己控制自己的状态，父组件没有将value传递过去 */}
    </>
  );
};
```

- 日常开发中，大部分的表单元素其实都是受控组件，我们会通过外部的状态完全控制当前组件的行为

3. 状态管理

```jsx
import React, { useState, useCallback } from 'react';

const PriceInput = (
  { value = { amount: 0, currency: 'rmb' }, 
  onChange = () => {} 
  }
) => {
  const handleChange = 
    (deltaValue) => {
      onChange({
        ...value,
        ...deltaValue,
      });
    }

  return (
    <div className="exp-02-price-input">
      {/* 输入价格的数量 */}
      <input value={value.amount} onChange={(evt) => handleChange({ amount: evt.target.value })} />
      {/* 选择货币种类*/}
      <select
        value={value.currency}
        onChange={(evt) => handleChange({ currency: evt.target.value })}
      >
        <option value="rmb">RMB</option>
        <option value="dollar">Dollar</option>
      </select>
    </div>
  );
};

export default () => {
  const [value, setValue] = useState(undefined);
  // 使用PriceInput的初始值
  return <PriceInput value={value} onChange={setValue} />;
};
```

- 在上面这个自定义组件中，包含了 input 和 select 两个基础组件，当它们触发变化时，直接触发 onChange 事件让父组件去修改 value；并且它们自己显示的值，则完全来自于传递进来的 value
- 在上面的例子中，总结出两点：一是 **避免多余的状态**，我们不需要在 PriceInput 这个组件内部去定义状态用于保存 input 或 select 的 value；二是 **找到唯一准确的数据源**，这里内部两个基础组件的值，其准确且唯一的来源就是 value 属性，而不是其它的任何中间状态

4. 高阶组件

- 本身并不是组件，是一个函数，它接收一个组件作为参数，并且返回一个新的组件。它是一种基于 React 的组合特性而形成的设计模式

```jsx
import React from 'react';

const withScreenSize = Comp => {
  const size = screen.width;
  return () => {
    return <Comp size={size} />
  }
}

const App = (props) => {
  return <div>size：{props.size}</div>
}

export default withScreenSize(App)
```
