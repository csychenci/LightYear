---
title: Hooks通用场景
date: 2022-3-7 22:50:45
categories: React-Hooks
order: 7
tags:
  - JavaScript框架
  - React
---

## 异步处理：发起请求

---

1. 如何使用 Hooks 向服务器发送请求

- 大部分的业务场景需要与服务器端交互，它们之间通过各种 API 完成各种功能。虽然发送请求有很多做法，但它们都遵循一定的规律

```js
import React, { useState } from 'react';

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
        setLoading(fasle);
      })
      .catch((error) => {
        // 请求失败，设置 error 与 loading
        setError(error);
        setLoading(false);
      });
  }, [asyncFunction]);
  // 将 asyncFunction 存入依赖项，当asyncFunction变化时重新声明执行器函数

  return {
    execute,
    loading,
    data,
    error,
  };
};
```

- 在之前的自定义 Hooks 中，有 `useAsync` 这样一个用于发送请求并设置 state 的 Hook。但如果我们需要给请求中携带一些通用的 headers、配置不同的服务器地址、授权过期等，那应该如何处理呢?常见的做法是 **创建一个请求器，所有的请求统一使用这个请求器发送请求**

```js
import React from 'react';
import notification from 'antd/lib/notification';

import axios from 'axios';

const userInfo = {
  token: sessionStorage.getItem('token'),
};

const site = {
  test: 'https://60b2643d62ab150017ae21de.mockapi.io/',
  prod: 'https://prod.myapi.io/',
  staging: 'https://staging.myapi.io/',
};

const logout = () => {
  sessionStorage.clear();
  location.href = location.origin + location.pathname + '#/' + 'login';
};

// 创建axios实例
const service = axios.create({
  baseURL: site.test,
  // 根据环境配置不同baseUrl
  timeout: 60 * 1000,
  withCredentials: false,
});

// 定义一个请求拦截器
service.interceptors.request.use(
  (config) => {
    config.headers['token'] = userInfo?.token;
    return config;
  },
  (error) => {
    notification.error({
      message: '请求发送失败',
      description: '发送请求给服务端失败，请检查电脑网络，再重试',
    });
    return Promise.reject(error);
  },
);

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    /* 可以在这里处理请求成功的逻辑 */
    return response;
  },
  (error) => {
    if (error.response.status === 403) {
      // .. 处理请求失败的逻辑
    }
    return Promise.reject(error);
  },
);

export default service;
```

- 接下来我们可以通过这个 API Client 发送请求。我们可以把任何一个数据源变成 React 组件中可以绑定的一个数据源，特别是 get 请求这种一般适用于获取数据的请求，我们可以认为它是一个远程数据源

```js
import { useState, useEffect } from 'react';
import service from '@/utils/service';

export const useArticle = (ids) => {
  // 设置三个异步逻辑相关的state
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // 请求开始前，重置状态
    setLoading(true);
    setData(null);
    setError(null);
    service
      .get(`/posts/${id}`)
      .then((res) => {
        // 请求成功，设置 data 与 loading
        setData(response);
        setLoading(fasle);
      })
      .catch((err) => {
        // 请求失败，设置 error 与 loading
        setError(error);
        setLoading(false);
      });
  }, [id]); // id变化重新获取数据

  return {
    loading,
    data,
    error,
  };
};
```

- 那么以上面这个例子来说，当要根据 id 获取某个数据时，我们不应该再想到一个具体的 Api 调用，而是把它看作一个 **可绑定的数据源**，只不过是个远程数据

```js
import { useArticle } from './useArticle';

const ArticleView = ({ id }) => {
  // 将article看作一个远程资源，它有 data，loading，error 三个状态
  const { data, loading, error } = useArticle(id);
  if (error) return 'Faild';
  if (!data || loading) return 'Loading...';
  return (
    <div>
      <p>{data.title}</p>
      <p>{data.content}</p>
    </div>
  );
};
```

- 当把业务逻辑抽离成一个 hook 时，组件的表现层逻辑就会非常简洁，只需要将数据映射到 jsx 并显示出来就可以。
- 那么在实际项目中，可以把每一个 Get 请求都做成这样一个 Hook。数据请求和处理逻辑都放到 Hooks 中，从而实现 Model 和 View 的隔离，不仅代码更加模块化，而且更易于测试和维护

```js
// 为什么不使用这种将api传入的方式呢
const useRemoteData = (url) => {
  // ...
};
```

- **为了保证每个 Hook 自身足够简单**。一般来说，为了让服务器的返回数据满足 UI 上的展现要求，通常需要进一步处理，可能导致每个请求的处理逻辑都不一致
- 还有就是某个远程资源有可能是由多个请求组成的，那么 Hooks 中的逻辑就会不一样，因为要同时发出去多个请求，组成 UI 展现所需要的数据

2. 串行请求

- 函数组件是一个同步的函数，请求都是交给副作用来触发，那么如何通过不同的状态组合，来实现异步请求的逻辑呢

```jsx
import service from "./service/index";
import React, { useState, useEffect } from 'react';

const useUser = (id) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    // 当 id 不存在，直接返回，不发送请求
    if (!id) return;
    setLoading(true);
    setData(null);
    setError(null);
    service
      .get(`/users/${id}`)
      .then((res) => {
        setLoading(false);
        setData(res.data);
      })
      .catch((err) => {
        setLoading(false);
        setError(err);
      });
  }, [id]);
  return {
    loading,
    error,
    data,
  };
};

const useArticle = (id) => {
  // 设置三个异步逻辑相关的state
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // 请求开始前，重置状态
    setLoading(true);
    setData(null);
    setError(null);
    service
      .get(`/posts/${id}`)
      .then((res) => {
        // 请求成功，设置 data 与 loading
        setData(res?.data);
        setLoading(false);
      })
      .catch((err) => {
        // 请求失败，设置 error 与 loading
        setError(err);
        setLoading(false);
      });
  }, [id]); // id变化重新获取数据

  return {
    loading,
    data,
    error,
  };
};

const useComments = (id) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    setLoading(true);
    setData(null);
    setError(null);
    service
      .get(`/comments`)
      .then((res) => {
        setLoading(false);
        setData(res.data);
      })
      .catch((err) => {
        setLoading(false);
        setError(err);
      });
  }, [id]);
  return {
    loading,
    error,
    data,
  };
};

const CommentList = ({ data = [] }) => {
  return (
    <div className="exp-09-comment-list">
      <h3>Comments ({data.length})</h3>
      <hr />
      <dl>
        {data.map((item) => (
          <div key={item.id}>
            <dt>{item.user}:{item.createdAt}</dt>

            <dd>{item.content}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
};

const ArticleView = ({ id }) => {
  const { data: article, loading, error } = useArticle(id);
  const { data: comments } = useComments(id);
  // 获取comments和article是两个并发的请求
  const { data: user } = useUser(article?.userId);
  // user依赖于article返回的数据，因此这是一个串行的请求

  /*
  1. 组件首次渲染，只有文章 ID 这个信息，产生两个副作用去获取文章内容和评论列表
  2. 组件首次渲染，作者 ID 还不存在，因此不发送任何请求
  3. 文章内容请求返回后，获得了作者 ID，然后发送请求获取用户信息
  4. 展示用户信息
 */

  if (error) return 'Failed...';
  if (!article || loading) return 'Loading...';
  return (
    <div className="exp-09-article-view">
      <h1>
        {id}. {article.title}
      </h1>
      {user && (
        <div className="user-info">
          <img src={user.avatar} height="40px" alt="user" />
          <div>{user.name}</div>
          <div>{article.createdAt}</div>
        </div>
      )}
      <p>{article.content}</p>
      <CommentList data={comments || []} />
    </div>
  );
};

// Just for show example usage of ArticleView component
export default () => {
  const [id, setId] = useState(1);
  return (
    <div className="exp-09-article-view-wrapper">
      <ul>
        {[1, 2, 3, 4, 5].map((item, idx) => {
          return (
            <li key={idx} onClick={() => setId(item)} style={{cursor:"pointer"}}>
              Article {item}
            </li>
          );
        })}
      </ul>
      <ArticleView id={id} />
    </div>
  );
};
```

- 异步请求，都是基于数据的状态去进行的，要 **利用状态的组合变化来实现并发和串行请求**

---

## 函数组件设计模式

---

1. 容器模式

- 设计模式就是 **针对特定场景，提供一种公认的最佳实践**
- Hooks 有一个重要规则：Hooks 必须在顶层作用域调用，而不能放在条件判断、循环语句中，同时也不能在可能的 return 语句之后执行。也就是说，Hooks 必须按顺序执行到，这是因为 React 需要在函数组件内部维护所用到的 Hooks 的状态

```js
import Modal from '@/components/Modal';
import useUser from '@/hooks/useUser';

const UserInfoModal = ({ visible, userId, ...rest }) => {
  if (!visible) return null;
  // visible为false时，不渲染任何内容
  const { data, loading, error } = useUser(userId);
  // hooks在可能的return之后，会出现报错
  return (
    <Modal visible={visible} {...rest}>
      {/* 对话框内容 */}
    </Modal>
  );
};
```

- 那么上述的写法实际上是非常直观的，但是却通不过编译，因为 `useUser` 在可能的 return 语句之后，因此我们要使用简洁的的模式来实现这样的逻辑，就是 _容器模式_

```js
// 在真正的弹出框外层加一个容器，实现条件渲染
export default ({ visible, ...rest }) => {
  if (!visible) return null;
  // 如果对话框不显示，则不return任何内容

  // 否则执行真正渲染弹窗逻辑
  return <UserInfoModal visible={visible} {...rest} />;
};
```

- 综上所述，具体做法就是 **把条件判断的结果放到两个组件之中，确保真正 render UI 的组件收到的所有属性都是有值的**。在容器模式中，条件的隔离对象是多个子组件，这就意味着它通常用于一些比较大块逻辑的隔离
- 那么，除了容器模式以外，我们还可以将判断条件放到 Hooks 中去,将条件语句自包含在 Hook 之中

```js
const useUser = (id) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;
    // 当id不存在，副作用里面不做任何事情
    // ...
  });
};
```

- 通过这样一个容器模式，我们把原来需要条件运行的 Hooks 拆分成子组件，然后通过一个容器组件来进行实际的条件判断，从而渲染不同的组件，实现按条件渲染的目的。这在一些复杂的场景之下，也能达到拆分复杂度，让每个组件更加精简的目的

2. render props

- **把一个 render 函数作为属性传递给某个组件，由这个组件去执行这个函数从而 render 实际的内容**，这就是 `render props`。在 class 组件中，HOC 和 render props 两种模式属于逻辑重用的两种方式
- 但 Hooks 有一个局限，它只能用作数据逻辑的重用(只能替代纯数据逻辑的 render props)，而一旦涉及 UI 表现逻辑的重用，就会明显不足，但这正是 render props 擅长的地方

```jsx
import React, { useState, useCallback } from 'react';

// 封装一个自己不render任何ui的组件
const CounterRnederProps = ({ children }) => {
  const [count, setCount] = useState(0);

  const add = useCallback(() => {
    setCount(count + 1);
  }, [count]);

  const del = useCallback(() => {
    setCount(count - 1);
  }, [count]);

  return children({ count, add, del });
};

export default () => {
  return (
    <CounterRnederProps>
      {
        // CounterRnederProps 这个 tag开始和结束之间的内容会作为children作为属性传递给 CounterRnederProps
        ({ count, add, del }) => {
          return (
            <div>
              <button onClick={add}> + </button>
              <span>{count}</span>
              <button onClick={del}> - </button>
            </div>
          );
        }
      }
    </CounterRnederProps>
  );
};
```

- 当然，你不一定要使用 children 属性，还可以是其他属性，只要将这个函数作为属性传给组件即可

```jsx
import React, { useState, useCallback } from 'react';

// 封装一个自己不render任何ui的组件
const CounterRnederProps = ({ render }) => {
  const [count, setCount] = useState(0);

  const add = useCallback(() => {
    setCount(count + 1);
  }, [count]);

  const del = useCallback(() => {
    setCount(count - 1);
  }, [count]);

  return render({ count, add, del });
};

export default () => {
  return (
    <CounterRnederProps
      render={({ count, add, del }) => {
        return (
          <div>
            <button onClick={add}> + </button>
            <span>{count}</span>
            <button onClick={del}> - </button>
          </div>
        );
      }}
    ></CounterRnederProps>
  );
};
```

- 类似地实例

```jsx | pure
import React from 'react';
import Popover from 'antd/lib/popover/index';

const ListWithMore = ({ renderItem, data = [], max }) => {
  const elements = data.map((item, index) => renderItem(item, index, data));
  const show = elements.slice(0, max);
  const hide = elements.slice(max);

  return (
    <span>
      {show}
      {hide?.length > 0 && (
        <Popover content={<div style={{ maxWidth: 500 }}>{hide}</div>}>
          <span className="more-items-wrapper">
            and{' '}
            <span style={{ color: '#2175bc' }} className="more-items-trigger">
              {hide.length} more...
            </span>
          </span>
        </Popover>
      )}
    </span>
  );
};

const data = [
  {
    id: '1',
    name: 'Kennedy',
    job: 'Chief Mobility Orchestrator',
    city: 'North Alec',
  },
  {
    id: '2',
    name: 'Lucius',
    job: 'Internal Research Manager',
    city: 'Littleland',
  },
  {
    id: '3',
    name: 'Carlos',
    job: 'Lead Configuration Analyst',
    city: 'South Lillian',
  },
  {
    id: '4',
    name: 'Urban',
    job: 'Chief Operations Agent',
    city: 'Shieldshaven',
  },
  {
    id: '5',
    name: 'Katrine',
    job: 'Legacy Solutions Orchestrator',
    city: 'South Kyleigh',
  },
  {
    id: '6',
    name: 'Kennedi',
    job: 'Global Assurance Developer',
    city: 'East Jaunitaville',
  },
  {
    id: '7',
    name: 'Mariah',
    job: 'Forward Functionality Administrator',
    city: 'West Kody',
  },
  {
    id: '8',
    name: 'Danika',
    job: 'Forward Applications Developer',
    city: 'Lake Max',
  },
  {
    id: '9',
    name: 'Freeda',
    job: 'Legacy Tactics Officer',
    city: 'North Brandonview',
  },
  {
    id: '10',
    name: 'Lila',
    job: 'Future Research Coordinator',
    city: 'South Helenabury',
  },
];

function ListWithMoreExample() {
  return (
    <div className="exp-10-list-with-more">
      <h1>User Names</h1>
      <div className="user-names">
        Liked by:{' '}
        <ListWithMore
          renderItem={(user, index) => {
            return (
              <>
                <span style={{ color: '#2175bc' }} key={index} className="user-name">
                  {user.name}
                </span>
                ,
              </>
            );
          }}
          data={data}
          max={3}
        />
      </div>
      <br />
      <br />
      <h1>User List</h1>
      <div className="user-list">
        <div
          style={{ display: 'grid', gridTemplateColumns: '80px 160px 280px', fontWeight: 'blod' }}
          className="user-list-row user-list-row-head"
        >
          <span style={{ border: '1px solid #eee', padding: '5px' }} className="user-name-cell">
            Name
          </span>
          <span style={{ border: '1px solid #eee', padding: '5px' }}>City</span>
          <span style={{ border: '1px solid #eee', padding: '5px' }}>Job Title</span>
        </div>
        <ListWithMore
          renderItem={(user, index) => {
            return (
              <div
                style={{ display: 'grid', gridTemplateColumns: '80px 160px 280px' }}
                key={index}
                className="user-list-row"
              >
                <span
                  style={{ border: '1px solid #eee', padding: '5px' }}
                  className="user-name-cell"
                >
                  {user.name}
                </span>
                <span style={{ border: '1px solid #eee', padding: '5px' }}>{user.city}</span>
                <span style={{ border: '1px solid #eee', padding: '5px' }}>{user.job}</span>
              </div>
            );
          }}
          data={data}
          max={5}
        />
      </div>
    </div>
  );
}

export default ListWithMoreExample;
```

---

## 事件处理/自定义事件

---

1. 合成事件

- 在 React 中，父子组件通过 props 进行交互，一般是父组件通过 props 将值传递给子组件，但子组件也可以通过暴露一些事件，给父组件传递数据
- 由于 React 中存在虚拟 Dom，在 React 中即使绑定一个事件到原生地 Dom 节点，事件也并不是绑定在对应的节点上，而是 **所有的事件都是绑定在根节点上**。然后由 React 统一监听和管理，获取事件后再分发到具体的虚拟 Dom 节点上
- 在 React 17 之前，所有的事件都是绑定在 document 上的，而从 React 17 开始，**所有的事件都绑定在整个 App 上的根节点上**，这主要是为了以后页面上可能存在多版本 React 的考虑
- React 这么做的原因主要有两个。第一，虚拟 DOM render 的时候， DOM 很可能还没有真实地 render 到页面上，所以无法绑定事件。第二，React 可以屏蔽底层事件的细节，避免浏览器的兼容性问题。同时呢，对于 React Native 这种不是通过浏览器 render 的运行时，也能提供一致的 API
- 借由事件冒泡机制，无论事件在哪个节点被触发， React 都可以通过事件的 srcElement 这个属性，知道它是从哪个节点开始发出的，这样 React 就可以收集管理所有的事件，然后再以一致的 API 暴露出来

2. 自定义事件

- 对于自定义组件，除了可以通过 props 接收参数并用于渲染之外，还有可能 **需要与父组件进行交互**，那么此时就需要为组件创建自定义事件
- 那么 _自定义事件_ 和 _原生事件_ 的区别就是 原生事件是浏览器的机制，而自定义事件属于组件自己的行为，本质是一种回调函数机制

```jsx
import React, { useState } from 'react';

const CounterShow = ({ count, onChange }) => {
  const handleClick = () => {
    onChange(count + 1);
  };

  return (
    <div>
      子组件
      <p>count：{count}</p>
      <button onClick={handleClick}>add</button>
    </div>
  );
};

export default () => {
  const [count, setCount] = useState(0);
  return (
    <>
      父组件
      <CounterShow count={count} onChange={setCount} />
    </>
  );
};
```

3. 监听键盘输入事件

- Hooks 具备绑定任何数据源的能力，那么我们就可以把任意常见的数据源绑定到 Hooks 上。比如说将键盘输入变为某个状态，方便在组件中使用

```jsx
import React, { useEffect, useState } from 'react';

// 使用 document.body 作为默认的监听节点
const useKeyPress = (domNode = document.body) => {
  const [key, setKey] = useState(null);
  useEffect(() => {
    const handleKeyPress = (evt) => {
      setKey(evt.keyCode);
    };
    // 监听按键事件
    domNode.addEventListener('keypress', handleKeyPress);
    return () => {
      // 接触监听按键事件
      domNode.removeEventListener('keypress', handleKeyPress);
    };
  }, [domNode]);
  return key;
};

export default () => {
  const key = useKeyPress();
  return (
    <div>
      <h1>UseKeyPress</h1>
      <label>Key pressed: {key || 'N/A'}</label>
    </div>
  );
};
```

- 上面的只是监听单个按键的输入功能，那么如果我们要同时监听两个以上按键的输入呢

```js
export default function useKeyPress(dom = document.body) {
  const [key, setKey] = useState([]);
  const isNext = useRef(true); // 当keyup之后，isNext置为true表示又是新一轮的按键监听
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.type === 'keydown') {
        if (isNext.current) setKey([]);
        setKey((keys) => [...new Set([...keys, e.key])]); // 去重
        isNext.current = false;
      } else {
        isNext.current = true;
      }
    };
    dom.addEventListener('keydown', handleKeyPress);
    dom.addEventListener('keyup', handleKeyPress);
    return () => {
      dom.removeEventListener('keydown', handleKeyPress);
      dom.removeEventListener('keydown', handleKeyPress);
    };
  }, [dom]);
  return key.join(',');
}
```