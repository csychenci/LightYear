---
title: 变量
date: 2020-04-09 09:12:45
categories: JavaScript
sidemenu: true
toc: 'content'
order: 8
author: chencicsy
tags:
  - JavaScript
  - let
  - const
  - var
  - 变量
description:
---

## 变量

---

1. 语言特点

- js 属于动态语言，表示变量本身类型不固定的语言。动态语言的变量可以反复赋值，并且可以是不同类型的变量，且不需要声明 `数据类型`。但类似于 `C/C++`、`Java` 这一类的静态语言，声明变量时需要指定变量类型，且不可给该变量赋其他数据类型的值
- 变量松散类型的特点：一是声明时不用给变量指定数据类型，二是赋值时可以修改数据类型
- 除了使用 var 之外，es6 还支持使用 let 、const 来声明一个变量

2. 变量的实际意义
- 一个变量实际上只是环境记录/变量对象这个特殊对象中的一个属性，修改或获取变量相当于修改或获取词法环境的一个属性

---

## var 与 let、const 的区别

---

1. 作用域区别

- var 具有变量提升，并且在全局内使用 var 声明的一个变量，实际上是往全局对象 window 上挂载了一个属性。但是 let 、const 不会被挂载到 window 上
- let/const 声明的变量会绑定当前块级作用域，该变量只能在当前块中使用，出了这个块级作用域就会失效，同时与其他块级同名的变量互不影响
- var 声明的变量具有全局/局部作用域的特性，不会被块级作用域所限制，let/const 相对于 var 具有更强的约束性

```js
if (true) {
  //此为块级作用域内
  var a = 10;
  let b = 20;
  console.log(b); // 输出20
}
//此为块级作用域外
console.log(a); // 10
console.log(b); // 报错，b未定义
```

```js
let a = 6; // 使用var声明,下述结果也不变
if (true) {
  let a = 10;
  console.log(a); // 控制台打印10
}
console.log(a); // 控制台打印6
// 不会互相影响
```

2. 变量提升

- var 声明的变量可以先使用再赋值，浏览器不会报错，它会提示 undefined。原因是 var 声明的变量出现了变量提升，也就是会把声明提升到作用域顶部，但不会提升该变量的赋值

```js
console.log(a); // undefined
var a = 'jetmine';
```

```js
// 等同于上例
var a = undefined;
console.log(a); // undefined
a = 'jetmine';
```

- _var_ 存在变量提升的情况，那 let/const 是否也会出现类似的情况呢？先来看以下例子

```js
console.log(a); 0// undefined
console.log(b);
var a = 6; // 不会报错,但会提示未定义，出现了变量提升
let b = 4; // Uncaught ReferenceError: Cannot access 'b' before initialization
```

- 我们可以发现，对 let 声明的变量先使用再定义，它提示不是 b is not defined 的错误，而是提示 **不能在初始化之前使用**，这说明该变量被定义了，但是没有被赋予任何值，而 var 在提升的同时被赋予了 undefined，因此 let 声明的变量无法在声明之前被使用

3. 暂时性死区

- 使用 let/const 声明的变量具有 `暂时性死区` 的特性，在代码块内，使用 `let/const` 声明变量之前，该变量都是不可用的
- 暂时性死区的本质就是，只要一进入当前作用域，所要使用的变量就已经存在了，但是不可获取，只有等到声明变量的那一行代码出现，才可以获取和使用该变量。声明该变量之前该变量都不可用，声明之前的区域被称为暂时性死区

4. 不允许重复声明

- let/const 不允许重复声明，var 会替换原先的变量的值也就是已经被声明过的变量
- 无论是 let、const、var 声明的变量，`let` 和 `const` 都不允许再次声明该变量

5. const、let 的区别

- `const` 与 `let` 基本上是一致的，区别在于 `const` 声明的是一个常量，它的引用地址是不可变的。可以理解为，基本数据类型是值不可变，引用数据类型是内存地址不可变

```js
const num = 10;
num = 200;
//报错，常量值不可更改
```

```js
const arr = [100, 200];
arr[0] = 'a';
arr[1] = 'b';
console.log(arr);
// 正常打印，储存数组的地址未变，只是对应内存空间中的值发生了改变
arr = ['c', 'd']; // 报错，常量内存地址不可更改
```

- const 在声明的同时必须初始化，否则会报错，var、let 可以声明而不赋值再使用，而 const 必须在声明的时候同时赋值

```js
console.log(a);
const a = 10; // 报错，必须先初始化再使用
```

6. 函数提升

- 在预编译时，函数声明也会被提升到作用域的顶部，但是函数提升优先于变量提升，函数提升会把整个函数挪到作用域顶部，而变量提升只会把声明提升到作用域顶部
- 只有声明式函数会出现函数声明提升，而赋值式函数只会出现变量提升

7. 删除全局属性

- 如果要删除一个全局属性，ie8 下会报错，其他浏览器不会

---

## 变量作用域

---

1. 作用域

- 就是一个变量可以生效的范围，它是这个变量的使用范围
- 作用域分为 `全局作用域` 和 `局部作用域`，正常情况下，在函数体内声明的变量无法在函数体外被引用，其 `作用域` 为这个函数体内

```js
function fn() {
  var a = 1;
  console.log(a);
}
fn(); // 1
console.log(a); // Uncaught ReferenceError: a is not defined
```

- 不同作用域声明的同名的变量，不会互相影响，它们只在各自的函数体内起作用，即 `不同作用域内` 的 `同名变量互相独立、互不影响`

```js
function fn() {
  var a = 'jetmine';
  console.log(a);
}
function fn1() {
  var a = 'hello';
  console.log(a);
}
var a = 'world';
fn(); // jetmine
fn1(); // hello
console.log(a); // world
```

- js 中，允许在函数内声明另一个函数(嵌套)。由于作用域链的作用，此时，内部函数可以访问外部函数定义的变量，但外部函数无法访问内部函数中的变量

```js
var a = 'globalA';
function fn() {
  var b = 'localB';
  console.log(a); // globalA
  function fn1() {
    var c = 'localC';
    console.log(a); // globalA
    console.log(b); // localB
  }
  fn1();
}
console.log(b); // Uncaught ReferenceError: b is not defined
console.log(c); // Uncaught ReferenceError: b is not defined
```

- js 中的函数在查找变量时，会从自身函数往外查找，当内部函数与外部函数的变量名重复时，内部函数的变量将会屏蔽外部函数同名的变量，外部函数同名变量对内部函数将处于不可见的状态

2. 变量的赋值规则

- 先在自己的作用域内部查找，有就直接赋值
- 自己作用域内没有就去上一级作用域内部查找，有就直接赋值
- 会重复第二步，直到上一级作用域是全局作用域，如果全局作用域都没有，那么这个默认声明的变量会被挂载到全局对象 window 上，同时会被赋值

3. 影响

- 由于变量提升的影响，我们在定义变量时，应该首先定义变量

```js
// 同时初始化多个变量
function fn() {
  var x = 1;
  y = 1 + tx;
  console.log(x, y); // 1 2
}
fn();
```

4. 全局作用域

- 一般来说，不在任何函数内声明的变量就具有全局作用域
- js 中默认具有一个全局对象 window，全局作用域中的变量实际上被绑定到 window 的一个属性，成为一个全局属性，函数声明同理

```js
var a = 'global';
console.log(a, window.a); // global global
```

5. 局部作用域

- js 的局部作用域实际上就是某个函数的内部，语句块无法产生局部作用域，js 中只有函数能生成局部作用域
- 可以使用 let/const 声明一个块级作用域的变量/常量

6. 变量的访问规则

- 变量（函数也属于一个变量）会先在当前作用域中寻找，如果没有找到会往上一级作用域查找
- 会一直重复上一步的查找过程直到上一级作用域是 window，如果全局作用域中也没找到时就会报错。这就是变量的访问规则，也称之为作用域的查找机制
- 当代码要访问一个变量时，首先会搜索内部词法环境，然后搜索外部环境，然后搜索更外部的环境，以此类推，直到全局词法环境
