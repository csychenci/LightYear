---
title: useEffect
date: 2020-08-15 10:13:26
categories: React-Hooks
order: 2
tags:
  - JavaScript框架
  - React
---

## useEffect 的用法

---
1. useEffect 的介绍
- 用于执行一段副作用，也就是一段和 **当前执行结果无关的代码**。例如修改函数外部的某个变量，发起一个请求等，在函数组件的当次执行过程中，_useEffect_ 中代码的执行是不影响渲染出来的 _UI_ 的
- 在实现中，它通过宏任务来实现，目的是保证副作用逻辑能在 dom 渲染完成之后执行，也就是说，它是在下一轮事件循环才会执行。在之前的版本中，它使用 `requestidleCallback + setTimeout(兼容不支持的浏览器)` 来实现，但由于 `requestidleCallback` 执行时间是不确定的(需要满足刷新率，而一轮事件循环可能很短)；因此目前的实现是用 `MessageChanel + setTimeout(兼容不支持的浏览器)` 来做的

- *useLayoutEffect* 在渲染完成、下一轮事件循环开始之前，也就是在 useEffect 的回调执行之前

2. useEffect(callback, dependencies)

- 第一个参数为要执行的函数，第二个参数用于作为 `useEffect` 的依赖参数
- 若 dependencies 缺省，也就是不传入依赖项，则 callback 会在每次函数组件执行完后都执行
- 若 `useEffect` 要传入依赖项，则该 `依赖项` 须为数组，数组的内容是函数组件中通过 `useState ` 自定义的变量或者是父组件传值过来的 `props` 中的变量，告诉 React 只有数组内的变量发生变化时才会触发 callback 的执行

| 依赖项情况 | 结果 | 例子 |
| --- | --- | --- |
| 不提供第二个依赖项参数 | 每次 render 后执行 | useEffect(()=>{}) |
| 提供一个空数组作为依赖项 | 仅首次 render 后执行 | useEffect(()=>{},[]) |
| 提供依赖项数组 | 第一次以及依赖项发生变化后执行 | useEffect(()=>{},[deps]) |
| 返回一个回调函数 | 组件 unmount 后执行，用于在组件销毁的时候做一些清理的操作 | useEffect(()=>{return () => {}},[]) |

- 用于解决类组件中 `某些执行代码被分散在不同的生命周期函数中` 的问题。对应到类组件中，它涵盖的生命周期函数有：`componentDidMount`、`componentDidUpdate`、`compomentWillUnmount`，但不要将 _useEffect_ 对应到某几个生命周期，只需要知道 **_useEffect_ 会在每次组件 _render_ 完后判断依赖并执行**

```jsx
import React, { useState, useEffect } from 'react';

export default function BlogView({ id }) {
  // 设置一个本地 state 用于保存 blog 内容
  const [blogContent, setBlogContent] = useState(null);

  useEffect(() => {
    // useEffect 的 callback 要避免直接的 async 函数，需要封装一下
    const doAsync = async () => {
      // 当 id 发生变化时，将当前内容清楚以保持一致性
      setBlogContent(null);
      // 发起请求获取数据
      const res = await fetch(`/hooks/use-effect`);
      // 将获取的数据放入 state
      setBlogContent(await res.text());
    };
    doAsync();
  }, [id]); // 使用 id 作为依赖项，变化时则执行副作用

  // 如果没有 blogContent 则认为是在 loading 状态
  const isLoading = !blogContent;
  return <div>{isLoading ? 'Loading...' : blogContent}</div>;
}
```

- 需要注意因为 `state` 的变化而导致的组件重新渲染，而执行副作用逻辑里面改变 `state`，进而引发组件的重新渲染，会导致循环逻辑

```jsx | pure
import React, { useState, useEffect } from 'react';

export default (props) => {
  const [id, setId] = useState(0);

  useEffect(() => {
    setId(id + 1);
    // 在副作用逻辑中更新state
    console.log('Effect', id);
  }, [id]);
  console.log('render', id);
  // 将state作为依赖项
  // 组件渲染完成 --> 执行副作用 --> state变化，组件刷新，执行副作用逻辑 --> state变化，组件刷新，执行副作用逻辑
  return id;
};
```

3. 清除副作用

- _useEffect_ 允许我们返回一个函数，用于在组件销毁的时候做一些清理的工作，如移除时间的监听等。该回调函数会在 **组件被卸载前** 或 **组件渲染完成后、下一次 useEffect 执行之前** 执行

```js
// 设置一个 size 的 state 用于保存当前窗口尺寸
const [size, setSize] = useState({});
useEffect(() => {
  // 窗口大小变化事件处理函数
  const handler = () => {
    setSize(getSize());
  };
  // 监听 resize 事件
  window.addEventListener('resize', handler);

  // 返回一个 callback 在组件销毁时调用
  return () => {
    // 移除 resize 事件
    window.removeEventListener('resize', handler);
  };
}, []);
```

- 每次副作用执行，都会产生一个新的 `clear` 函数，`clear` 函数会在下一次副作用逻辑之前执行，也就是在 `DOM` 渲染完毕之后，但组件销毁也会执行一次
- 对于这一点，可以理解为 _useEffect_ 返回的回调函数，只适用于清理当前执行的副作用本身。也就是说它的作用是用于 **清理上一次副作用执行后的结果**

```jsx
/**
 * defaultShowCode: true
 */

import React, { useEffect, useState } from 'react';

export default () => {
  const [tag, setTag] = useState(tag);

  useEffect(() => {
    return () => {
      // 这里只会在组件销毁前（componentWillUnmount）执行一次
    };
  }, []);

  return (
    <div>
      <p>{tag}</p>
      <button
        onClick={() => {
          setTag(!tag);
        }}
      >
        re-render
      </button>
    </div>
  );
};
```

- 上面的例子中，通过在 _useEffect_ 中返回一个清理函数，并且将依赖项置为空数组，因此，它只会在组件被卸载的时候执行一次，这就实现了与 _componentWillUnmount_ 一样的功能

4. 依赖项的注意

- Hooks 提供了让你监听某个数据变化的能力。这个变化可能会触发组件的刷新，也可能是去创建一个副作用，又或者是刷新一个缓存。那么定义要监听哪些数据变化的机制，其实就是指定 Hooks 的依赖项
- 依赖项中定义的变量一定是会在回调函数中用到的，否则声明依赖项是没有任何意义的
- 依赖项一般是一个 **`常量数组`**，而不是一个变量。因为一般在创建 callback 时，就会知道会用到哪一些依赖项了。而依赖项数组只有部分依赖，漏掉了部分依赖的情况下，会导致漏掉的该依赖变化时 _useEffect_ 内部的逻辑不执行

```jsx
import React, { useState, useEffect } from 'react';
export default function App() {
  const [count, setCount] = useState(0);
  const [num, setNum] = useState(0);

  const handleAddCount = () => {
    setCount(count + 1);
  };

  const handleAddNum = () => {
    setNum(num + 1);
  };

  useEffect(() => {
    console.log('count 变化我将会执行');
    console.log('num 变化我不会执行');
  }, [count]);
  console.log('render');
  return (
    <div>
      <p>count: {count}</p>
      <button onClick={handleAddCount}>setCount</button>
      <p>num: {num}</p>
      <button onClick={handleAddNum}>setNum</button>
    </div>
  );
}
```

- 因此，需要注意的是：_并不是组件重新渲染，副作用逻辑就会执行_，而是组件重新渲染完成后，_useEffect_ 需要比较依赖是否变化才会执行
- _react_ 使用浅比较来对比依赖项是否发生变化。因此，当创建一个数组或对象类型时，即使和之前的值是等价的，也会被认定依赖项发生了变化，从而导致一个 Bug

```jsx
import React, { useState, useEffect } from 'react';
export default function Test() {
  const todos = [{ text: 'Learn hooks.' }];
  // 这里在每次组件执行时都会创建一个新数组，所以在作为依赖项的时候进行引用的比较，实际上被认为是发生了变化的

  const [tag, setTag] = useState(false);

  useEffect(() => {
    console.log('Todos changed.');
  }, [todos]);
  return (
    <div>
      <div>Todos / 请打开控制台查看效果(这里会触发副作用逻辑)</div>
      <button onClick={() => setTag(!tag)}>触发</button>
    </div>
  );
}
```

```jsx
import React, { useState, useEffect } from 'react';
export default function Test() {
  const [todos, setTodos] = useState([{ text: 'Learn hooks.' }]);
  // 这里在每次组件执行时都会创建一个新数组，所以在作为依赖项的时候进行引用的比较，实际上被认为是发生了变化的

  const [tag, setTag] = useState(false);

  useEffect(() => {
    console.log('Todos changed.');
  }, [todos]);
  return (
    <div>
      <div>Todos / 请打开控制台查看效果(这里不会触发副作用逻辑)</div>
      <button onClick={() => setTag(!tag)}>触发</button>
    </div>
  );
}
```

5. hook 的使用规则

- ① 只能在函数组件的顶级作用域使用。所谓顶层作用域，就是 _Hooks_ 不能在 **循环、条件判断或者嵌套函数内** 执行，而必须是在顶层。同时 Hooks 在组件的多次渲染之间，必须按顺序被执行。因为在 _React_ 组件内部，其实是维护了一个对应组件的固定 _Hooks_ 执行列表的，以便在多次渲染之间保持 _Hooks_ 的状态，并做对比。总结为两点：第一，_所有 Hook 必须要被执行到_。第二，_必须按顺序执行_
- ② 只能在函数组件或者其他 _Hooks_ 中使用。_Hooks_ 作为专门为函数组件设计的机制，使用的情况只有两种，一种是 _在函数组件内_，另外一种则是 _在自定义的 *Hooks* 里面_

```js
const example = () => {
  const [count, setCount] = useState(0);
  // ... 正确，hook一定会被执行到
  return <div>{count}</div>;
};
```

```js
const MyComp = () => {
  const [count, setCount] = useState(0);
  if (count > 10) {
    // 错误：不能将 Hook 用在条件判断里
    useEffect(() => {
      // ...
    }, [count]);
  }

  // 这里可能提前返回组件渲染结果，后面就不能再用 Hooks 了
  if (count === 0) {
    return 'No content';
  }

  // 错误：不能将 Hook 放在可能的 return 之后
  const [loading, setLoading] = useState(false);

  //...
  return <div>{count}</div>;
};
```

- 根据这些规则，我们还可以在利用高阶组件的模式，将 Hooks 封装成高阶组件，从而让类组件使用

```jsx | pure
import React from 'react';
import {useWindowSize} from './useWindowSize';

const withWindowSize = (Comp) => {
  return props => {
    const size = useWindowSize();
    return <Comp size={size} {...props}>
  }
}

Class TestComp extends React.Component {
  render(){
    const {size} = this.props;
    // 复用hook的逻辑
    return (
      <div>{size}</div>
    )
  }
}

export default withWindowSize(TestComp)
```

6. 使用 eslint 检测 Hooks

- 在 useEffect 的回调函数中使用的变量，都必须在依赖项中声明
- Hooks 不能出现在条件语句或者循环中，也不能出现在 return 之后
- Hooks 只能在函数组件或者自定义 Hooks 中使用

```bash
npm install eslint-plugin-react-hooks --save-dev
```

- 在 _eslint_ 配置文件中加入两个规则：_rules-of-hooks_ 和 _exhaustive-deps_

```json
{
  "plugins": [
    // ...
    "react-hooks"
  ],
  "rules": {
    // ...
    // 检查 Hooks 的使用规则
    "react-hooks/rules-of-hooks": "error",
    // 检查依赖项的声明
    "react-hooks/exhaustive-deps": "warn"
  }
}
```

7. 面试题

```js
import React, { useState, useEffect } from 'react';

export default function AnimateDemo() {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCounter(counter + 1);
    }, 300);
    console.log('effect:', timer);

    return () => {
      console.log('clear:', timer);
      clearTimeout(timer);
    };
  });

  console.log('before render');

  return (
    <div className="container">
      <div className="el">{counter}</div>
    </div>
  );
}
```
