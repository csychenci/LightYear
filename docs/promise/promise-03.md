---
title: Promise的原型方法
date: 2021-04-06 22:11:25
categories: Promise
order: 4
tags:
  - Promise
  - JavaScript
---


## Promise 的原型方法

---

1. Promise.prototype.catch

- `catch` 方法会返回一个 `promise`，并且处理拒绝的情况。它的行为就像调用 `then(null/undefined,onRejected)` 相同
- 如果 `onRejected` 抛出一个错误或返回一个本身失败的 `Promise`，通过 `catch()` 返回的 `Promise` 被 `rejected`；否则，它将显示为成功（resolved）
- 一个已决议的 `promise` 也不会被 `catch` 所处理

```js
let promise1 = new Promise((resolved, rejected) => {
  rejected('first error');
}).then(null, (reason) => {
  throw new Error('promise1 second error');
});

let promise2 = new Promise((resolved, rejected) => {
  rejected('first error');
}).then(null, (reason) => {
  return Promise.reject('promise2 ' + reason);
});

let promise3 = new Promise((resolved, rejected) => {
  rejected('first error');
}).then(null, (reason) => {
  console.log(reason);
  // 未抛出一个错误或返回一个失败的promise
});

console.log(promise1);
// Promise {<rejected>: Error: promise1 second error

console.log(promise2);
// Promise {<rejected>: "promise2 first error"}

console.log(promise3);
// Promise {<fulfilled>: undefined}
```

- 我们可以抛出一个错误，然后使用 `catch` 来捕获到这个错误。但是在异步函数中抛出的错误不会被 `catch` 所捕获，在 `resolve()` 后面的抛出的错误也不会被捕获

```js
let promise1 = new Promise((resolved, rejected) => {
  Promise.reject('1');
})
  .then((res) => {
    console.log(res);
  })
  .then(null, (reason) => {
    throw new Error('promise1 second error');
  });

let promise2 = new Promise((resolved, rejected) => {
  setTimeout(() => {
    throw new Error('error');
  }, 1000);
})
  .then((res) => {
    console.log(res);
  })
  .then(null, (reason) => {
    throw new Error('promise1 second error');
  });

let promise3 = new Promise((resolved, rejected) => {
  resolved('error');
  throw new Error('error');
})
  .then((res) => {
    console.log(res);
  })
  .then(null, (reason) => {
    throw new Error('promise1 second error');
  });

console.log(promise1);
// Promise {<pending>}

console.log(promise2);
// Promise {<pending>}

console.log(promise3);
// Promise {<fulfilled>: undefined}
```

- 同时，`catch` 会捕获那些意外的错误以及显式地抛出的错误。但是，除了手动 `reject` 外，在 `executor` 运行之后而不是在运行时生成的错误，将不会被 `catch` 所捕获

```js
let promise1 = new Promise((resolved, rejected) => {
  throw new Error('executor runing error');
  // executor运行时抛出
})
  .then((res) => {
    console.log(res);
  })
  .catch((reason) => {
    console.log(reason);
  });
// Error: executor runing error

console.log(promise1);
// Promise {<fulfilled>: undefined}
```

```js
let promise2 = new Promise((resolved, rejected) => {
  setTimeout(() => {
    throw new Error('executor runing error');
  });
  // executor运行之后异步抛出
})
  .then((res) => {
    console.log(res);
  })
  .catch((reason) => {
    console.log(reason);
  });
// 无输出

console.log(promise2);
// Promise {<pending>}
```

2. Promise.prototype.then

- 此方法会返回一个新的 `Promise`。最多为它提供两个参数，分别为调用此方法的 `Promise` 的成功和失败情况的回调函数
- 当 `Promise` 变成接受状态(_fulfilled_)时，即接受的最终结果(_the fulfillment value_)。如果该 `onFulfilled` 函数的参数不是函数，则会在内部被替换为 (x) => x，即原样返回 `promise` 最终结果的函数

```js
let p1 = Promise.resolve('fulfilled');

p1.then(1);
// Promise {<fulfilled>: "fulfilled"}

p1.then([1, 2, 3]);
//  Promise {<fulfilled>: "fulfilled"}
```

- 当 `Promise` 变成拒绝状态(_rejected_)时，即拒绝的原因(_rejection reason_)，如果该`onRejected` 函数的参数不是函数，则会在内部被替换为一个 `Thrower` 函数

```js
let p1 = Promise.reject('rejected');

p1.then(1);
// Promise {<rejected>: "rejected"}
// Uncaught (in promise) rejected

p1.then([1, 2, 3]);
// Promise {<rejected>: "rejected"}
// Uncaught (in promise) rejected
```

- `Promise` 根据完成或失败状态，返回的函数将被异步调用，根据 `then` 的回调函数产生的返回值有以下情况

<!-- <promiseThen></promiseThen> -->


> 返回了一个值，那么 `then` 返回的 `Promise` 将会成为接受状态，并且将返回的值作为接受状态的回调函数的参数值

> 没有返回任何值，那么 `then` 返回的 `Promise` 将会成为接受状态，并且该接受状态的回调函数的参数值为 `undefined`

> 抛出一个错误，那么 `then` 返回的 `Promise` 将会成为拒绝状态，并且将抛出的错误作为拒绝状态的回调函数的参数值

> 返回一个已经是接受状态的 `Promise`，那么 `then` 返回的 `Promise` 也会成为接受状态，并且将那个 `Promise` 的接受状态的回调函数的参数值作为该被返回的 `Promise` 的接受状态回调函数的参数值。

> 返回一个已经是拒绝状态的 `Promise`，那么 `then` 返回的 `Promise` 也会成为拒绝状态，并且将那个 `Promise` 的拒绝状态的回调函数的参数值作为该被返回的 `Promise` 的拒绝状态回调函数的参数值。

> 返回一个未定状态（pending）的 `Promise`，那么 `then` 返回 `Promise` 的状态也是未定的，并且它的终态与那个 `Promise` 的终态相同；同时，它变为终态时调用的回调函数参数与那个 `Promise` 变为终态时的回调函数的参数是相同的

3. Promise.prototype.finally

- 返回一个 `Promise`。在 `promise` 决议时，无论结果是 `fulfilled` 或者是 `rejected`，都会执行指定的回调函数
- 由于无法知道 `promise` 的最终状态，所以 `finally` 的回调函数中不接收任何参数，它仅用于无论最终结果如何都要执行的情况
- 与 Promise.resolve(2).then(() => {}, () => {}) （resolved 的结果为 undefined）不同，Promise.resolve(2).finally(() => {}) resolved 的结果为 2
- 同样，Promise.reject(3).then(() => {}, () => {}) (rejected 的结果为 undefined), Promise.reject(3).finally(() => {}) rejected 的结果为 3

```js
let p1 = Promise.resolve(2);

let p2 = Promise.reject(3);

p1.then((res) => {
  console.log(res);
});
// Promise {<fulfilled>: undefined}

p1.finally((res) => {
  console.log(res);
});
// Promise {<fulfilled>: 2}

p2.catch((reason) => {
  console.log(reason);
});
// Promise {<fulfilled>: undefined}

p2.finally((reason) => {
  console.log(reason);
});
// Promise {<rejected>: 3}
```

- 也就是说，`finally` 会将结果与错误传递给下一个处理程序
