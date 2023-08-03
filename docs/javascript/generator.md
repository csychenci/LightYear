---
title: Generator
date: 2021-10-21 09:25:44
sidemenu: true
toc: 'content'
order: 14
author: chencicsy
categories: JavaScript
tags:
  - 前端
  - JavaScript
  - 动态语言
description:
---


## Generator

---
1. 什么是 Generator
- 常规函数只会返回一个单一的值或者不返回值，而 _Generator_ 可以按需一个接一个地返回(_yield_)多个值，可与 _iterator_ 配合使用创造数据流。也就是说，生成器函数是可以暂停执行和恢复执行的

```js
/** 
 * 
*/
// function  *generatorRender() {
//     yield 1;
//     yield 2;
//     return 3;
// }
function* generatorRender() {
  yield 1;
  yield 2;
  return 3;
}
```

- _generator_ 函数的行为与普通函数不一样，它在被调用时并不会运行其代码，而是会返回一个 generator object 的特殊对象，来管理执行流程

```js
let generatorEx = generatorRender();
// 目前为止函数体内的代码还没有开始执行
// generatorRender {<suspended>}
//  [[GeneratorLocation]]: VM43007:1
//  [[Prototype]]: Generator
//  [[GeneratorState]]: "suspended"
//  [[GeneratorFunction]]: ƒ* generatorRender()
//  [[GeneratorReceiver]]: Window
//  [[Scopes]]: Scopes[3]
```

- 一个 generator 的主要方法就是 next()，当它被调用时会恢复函数的运行，并执行到最近的 _yield (value)_ 语句(value 可以省略，默认为 undefined)，之后函数执行暂停，并将产出的（yielded）值返回到外部代码
- 也就是说，生成器函数内部执行一段代码，当遇到 yield 关键字，那么 js 引擎会返回关键字后面的内容给外部，并暂停该函数的执行，直到外部再次调用 next 方法恢复函数的执行

```js
let generatorEx = generatorRender();

generatorEx.next(); // {value: 1, done: false}
```

- 可以发现，类似于 _`iterator`_，`next` 被调用的结果是一个对象：_`value`_ 是产出的值，_`done`_ 是如果 _`generator`_ 函数已执行完毕则为 _`true`_ ，否则为 _`false`_

2. 协程
- 为什么函数可以暂停和恢复，其中涉及到协程的概念。**协程是一种比线程更加轻量级的存在**，可以把它看作是跑在线程上的任务，一个线程上可以存在多个协程，但是在线程上同时只能执行一个协程
- 比如当前执行的是 A 协程，要启动 B 协程，那么 A 协程就需要将主线程的控制权交给 B 协程，这就体现在 A 协程暂停执行，B 协程恢复执行；同样，也可以从 B 协程中启动 A 协程。通常，如果从 A 协程启动 B 协程，我们就把 A 协程称为 B 协程的父协程

|规则|描述|
|---|---|
|调用生成器函数|会创建一个协程 gen，创建完之后并不会立即执行|
|next|执行/恢复创建好的协程|
|yield|协程正在执行的时候，可以暂停协程的执行并将控制权交给父协程/外部|
|return|结束当前协程，并将返回的内容交给父协程/外部|

- 父子协程会在主线程上交互执行，并不是并发执行，协程切换通过 next 和 yield 来配合完成。通过 yield 将控制权转交到外部时，js 引擎会保存协程的执行上下文信息

3. 可迭代的 generator

- generator 是可迭代的，可以使用 _`for of`_ 遍历它的所有值

```js
let generatorEx = generatorRender();

for (let item of generatorEx) {
  console.log(item);
}

// 1
// 2
// ?? 3在这里并不会显示
```

- 如果我们要通过 _`for of`_ 遍历显示所有的结果，必须使用 _`yield`_ 来返回它，因为 _`for of`_ 会忽略最后一个 _`value`_

```js
function* generatorRender() {
  yield 1;
  yield 2;
  yield 3;
}

let generatorEx = generatorRender();

for (let item of generatorEx) {
  console.log(item);
}

// 1
// 2
// 3
```

- _`generator`_ 可使用 _`iterator`_ 的所有相关功能，如 _`spread`_ 语法

```js
function* generatorRender() {
  yield 1;
  yield 2;
  yield 3;
}

let arr = [...generatorRender()];
// [1, 2, 3]
```

- _`generator`_ 是可以永远的产生值的，除非手动的 `break ` 或 _`return`_

4. generator 组合

- _yield_ 可以将执行委托给另一个 _`generator`_，这意味着外部的 _`generator`_ 会在内部的 _`generator`_ 上迭代，并将产出的值转发到外部，就像是外部的 _`generator`_ 产出的值一样

```js
function* generatorRender(start, end) {
  for (let value = start; value <= end; value++) {
    yield value;
  }
}

function* generatorEx() {
  yield* generatorRender(1, 5);

  yield* generatorRender(5, 10);

  yield* generatorRender(10, 15);
}
```

5. yield 是双向的

- 它不仅可以向外返回结果，而且还可以将外部的值传递到 _`generator`_ 内。调用 _`generator.next(arg)`_，我们就能将参数 `arg` 传递到 `generator` 内部。这个 `arg` 参数会变成 `yield` 的结果

```js
function* generatorRender() {
  let res = yield '返回给外部';
  console.log(res);
}

let Gen = generatorRender();

let _res = Gen.next().value;
// '返回给外部'

Gen.next('传递给内部');
// 传递给内部
```

- 第一次调用 `generator.next()` 应该是不带参数的（如果带参数，那么该参数会被忽略）。它开始执行并返回第一个 `yield` 的结果。此时，`generator` 执行暂停，而停留在 (yield*) 行上，第二个调用的 *next* 将参数传递给 *`generator`\* 内部
- `generator` 和调用 `generator` 的代码可以通过在 `next/yield` 中传递值来交换结果

6. generator.throw

- 我们可以通过 _next_ 向 _generator_ 内部传递参数，但有时我们可能需要传递一个错误，这时应该调用 _generator.throw_ 方法，在这种情况下，error 将被抛到对应的 yield 所在的那一行

```js
function* gen() {
  try {
    let result = yield '2 + 2 = ?'; // 这行出现error

    alert('The execution does not reach here, because the exception is thrown above');
  } catch (e) {
    alert(e); // 显示这个 error
  }
}

let generator = gen();

let question = generator.next().value;

generator.throw(new Error('The answer is not found in my database')); // (2)
```

- 伪随机 generator：它们将“种子（seed）”作为第一个值，然后使用公式生成下一个值。以便相同的种子（seed）可以产出（yield）相同的序列

```js
function* pseudoRandom(seed) {
  let value = seed;

  while (true) {
    value = (value * 16807) % 2147483647;
    yield value;
  }
}
```
