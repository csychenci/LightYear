---
title: 定时器工作机制
categories: JavaScript
date: 2020-06-01 15:58:24
tags:
  - JavaScript
description:
---


## 定时器介绍

---

1. 定时器是在哪个规范中实现的

- 定时器并不是 `ECMAScript规范` 与 `JavaScript实现` 的一部分，`定时器` 的功能由浏览器实现，并且在不同浏览器之间会有所不同，而在 `Node` 之中也支持 `定时器` 调度程序

2. 定时器参数问题

- `setTimeout` 作为高阶函数，可接收三个参数，第一个参数是决定延迟操作的函数的引用，`setTimeout` 希望得到的是一个对函数的引用，第二个参数为延迟执行的时间，第三个参数为当延迟结束，延迟函数执行时传递给该函数的参数
- 浏览器会将 `setTimeout` 或 `setInterval` 的五层或更多层嵌套调用（调用五次之后）的 `最小延时` 限制在 `4ms`，这是历史遗留问题

3. 异步执行

- `setTimeout` 作为延迟任务的派发器，会被 `定时器触发线程` 所处理，作为一个异步事件，它可能会因同步代码的执行或阻塞导致无法在保证的延迟时间后执行。因此，第二个参数 `delay` 是一个最小延迟，指定某个任务在主线程中最早可得的空闲时间执行，说通俗点，就是尽可能早的执行

```js
function fn1(a, b) {
  console.log(a + b);
  return a + b;
}
let fn = setTimeout(fn1, 2000, 'a', 'b'); // ab 2s后输出

let fn2 = setTimeout(fn1(), 2000, 'a', 'b'); // NaN 立即执行
```

4. 定时器在事件循环中的特点

- `JavaScript` 是单线程的，也就是说同一时间只能做一件事，所有的任务都需要排队执行，异步事件在其他线程的处理下有结果时会在任务队列中放置一个结果，但这个结果也是需要排队执行的，队列中的任务遵循 `先进先出，后进后出` 的特点，因此我们无法保证定时器在什么时候才能执行
- 对于 `setInterval` 来说，在某一时刻，相同的 `setInterval` 实例只会有一个在排队，也就是说，浏览器不会将同一个 `setInterval` 事件结果多次添加至任务队列 ，也就是待执行代队列

5. 取消调度

- `setTimeout` 在调用时会返回一个 `定时器标识符`，可通过该 `timeId` 来使用 `clearTimeout` 传入来取消定时器的调用。但标识符不会因为 `定时器` 被取消而变为 `null`

6. 准时性

- 嵌套的 `setTimeout` 能够精确地设置两次执行之间的延时，而 `setInterval` 却不能
- `setTimeout` 能保证延时的固定，因为下一次的调用会在前一次调用完成后在进行调度；而对于 `setInterval` 来说，它是每隔一段时间就会执行传入的函数，一旦函数运行时间过短或过长，都会使出现的情况不一致
- 也就是说，当设定时长过短时，函数还在执行期间，下一次调度已经开始了，这会使得结果连着出现。因此，使用 `setInterval` 时，函数的实际调用间隔要比代码中设定的时间间隔要短

7. 垃圾回收与调度引用

- 当一个函数传入 `setInterval/setTimeout` 时，将为其创建一个内部引用，并保存在调度程序中。这样，即使这个函数没有其他引用，也能防止垃圾回收器（GC）将其回收
- 当这个函数引用了外部变量时，只要这个函数还存在，那么外部变量也会因之而存在，因此可能导致占据更多的内存空间，所以，当不再需要 `定时器` 时，最好将它取消

---

## 深入理解定时器机制

---

1. 推荐几篇文章

- [驯服定时器和线程](https://juejin.im/post/6844903653233410056)
- [JS 忍者秘籍中的定时器机制详解](https://juejin.im/post/6844903623688716302)

2. `setTimeout/setInterval` 到底什么时候执行

- 当代码执行到 `setTimeout` 时，将 `setTimeout` 交由 `定时器触发线程` 延迟执行，并在延迟时间之后将回调函数放入异步队列供主线程读取

```js
console.log('script start', Date.now());
setTimeout(function () {
  console.log('timeout', Date.now());
}, 1000);
for (var i = 0; i < 29999; i++) {
  console.log('for', 1);
}
// 用for循环来阻塞主线程
console.log('script end', Date.now());
```

| 时间点 | gmt | minutes | seconds | milliseconds |
| :-: | :-: | :-: | :-: | :-: |
| script start | Sat Oct 24 2020 09:32:11 GMT+0800 (中国标准时间) | 32 | 11 | 106 |
| script end | Sat Oct 24 2020 09:32:12 GMT+0800 (中国标准时间) | 32 | 12 | 302 |
| timeout | Sat Oct 24 2020 09:32:12 GMT+0800 (中国标准时间) | 32 | 12 | 308 |

- 从结果上来看，结论是显而易见的，同步代码执行到 `setTimeout` 时，会交给 `定时器触发线程` 执行，等事件有了结果，将回调函数压入到任务队列中，并通知事件循环，事件循环读取任务队列中的回调函数并放入主线程中执行

3. 再来两个例子，巩固一下

```js
setInterval(function () {
  console.log('timeInterval', Date.now());
}, 1000);
setTimeout(function () {
  console.log('timeout', Date.now());
}, 500);
for (var i = 0; i < 29999; i++) {
  console.log('for', 1);
}
// 用for循环来阻塞主线程
console.log('script', Date.now());
```

```js
setTimeout(function () {
  console.log('timeout', Date.now());
}, 1000);
setInterval(function () {
  console.log('timeInterval', Date.now());
}, 500);
for (var i = 0; i < 29999; i++) {
  console.log('for', 1);
}
// 用for循环来阻塞主线程
console.log('script', Date.now());
```

---

## setTimeout/setInterval 互相实现

---

1. 利用同步代码实现

```js
function mySettimeout(callback, time) {
  const prevvalue = Date.now();
  while (true) {
    if (Date.now() - prevvalue >= time) {
      break;
    }
  }
  callback();
}
```

- 但是以上代码是存在问题的，首先这是一个同步任务，它会阻塞主线程，其次定时器是宏任务，会被分发给 `定时器触发线程` 执行，并不会阻塞主线程

2. 使用 `setInterval` 实现 `setTimeout`，通过 `setInterval` 构造一个定时器，到第一次执行时清除定时器，执行回调函数

```js
function mySettimeout(callback, time) {
  const timer = setInterval(() => {
    clearInterval(timer);
    callback();
  }, time);
}
```

3. 使用 `setTimeout` 实现 `setInterval`

- 通过自执行函数，通过 `setTimeout` 执行完成之后清除定时器，再递归执行，达到仿真 `setInterval` 的效果

```js
function mysetInterval(callback, time) {
  (function inner() {
    const timer = setTimeout(() => {
      callback();
      clearInterval(timer);
      inner();
    }, time);
  })();
}
```

- 局限性：以上通过 `setTimeout/setInterval` 互相实现的效果是存在一定问题的，他们订阅的计时器无法被我们手动清除，因此，我们可以将它们模拟成一个类，将每一次开启的定时器放入到一个数组中，用来模拟一个栈，即可手动清除了

4. 扩展

- 先创建一个定时器类，维护一个定时器栈，这个类有 add，run，clear，clearAll 等方法，可以添加，清除，运行定时器

```js
class setInterval {
  tasks = [];
  add(name, callback, time = 0) {}
  run(name) {}
  clear(name) {}
  clearAll() {
    this.tasks = [];
  }
}
```

- 添加定时器

```js
add(name,callback,time=0){
  if(!name || !callback || typeof callback !== 'function'){
    return
  }
  this.tasks.push({
    name,
    callback,
    time
  })
  this.run(name)
}
```

- 运行定时器，通过 name 在栈中查找，找到对应的定时器之后执行

```js
run(name){
  const inner = () =>{
    const task = this.tasks.find(item=>item.name===name)
    if(!task){
      return
    }
    const timer = setTimeout(()=>{
      task.callback()
      clearTimeout(timer)
      inner()
    },task.time)
  }
  inner()
}
```

- 清除定时器

```js
clear(name){
  const index = this.tasks.findIndex(task => task.name === name)
  if(index !== -1){
    this.task.splice(index,1)
  }
}
```

- 完整版。但这个版本仍需注意时间误差

```js
class setInterval {
  tasks = [];
  add(name, callback, time = 0) {
    if (!name || !callback || typeof callback !== 'function') {
      return;
    }
    this.tasks.push({
      name,
      callback,
      time,
    });
    this.run(name);
  }
  run(name) {
    const inner = () => {
      const task = this.tasks.find((item) => item.name === name);
      if (!task) {
        return;
      }
      const timer = setTimeout(() => {
        task.callback();
        clearTimeout(timer);
        inner();
      }, task.time);
    };
    inner();
  }
  clear(name) {
    const index = this.tasks.findIndex((task) => task.name === name);
    if (index !== -1) {
      this.tasks.splice(index, 1);
    }
  }
  clearAll() {
    this.tasks = [];
  }
}
```

---

## 如何实现准时的 setTimeout

---

1. 一个不准时的 setTimeout

- 先设定一个 `innerTimer` 函数，它用于处理定时器的启动、停止以及计算每次执行所花费的时间

```js
function innerTimer(arr) {
  let counter = 0;
  // 定时器回调函数执行次数
  let wate = 50;
  // ms，定时器隔一定时间往任务队列中添加的任务
  let start = Date.now();
  // 时间戳，程序启动时间
  let diffValue;
  // ms，当前实际执行时间与理想执行时间的差值
  let time;
  // 定时器标识符
  let idealValue, realValue;
  // 理想时间，实际时间，本次时间与上次时间插值

  function timer() {
    if (counter >= 100) {
      clearTimeout(time);
      return arr;
    }
    let nowTime = Date.now();
    // 获取当前时间戳
    counter++;
    idealValue = counter * wate;
    // 当前程序理想已花费时间
    realValue = nowTime - start;
    // 当前程序实际已花费时间
    diffValue = realValue - idealValue;
    // 实际已花费时间与理想已花费时间的差值
    time = setTimeout(() => {
      timer();
    }, wate);
  }
  time = setTimeout(() => {
    timer();
  }, wate);
}

innerTimer();
```

2. setTimeout 系统补偿机制

- 我们可以发现，实际执行完的时间总比理想的时间要大，并且这个差值会越来越大。此时我们想解决这个问题的话，应当在每次 `setTimeout` 执行时都获取系统时间对 下一次 `setTimeout` 的延迟时间进行修正

```js
function innerTimer() {
  let counter = 0;
  // 定时器回调函数执行次数
  let wate = 50;
  // ms，定时器隔一定时间往任务队列中添加的任务
  let start = Date.now();
  // 时间戳，程序启动时间
  let diffValue;
  // ms，当前实际执行时间与理想执行时间的差值
  let time;
  // 定时器标识符
  let idealValue, realValue;
  // 理想时间，实际时间，本次时间与上次时间插值

  function timer() {
    if (counter >= 100) {
      clearTimeout(time);
      return;
    }
    counter++;
    idealValue = counter * wate;
    // 理想运行应花费时间
    realValue = Date.now() - start;
    // 获取实际已花费时间
    diffValue = realValue - idealValue;
    // 实际花费与理想花费的差值
    time = setTimeout(() => {
      timer();
    }, wate - diffValue);
    // 为上一个setTimeout+回调函数执行消耗的时间提供补偿机制
  }
  time = setTimeout(() => {
    timer();
  }, wate);
}
innerTimer();
```
