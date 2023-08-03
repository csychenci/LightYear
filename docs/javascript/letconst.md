---
title: 详解let/const
date: 2020-04-16 20:12:45
sidemenu: true
toc: 'content'
order: 15
author: chencicsy
categories: JavaScript
tags:
  - 前端
  - JavaScript
  - 动态语言
description:
---

## let 命令

---
1. 声明变量的区别
- let 是 es6 新增的声明变量的命令，它的用法与 var 声明的变量类似，但是 let 声明的变量会引入 **块级作用域**
- let 声明的变量只在其声明所在代码块内有效，代码块外访问该变量会报错

```js
{
  var a = 'jetmine';
  let b = 'welcome';
  console.log('a', a); // a jetmine
  console.log('b', b); // b welcome
}
console.log('a', a); // a jetmine
console.log('b', b); // 报错,b is not defined
```

2. var 与 let 相对于异步行为的区别
- var 声明的变量不受块级作用域的限制，在全局(window)/函数范围都会生效，因此全局内只有一个同名变量，该特性会导致该变量在全局范围内的使用都会改变该变量，也就是变量的指向都是同一个引用

```js
var arr=[];
for(var i=0;i<10;i++){
	arr[i]=function(){
		return i
	}
};
console.log(arr[5]()); // 10
console.log(arr[9]()); // 10
```

- let 声明的变量仅在当前块级作用域内有效，在 for 循环中，每一次都会生成一个新的块级作用域，因此每一轮的变量都是一个新的变量，在每次执行循环体之前，JS 引擎会把 i 在循环体的上下文中重新声明及初始化一次，js 会在上一轮循环的值的基础上对新的变量进行计算

```js
var arr=[];
for(let i=0;i<10;i++){
	arr[i]=function(){
		return i
	}
};
console.log(arr[5]()); // 5
console.log(arr[9]()); // 9
```

- 另外，在 for 循环中，设置循环变量的那部分是一个父块级作用域，而循环体内部是一个单独的子块级作用域

```js
for(let i=0;i<10;i++){
	let i = 'abc'
	arr[i]=function(){
		return i
	}
}
console.log(arr); // [abc: ƒ]
// 此时for循环内部的变量i与循环变量i不在同一个作用域，它们有各自单独的作用域
```

3. 变量提升
- 我们都知道，由于 js 运行机制的问题，var 声明的变量会存在变量提升的情况出现

```js
console.log(a); // undefined
var a="hello";
```

- let 命令不允许在声明前使用该变量，否则会报错

```js
console.log(a); // Cannot access 'a' before initialization
let a = 'hello';
```

- 那么，到底 let 存不存在变量提升呢？我们把提升这个词单独拿出来，重新定义一遍

|   方式   | 创建过程是否提升 | 初始化过程是否提升 | 赋值过程是否提升 |
| ------ | -------------- | ---------------- | -------------- |
|   let    |        √         |         ×          |        ×         |
|   var    |        √         |         √          |        ×         |
| function |        √         |         √          |        √         |

4. 暂时性死区
- 在某块级内使用 let 声明的变量会与该块级区域绑定，不受外部的影响

```js
let a='5';
{
	let a='6';
	console.log(a); // 6
}
console.log(a); // 5
```

- ES6 规定，如果某区块内存在 let 和 const 命令，在这个区块内这些命令声明的变量，会从一开始就形成封闭作用域，声明之前对该变量的使用，都会报错。也就是说，在 let 声明那一行代码出现之前，该变量都是不可用的，称为暂时性死区(TDZ)
- 暂时性死区将意味着 typeof 不再是一个百分之百安全的操作

5. 不允许重复声明
- 相同作用域内，不允许使用 `let` 重复声明同一个变量（只要该变量存在并且与 let 在同一作用域下）
- 在函数内使用 let 声明与参数同名的变量与上条规则一致

---
## 块级作用域的变量声明和函数声明
---

1. es5 与 es6 的区别
- es5 不允许在块级作用域声明函数，只能在顶层作用域和函数作用域之中声明

2. 块级作用域的变量声明
- 在块级作用域默认声明(即不用 var、let、const 命令)的变量，只有代码执行到声明语句之后，才可以进行访问，否则会报错
- 块级作用域中默认声明的变量会被提升到全局作用域

```js
// 默认声明的变量在块级作用域前使用
console.log(a); // a is not defined
{
	console.log(a); // a is not defined
	a = 1;
}
```

```js
// 默认声明的变量被提升全局作用域
{
	a = 1;
}
console.log(a); // 1
```

3. 块级作用域的函数声明
- 允许在块级作用域内声明函数
- 函数声明类似于 var，即会提升到全局作用域或函数作用域的头部。同时，函数声明还会提升到所在的块级作用域的头部
- 上面三条规则只对 es6 浏览器实现有效，其他环境的不用遵守，还是将块级作用域的函数声明当作 let 处理

4. 总结
- 块级作用域函数在编译阶段将函数声明提升到全局作用域，并且会在全局声明一个变量，值为 undefined。同时，函数声明也会被提升到对应的块级作用域顶层
- 块级作用域函数只有定义声明函数的那行代码执行过后，才会被映射到全局作用域
- 块级作用域函数只有执行函数声明语句的时候，才会重写对应的全局作用域上的同名变量
- 注意，在局部作用域内的块级作用域中声明的函数，该函数不会被提升到全局作用域，但是变量声明会被提升到全局作用域

```js
console.log(a); // undefined
{
  console.log(a()); // jetmine
  function a() {
    return 'jetmine';
  }
  console.log(a()); // jetmine
}
console.log(a()); // jetmine
```

5. 实例解析

- 块级作用域内有同名函数与变量，且函数声明在前

```js
console.log(window.a,a); // undefined undefined
{
	console.log(window.a,a); // undefined function a(){}
	function a(){
		console.log('fn')
	}
	a=10;
	console.log(window.a,a); // function a(){} 10
}
console.log(window.a,a); //function a(){} function a(){}
```

- 块级作用域内有同名函数与变量，且变量声明在前

```js
console.log(window.a,a); // undefined undefined
{
	console.log(window.a,a); // undefined function a(){}
	a=10;
	function a(){
		console.log('fn')
	}
	console.log(window.a,a); // 10 10
}
console.log(window.a,a); // 10 10
```

---
## const 命令
---

1. 声明常量
- const 声明一个只读的常量，初始化之后该常量的值不能改变。const 要求在声明的同时赋予初始值，否则会报错(参考以上规则)

2. 块级作用域
- let 与 const 一样，同样只在声明所在的块级作用域有效

3. 暂时性死区
- const 也具有暂时性死区，在声明之前不可使用

4. 不可重复声明
- 相同作用域内，不允许使用 const 重复声明同一个变量（只要该变量存在并且与 const 在同一作用域下）
- 在函数内使用 const 声明与参数同名的变量与上条规则一致

---
## 常量不可更改的原因
---

1. 本质
- js 中变量是保存在变量对象中的，而基本数据类型，它的值就保存在变量指向的内存地址，对于引用数据类型来说，变量保存的只是值对应的内存地址，实际上该变量是一个指针
- const 声明的变量总是指向一个固定的内存地址，但是其声明的引用数据类型的属性是可变的

2. Object.freeze
- 使用 Object.freeze 冻结一个对象，被冻结后，该对象只可读取

```js
const obj = Object.freeze({attr:"helloworld"});
obj.prop="world"; // 常规模式下不起作用
console.log(obj); // {attr: "helloworld"}

Object.getOwnPropertyDescriptors(obj);
// attr:
// 	configurable: false
// 	enumerable: true
// 	value: "helloworld"
// 	writable: false
// 发现configutable与writable都被设置为了false
```

```js
"use strict";
const obj = Object.freeze({attr:"helloworld"});
obj.prop="world"; // 严格模式下报错
```

3. 彻底冻结对象

```js
const obj = Object.freeze({attr:"helloworld",prop:{
	name:"bob"
}});
var freeze = (obj) => {
	Object.freeze(obj);
	Object.keys(obj).forEach((key,i) =>{
		if(typeof obj[key] === 'object'){
			freeze(obj[key])
		}
	})
}
```
---
