---
title: 事件循环
date: 2020-08-15 10:13:26
categories: NodeJs
tags:
  - 后端
  - JavaScript
  - NodeJs
  - 动态语言
  - 事件循环
---

<!-- <div style="text-align: center;font-weight: 900;"> NodeJs之请求处理 </div> -->

<!-- more -->

---

# NodeJs

---

## 事件循环

---

1. 事件循环的原理

- 与浏览器的原理不同，_NodeJs 10+_ 版本后虽然在运行结果上与浏览器一致，但两者在原理上一个是基于浏览器，另一个是基于 _libev_ 库。浏览器的核心是 **宏任务** 和 **微任务**，而在 _NodeJs_ 中还有阶段性任务执行阶段

2. 循环阶段

- _timers_：本阶段执行已被 `setTimeout` 和 `setInterval` 调度的回调函数，由这两个函数启动的函调函数
- _pending callbacks_：本阶段执行某些系统操作的回调函数
- _idle、prepare_：仅系统内部使用，并不由 _NodeJs_ 程序所调用的阶段
- _poll_：核心关注层。检索新的 I/O 时间，执行与 I/O 相关的回调函数，其他情况 `Nodejs` 将在适当时在此阻塞
- _check_：`setImmediate` 回调函数在这里执行。`setImmediate` 并不是立马执行而是当事件循环 `poll` 中没有新的事件处理时就执行此部分
- _close callbacks_：执行一些关闭(close)的回调函数

3. 运行起点

- `NodeJs` 进程启动后，就发起了一个新的事件循环，也就是事件循环的起点。共有四个发起点：`NodeJs` 启动后、`setTimeout` 回调函数、`setInterval` 回调函数、也可能是一次 I/O 的回调函数
- 先执行回调函数，在执行 `setImmediate`

4. 微任务

- 包含两种：`process.nextTick`、`Promise`。在事件循环中优先级是最高的。同一事件循环中有其他微任务存在时，优先执行微任务队列，且 `process.nextTick` 优先级高于 `Promise`

5. 宏任务

- 包含四种：`setTimeout`、`setInterval`、`setImmediate`、`I/O`。没有先后顺序，宏任务执行在微任务后。同个事件循环周期内，微任务和宏任务都存在的情况下，优先清空微任务队列，再执行宏任务队列
- `setTimeout` 时间参数不设置或设置为 0 时，会有一个默认最小时长 1ms

6. 主线程

- `NodeJs` 中的主线程的执行阶段主要处理三个逻辑：执行 **同步代码**、将异步代码插入到 **微任务队列** 或 **宏任务队列** 中、执行微任务和宏任务的产生的 **回调函数**
- 主线程可能会因为回调函数执行时间过长而阻塞

7. 单线程与多线程

- 主线程是单线程执行的，主要还是主线程来循环遍历当前事件，但 `NodeJs` 存在多线程执行，包括 `setTimeout` 和 `I/O` 事件，还有其他线程，包括垃圾回收、内存优化等
