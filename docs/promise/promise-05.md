---
title: Promise/A+
date: 2021-04-15 00:30:26
categories: Promise
order: 7
tags:
  - Promise
  - JavaScript
---


## 手写 Promise/A+

---

1. Promise 的重要性

- `Promise` 是 `async/await` 语法的基础，是 js 中处理异步的标准形式

2. Promise 分解

- ① `Promise` 是一个类，在执行这个类时会传入一个执行器参数，这个执行器会立即执行
- ② `Promise` 具有三种状态：`Pending` 初始状态、`Fulfilled` 成功状态、`Rejected` 失败状态
- ③ `pending` 状态，`Promise` 可以切换到 `fulfilled/resolved` 或 `rejected`；`fulfilled/resolved` 状态，不能迁移到其他状态，必须有一个不可变的 `value`；`rejected` 状态，不能迁移到其他状态，必须有个不可变的 `reason`
- ④ `then` 用来处理状态，`fulfilled` 时调用成功回调函数，`rejected` 时调用失败回调函数。`thenable` 是一个包含 `then` 方法的对象或函数

3. Promise 类基本构造

- `promise` 被构造调用时，传入的执行器会立马执行

```js
/** 
 * MyPromise 被构造调用时，executor 会同步执行
*/
class MyPromise {
  constructor(executor) {
    executor();
  }
}
```

- 在执行器传入 `resolve` 和 `reject` 回调方法

```js
class MyPromise {
  constructor(executor) {
    executor(this.resolve, this.reject);
  }
  resolve = () => {};
  reject = () => {};
}
```

- 当成功或失败回调被调用后，修改 `promise` 的状态

```js
class MyPromise {
  static PENDING = 'pending';
  static FULFILLED = 'fulfilled';
  static REJECTED = 'rejected';

  status = MyPromise.PENDING;
  value = null;
  reason = null;

  constructor(executor) {
    executor(this.resolve, this.reject);
  }

  resolve = (value) => {
    if (this.status === MyPromise.PENDING) {
      this.status = MyPromise.FULFILLED;
      this.value = value;
    }
  };

  reject = (reason) => {
    if (this.status === MyPromise.PENDING) {
      this.status = MyPromise.REJECTED;
      this.reason = reason;
    }
  };
}
```

- 当 `promise` 状态变化以后，并且具有 `then` 的处理方法时，`then` 会处理该状态

```js
class MyPromise {

  static PENDING = 'pending';
  static FULFILLED = 'fulfilled';
  static REJECTED = 'rejected';

  status = MyPromise.PENDING;
  value = null;
  reason = null;

  constructor(executor) {
    executor(this.resolve, this.reject);
  }

  status = MyPromise.PENDING;
  value = null;
  reason = null;

  resolve = (value) => {
    if (this.status === MyPromise.PENDING) {
      this.status = MyPromise.FULFILLED;
      this.value = value;
    }
  };

  reject = (reason) => {
    if (this.status === MyPromise.PENDING) {
      this.status = MyPromise.REJECTED;
      this.reason = reason;
    }
  };

  then(onFulfilled, onRejected) {
    if (this.status === MyPromise.FULFILLED) {
      onFulfilled(this.value);
    } else if (this.status === MyPromise.REJECTED) {
      onRejected(this.reason);
    }
  }
}
```

- 目前可以正常实现回调处理了，但存在一个问题，无法在异步逻辑下处理状态。这种情况下，`then` 会立马执行，而 `setTimeout` 的回调函数会在下一轮事件循环才会执行，因此无法同步获取到

```js
let p1 = new MyPromise((resolve, reject) => {
  resolve('同步成功处理');
});

let p2 = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve('同步成功处理');
  });
});

p1.then((res) => {
  console.log(res);
});
// 同步成功处理

p2.then((res) => {
  console.log(res);
});
// 无输出，状态异步变更，状态无法获取
```

4. Promise 类异步逻辑处理

- 缓存状态成功或失败回调函数，在合适的时候去调用它们

```js
class MyPromise {
  constructor(executor) {
    executor(this.resolve, this.reject);
  }

  onFulfilledCallback = null;
  onRejectedCallback = null;

  // ...
}
```

- 在对 `then` 未知状态的逻辑进行改造，在状态未变化时，将成功回调和失败回调存储起来，等到执行成功或失败函数的时候再传递

```js
then(onFulfilled,onRejected){
  switch(this.status){
    case MyPromise.PENDING:
      this.onFulfilledCallback = onFulfilled;
      this.onRejectedCallback = onRejected
      break;
    case MyPromise.FULFILLED:
      onFulfilled(this.value)
      break;
    case MyPromise.REJECTED:
      onRejected(this.reason)
      break;
    default:
      break
  }
}
```

- 对 `resolve/reject` 进行改造， 判断成功或失败回调是否存在，如果存在就调用

```js
resolve = (value) => {
  if (this.status === MyPromise.PENDING) {
    this.status = MyPromise.FULFILLED;
    this.value = value;
    this.onFulfilledCallback?.()
  }
};

reject = (reason) => {
  if (this.status === MyPromise.PENDING) {
    this.status = MyPromise.REJECTED;
    this.reason = reason;
    this.onRejectedCallback?.()
  }
};
```

- 改造完毕的 `promise`，具有了处理异步逻辑的能力，接下来我们进行测试一下

```js
class MyPromise {

  static PENDING = 'pending';
  static FULFILLED = 'fulfilled';
  static REJECTED = 'rejected';

  status = MyPromise.PENDING;
  value = null;
  reason = null;

  constructor(executor) {
    executor(this.resolve, this.reject);
  }

  onFulfilledCallback = null;
  onRejectedCallback = null;

  resolve = (value) => {
    if (this.status === MyPromise.PENDING) {
      this.status = MyPromise.FULFILLED;
      this.value = value;
      this.onFulfilledCallback?.(value)
    }
  };

  reject = (reason) => {
    if (this.status === MyPromise.PENDING) {
      this.status = MyPromise.REJECTED;
      this.reason = reason;
      this.onRejectedCallback?.(reason)
    }
  };

  then(onFulfilled,onRejected){
    switch(this.status){
      case MyPromise.PENDING:
        this.onFulfilledCallback = onFulfilled;
        this.onRejectedCallback = onRejected
        break;
      case MyPromise.FULFILLED:
        onFulfilled(this.value)
        break;
      case MyPromise.REJECTED:
        onRejected(this.reason)
        break;
      default:
        break
    }
  }
}
```

```js
let p3 = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve('同步成功处理');
  }, 5000);
  console.log(new Date().toLocaleString());
});

p3.then((res) => {
  console.log(res, new Date().toLocaleString());
});

// 2021/4/15上午1:51:40
// 同步成功处理 2021/4/15上午1:51:45
// 成功输出
```

5. then 的多次调用

- 如果有多个 `then` 的调用，如果是同步回调，那么直接返回当前的值就行；如果是异步回调，那么保存的成功失败的回调，需要用不同的值保存，因为都互不相同

```js
let p1 = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve('同步成功处理');
  }, 5000);
});

p1.then((res) => {
  console.log('then1', res);
});

p1.then((res) => {
  console.log('then2', res);
});

p1.then((res) => {
  console.log('then3', res);
});

// then3 同步成功处理
// ？只有第三个的回调被执行了
```

- 我们为 `promise` 中新增两个数组，用于存放注册的 `then` 回调方法，同时修改 `then` 的处理逻辑

```js
class MyPromise {

  static PENDING = 'pending';
  static FULFILLED = 'fulfilled';
  static REJECTED = 'rejected';

  status = MyPromise.PENDING;
  value = null;
  reason = null;

  constructor(executor) {
    executor(this.resolve, this.reject);
  }

  onFulfilledCallback = [];
  onRejectedCallback = [];

  resolve = (value) => {
    if (this.status === MyPromise.PENDING) {
      this.status = MyPromise.FULFILLED;
      this.value = value;
      this.onFulfilledCallback?.(value)
    }
  };

  reject = (reason) => {
    if (this.status === MyPromise.PENDING) {
      this.status = MyPromise.REJECTED;
      this.reason = reason;
      this.onRejectedCallback?.(reason)
    }
  };

  then(onFulfilled,onRejected){
    switch(this.status){
      case MyPromise.PENDING:
        this.onFulfilledCallback.push(onFulfilled);
        this.onRejectedCallback.push(onRejected)
        break;
      case MyPromise.FULFILLED:
        onFulfilled(this.value)
        break;
      case MyPromise.REJECTED:
        onRejected(this.reason)
        break;
      default:
        break
    }
  }
}
```

- 对成功或失败的状态回调进行循环调用

```js
resolve = (value) => {
  if(this.status === MyPromise.PENDING){
    this.status = MyPromise.FULFILLED
    this.value = value

    while(this.onFulfilledCallback.length){
      this.onFulfilledCallback.shift()(value)
    }
  }
}
reject = (reason) => {
  if(this.status === MyPromisePENDING){
    this.status = MyPromise.REJECTED
    this.reason = reason

    while(this.onRejectedCallback.length){
      this.onRejectedCallback.shift()(reason)
    }
}
```

- 接下来，我们再来看看输出的结果

```js
class MyPromise {

  static PENDING = 'pending';
  static FULFILLED = 'fulfilled';
  static REJECTED = 'rejected';

  status = MyPromise.PENDING;
  value = null;
  reason = null;

  constructor(executor) {
    executor(this.resolve, this.reject);
  }

  onFulfilledCallback = [];
  onRejectedCallback = [];

  resolve = (value) => {
    if(this.status === MyPromise.PENDING){
      this.status = MyPromise.FULFILLED
      this.value = value

      while(this.onFulfilledCallback.length){
        this.onFulfilledCallback.shift()(value)
      }
    }
  }

  reject = (reason) => {
    if(this.status === MyPromisePENDING){
      this.status = MyPromise.REJECTED
      this.reason = reason

      while(this.onRejectedCallback.length){
        this.onRejectedCallback.shift()(reason)
      }
    }
  }

  then(onFulfilled,onRejected){
    switch(this.status){
      case MyPromise.PENDING:
        this.onFulfilledCallback.push(onFulfilled);
        this.onRejectedCallback.push(onRejected)
        break;
      case MyPromise.FULFILLED:
        onFulfilled(this.value)
        break;
      case MyPromise.REJECTED:
        onRejected(this.reason)
        break;
      default:
        break
    }
  }
}
```

```js
let p1 = new MyPromise((resolve, reject) => {
  console.log(new Date());
  setTimeout(() => {
    resolve('同步成功处理');
  }, 5000);
});

p1.then((res) => {
  console.log('then1', res, console.log(new Date()));
});

p1.then((res) => {
  console.log('then2', res, console.log(new Date()));
});

p1.then((res) => {
  console.log('then3', res, console.log(new Date()));
});

// 成功输出
// Thu Apr 15 2021 02:07:58 GMT+0800 (中国标准时间)

// Thu Apr 15 2021 02:08:03 GMT+0800 (中国标准时间)
// then1 同步成功处理

// Thu Apr 15 2021 02:08:03 GMT+0800 (中国标准时间)
// then2 同步成功处理

// Thu Apr 15 2021 02:08:03 GMT+0800 (中国标准时间)
// then3 同步成功处理
```

6. Promise 的链式调用

- `then` 方法链式调用的核心是返回一个 `Promise` 对象，`then` 方法里面 `return` 一个返回值作为下一个 `then` 方法的参数，如果是 `return` 一个 `Promise` 对象，那么就需要判断它的状态

```js
let p1 = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve('处理完成');
  }, 2000);
});

function transition(value) {
  return new MyPromise((resolve, reject) => {
    resolve(value);
  });
}

let resolve1 = null;
let resolve2 = null;
let resolve3 = null;

let then1 = p1.then((res) => {
  let value = 'then1' + res;
  console.log(value);
  resolve1 = transition(value);
  return resolve1;
});

let then2 = p1.then((res) => {
  let value = 'then2' + res;
  console.log(value);
  resolve2 = transition(value);
  return resolve2;
});

let then3 = p1.then((res) => {
  let value = 'then3' + res;
  console.log(value);
  resolve3 = transition(value);
  return resolve3;
});

console.log(then1); // undefined
console.log(then2); // undefined
console.log(then3); // undefined

console.log(resolve1);
// MyPromise {status: "fulfilled", value: "then1处理完成", reason: null, onFulfilledCallback: Array(0), onRejectedCallback: Array(0), …}

console.log(resolve2);
// MyPromise {status: "fulfilled", value: "then2处理完成", reason: null, onFulfilledCallback: Array(0), onRejectedCallback: Array(0), …}

console.log(resolve3);
// MyPromise {status: "fulfilled", value: "then3处理完成", reason: null, onFulfilledCallback: Array(0), onRejectedCallback: Array(0), …}
```

- 可以发现，我们在 `then` 中返回一个新的 `promise` 对象并不能达到效果，因为 `then` 中并没有处理返回值，而处理返回值的是 `resolve/reject` 处理回调或成功数组的每一项执行后的

```js
let p1 = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve('处理完成');
  }, 2000);
});

function transition(value) {
  return new MyPromise((resolve, reject) => {
    resolve(value);
  });
}

p1.then((res) => {
  console.log(res);
  return transition(res);
}).then((res) => {
  console.log(res);
  return transition(res);
});

// Cannot read property 'then' of undefined
```

- 因此，这时候链式调用无法完成，需要继续进行改造 `then`

```js
class MyPromise {
  constructor(executor) {
    executor(this.resolve, this.reject);
  }
  then(onFulfilled, onRejected) {
    const newPromise = new MyPromise((resolve, reject) => {
      if (this.status === MyPromise.FULFILLED) {
        const res = onFulfilled(this.value);
        resolvePromise(res, resolve, reject);
      } else if (this.status === MyPromise.REJECTED) {
        onRejected(this.reason);
      } else if (this.status === MyPromise.PENDING) {
        this.onFulfilledCallback.push(onFulfilled);
        this.onRejectedCallback.push(onRejected);
      }
    });
    return newPromise;
  }
}

function resolvePromise(res, resolve, reject) {
  if (res instanceof MyPromise) {
    res.then(
      (value) => resolve(value),
      (reason) => reject(reason),
    );
    // 如果是一个promise对象
  } else {
    resolve(res);
    // 否则是普通值的情况
  }
}
```

- 如果 `then` 方法返回的是自己的 `Promise` 对象，则会发生循环调用，这个时候程序会报错。也就是当 `then` 返回调用者时，程序是会报错的

```js
let p = new Promise((resolve, reject) => {
  resolve('success');
});

var p1 = p.then((res) => {
  return p1;
});
// Uncaught (in promise) TypeError: Chaining cycle detected for promise #<Promise>
```

```js
class MyPromise {
  constructor(executor) {
    executor(this.resolve, this.reject);
  }

  // ...

  then(onFulfilled, onRejected) {
    const newPromise = new MyPromise((resolve, reject) => {
      if (this.status === FULFILLED) {
        const res = onFulfilled(this.value);
        resolvePromise(newPromise, res, resolve, reject);
      } else if (this.status === REJECTED) {
        onRejected(this.reason);
      } else if (this.status === PENDING) {
        this.onFulfilledCallback.push(onFulfilled);
        this.onRejectedCallback.push(onRejected);
      }
    });
    return newPromise;
  }
}

function resolvePromise(promise, res, resolve, reject) {
  if (promise === res) {
    return reject(new TypeError('TypeError: Chaining cycle detected for promise #<Promise>'));
  }
  if (res instanceof MyPromise) {
    res.then(
      (value) => resolve(value),
      (reason) => reject(reason),
    );
    // 目的是将then返回的promise的状态变为 fulfilled 或者 rejected

    // 如果是一个promise对象
  } else {
    resolve(res);
    // 否则是普通值的情况
  }
}
```

7. 创建微任务

- 在 `then` 内部，我们需要创建一个异步函数去等待 `then` 返回的 `promise` 完成初始化

```js
class MyPromise {
  constructor(executor) {
    executor(this.resolve, this.reject);
  }

  // ...

  then(onFulfilled, onRejected) {
    const newPromise = new MyPromise((resolve, reject) => {
      if (this.status === FULFILLED) {
        queueMicrotask(() => {
          // 获取成功回调函数的执行结果
          // 传入 resolvePromise 集中处理
          const res = onFulfilled(this.value);
          resolvePromise(newPromise, res, resolve, reject);
        });
      } else if (this.status === REJECTED) {
        onRejected(this.reason);
      } else if (this.status === PENDING) {
        this.onFulfilledCallback.push(onFulfilled);
        this.onRejectedCallback.push(onRejected);
      }
    });
    return newPromise;
  }
}
```

8. 异常捕获

- 首先需要对执行器中的代码错误进行捕获，如果有错误，将状态修改为失败 `rejected`

```js
class MyPromise {
  constructor(executor) {
    try {
      executor(this.resolve, this.reject);
    } catch (err) {
      this.reject(err);
    }
  }
}
```

- 接下来，`then` 执行过程中的错误也要捕获

```js
then(onFulfilled,onRejected){
    const newPromise = new MyPromise((resolve,reject)=>{
        if(this.status === FULFILLED){
            queueMicrotask(() => {
                try{
                    // 获取成功回调函数的执行结果
                    // 传入 resolvePromise 集中处理
                    const res = onFulfilled(this.value)
                    resolvePromise(newPromise,res,resolve,reject)
                }catch(err){
                    reject(err)
                }
            })
        } else if(this.status === REJECTED){
            onRejected(this.reason)
        } else if(this.status === PENDING){
            this.onFulfilledCallback.push(onFulfilled)
            this.onRejectedCallback.push(onRejected)
        }
    })
    return newPromise
}
```

9. 链式调用不同状态的改造

- 增加异步状态下的链式调用，增加回调函数执行结果的判断，增加识别 `Promise` 是否返回自己，增加错误捕获

```js
then(onFulfilled,onRejected){
    const newPromise = new MyPromise((resolve,reject)=>{
        if(this.status === FULFILLED){
            queueMicrotask(() => {
                try{
                    // 获取成功回调函数的执行结果
                    // 传入 resolvePromise 集中处理
                    const res = onFulfilled(this.value)
                    resolvePromise(newPromise,res,resolve,reject)
                }catch(err){
                    reject(err)
                }
            })
        } else if(this.status === REJECTED){
            queueMicrotask(() => {
                try{
                    // 获取失败回调函数的执行结果
                    // 传入 resolvePromise 集中处理
                    const res = onRejected(this.reason)
                    resolvePromise(newPromise,res,resolve,reject)
                }catch(err){
                    reject(err)
                }
            })
        } else if(this.status === PENDING){
            this.onFulfilledCallback.push(()=>{
                queueMicrotask(()=>{
                    try{
                        const res = onFulfilled(this.value)
                        resolvePromise(newPromise,res,resolve,reject)
                    }catch(err){
                        reject(err)
                    }
                })
            })
            this.onRejectedCallback.push(()=>{
                queueMicrotask(()=>{
                    try{
                        const res = onRejected(this.reason)
                        resolvePromise(newPromise,res,resolve,reject)
                    }catch(err){
                        reject(err)
                    }
                })
            })
        }
    })
    return newPromise
}
```

10. 对 then 的参数进行改造

- 处理 `then` 方法的时候都是默认传入 `onFulfilled`、`onRejected` 两个回调函数，但是实际上原生 `Promise` 是可以选择参数的单传或者不传，都不会影响执行

```js
then(onFulfilled,onRejected){
    // 未传递的情况下默认传值
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value;
    onRejected = typeof onRejected === 'function' ? onRejected : reason => {throw reason};
}
```

11. 直接处理状态

- `Promise` 具有静态方法 `resolve/reject`，它会直接创建一个成功或失败状态的 `promise

```js
class MyPromise {
  constructor(executor) {
    try {
      executor(this.resolve, this.reject);
    } catch (err) {
      this.reject(err);
    }
  }

  // ...

  static resolve(arg) {
    if (arg instanceof MyPromise) {
      // 传入的是promise实例就直接返回
      return arg;
    }
    return new MyPromise((resolve) => {
      resolve(arg);
    });
  }

  static reject(reason) {
    return new MyPromise((resolve, reject) => {
      reject(reason);
    });
  }
}
```

12. 细节处理

- 当处理 `then` 里面的状态变化时，需要判断经过 `onFulfill/onReject` 处理后的结果是 `object` 或 `function`，满足则接着判断 `res.then` 是否存在

```js
function resolvePromise(promise, res, resolve, reject) {
  if (promise === res) {
    return reject(new TypeError('TypeError: Chaining cycle detected for promise #<Promise>'));
  }
  if (typeof res === 'object' || typeof res === 'function') {
    if (res === null) {
      // res 为 null 直接返回，走后面的逻辑会报错
      return resolve(res);
    }
    let then;
    try {
      then = res.then;
    } catch (err) {
      return reject(err);
    }

    if (typeof then === 'function') {
      let called = false;
      try {
        then.call(
          res,
          (y) => {
            if (called) return;
            called = true;
            resolvePromise(promise, y, resolve, reject);
          },
          (r) => {
            if (called) return;
            called = true;
            reject(r);
          },
        );
        // 如果 resolvePromise 和 rejectPromise 均被调用，
        // 或者被同一参数调用了多次，则优先采用首次调用并忽略剩下的调用
        // 实现这条需要前面加一个变量 called
      } catch (err) {
        if (called) return;
        reject(err);
      }
    } else {
      resolve(res);
    }
  } else {
    resolve(res);
  }
}
```

13. 完整版

```js
const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

function resolvePromise(promise, res, resolve, reject) {
  if (promise === res) {
    return reject(new TypeError('TypeError: Chaining cycle detected for promise #<Promise>'));
  }
  if (typeof res === 'object' || typeof res === 'function') {
    if (res === null) {
      // res 为 null 直接返回，走后面的逻辑会报错
      return resolve(res);
    }
    let then;
    try {
      then = res.then;
    } catch (err) {
      return reject(err);
    }

    if (typeof then === 'function') {
      let called = false;
      try {
        then.call(
          res,
          (y) => {
            if (called) return;
            called = true;
            resolvePromise(promise, y, resolve, reject);
          },
          (r) => {
            if (called) return;
            called = true;
            reject(r);
          },
        );
        // 如果 resolvePromise 和 rejectPromise 均被调用，
        // 或者被同一参数调用了多次，则优先采用首次调用并忽略剩下的调用
        // 实现这条需要前面加一个变量 called
      } catch (err) {
        if (called) return;
        reject(err);
      }
    } else {
      resolve(res);
    }
  } else {
    resolve(res);
  }
}

class MyPromise {
  constructor(executor) {
    try {
      executor(this.resolve, this.reject);
    } catch (err) {
      this.reject(err);
    }
  }

  status = PENDING;
  value = null;
  reason = null;

  onFulfilledCallback = [];
  onRejectedCallback = [];

  resolve = (value) => {
    if (this.status === PENDING) {
      this.status = FULFILLED;
      this.value = value;

      while (this.onFulfilledCallback.length) {
        this.onFulfilledCallback.shift()(value);
      }
    }
  };

  reject = (reason) => {
    if (this.status === PENDING) {
      this.status = REJECTED;
      this.reason = reason;

      while (this.onRejectedCallback.length) {
        this.onRejectedCallback.shift()(reason);
      }
    }
  };

  static resolve(arg) {
    if (arg instanceof MyPromise) {
      // 传入的是promise实例就直接返回
      return arg;
    }
    return new MyPromise((resolve) => {
      resolve(arg);
    });
  }

  static reject(reason) {
    return new MyPromise((resolve, reject) => {
      reject(reason);
    });
  }

  then(onFulfilled, onRejected) {
    // 未传递的情况下默认传值
    const realOnFulfilled = typeof onFulfilled === 'function' ? onFulfilled : (value) => value;
    const realOnRejected =
      typeof onRejected === 'function'
        ? onRejected
        : (reason) => {
            throw reason;
          };

    const newPromise = new MyPromise((resolve, reject) => {
      const fulfillMicrotask = () => {
        queueMicrotask(() => {
          try {
            // 获取成功回调函数的执行结果
            // 传入 resolvePromise 集中处理
            const res = realOnFulfilled(this.value);
            resolvePromise(newPromise, res, resolve, reject);
          } catch (err) {
            reject(err);
          }
        });
      };
      const rejectMicrotask = () => {
        queueMicrotask(() => {
          try {
            // 获取成功回调函数的执行结果
            // 传入 resolvePromise 集中处理
            const res = realOnRejected(this.reason);
            resolvePromise(newPromise, res, resolve, reject);
          } catch (err) {
            reject(err);
          }
        });
      };
      if (this.status === FULFILLED) {
        fulfillMicrotask();
      } else if (this.status === REJECTED) {
        rejectMicrotask();
      } else if (this.status === PENDING) {
        this.onFulfilledCallback.push(fulfillMicrotask);
        this.onRejectedCallback.push(rejectMicrotask);
      }
    });
    return newPromise;
  }
}
```

- _Promise.all_

```js
MyPromise.all = function (arg) {
  if (!Object(arg)[Symbol.iterator]) {
    throw new Error(typeof arg + ' is not iterator (cannot read property Symbol(Symbol.iterator))');
  }
  return new Promise((resolve, reject) => {
    let iteratorIndex = 0;
    // 迭代计数器，用于记录当前迭代的位置
    let fullCount = 0;
    // iterator内完成的promise数量
    let resolveRes = [];

    for (let item of arg) {
      let resultIndex = iteratorIndex;
      iteratorIndex += 1;
      Promise.resolve(item)
        .then((res) => {
          resolveRes[resultIndex] = res;
          fullCount += 1;

          if (fullCount === iteratorIndex) {
            resolve(resolveRes);
          }
        })
        .catch((err) => {
          reject(err);
        });
    }

    if (iteratorIndex === 0) {
      // 处理空的iterator
      resolve(resolveRes);
    }
  });
};
```
