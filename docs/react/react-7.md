---
title: React-Router
date: 2020-08-15 10:13:26
categories: React
order: 8
tags:
  - JavaScript框架
  - React
---

## 基础使用

---

1. 前端路由

- 原理：检测浏览器 URL 变化、截获 URL 地址、然后进行 URL 路由匹配
- `实现方式`：hash-mode、html5-mode

2. BrowserRouter 与 HashRouter

- 路由指的是根据 url 的不同显示不同的内容，然后每个页面都是一个组件
- `BrowserRouter` 是需要服务端配合，是基于 `html5` 的 `pushState` 和 `replaceState` 的，很多浏览器不支持，存在兼容性问题，可以改变 URL 而不刷新页面

|     API      |        作用        |
| ---------- | ---------------- |
| replaceState |   替换原来的路径   |
|  pushState   |    使用新的路径    |
|   popState   |     路径的回退     |
|      go      | 向前或向后改变路径 |
|   forward    |    向前改变路径    |
|     back     |    向后改变路径    |

```bash
# 一般链接地址是这种样式
http://localhost:8080/ablout
```

- `HashRouter` 是浏览器解析路由，优势是兼容性好，缺陷是会有一个 `#`，本质上是改变 `window.location` 的 `href` 属性

```bash
# 一般链接地址是这种样式
http://localhost:8080#/ablout
```

- 两者之间进行切换

```js
import { HashRouter as Router, Route, Link, Switch } from 'react-router-dom';
//import {BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom'
// as 用作别名
<Router></Router>;
```

3. Route

- 代表路由规则，用于在路由中实现完全匹配，也就是精准匹配

```js
<Route exact path="/home" component={Home} />
```

- `exact=true` 时，`path` 只能匹配 `/home`；`exact=false` 时，`path` 可以匹配 `/home`、`/home/person`等
- `strict=true` 时，路由请求末尾必须带 `/`

```js
<Route strict path="/home/" component={Home} />
```

4. 组件 Link

- 用于生成 `路由链接`
- `replace:bool`，替换浏览器对象 `history` 为当前路由，而不是添加，也就是之前路由会被替换
- `to:string/object`，设置路由地址

```js
<Link to="/about?me=haha">关于</Link>
<hr />
<Link to={{
  pathname: '/courses',
  search: '?sort=name',
  hash: '#the-hash',
  state: { fromDashboard: true }}>关于</Link>
```

5. 组件 NavLink

- 在生成 `路由链接` 的基础上，如果是当前路由设置激活样式，通过属性 `activeClassName`，可以字符串或对象形式设置样式，以及属性 `isActive`，可接收一个处理函数

```js
<NavLink to="/about" activeClassName="selected">
  关于
</NavLink>
```

```js
<NavLink
  to="/about"
  activeStyle={{
    fontWeight: 'bold',
    color: 'red',
  }}
>
  关于
</NavLink>
```

```js
const checkIsActive = (match, location) => {
  if (!match) {
    return false
  }
  ...
  return true
}

<NavLink to="/about" isActive={checkIsActive}>关于</NavLink>
```

6. 组件 Switch

- 默认情况下，react-router 中只要是路径被匹配到的 Route 对应的组件都会被渲染
- 使用 Switch 包裹的组件，只会渲染出第一个与当前访问地址匹配的 Route 或 Redirect，否则所有 Route 均会显示
- 也就是说，只要有一个 `path` 匹配上了对应的组件，后续就不会再进行匹配了
- 相当于 `Vue` 中的路由容器

7. 组件 Redirect

- 路由重定向，用于路由的重定向, 当这个组件出现后, 就会执行跳转对应的 to 路径中
- `to`：表示重定向要去的 url 字符串，`from`：需要匹配的将要被重定向路径，`push:bool`：属性值为真，重定向操作将会把新地址加入到访问历史记录里，并且无法回退前面的页面

```js
<Switch>
  <Redirect from="/users/:id" to="/users/profile/:id" />
  <Route path="/users/profile/:id" component={Profile} />
</Switch>
```

8. 组件 Prompt

- 当用户离开当前页面作出一些提示
- `message:string`，当用户离开页面时，设置的提示信息

```js
<Prompt message="确定要离开？" />
```

- `message:function`，当用户离开当前页面时，设置的回调函数

```js
<Prompt message={(location) => `确定要去 ${location.pathname} ?`} />
```

- `when:bool`，决定是否启用 `prompt`

---

## 参数传递

---

1. 编写路由定义

```js
<Route path="/user/:id" component={user}>
```

2. 编写接收组件

- 在接收组件中使用 `match.parmas` 来获取传递到当前路由的数据

```js
const user = ({ match }) => (
  <div>
    <span>参数：{match.params.id}</span>
  </div>
);
```

3. 默认组件

- 当路由都没命中时，设置一个默认路由，会被命中

```js
<Switch>
  <Route path="/back" component={Back} />
  <Route component={NoMatch} />
</Switch>
```

4. 实例

```jsx
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
const user = ({ match }) => (
  <div>
    <span>参数：{match.params.id}</span>
  </div>
);
class RouterView extends Component {
  render() {
    return (
      <Router>
        <div>
          <ul>
            <li>
              <Link to="/user/james">Rendering with React</Link>
            </li>
            <li>
              <Link to="/user/bill">Components</Link>
            </li>
            <li>
              <Link to="/user/bob">Props v. State</Link>
            </li>
          </ul>

          <Switch>
            <Route path="/user/:id" component={user} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default RouterView;
```

4. 传递参数三种方式

- 动态路由传递参数

```js
// App.js
<NavLink to={`/detail/${id}`}>详情</NavLink>
<Route path="/detail/:id" component={Detail} />

// Detail.js
{/* 获取动态路由传递的 id 参数 */}
<h2>Detail: {match.params.id}</h2>
```

- search 传递参数，通过 `Link` 或 `NavLink` 组件通过 `to` 属性传递 `query string`

```js
<NavLink to={'/detail?name=tom&age=18'}>详情</NavLink>
<h2>{this.props.location}</h2>
```

- `Link` 中 `to` 属性可以直接传入一个对象

```js
// app.js
<NavLink
  to={{
    pathname: '/detail',
    search: '?name=abc',
    state: info,
  }}
>
  进入详情
</NavLink>;
// detail.js
console.log(this.props.location);
```

```jsx
import React,{Component,createContext,useState} from 'react';

const {Provider,Consumer} = createContext();

const witeScope = Comp => props => {
  return (
    <Consumer>
      {
        keep=> <Comp {...props} keep={keep}></Comp>
      }
    </Consumer>
  )
}

class AliveScope extends Component {
  nodes = {}
  state = {}

  keep = (id,children) => {
    console.log('id',children)
    return new Promise(resolve => {
      this.setState({
        [id]:{
          id,
          children
        }
      },() => resolve(this.nodes[id]))
    })
  }

  render(){
    console.log("AliveScope",this)
    return (
      <Provider value={this.keep}>
        {this.props.children}
        {
          Object.values(this.state).map(item => {
            return <div
              key={item?.id}
              ref={
                node => {
                  this.nodes[item?.id] = node
                }
              }
            >
              {item?.children}
            </div>
          })
        }
      </Provider>
    )
  }
}

@witeScope
class KeepAlive extends Component {
  constructor(props){
    super(props)
    this.init(props)
  }


  init = async (props) => {
    console.log('keep',props)
    const realContent = await props.keep(props.id,props.children)
    this.placeholder.appendChild(realContent)
  }

  render(){
    return (
      <div ref={node => {
        this.placeholder = node
      }} />
    )
  }
}

function Counter() {
  const [count, setCount] = useState(0)

  return (
    <div>
      count: {count}
      <button onClick={() => setCount((count) => count + 1)}>add</button>
    </div>
  )
}

function App() {
  const [show, setShow] = useState(true)
  return (
    <div>
      <button onClick={() => setShow((show) => !show)}>Toggle</button>
      <p>无 KeepAlive</p>
      {show && <Counter />}
      <p>有 KeepAlive</p>
      {show && (
        <KeepAlive id="Test">
          <Counter />
        </KeepAlive>
      )}
    </div>
  )
}

export default () => {
  return <AliveScope>
    <App />
  </AliveScope>
}
```
---