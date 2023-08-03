---
title: 缓存Hooks
date: 2021-06-30 01:20:20
categories: React-Hooks
order: 3
tags:
  - JavaScript框架
  - React
---

## useCallback

---

1. 缓存回调函数

- 在 _react_ 函数式组件中，每一次 _UI_ 的变化都会重新执行整个函数，因此，函数式组件并没有一个直接的方式在多次渲染之间维持一个状态

```jsx
/**
 * defaultShowCode: true
 */
import React, { useState, useCallback } from 'react';

const TestFn = ({ handleIncrement }) => {
  console.log('TestFn re-render');
  // 就算不是count变化，TestFn也会不停的render
  return <button onClick={handleIncrement}>+</button>;
};

function Counter() {
  const [count, setCount] = useState(0);
  const [tag, setTag] = useState(false);
  const handleIncrement = () => setCount(count + 1);
  // ...
  return (
    <div>
      <p>{count}</p>
      <button onClick={() => setTag(!tag)}>触发Tag</button>
      <TestFn handleIncrement={handleIncrement}>+</TestFn>
    </div>
  );
}

export default Counter;
```

- 在上面的代码中，每次组件状态发生变化时，函数组件都会重新执行一遍。在每次执行的时候，实际上都会创建一个新的事件处理函数 `handleIncrement`，这个事件处理函数中，包含了 count 这个变量的闭包，以确保每次能够得到正确的结果
- 但是即使 `count` 没有发生变化，函数组件因为其他的 state 发生变化而重新渲染时，`handleIncrement` 也会创建一个新的函数。它虽然不影响结果的正确性，但增加了系统的开销，而且 **每次创建新函数的方式都会让接收事件处理函数的组件重新渲染**
- 每次执行的时候，实际上都会创建一个新的事件处理函数，那么，每次创建新函数的方式将会使接收事件处理函数的组件重新渲染(props 发生了变化)。类似地，当我们对某些数据计算结果进行缓存时，就需要另外的机制来处理

```js
const handleChange = useCallback(() => {
  setValue(count + 1)
},[]);

const handleChange = useCallback(() => {
  setValue(count + 1);
},[count]);
```

- 注意以上的区别，实际上每次都会创建函数，但是依赖项为空的创建的函数是会被 useCallback 忽略的。而且要注意的是，deps 为空的情况下，**useCallback 中的回调函数引用的 state 永远是第一次创建的值**

2. useCallback(fn,deps)

- _fn_ 作为一个回调函数，_deps_ 是依赖的变量数组。~~只有当某个依赖变量发生变化时，才会重新声明 _fn_ 这个回调函数~~。并不是依赖项变化才会重新声明，而是依赖项变化才会去更新 hook 存储起来的函数引用，每次函数组件的重新渲染，都会重新声明回调函数，但不一定会把它缓存起来
- 在确保状态是稳定的前提下，结合纯函数的特性：相同的输入能够得到相同的输出。因此，当状态相同时，我们就可以将结果缓存起来，没必要再将过程重复一遍

```jsx
/**
 * defaultShowCode: true
 */
import React, { useState, useCallback } from 'react';

const TestFn = ({ handleIncrement }) => {
  console.log('TestFn re-render');
  // 就算不是count变化，TestFn也会不停的render
  return <button onClick={handleIncrement}>+</button>;
};

function Counter() {
  const [count, setCount] = useState(0);
  const [tag, setTag] = useState(false);
  const handleIncrement = useCallback(() => setCount(count + 1), [count]);
  // ...
  return (
    <div>
      <p>{count}</p>
      <button onClick={() => setTag(!tag)}>触发Tag</button>
      <TestFn handleIncrement={handleIncrement}>+</TestFn>
    </div>
  );
}

export default Counter;
```

- 但在上面的代码中，我们会发现 re-render 会不断的在任意一个 state 改变的时候打印出来，这是因为只要父组件重新渲染那么子组件必然会重新渲染。那这时我们可以通过 Class 组件继承 PureComponent 或函数组件通过 React.memo 这个高阶组件包裹，那么可以让任何 React 组件都能在 props 不变时就不重新渲染

```jsx
import React, { useState, useCallback } from 'react';

const TestFn = React.memo(({ handleIncrement, children }) => {
  console.log('TestFn re-render');
  // handleIncrement不变化，TestFn不会重新渲染
  return <button onClick={handleIncrement}>{children}</button>;
});

const TestFn1 = React.memo(({ updateNum, children }) => {
  console.log('TestFn1 re-render');
  // handleIncrement不变化，TestFn不会重新渲染
  return <button onClick={updateNum}>{children}</button>;
});

function Counter() {
  const [count, setCount] = useState(0);
  const [num, updateNum] = useState(0);
  const [tag, setTag] = useState(false);

  const handleIncrement = useCallback(() => setCount(count + 1), [count]);
  // 只有count变化，handleIncrement才会重新被创建，React.memo(TestFn)才会重新刷新

  const handleUpdateNum = () => updateNum(num + 1);
  // 只要Counter组件重新渲染，handleUpdateNum就会被重新创建，React.memo(TestFn1) 都会重新渲染

  return (
    <div>
      <p>count：{count}</p>
      <p>num：{num}</p>
      <button onClick={() => setTag(!tag)}>触发Tag</button>
      <TestFn handleIncrement={handleIncrement}>count +</TestFn>
      <TestFn1 updateNum={handleUpdateNum}>num +</TestFn1>
    </div>
  );
}

export default Counter;
```

- 只有依赖项发生变化时，才需要将声明的函数更新到 hook 的引用，这样就保证了组件不会 **重复更新回调函数**。而接收这个回调函数作为属性的组件，也不会 **频繁地需要重新渲染**

3. 一般使用情形

- 虽然 useCallback 可以在依赖项不改变的情况下不会重新创建回调函数，但过多的使用可能对性能造成影响。一般在以下两个情形中使用
- 被包装在 React.memo 或 继承至 PureComponent 的组件接收父组件的回调函数作为 props 时，**需要避免因组件属性变化导致不必要的重新渲染** (一般原生节点可以不用 useCallback 包裹)

```jsx
import React, { useState, useCallback } from 'react';

const MyComp = React.memo((props) => {
  console.log('onClick被创建了,MyComp re-render');

  return <button onClick={props.onClick}>按钮</button>;
});

export default () => {
  const [count, setCount] = useState(0);
  const handleClick = useCallback(() => {
    setCount(count + 1);
  }, [count]);
  // 1. 将count作为依赖项时，count每次更新完以后，handleClick都会重新创建

  // 不将count作为依赖项时，count永远是第一次创建时的值
  return (
    <>
      <span>{count}</span>
      <MyComp onClick={handleClick} />
    </>
  );
};
```

- 当函数用作其他 hooks 的依赖项时，需要避免组件重新渲染导致函数重新创建而导致不必要的 hooks 执行

```jsx
import React, { useState, useCallback, useEffect } from 'react';

const useAsync = (asyncFunction) => {
  // 设置三个异步逻辑相关的state
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const execute = useCallback(() => {
    // 请求开始前，重置状态
    setLoading(true);
    setData(null);
    setError(null);
    return asyncFunction()
      .then((response) => {
        // 请求成功，设置 data 与 loading
        setData(response);
        setLoading(false);
      })
      .catch((error) => {
        // 请求失败，设置 error 与 loading
        setError(error);
        setLoading(false);
      });
  }, [asyncFunction]);

  useEffect(() => {
    execute();
  }, [asyncFunction]);

  console.log('useAsync re-render');
  // 将 asyncFunction 存入依赖项，当asyncFunction变化时重新声明执行器函数

  return {
    execute,
    loading,
    data,
    error,
  };
};

export default () => {
  const [tag, setTag] = useState(false);

  const [record, updateRecoed] = useState(false);

  const { execute, loading, data, error } = useAsync(
    useCallback(async () => {
      const res = await fetch('https://reqres.in/api/users/');
      const json = await res.json();
      return json.data;
    }, [record]),
  );

  console.log('tag');

  if (error) return <div style={{ color: 'red' }}>Failed：{String(error)}</div>;

  return (
    <>
      <button
        onClick={() => {
          setTag(!tag);
        }}
      >
        触发tag更新
      </button>
      <button
        onClick={() => {
          updateRecoed(!record);
        }}
      >
        触发record更新
      </button>
      <button disabled={loading} onClick={execute}>
        {loading ? 'Loading...' : 'Show Users'}
      </button>
      {data?.map((user) => {
        return (
          <ul key={user?.id}>
            <li style={{ display: 'flex' }}>
              <div>
                <img src={user?.avatar} />
              </div>
              <div>
                <p>first_name:{user?.first_name}</p>
                <p>email:{user?.email}</p>
              </div>
            </li>
          </ul>
        );
      })}
    </>
  );
};
```

---

## useMemo

---

1. useMemo(fn, deps) 缓存计算的结果

- 除了 _useCallback_，_useMemo_ 也是为了缓存而设计的。只不过 _useCallback_ 缓存的是一个函数，而 _useMemo_ 缓存的是计算的结果
- _fn_ 是产生所需数据的一个计算函数，_fn_ 会使用 _deps_ 中声明的一些变量来返回一个结果，并渲染出最终的 _UI_
- 也就是说，**当某个数据是通过其他数据计算得到的，那么只有当用到的数据，也就是依赖的数据发生变化时，才应该需要重新变化**
- 通过 _useMemo_ 我们可以避免在用到的数据没发生变化时进行地重复计算，从而避免组件的重复渲染

2. 使用场景

- 有这样一个场景，某个显示用户信息的列表，支持对用户名进行搜索，并且列表需要显示过滤后的用户。那么这样一个功能有两个状态：1. 用户列表本身，2. 用户输入的搜索关键字

```jsx
import React, { useState, useEffect } from 'react';

export default function SearchUserList() {
  const [users, setUsers] = useState(null);
  // 保存用户列表信息
  const [searchKey, setSearchKey] = useState('');
  // 保存输入的关键字
  const [tag, setTag] = useState(false);
  // 用于触发组件更新(任何情况下的更新)

  useEffect(() => {
    const doFetch = async () => {
      // 组件首次加载时发请求获取用户数据
      const res = await fetch('https://reqres.in/api/users/');
      setUsers(await res.json());
    };
    doFetch();
  }, []);
  let usersToShow = null;

  if (users) {
    // 无论组件为何刷新，这里一定会对数组做一次过滤的操作
    usersToShow = users.data.filter((user) => user.first_name.includes(searchKey));

    console.log('re-render 对用户信息进行过滤');
  }

  return (
    <div>
      <div>
        <button
          onClick={() => {
            setTag(!tag);
          }}
        >
          触发更新
        </button>
      </div>
      <input type="text" value={searchKey} onChange={(evt) => setSearchKey(evt.target.value)} />
      <ul>
        {usersToShow &&
          usersToShow.length > 0 &&
          usersToShow.map((user) => {
            return <li key={user.id}>{user.first_name}</li>;
          })}
      </ul>
    </div>
  );
}
```

- 在上面这个例子中，无论组件因为什么而重新渲染，都要进行一次过滤的操作。但是我们只需要在 `users`、`searchKey` 变化时，重新计算要展示的数据就行了，而不需要每次都进行过滤

```jsx
import React, { useState, useEffect, useMemo } from 'react';

export default function SearchUserList() {
  const [users, setUsers] = useState(null);
  // 保存用户列表信息
  const [searchKey, setSearchKey] = useState('');
  // 保存输入的关键字
  const [tag, setTag] = useState(false);
  // 用于触发组件更新(任何情况下的更新)

  useEffect(() => {
    const doFetch = async () => {
      // 组件首次加载时发请求获取用户数据
      const res = await fetch('https://reqres.in/api/users/');
      setUsers(await res.json());
    };
    doFetch();
  }, []);
  const usersToShow = useMemo(() => {
    console.log('re-render 对用户信息进行过滤');
    if (!users) return null;
    return users.data.filter((user) => user.first_name.includes(searchKey));
  }, [users, searchKey]);

  return (
    <div>
      <div>
        <button
          onClick={() => {
            setTag(!tag);
          }}
        >
          触发更新
        </button>
      </div>
      <input type="text" value={searchKey} onChange={(evt) => setSearchKey(evt.target.value)} />
      <ul>
        {usersToShow &&
          usersToShow.length > 0 &&
          usersToShow.map((user) => {
            return <li key={user.id}>{user.first_name}</li>;
          })}
      </ul>
    </div>
  );
}
```

- 另外，除了避免重复计算以外，_useMemo_ 还有一个重要的好处：**避免子组件的重复渲染**。当某个子组件使用了父组件的状态或变量作为属性，而这个属性每次都需要重新计算来得到时，那么这个子组件每次都需要重新渲染

3. 本质

- _useMemo_ 与 _useCallback_ 做了相同地事情：**建立了一个绑定某个结果到依赖数据的关系。只有当依赖变了，这个结果才需要重新得到**

```js
// 用useMemo实现useCallback
const myEventHandler = useMemo(() => {
  // 返回一个函数作为缓存结果
  return () => {
    // 在这里进行事件处理
  };
}, [dep1, dep2]);
```

---

## useRef

---

1. useRef(initialValue);

- 在类组件中，我们可以定义类的成员变量，以便能在对象上通过成员属性去保存一些数据。但是在函数组件中，是没有这样一个空间去保存数据的。_useRef_ 具备了这样一个能力：**在多次渲染之间共享数据**
- _useRef_ 就像是在函数组件之外创建的一个容器空间。在这个容器上，我们可以通过唯一的 _current_ 属性设置一个值，从而在函数组件的多次渲染之间共享这个值，_useRef_ 可以保证这个变量只在当前组件的实例中使用

2. 独立的引用

- 一般来说，_useRef_ 保存的数据是和 _UI_ 的渲染无关的，因此当 _ref_ 的值发生变化时，是不会触发组件的重新渲染的。而类似的如 _useState_，也可以在组件的多次渲染之间共享数据，但是 _state_ 被更新以后会导致组件重新渲染

```jsx
/**
 * 注意这里是 useCallback 的问题，内部的state不是最新的值，因此无法对新的定时器做清除
 */
import React, { useState, useRef, useCallback, useEffect } from 'react';

function Show(props) {
  useEffect(() => {
    console.log(props.timer);
  }, [props.timer]);
  return <div>{props.timer}</div>;
}

export default function Timer() {
  // 定义 time state 用于保存计时的累积时间
  const [time, setTime] = useState(0);

  // 定义 timer 这样一个容器用于在跨组件渲染之间保存一个变量
  const [timer, setTimer] = useState(null);

  // 开始计时的事件处理函数
  const handleStart = useCallback(() => {
    // 使用 current 属性设置 ref 的值
    const timer = window.setInterval(() => {
      setTime((time) => time + 1);
    }, 100);
    setTimer(timer);
  }, []);

  // 暂停计时的事件处理函数
  const handlePause = useCallback(() => {
    // 使用 clearInterval 来停止计时
    window.clearInterval(timer);
    setTimer(null);
  }, []);

  return (
    <div>
      {time} seconds.
      <br />
      <Show timer={timer} />
      <button onClick={handleStart}>Start</button>
      <button onClick={handlePause}>Pause</button>
    </div>
  );
}
```

- 在上述代码中，由于 `setInterval` 的存在，每隔 100ms time 就会被重新设置，并且 timer 仅仅保存的是初次设置的计时器 id，因此会导致 time 每隔 100ms 就会被设置且无法停下
- 而 _ref_ 的值发生变化后，是不会触发组件的重新渲染的。这也是它们两者的区别

```jsx
import React, { useState, useRef, useCallback, useEffect } from 'react';

function Show(props) {
  useEffect(() => {
    console.log(props.timer);
  }, [props.timer]);
  return <div>{props.timer}</div>;
}

export default function Timer() {
  // 定义 time state 用于保存计时的累积时间
  const [time, setTime] = useState(0);

  // 定义 timer 这样一个容器用于在跨组件渲染之间保存一个变量
  const timer = useRef(null);

  // 开始计时的事件处理函数
  const handleStart = useCallback(() => {
    // 使用 current 属性设置 ref 的值
    timer.current = window.setInterval(() => {
      setTime((time) => time + 1);
    }, 100);
  }, []);

  // 暂停计时的事件处理函数
  const handlePause = useCallback(() => {
    // 使用 clearInterval 来停止计时
    window.clearInterval(timer.current);
    timer.current = null;
  }, []);

  return (
    <div>
      {time / 10} seconds.
      <br />
      <Show timer={timer.current} />
      <button onClick={handleStart}>Start</button>
      <button onClick={handlePause}>Pause</button>
    </div>
  );
}
```

3. 保存 DOM 引用

- _useRef_ 还可用于保存某个 DOM 节点的引用。一般来说，编写 _React_ 应用时，我们不需要关注真实的 DOM 节点是如何被操作的。但是有时候不可避免地要获得真实 dom 节点的引用，那么就可以通过 _ref_ 属性和 _useRef_ 对这个节点进行获取和操作

```jsx
import React, { useRef } from 'react';
export default function TextInputWithFocusButton() {
  const inputEl = useRef(null);
  // useRef 保存了这个节点的应用
  const onButtonClick = () => {
    // current 属性指向了真实的 input 这个 DOM 节点，从而可以调用 focus 方法
    inputEl.current.focus();
  };
  return (
    <>
      <input ref={inputEl} type="text" />
      {/* ref属性提供了获得DOM节点的能力 */}
      <button onClick={onButtonClick}>Focus the input</button>
    </>
  );
}
```

---

## useContext

---

1. 定义全局状态

- 在 _React_ 组件之间传递状态只有一种方式，那就是 _props_。也就是说，这种传递关系只能用于父子组件之间进行，而不能用于跨层次、同级组件之间的数据共享
- 此时需要使用到全局状态管理。_react_ 提供了 _Context_ 的一个机制，能够让所有在某个组件开始的组件树上创建一个 _Context_，这个组件树上的所有组件都能访问和修改这个 _Context_

```js
const myContext = React.createContext(initialValue);
// 使用该api创建一个Context

const value = useContext(myContext);
// 使用useContext这个hook来管理Context
```

2. 使用方式

- 使用 _createContext_ 创建出来的全局状态具有 _Provider_ 属性，一般作为组件树的根组件

```jsx
import React, { useContext, useCallback, useState } from 'react';
const color = {
  blue: 'blue',
  skyblue: 'skyblue',
};

const ColorContext = React.createContext(color.blue);
// 创建一个context

function Test() {
  const color = useContext(ColorContext);
  return <span style={{ color: color }}>颜色改变</span>;
}

export default function App() {
  const [theme, setTheme] = useState('black');

  const handleChange = useCallback(() => {
    setTheme((theme) => {
      return theme === 'blue' ? 'skyblue' : 'blue';
    });
  }, []);

  return (
    <ColorContext.Provider value={color[theme]}>
      <Test />
      <button onClick={handleChange}>点击切换颜色</button>
    </ColorContext.Provider>
  );
}
```

3. 全局状态管理的作用

- _Context_ 类似一个全局的数据，那为什么不用一个全局的变量去保存数据呢？其实是 **为了进行数据的绑定**，当这个 _Context_ 的数据发生变化时，使用这个数据的组件能够自动刷新，而一个全局变量并不能达到这个效果

4. 限制

- 在提供一个方便在多个组件之间共享数据的机制时，它也有很多限制。会让调试变得困难，我们很难追踪某个 _context_ 的变化是如何产生的
- 会让其他的组件复用变得困难。一旦一个组件使用了 _context_，必须确保被用到的地方一定有这个 _context_ 的 _provider_ 在其父组件的路径上
- 一般在一个应用中，除了主题、国际化以外，很少会利用到 _context_ 做太多数据的共享，它更多的是 **提供一个让 react 应用具备定义全局的响应数据的能力**。像 _Redux_ 即是利用了 _context_ 的机制来提供一种更加可控的组件之间的状态管理机制

---
## useEvent
---
1. 区别于 useCallback
- 如果要稳定 useCallback 的回调函数的引用，那么对于最新的 state 就没办法拿到。因此，在我们既想稳定函数引用，又想拿到最新的 state，就需要用到 useEvent

```js
import React,{useRef} from 'react';

export default () => {

  function useEvent(fn){
    let fnRef = useRef(fn);

    useLayoutEffect(() => {
      fnRef.current = fn
    })

    return useCallback(() => {
      fnRef.current()
    },[])
  }
}
```