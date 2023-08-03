---
title: styled-components
date: 2021-08-12 00:04:56
categories: React
order: 13
tags:
  - JavaScript框架
  - React
---

## Styled-Components

---

1. 优点

- 支持完全的 css 写法，包括各类嵌套以及伪元素、动画及媒体查询等
- 支持根据外界状态(props)设置样式，支持主题
- 支持服务端渲染以及各种静态生成工具(Gatsby)
- 支持跨端应用(React Native)

2. 使用方式

- _`样式组件`_ 利用标记的模板文字来设置组件的样式。当我们定义我们的样式时，实际上是创建了一个普通的 _`react`_ 组件，在这上面附加了我们的样式
- 在 js 或 tsx 中新建一个变量，用来表示一个元素的样式

```js
// 新建一个Button组件，并添加一些样式，它基于button添加
const Button = styled.button`
  border: 1px solid skyblue;
  width: 40px;
  height: 15px;
  font-weight: 500;
`;
// button可以像jsx那样使用

export default (props) => {
  return <Button>提交</Button>;
};
```

- 我们还可以基于外界状态(`props`)来设置我们的状态

```js
const WrapperBtn = styled.button`
  background: ${(props) => (props.primary ? 'palevioletred' : 'white')};
  color: ${(props) => (props.primary ? 'white' : 'palevioletred')};
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
`;

export default (props) => {
  return (
    <div>
      <Button>Normal</Button>
      <Button primary>Primary</Button>
    </div>
  );
};
```

```js
const Element = (props) => <div className={props.className}>{props.children}</div>;

const StyleElement = styled(Element)`
  width: 200px;
  height: 200px;
  border: 1px solid #333;
  color: green;
  span {
    color: ${(props) => {
      return props.color ? props.color : 'skyblue';
    }};
    font-weight: 600;
  }
`;

export default (props) => {
  return <StyleElement color="red">提交</StyleElement>;
};
```

- 但每次 _`props`_ 变化时，_`styled-components`_ 都会生成新的类名，并将其重新注入到文档的 _`<head>`_ ，这样可能会出现性能问题(如执行 js 动画时)
- 我们可以使用 _css 变量_ 来解决这个问题

```js
const Wrapper = styled.div`
    opacity:var(--opacity);
    background:var(--color);
`
const StyleWrapper = ({opacity,color,children}) {
    return (
      <Wrapper
          style={{
            '--opacity':opacity,
            '--color':color
          }}
          {children}
      ></Wrapper>
    )
}
```

- css 变量还可以用于指定默认值

```js
const Wrapper = styled.div`
  opacity:var(--opacity,0.5);
  background:var(--color,var(--color-gray-900));
`
const StyleWrapper = ({opacity,color,children}) {
  return (
    <Wrapper
        style={{
          '--opacity':opacity,
          '--color':color
        }}
        {children}
    ></Wrapper>
  )
}
```

3. 扩展样式

- 在项目中，我们不可能把所有的样式全写在 js 中，这样过多的样式重复编写，会加大我们的工作量，降低工作效率。此时，styled-components 给我们提供了继承的方式

```js
const Button = styled.button`
  border: 1px solid skyblue;
  width: 40px;
  height: 15px;
  font-weight: 500;
  color: blue;
`;

const TestButton = Button.extend`
  color: green;
  background: #fff;
`;
```

- 可以给任意组件绑定样式，styled 支持修饰任何 react 元素，我们可以轻松创建并继承另一个组件样式的新组件，用于扩展这个组件

```js
const Element = ({ className, children }) => <div className={className}>{children}</div>;

const StyleElement = styled(Element)`
  width: 200px;
  height: 200px;
  border: 1px solid #333;
  color: green;
  span {
    color: skyblue;
    font-weight: 600;
  }
`;

export default (props) => {
  return (
    <StyleElement>
      StyleElement
      <span>span children</span>
    </StyleElement>
  );
};
```

- 增强的组件如果出现同样的属性或者样式，后面添加的会覆盖前面的

```js
const Element = styled.input.attrs(props = > {
  type:"text",
})`
  border:1px solid palevioletred;
`

const StyleElement = styled(Element).attrs({
  type:"password"
})`
  border:1px solid aqua;
`
```

- _`styled-components`_ 允许你根据环境将组件渲染成你想要的 _`html标记`_，使用 `as` 书写即可

```js
// 根据需要将Wrapper渲染成a或button
function LinkButton({ href, children, ...delegated }) {
  const tag = typeof href === 'string' ? 'a' : 'button';

  return (
    <Wrapper as={tag} href={href} {...delegated}>
      {children}
    </Wrapper>
  );
}
```

- 不存在的样式会在继承的元素中新增，存在的 css 声明会被替换。_`styled`_ 扩展的组件会将任何已知的 _`html`_ 属性传递给 `Dom`；如果是 _React_ 组件，它会吧所有 prop 传递给组件

4. 引入

- 如果你熟悉 _`css Modules`_，那么你对下面的组件组织不会陌生

```js
import React from 'react';
import styles from './styles.css';

export default class Counter extends React.Component {
  state = { count: 0 };

  increment = () => this.setState({ count: this.state.count + 1 });
  decrement = () => this.setState({ count: this.state.count - 1 });

  render() {
    return (
      <div className={styles.counter}>
        <p className={styles.paragraph}>{this.state.count}</p>
        <button className={styles.button} onClick={this.increment}>
          +
        </button>
        <button className={styles.button} onClick={this.decrement}>
          -
        </button>
      </div>
    );
  }
}
```

- 而在 _`styled-component`_ 中，我们可以这样来组织我们的代码

```js
import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  // ...
`;

const WrapperP = styled.p`
  // ...
`;

const WrapperBtn = styled.button`
  // ...
`;

export default class Counter extends React.Component {
  state = { count: 0 };

  increment = () => this.setState({ count: this.state.count + 1 });
  decrement = () => this.setState({ count: this.state.count - 1 });

  render() {
    return (
      <Wrapper>
        <WrapperP>{this.state.count}</WrapperP>
        <WrapperBtn onClick={this.increment}>+</WrapperBtn>
        <WrapperBtn onClick={this.decrement}>-</WrapperBtn>
      </Wrapper>
    );
  }
}
```

- 下面的写法非常的不好并且编译时的缓慢，不要在组件内部去这样定义我们的样式组件

```js
const Wrapper = ({ text }) => {
  const StyledWrapper = styled.div``;

  return <StyledWrapper>{text}</StyledWrapper>;
};
```

5. 选择器

- 我们可以以同样的方式书写伪类和伪元素

```js
const Wrapper = styled.div`
  color: palevioletred;

  ::before {
    content: 'before';
  }

  :hover {
    color: aqua;
  }
`;
```

6. 上下文样式

- 相同的组件根据其上下文更改外观，_`styles-components`_ 允许我们将一个组件 `嵌入` 到另一个组件中

```js
// Aside 组件使用
import Aside from '@components/Aside';
import TextLink from '@components/TextLink';

const Section = () => {
  return (
    <Aside>
      这是一个 Aside 组件的例子，包含一个
      <TextLink>an included link.</TextLink>
    </Aside>
  );
};
```

```js
// Aside.js
const Aside = ({ children }) => {
  return <Wrapper>{children}</Wrapper>;
};

// 导出这个 Wrapper
export const Wrapper = styled.aside`
  /* 样式 */
`;

export default Aside;
```

- `&` 字符会被替换为类名的占位符，一般是当前区域的组件名

```js
// TextLink.js
import { Wrapper as AsideWrapper } from '../Aside';

const TextLink = styled.a`
  color: var(--color-primary);
  font-weight: var(--font-weight-medium);

  ${AsideWrapper} & {
    color: var(--color-text);
    font-weight: var(--font-weight-bold);
  }
`;
```

```css
/* 生成的css */
.TextLink-abc123 {
  color: var(--color-primary);
  font-weight: var(--font-weight-medium);
}

.Aside-Wrapper-def789 .TextLink-abc123 {
  color: var(--color-text);
  font-weight: var(--font-weight-bold);
}
```

- 我们在上面的过程中，在 _`textlink`_ 内控制了另一个使用它的组件内的样式，这使得同一个组件在不同的组件中使用展现了不同的效果

6. 动画

- 动画的写法也是一致的，不过使用了另一个变量

```js
const rotate360 = keyframes`
  from{
    transform:rotate(0deg);
  }

  to{
    transform:rotate(360deg);
  }
`;

// 作为一个动画名字被使用

const RotateElement = styled.div`
  display: inline-block;
  animation: ${rotate360} 2s linear infinite;
  padding: 2rem 1rem;
  font-size: 1.2rem;
`;

export default (props) => {
  return <RotateElement>旋转中....</RotateElement>;
};
```
