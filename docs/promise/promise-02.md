---
title: Promise的静态方法
date: 2021-04-04 02:11:25
order: 3
categories: Promise
tags:
  - Promise
  - JavaScript
---


## Promise 的静态方法

---

1. Promise.all(itetator)

- 这个方法返回一个新的 `promise` 对象，该 `promise` 对象在 `iterable` 参数对象里所有的 `promise` 对象都成功的时候才会触发成功，一旦有任何一个 `iterable` 里面的 `promise` 对象失败则立即触发该 `promise` 对象的失败。这个新的 `promise` 对象在触发成功状态以后，会把一个包含 `iterable` 里所有 `promise` 返回值的数组作为成功回调的返回值，顺序跟 `iterable` 的顺序保持一致；如果这个新的 `promise` 对象触发了失败状态，它会把 `iterable` 里第一个触发失败的 `promise` 对象的错误信息作为它的失败错误信息。`Promise.all` 方法常被用于处理多个 `promise` 对象的状态集合。 --- `MDN`
- 这个方法返回的新 `Promise` 的 `resolve` 回调执行是在所有输入的 `promise` 的 `resolve` 回调都结束，或者输入的 `iterable` 里没有 `promise` 了的时候。它的 `reject` 回调执行是，只要任何一个输入的 `promise` 的 `reject` 回调执行或者输入不合法的 `promise` 就会立即抛出错误，并且 `reject` 的是第一个抛出的错误信息

```js
// promise.all 在任一个传入的promise对象失败时返回失败
const promise1 = 1000;
const promise2 = [1, 2, 3, 4];
const promise3 = Promise.resolve('promise3 fuilfilled');
const promise4 = Promise.reject('promise4 rejected');

const promise5 = new Promise((resolved, rejected) => {
  setTimeout(() => {
    resolved('promise5 fuilfilled');
  }, 1000);
});

const promise6 = new Promise((resolved, rejected) => {
  setTimeout(() => {
    rejected('promise6 rejected');
  }, 500);
});

const promise7 = new Promise((resolved, rejected) => {
  setTimeout(() => {
    rejected('promise7 rejected');
  }, 1000);
});

const res1 = Promise.all([promise1, promise2, promise3, promise5]);
const res2 = Promise.all([promise1, promise2, promise3, promise4]);
const res3 = Promise.all([promise1, promise2, promise6, promise7]);
```

```diff
# res1

+ Promise {<fulfilled>: Array(4)}
+   __proto__: Promise
-      [[PromiseState]]: "fulfilled"
+      [[PromiseResult]]: Array(4)
-         0: 1000
-         1: (4) [1, 2, 3, 4]
-         2: "promise3 fuilfilled"
-         3: "promise5 fuilfilled"
-         length: 4
-         __proto__: Array(0)
```

```diff
# res2

+ Promise {<rejected>: "promise3 rejected"}
+   __proto__: Promise
-      [[PromiseState]]: "rejected"
-      [[PromiseResult]]: "promise3 rejected"
```

```diff
# res3

+ Promise {<rejected>: "promise5 rejected"}
+   __proto__: Promise
-      [[PromiseState]]: "rejected"
-      [[PromiseResult]]: "promise6 rejected"
```

- 它的参数是接收一个可迭代对象，返回值具有以下几种情况

| 参数 | 状态 | 返回情况 |
| --- | --- | --- |
| 空的可迭代对象 | 完成 | 同步地返回一个已完成（already resolved）状态的 Promise |
| 参数值不包含任何 Promise 或所有传入的 promise 都变为完成状态 | 完成 | 返回一个异步完成（asynchronously resolved）状态的 Promise |
| 其他情况 | 完成 | 返回一个处理中（pending）的 Promise。这个返回的 promise 之后会在所有的 promise 都完成或有一个 promise 失败时异步地变为完成或失败。成功时返回值按照参数内的顺序排列为一个数组 |
| 传入的 promise 有一个失败 | 失败 | Promise.all 异步地将失败的那个结果给失败状态的回调函数，而不管其它 promise 是否完成 |

```js
// 对Promise.all 的结果使用then、catch
console.log('script start');

setTimeout(() => {
  console.log('timer1');
}, 600);

Promise.all([]).then((res) => {
  console.log(`空的可迭代对象，同步返回一个已决议的 promise。\n,${res}`)
});

Promise.all([1, 2, 3]).then((res) => {
  console.log(`可迭代对象不包含 promise，异步返回一个已决议的 promise。\n,${res}`);
});

Promise.all([Promise.resolve('resolve')])
  .then((res) => {
    console.log(`可迭代对象的 promise 均已决议，异步返回一个已决议的 promise。\n,${res}`);
  })
  .catch((reason) => {
    console.log('catch error 1' + reason);
    return reason;
  });

Promise.all([Promise.reject('rejected')])
  .then((res) => {
    console.log(`可迭代对象的 promise 存在失败的 promise，异步返回一个失败的 promise。\n,${res}`);
  })
  .catch((reason) => {
    console.log('catch error 2 ' + reason);
    return reason;
  });

new Promise((resolve, reject) => {
  console.log('Promise1');
  resolve('Promise1 resolve');
}).then((res) => {
  console.log('Promise1 then');
});

// script start
// Promise1
// 空的可迭代对象，同步返回一个已决议的 promise。
// Promise1 then
// 可迭代对象不包含 promise，异步返回一个已决议的 promise。
// 可迭代对象的 promise 均已决议，异步返回一个已决议的 promise。
// catch error 2 rejected
// timer1
```

<!-- <promiseTest></promiseTest> -->

```js
// 空迭代对象，返回一个同步完成的promise
let p = Promise.all([]);

console.log(p);

p.then((res) => {
  console.log(res);
});

Promise.resolve('resolved').then((res) => {
  console.log(res);
});

for (let i = 0; i < 3; i++) {
  console.log('for item ' + i);
}

setTimeout(function () {
  console.log('timer');
  console.log(p);
});

// Promise {<fulfilled>: Array(0)}
// for item 0
// for item 1
// for item 2
// []
// resolved
// timer
// Promise {<fulfilled>: Array(0)}
```

```js
// 可迭代对象中不含promise或promise已决议，则返回一个异步完成的promise

let p = Promise.all([1, 2, 3]);

console.log(p);

p.then((res) => {
  console.log(res);
});

Promise.resolve('resolved').then((res) => {
  console.log(res);
});

for (let i = 0; i < 3; i++) {
  console.log('for item ' + i);
}

setTimeout(function () {
  console.log('timer');
  console.log(p);
});

// Promise {<pending>}
// for item 0
// for item 1
// for item 2
// resolved
// [1, 2, 3]
// timer
// Promise {<fulfilled>: Array(3)}
```

```js
// 可迭代对象中包含未决议的promise时，返回一个未决议的promise

let promise2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('promise2');
  }, 500);
});
let p = Promise.all([Promise.resolve('promise1'), promise2]);

console.log(p);

p.then((res) => {
  console.log(res);
});

Promise.resolve('resolved').then((res) => {
  console.log(res);
});

for (let i = 0; i < 3; i++) {
  console.log('for item ' + i);
}
setTimeout(function () {
  console.log('timer');
  console.log(p);
});

// Promise {<pending>}
// for item 0
// for item 1
// for item 2
// resolved
// timer
// Promise {<pending>}
// ["promise1", "promise2"]
```

```js
// 可迭代对象中包含未决议的promise时，返回一个未决议的promise

let promise2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('promise2');
  }, 500);
});

let promise3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject('promise3 reject');
  }, 1000);
});

let p = Promise.all([Promise.resolve('promise1'), promise2, promise3]);

console.log(p);

p.then((res) => {
  console.log(res);
}).catch((reason) => {
  console.log(reason);
});

Promise.resolve('resolved').then((res) => {
  console.log(res);
});

for (let i = 0; i < 3; i++) {
  console.log('for item ' + i);
}
setTimeout(function () {
  console.log('timer');
  console.log(p);
});

// Promise {<pending>}
// for item 0
// for item 1
// for item 2
// resolved
// timer
// Promise {<pending>}
// promise3 reject
```

2. Promise.allSettled(iterator)

- 等到所有 `promises` 都已敲定(_settled_)(每个 `promise` 都已兑现(_fulfilled_)或已拒绝(_rejected_))。返回一个 `promise`，该 `promise` 在所有 `promise` 完成后完成。并带有一个数组，数组中的每个元素对应每个 `promise` 的结果 (status:'fulfilled/rejected',value:value)
- 我们可以用于当 **多个彼此不依赖的异步任务** 完成时，或者想知道每个 `promise` 的结果时，使用它

```js
const promise1 = Promise.resolve([1, 2, 3]);
const promise2 = new Promise((resolve, rejected) => {
  setTimeout(() => {
    rejected('error');
  }, 1000);
});

const promise3 = Promise.allSettled([promise1, promise2]); // {status:fulfilled,result:Array<2>}

promise3.then((res) => res.map((item) => console.log(item)));

// {status: "fulfilled", value: Array(3)}
// {status: "rejected", reason: "error"}
```

- 此方法的结果中，对于每一个结果对象来说，都存在一个 `value/reason` 和 `fulfilled/rejected`，代表了每个传入的参数中的 `promise` 被敲定的状态(_status_)以及它们被 _settled_ 的 `value/reason`

3. Promise.any

- 此方法接收一个 `Promise` 可迭代对象，只要其中的一个 `promise` 成功，就返回那个已经成功的 `promise`。如果可迭代对象中没有一个 `promise` 成功(即所有的 `promise` 都失败/拒绝)，就返回一个失败的 `promise` 和 `AggregateError` 类型的实例，它是 `Error` 的一个子类，用于把单一的错误集合在一起。本质上，这个方法和 `Promise.all()` 是 **相反** 的

```js
// 对Promise.any 的结果使用then、catch
console.log('script start');

setTimeout(() => {
  console.log('timer1');
}, 600);

let p = Promise.any([]);

console.log(p);

p.catch((reason) => {
  console.log('Promise Any empty iterator object ' + reason);
});

let p1 = Promise.any([1, 2, 3]);

console.log(p1);

p1.then((res) => {
  console.log('Promise Any not exists promise ' + res);
});

let p2 = Promise.any([Promise.reject('rejected')]);

console.log(p2);

p2.catch((reason) => {
  console.log('p2 Promise Any ', reason);
  return reason;
});

let p3 = new Promise((resolve, reject) => {
  console.log('promise1');
  resolve('Promise1 resolve');
});

console.log(p3);

p3.then((res) => {
  console.log('Promise1 then');
});

// script start
// Promise {<rejected>: AggregateError: All promises were rejected}
// Promise {<pending>}
// Promise {<pending>}
// promise1
// Promise {<fulfilled>: "Promise1 resolve"}

// Promise Any empty iterator object AggregateError: All promises were rejected

// Promise1 then
// Promise Any not exists promise 1

// p2 Promise Any  AggregateError: All promises were rejected

// timer1
```

| 参数 | 状态 | 返回情况 |
| --- | --- | --- |
| 空的可迭代对象 | 失败 | 同步地返回一个已失败（already rejected）状态的 Promise |
| 参数值不包含任何 Promise 或任一个传入的 promise 变为完成状态 | 完成 | 返回一个异步完成（asynchronously resolved）状态的 Promise |
| 其他情况 | 完成 | 返回一个处理中（pending）的 Promise。这个返回的 promise 之后会在所有的 promise 都失败或有一个 promise 成功时异步地变为完成或失败。成功时返回第一个成功的 promise，失败时，返回异步失败和一个 AggregateError 对象，它继承自 Error，有一个 error 属性，属性值是由所有失败值填充的数组 |
| 传入的 promise 有一个成功 | 成功 | Promise.any 异步地将成功的那个结果给成功状态的回调函数，而会忽略掉所有被拒绝的 promise |

4. Promise.race(iterable)

- 当 `iterable` 参数里的任意一个 promise 成功或失败后，`父promise` 马上也会用 `子promise` 的成功返回值或失败详情作为参数调用 `父promise` 绑定的相应情况，并返回该 `promise` 对象

```js
const promise1 = new Promise((resolved, rejected) => {
  setTimeout(resolved, 1000, 'resolved');
});

const promise2 = new Promise((resolved, rejected) => {
  setTimeout(rejected, 1500, 'rejected1');
});

const promise3 = new Promise((resolved, rejected) => {
  setTimeout(rejected, 500, 'rejected2');
});

Promise.race([promise1, promise2])
  .then((res) => {
    console.log(res);
  })
  .catch((reason) => {
    console.log(reason);
  });
// 'resolved'

Promise.race([promise1, promise3])
  .then((res) => {
    console.log(res);
  })
  .catch((reason) => {
    console.log(reason);
  });
// 'rejected2'
```

- 只要给定的可迭代参数中的任一个 `promise` 被敲定，就会采用，从而异步地解析或拒绝（一旦堆栈为空)
- 如果传入的参数是一个空的迭代，那么返回的 `promise` 将 **永远处于等待状态**；如果迭代包含一个或多个非承诺值/已解决/拒绝的承诺，则 `Promise.race` 将解析为迭代中找到的第一个值

```js
const p1 = Promise.race([]);

const p2 = Promise.race([[1, 2, 3], Promise.resolve(3)]);

const p3 = Promise.race([Promise.resolve(3), 5, 6]);

p1;
// Promise {<pending>}
// __proto__: Promise
// [[PromiseState]]: "pending"
// [[PromiseResult]]: undefined

p2;
// Promise {<fulfilled>: Array(3)}
// __proto__: Promise
// [[PromiseState]]: "fulfilled"
// [[PromiseResult]]: Array(3)

p3;
// Promise {<fulfilled>: 3}
// __proto__: Promise
// [[PromiseState]]: "fulfilled"
// [[PromiseResult]]: 3
```

5. Promise.reject

- 返回一个带有拒绝原因的 `Promise` 对象。可以自定义被 `reject` 的原因，或者通过 `Error` 对象来设置

```js
Promise.reject(new Error('error msg'))
  .then((res) => {
    console.log(res);
  })
  .then(null, (reason) => {
    console.log(reason);
  });

// Error: error msg
```

6. Promise.resolve

- 此方法返回一个以给定值解析过的 `Promise` 对象。如果这个值是一个 `promise` ，那么将返回这个 `promise` ；如果这个值是 thenable（即带有"then" 方法），返回的 `promise` 会“跟随”这个 thenable 的对象，采用它的最终状态；否则返回的 `promise` 将以此值完成。此函数将类 `promise` 对象的多层嵌套展平

```js
Promise.resolve('suceess')
  .then((res) => {
    console.log(res);
  })
  .then((reason) => {
    console.log(reason);
  });
// suceess
```

```js
Promise.resolve([1, null, undefined])
  .then((res) => {
    console.log(res);
  })
  .then((reason) => {
    console.log(reason);
  });
// [1, null, undefined]
```

```js
let promise1 = new Promise((rel, rej) => {
  rel('primise1');
});

let promise2 = Promise.resolve(promise1);

promise2.then((res) => console.log(res)); // promise1

promise1 === promise2; // true
// promise.resolve直接返回了这个promise
```

- 使用 `resolve` 一个 `thenable` 对象。当返回的对象具有 `then` 的可调用方法时，`js` 将会调用该方法并提供两个处理函数作为参数，直到其中一个被调用（状态被改变）

```js
let promise1 = Promise.resolve({
  then: function (onFulfill, onReject) {
    onFulfill('fulfilled');
  },
});
// 返回一个promise
console.log(promise1);
promise1 instanceof Promise; // true

promise1.then((res) => {
  console.log(res);
});
// fulfilled
```

```js
let thenable1 = {
  then: function (onFulfill, onReject) {
    throw new Error('error first');
    onFulfill('fulfilled thenable1');
  },
};

let thenable2 = {
  then: function (resolve, reject) {
    resolve('fulfilled thenable2');
    throw new Error('error last');
  },
};

let p1 = Promise.resolve(thenable1)
  .then((res) => {
    console.log(res);
  })
  .catch((reason) => {
    console.log(reason);
  });

let p2 = Promise.resolve(thenable2)
  .then((res) => {
    console.log(res);
  })
  .catch((reason) => {
    console.log(reason);
  });

// fulfilled thenable2
// Error: error first
```

```js
let p1 = new Promise((rel, rej) => {
  rel('p1');
  throw new Error('p1 eroor');
})
  .then((res) => {
    console.log(res);
  })
  .catch((reason) => {
    console.log(reason);
  });

let p2 = new Promise((rel, rej) => {
  throw new Error('p2 eroor');
  rel('p2');
})
  .then((res) => {
    console.log(res);
  })
  .catch((reason) => {
    console.log(reason);
  });
```
