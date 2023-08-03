---
title: 什么是WebAssembly
date: 2023-03-03 14:32:00
categories: WebAssembly
tags:
  - WebAssembly
description:
---

## WebAssembly介绍
---
1. 什么是WebAssembly
- WebAssembly 是一个以堆栈为基础的虚拟机，是一个二进制的指令集，就和真正的cpu机器码是一样的，对比于 javascript 却是文本型的。它的整个编译过程和真实的物理机运行时候的形态是很像的。现在很多原生的浏览器已经支持 wasm 了，浏览器除了内置 js 的解释器，还内置了 wasm 的虚拟机，二者是可以互相通讯互相调用的
- 被编译成 wasm 的语言会先被编译成一个中间格式(wat)，然后再将这个中间码转化为虚拟机的机器码，只不过这个机器码即不是 x86 也不是 arm 的机器码，而是虚拟机的机器码。但它的汇编语言的助记符基本上都是一样的
