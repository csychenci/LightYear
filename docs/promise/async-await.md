---
title: Async/Await
date: 2021-04-08 04:45:45
categories: Promise
order: 6
tags:
  - Promise
  - JavaScript
  - async
  - await
---

## Async

---

1. async 函数

- `async` 函数是使用 `async` 关键字声明的函数，它属于 `AsyncFunction` 构造函数的实例，允许在使用 `async` 声明的函数内使用 `await` 关键字。`ES6` 中的 `class` 也支持将方法转化为异步形式的方法
- 搭配使用 `async` 和 `await` 可以让我们用更简洁的方式书写基于 `Promise` 的异步行为

```js
function testPromise() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('1s后触发');
    }, 1000);
  });
}

async function asyncTest() {
  console.log('code start');
  const res = await testPromise();
  console.log(res);
}

asyncTest();

// code start
// 1s后触发
```

2. async 函数的返回值

- 使用 `async` 声明的函数的返回值是一个 `Promise`，如果一个 `async` 函数的返回值看起来不是 `promise`，那么它将会被隐式地包装在一个 `promise` 中。这个 `promise` 要么会通过一个由 `async` 函数返回的值被解决，要么会通过一个从 `async` 函数中抛出的（或其中没有被捕获到的）异常被拒绝

```js
async function testAsync1() {
  return 1;
  // 等价于 return Promise.resolve(1)
}

let test1 = testAsync1();
// Promise {<fulfilled>: 1}
```

```js
async function testAsync2() {
  return Promise.resolve(2);
}

let test2 = testAsync2();
// Promise {<fulfilled>: 2}
```

```js
async function testAsync3() {
  throw new Error('new error');
}

let test3 = testAsync3();
// Promise {<rejected>: Error: new error
```

3. 异步行为与错误捕获

- 可以在 `async` 函数中使用多个 `await` 表达式。`await` 会暂停整个 `async` 函数的执行过程并让出其控制权，直到 `await` 等待的那个基于 `promise` 的异步操作成功或失败之后才会恢复执行。这个 `promise` 的解决值会被当作 `await` 表达式的返回值
- 我们可以把 `async` 函数的函数体看成是 0 个或多个 `await` 表达式分割开的。从第一行代码直到（并包括）第一个 `await` 表达式（如果有的话）都是同步运行的。这样的话，一个不含 await 表达式的 async 函数是会同步运行的
- 然而，如果函数体内有一个 `await` 表达式，async 函数就一定会异步执行。若函数体中有多个 `await`，那么它会分阶段进行 `让出进程-恢复进程` 的过程，因此，需要注意对错误函数的处理

```js
async function testAsync1() {
  let res = await Promise.resolve(1);
  console.log(res);
}

// 以下代码等价于上述代码
function testAsync2() {
  let res = Promise.resolve(1).then(() => console.log('res', res));
}
//'res', Promise {<fulfilled>: undefined}
```

- 在 `await` 表达式之后的代码可以被认为存在在 `链式调用` 的 `then` 回调中。多个 `await` 表达式都将加入链式调用的 `then` 回调中，返回值将作为最后一个 `then` 回调的返回值

```js
function testPromise() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('1s后成功');
    }, 1000);
  });
}

async function asyncTest() {
  console.log('code start');
  const res = await testPromise();
  console.log('res', res);
}

asyncTest();
// code start
// res 1s后成功

// Promise {<fulfilled>: undefined}
```

```js
function testPromise1() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject('1s后失败');
    }, 1000);
  });
}

async function asyncTest() {
  console.log('code start');
  const res1 = await testPromise1();
  return res1;
}

asyncTest();
// code start
// Uncaught (in promise) 1s后失败
// Promise {<rejected>: "1s后失败"}
```

```js
function testPromise2() {
  return new Promise((resolve, reject) => {
    throw new Error('throw one error');
  });
}

async function asyncTest() {
  console.log('code start');
  const res2 = await testPromise2();
  return res2;
}

asyncTest();
// code start
// Uncaught (in promise) Error: throw one error
// Promise {<rejected>: Error: throw one error
```

- 我们可以给 `async` 配置 `catch` 来捕获所有的错误。`await` 捕获的第一个错误将会被当作 `async` 函数的拒绝结果并被返回

```js
async function testAsync() {
  let p2 = new Promise((resolve, reject) => {
    throw new Error('p2');
  });
  let p1 = new Promise((resolve, reject) => {
    setTimeout(() => {
      reject('p1');
    }, 1000);
  });
  await p1;
  await p2;
}

let p1 = testAsync();
// Promise {<rejected>: "p1"}
```

```js
async function testAsync() {
  let p2 = new Promise((resolve, reject) => {
    throw new Error('p2');
  });
  let p1 = new Promise((resolve, reject) => {
    setTimeout(() => {
      reject('p1');
    }, 1000);
  });
  await p2;
  await p1;
}

let p1 = testAsync();
// Promise {<rejected>: Error: p2
```

- 如果任一 `async` 函数体中的 `await` 调用失败，函数体将自动捕获异常，`async` 函数执行中断，并通过隐式返回 `Promise` 将错误传递给调用者
- 注意 `return value` 与 `return await value` 的区别。前者不论是成功还是失败，都是直接返回 `value`；而后者则会等待 `value` 的状态改变，当是拒绝时，会在返回前抛出异常

```js
let testP1 = function () {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('testP1 fulfilled');
    }, 500);
  });
};

let testP2 = function () {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject('testP2 reject');
    }, 1000);
  });
};

let testP3 = function () {
  return new Promise((resolve, reject) => {
    throw new Error('testP3 error');
  });
};
```

```js
async function testAsync() {
  try {
    return testP1();
  } catch (e) {
    return e;
  }
}
async function testAsync1() {
  try {
    return testP2();
  } catch (e) {
    return 'reject ' + e;
  }
}
async function testAsync2() {
  try {
    return testP3();
  } catch (e) {
    return 'return before ' + e;
  }
}

let test1 = testAsync();
// Promise {<fulfilled>: "testP1 fulfilled"}

let test2 = testAsync1();
// Promise {<rejected>: "testP2 reject"}

let test3 = testAsync2();
// Promise {<rejected>: Error: testP3 error
```

```js
async function testAsync() {
  try {
    return await testP1();
  } catch (e) {
    return e;
  }
}
async function testAsync1() {
  try {
    return await testP2();
  } catch (e) {
    return 'reject ' + e;
  }
}
async function testAsync2() {
  try {
    return await testP3();
  } catch (e) {
    return 'return before ' + e;
  }
}

let test1 = testAsync();
// Promise {<fulfilled>: "testP1 fulfilled"}

let test2 = testAsync1();
// Promise {<fulfilled>: "reject testP2 reject"}

let test3 = testAsync2();
// Promise {<fulfilled>: "return before Error: testP3 error"}
```

- 注意：当 `await` 后面的代码出现异常、抛出一个异常或者状态切换为 `rejected` 时，才会在返回之前捕获该异常

---

## await

---

1. await 的作用

- 用于返回一个 `promise` 对象，并且它只能在 `async` 函数体中使用。它也可以接受一个 `thenable` 对象，返回值根据回调函数的参数来处理

```js
let obj = {
  then: function (resolve, reject) {
    setTimeout(() => {
      resolve('resolved 2s');
    }, 2000);
  },
};

async function testAsync() {
  let res = await obj;
  console.log(res);
}

testAsync();
// resolved 2s
```

- `await` 会暂停当前 `async` 函数的执行，直到等待的 `promise` 处理完成

- 我们可以将 async 调用的函数当成是一个协程，当遇到 await 关键字时，会保存当前函数的执行上下文信息，并将控制权转交到外部；当 await 等待并获得一个已确定的结果以后，控制权会恢复到协程之中执行

2. 返回值

- 当被等待 `promise` 的状态切换为 `fulfilled` 时，调用的改变状态的回调函数 `onFulfill` 中的参数将作为 `await` 表达式的返回值

```js
let testP = function () {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('testP1 fulfilled');
    }, 500);
  });
};

async function testAsync() {
  let p = await testP();
  console.log(p);
}

testAsync();
// testP1 fulfilled
```

- 当被等待 `promise` 的状态切换为 `rejected` 或抛出一个异常时，`await` 会将 `promise` 的异常抛出

```js
let testP = function () {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject('testP1 rejected');
    }, 500);
    // throw new Error('testP1 rejected')
  });
};

async function testAsync() {
  let p = await testP();
  // Uncaught (in promise) testP1 rejected
  // 抛出异常，下面的代码不会被执行
  console.log('p', p);
  return p;
}

testAsync();
// Promise {<rejected>: "testP1 rejected"}
```

- 若 `await` 操作符后的表达式的值不是一个 `Promise`，则返回该值本身

```js
async function testAsync() {
  let p = await 1;
  // Uncaught (in promise) testP1 rejected
  // 抛出异常，下面的代码不会被执行
  console.log('p', p);
  return p;
}

testAsync();
// p 1
// Promise {<fulfilled>: 1}
```
