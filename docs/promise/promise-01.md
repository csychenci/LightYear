---
title: 基础描述
date: 2021-03-28 16:13:26
categories: Promise
order: 2
tags:
  - Promise
  - JavaScript
---


## Promise基础

---

1. promise 是什么

- 一个 `Promise` 对象代表一个在这个 `promise` 被创建出来时不一定已知的值。它让我们能够把异步操作最终的成功返回值或者失败原因和相应的处理程序关联起来。这样使得异步方法可以像同步方法那样返回值：异步方法并不会立即返回最终的值，而是会返回一个 `promise`，以便在未来某个时候把值交给使用者。-- `MDN`
- 它是 `ES6` 新增的内置对象，它代表了一个异步操作的最终完成或者失败，表示已经正在发生的过程，它允许我们对延时和异步操作流进行控制。它必然处于以下几种状态之一

| 状态      | 描述                                                                    |
| --------- | ----------------------------------------------------------------------- |
| pending   | 初始的状态，即正在执行，不处于 fulfilled 或 rejected 状态               |
| fulfilled | 成功的完成了操作                                                        |
| rejected  | 失败，没有完成操作                                                      |
| settled   | Promise 处于 fulfilled 或 rejected 二者中的任意一个状态, 不会是 pending |

![图解promise状态-MDN](./promiseImg/promises.png)

```js
// 这是mdn上一个结合xhr与promise来加载图片的例子
function imgLoad(url) {
  return new Promise(function (resolve, reject) {
    var request = new XMLHttpRequest();
    request.open('GET', url);
    request.responseType = 'blob';
    request.onload = function () {
      if (request.status === 200) {
        resolve(request.response);
      } else {
        reject(Error("Image didn't load successfully; error code:" + request.statusText));
      }
    };
    request.onerror = function () {
      reject(Error('There was a network error.'));
    };
    request.send();
  });
}
```

- 在使用 `Promise` 时，会有以下约定：在本轮 `事件循环` 运行完成之前，回调函数是不会被调用的；即使异步操作已经完成（成功或失败），在这之后通过 `then()` 添加的回调函数也会被调用；通过多次调用 `then()` 可以添加多个回调函数，它们会按照插入顺序进行执行，从而实现 `链式调用`

2. promise 的错误传递

- 当遇到 `异常` 被抛出时，浏览器就会顺着 `Promise` 链寻找下一个 `onRejected` 失败回调函数或者由 `.catch()` 指定的回调函数
- 试比较以下两种情况的结果

```js
function handleTest(num) {
  return new Promise((resolved, reject) => {
    if (typeof num == 'number') {
      resolved(num);
    } else {
      reject(num);
    }
  })
    .then(
      (res) => {
        console.log('first run function');
        return res + 1;
      },
      (reason) => {
        console.log('onrejected function run');
        throw new Error(reason + ' not a number');
      },
    )
    .then((res) => {
      return res + 1;
    })
    .then((res) => {
      return res + 1;
    })
    .catch((reason) => {
      console.log('catch error');
      throw new Error(reason);
    });
}
```

```js
function handleTest(num) {
  return new Promise((resolved, reject) => {
    if (typeof num == 'number') {
      resolved(num);
    } else {
      // reject(num)
      throw new Error('run rejected');
    }
  })
    .then(
      (res) => {
        console.log('first run function');
        return res + 1;
      },
      (reason) => {
        console.log('onrejected function run');
        throw new Error(reason + ' not a number');
      },
    )
    .then((res) => {
      return res + 1;
    })
    .then((res) => {
      return res + 1;
    })
    .catch((reason) => {
      console.log('catch error');
      throw new Error(reason);
    });
}
```

3. Promise 拒绝事件

- 当 `promise` 被拒绝时，会有两个事件将会被派发到全局作用域（window），如果是 `web worker` 的话，那就是 `Worker/worker based` 接口
- `rejectionhandled`：当 `promise` 被拒绝时并且 `reject` 函数处理该 `rejection` 之后会派发此事件
- `unhandledrejection`：当 `promise` 被拒绝，但没有提供 `reject` 函数来处理该 `rejection` 时，会派发此事件
- 这两个事件的事件对象都有两个属性：（event.promise）一个指向被拒绝的 `promise`；（event.reason）另一个表示 `promise` 被拒绝的原因

```js
window.addEventListener('rejectionhandled',(event)=>{
  console.warn('Promise is rejected',event.promise.event.reason)
  event.preventDefault()
})

window.onrejectionhandled = (event)=>{
  console.warn('Promise is rejected',event.promise.event.reason)
  event.preventDefault()
  // 阻止promise的默认操作，会把错误打印到控制台
})
```

- 我们可以将那些无法处理的错误或问题通过此事件告知给用户，再进一步将事件提交给服务器
- 如果一个 `promise` 的 `error` 未被在微任务队列的末尾进行处理，则会出现 `未处理的 rejection`。但是，我们可以使用 `catch` 来捕获它

```js
let p1 = Promise.reject('rejected');
// 未被处理，下面的监听事件将会触发

window.addEventListener('unhandledrejection', (event) => console.log(event.reason));
```

```js
let p2 = Promise.reject('rejected').catch((reason) => {
  console.log(reason);
});
// error被处理，下面的监听事件不会触发

window.addEventListener('unhandledrejection', (event) => console.log(event.reason));
```

- 当微任务队列中的任务都完成时，才会生成 `unhandledrejection`：引擎会检查 `promise`，如果 `promise` 中的任意一个出现 `rejected` 状态，`unhandledrejection` 事件就会被触发

```js
let p3 = Promise.reject('rejected');
setTimeout(() => p3.catch((reason) => console.log(reason + ' second')));
// error被延迟处理，下面的监听事件将会被触发

window.addEventListener('unhandledrejection', (event) => console.log(event.reason));

// rejected
// rejected second
```

4. 组合

- 我们还可以手动创建一个已经 `resolve` 或者 `reject` 的 `promise` 快捷方法，它们是 `Promise.resolve()/reject()`，它们依然会返回一个新的 `promise` 对象
- 当 `Promise` 构造器中的传递的函数处理状态时，对状态进行更改后的操作会被忽略，状态是最终的，任何再对状态的更改都是无效的

```js
let p1 = new Promise((resolve, reject) => {
  resolve('fulfilled');
  // 这之后的操作将被忽略
  throw new Error('new error test');
  reject('rejected');
});
// Promise {<fulfilled>: "fulfilled"}
```

```js
let p2 = new Promise((resolve, reject) => {
  throw new Error('new error test');
  // 这之后的操作将被忽略
  reject('rejected');
});
// Promise {<rejected>: Error: new error test
```

5. 链式调用

- 在 `Promise` 的原型对象上，存在着 `then`、`catch`、`finally` 这些方法，它们能进一步的操作一个已敲定状态的 `Promise` 对象，同时，这些方法默认会返回一个新的 `Promise` 对象，我们也可以手动返回一个 `Promise` 对象
- 任何不是 `throw` 的终止都会创建一个 `已决议（resolved）` 状态，而以 `throw` 终止则会创建一个 `已拒绝（rejected）` 状态

```js
let p1 = new Promise((resolve, reject) => {
  throw new Error('new error test');
})
  .then((res) => console.log(res))
  .catch((reason) => console.log(reason));

// Error: new error test
console.log(p1);
// Promise {<fulfilled>: undefined}
```

```js
let p2 = new Promise((resolve, reject) => {
  reject('rejected');
})
  .then((res) => console.log(res))
  .catch((reason) => {
    throw new Error('send error');
  });

console.log(p2);
// Promise {<rejected>: Error: send error
```

6. Resolver 函数
- resolve 解决函数具有以下行为：如果它被调用时传入了新建的 Promise 对象本身（即它所“绑定”的 Promise 对象），则 Promise 对象会被拒绝并抛出一个 TypeError 错误
- 如果它使用了一个非 thenable 的值(基本类型或没有 then 属性或 then 属性不可调用的对象)，则该 promise 对象会以该值立即兑现