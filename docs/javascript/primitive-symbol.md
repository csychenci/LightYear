---
title: Symbol类型
date: 2020-04-03 08:23:38
categories: JavaScript
sidemenu: true
toc: 'content'
order: 5
author: chencicsy
tags:
  - 前端
  - JavaScript
  - 动态语言
description:
---

## symbol

---

1. symbol 是什么

- 一个 ES6 的新的基本数据类型，表示一个独一无二的值。Symbol 可以接收一个字符串作为参数，表示对 symbol 实例的描述，用于区分 symbol 实例，只是用于作为该 symbol 实例的一个标签
- 虽然类似于内建对象类，但作为构造函数来说它并不完整，它不支持被构造调用，也就是不支持 new Symbol

```js
let symbol = new Symbol('a')
/**
 * Symbol is not a constructor，可以看出 Symbol 并不是一个构造器
 */
```
2. symbol 的一些特性

- `symbol` 无法被遍历、迭代

```js
let s = Symbol('这是s');
let s1 = Symbol('这是s1');
let obj = {
  a: 'a',
  b: 'b',
  [s]: s,
  [s1]: s1,
};
for (let key in obj) {
  console.log(obj[key]);
}
// a b
```

- `symbol` 不会被自动转换为字符串

```js
let str = Symbol('this is a str');
alert(str); 
/** 
 * Cannot convert a Symbol value to a string
*/
```

- 可用于隐藏对象属性。当我们使用一个 `symbol` 实例作为对象的键时，它是不可被迭代、遍历到的。因此，它不会被意外的跟其他属性被处理，导致一些异常的出现
- 具有独一无二特性的 `symbol` 实例可防止对象的键被意外使用或篡改，防止与其他的属性冲突

---

## 与 symbol 相关的一些 API

---

1. Object.getOwnPropertySymbols

- 在给定对象自身上找到的所有 `Symbol` 属性的数组

```js
let obj = {};
let a = Symbol('a');
let b = Symbol.for('b');

obj[a] = 'localSymbol';
obj[b] = 'globalSymbol';

let objectSymbols = Object.getOwnPropertySymbols(obj);

objectSymbols.length; // 2
objectSymbols; // [Symbol(a), Symbol(b)]
objectSymbols[0]; // Symbol(a)
```

2. description

- 使用该属性可以获取给 `symbol` 实例设置的描述

```js
let symbol1 = Symbol('symbol1 tag');
symbol1.description; // symbol1 tag
```

3. Symbol.for

- 用于从 **全局Symbol注册表** 中读取 `Symbol` 实例。当该 `Symbol` 实例不存在时会进行创建并添加至全局 Symbol 注册表。使用该方法可以确保每次访问同名描述的 `Symbol` 时，返回的都是相同的 `Symbol` 实例

```js
// 从全局注册表中读取
let id = Symbol.for('id'); // 如果该 Symbol 不存在，则创建它

// 再次读取（可能是在代码中的另一个位置）
let idAgain = Symbol.for('id');

// 相同的 Symbol
id === idAgain; // true
```

- 为了防止冲突，最好给你要放入 symbol 注册表中的 symbol 带上键前缀

4. Symbol.keyFor

- 用于从 `全局Symbol注册表` 中读取 `Symbol` 并返回该实例的描述

```js
/** 
 * 1. Symbol.for ---> symbol 实例是全局symbol
 * 2. Symbol ---> 非全局symbol
*/
let str = Symbol.for('Bob'); //全局Symbol
let str1 = Symbol('Jim'); // 非全局Symbol

Symbol.keyFor(str); // Bob
Symbol.keyFor(str1); // undefined
```

5. Symbol.asyncIterator

- 用于指定一个对象的默认异步迭代器。当对象设置这个属性时，这个对象就是异步可迭代对象，可用于 _for await of_ 循环

```js
let obj = {};

obj[Symbol.asyncIterator] = async function* () {
  yield 'one';
  yield 'two';
  yield 'three';
};
(async () => {
  for await (let item of obj) {
    console.log(item);
  }
})();
// one
// two
// three
```

- 自定义异步返回迭代器，需要返回一个 _promise_，在不使用生成器的情况下

```js
let obj = {
  start: 0,
  end: 5,
  [Symbol.asyncIterator]() {
    var that = this;
    return {
      next() {
        if (that.start <= that.end) {
          return Promise.resolve({ value: that.start++, done: false });
        }
        return Promise.resolve({ value: undefined, done: true });
      },
    };
  },
};

(async function () {
  for await (item of obj) {
    console.log(item);
  }
})();

// 0
// 1
// 2
// 3
// 4
// 5
```
