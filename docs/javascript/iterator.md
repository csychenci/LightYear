---
title: 迭代器对象
date: 2020-04-17 21:45:13
sidemenu: true
toc: 'content'
order: 10
author: chencicsy
categories: JavaScript
tags:
  - iterator
  - JavaScript
  - 迭代器对象
description:
---

## Iterator/迭代器

---

1. Iterator 是什么
- 在 js 中它是一种接口，为各种不同的数据结构提供统一的访问机制，即 for of，当使用 for of 遍历数据结构时，该循环会自动寻找 Iterator 接口
- 任何数据结构只要部署 Iterator 接口，就可以完成遍历操作（依次处理该数据结构的所有成员）。也就是说，要成为可迭代对象，这个对象必须实现 @@iterator 方法，这意味它必须有一个键为 @@iterator 的对象，通常使用 Symbol.iterator 设置或访问该属性

| 属性 | 值 |
| --- | --- |
| [Symbol.iterator] | 一个无参数的函数，其返回值为一个符合迭代器协议的对象，也就是要返回一个迭代器对象 |

- 本质上是一个指针对象。这意味着可迭代对象必须实现 Symbol.iterator 接口。一个数据结构只要具有 Symbol.Iterator 属性，就可认为是可迭代的

2. Iterator 的作用
- 给各种数据结构，提供一个统一的、简便的访问接口，它使得数据结构的成员能够按某种次序排列，并且部署 Itetator 接口的数据结构可以使用 es6 新的遍历命令 for of

```js
// 创建一个满足迭代器协议的对象
function createIterator(...rest){
  let i = 0;
  return {
    value:rest,
    next: function () {
      if(i>=this.value.length) return {done:true,value:undefined}
      return {done:false,value:this.value[i++]}
    },
    [Symbol.iterator]: function () {
      return this;
    }
  };
}
var myIterator = createIterator(1,2,3,4,5);

for(let item of myIterator) {
  console.log(item)
}

/**
  * 1
  * 2
  * 3
  * 4
  * 5
 */
```

3. Iterator 的遍历过程
- 创建一个指针对象，指向当前数据结构的起始位置
- 第一次调用指针对象的 next(用于移动指针) 方法，可以移动指针并将指针指向数据结构的第一个成员
- 第二次调用指针对象的 next 方法，移动指针就指向数据结构的第二个成员
- 不断调用指针对象的 next 方法，直到指向数据结构的结束位置
- 每一次调用 next，都会返回当前的成员的信息，具体就是返回一个包含 value 和 done 两个属性的对象，value 是当前成员的值，done 是一个布尔值，表示遍历是否结束

```js
function moveIterator(arr) {
  var curIndex = 0;
  return {
    next: function () {
      return curIndex < arr.length
        ? { value: arr[curIndex++], done: false }
        : { value: undefined, done: true };
      // return curIndex<arr.length?{value:array[curIndex++]}:{done:true}
    },
  };
}
```

4. Iterator 与数据结构的关系
- 可迭代对象的核心功能：关注点分离。对象本身并没有 next 方法，而是通过调用 obj[Symbol.iterator] 创建了另一个对象，即迭代器对象，并且该对象的 next 会迭代生成值
- Iterator 只是把接口规格加到数据结构之上，因此，遍历器与它所遍历的那个数据结构实际上是分开的

```js
let range = {
  from: 1,
  to: 5,

  [Symbol.iterator]() {
    this.target = this.from;
    var that = this;
    return {
      next() {
        if (that.target <= that.to) {
          return { done: false, value: that.target++ };
        } else {
          return { done: true };
        }
      }
    }
  }
};

for (let num of range) {
  console.log(num); // 1, 2, 3, 4, 5
}
```

- 上述代码可以用 _yield_ 来写，结构如下

```js
let range = {
  from: 1,
  to: 5,

  *[Symbol.iterator]() {
    for (let value = this.from; value <= this.to; value++) {
      yield value;
    }
  },
};
```

5. 具备 `Iterator` 接口的数据结构

|    数据结构    |
| :------------: |
|     Array      |
|      Map       |
|      Set       |
|     String     |
| arguments 对象 |
| NodeList 对象  |

- 只要部署了 Symbol.iterator 属性的数据结构，就是部署了遍历器接口，调用这个接口，就会返回一个遍历器对象，该对象的根本特征就是具有 next 方法，每次调用都会返回一个代表当前成员的信息对象，此对象具有 value 和 done 两个属性

```js
let i = 0;
let arr = [1, 2, 3, 4];
let arrIterator = arr[Symbol.iterator]();

while (i <= arr.length) {
  console.log(arrIterator.next());
  i++;
}
// {value: 1, done: false}
// {value: 2, done: false}
// {value: 3, done: false}
// {value: 4, done: false}
// {value: undefined, done: true}
```

```js
let str = 'hello';
let iterator = str[Symbol.iterator]();

while (true) {
  let res = iterator.next();
  if (res.done) {
    break;
  }
  console.log(res.value);
}
```

- 普通对象部署 Symbol.itarator 方法是没有效果的，需要满足数组的索引规则才可以，也就是作为一个类数组对象存在。而且如果 Symbol.iterator 对应的不是遍历器生成函数，即不是返回一个遍历器对象，将会报错

```js
// 使用数组的迭代器对象生成函数，但对象不符合数组的排序规则
let iterable = {
  a: 'a',
  b: 'b',
  c: 'c',
  length: 3,
  [Symbol.iterator]: Array.prototype[Symbol.iterator],
};
for (let item of iterable) {
  console.log(item); // undefined, undefined, undefined
}
```

```js
// 修改一下，使得该对象变为一个类数组，成功输出内容
let iterable = {
  0: 'a',
  1: 'b',
  2: 'c',
  length: 3,
  [Symbol.iterator]: Array.prototype[Symbol.iterator],
};
for (let item of iterable) {
  console.log(item); // a, b, c
}
```

- 字符串迭代器能够识别代理对 surrogate pair，也就是 UTF-16 扩展字符

```js
let str = '𝒳😂𩷶';
for (let item of str) {
  console.log(item);
}
// 𝒳
// 😂
// 𩷶
```

6. 调用 iterator 接口的场合

| 场合         | 实例                                    |
| ------------ | --------------------------------------- |
| 解构赋值     | let [x,...arr]=new Set([1,2,3,4])       |
| 扩展运算符   | [...'jetmine']                          |
| for...of     | for(let item of arr){}                  |
| Array.from   | Array.from(ArrayLike)                   |
| Map、Set     |                                         |
| Promise.all  | Promise.all([new Promise,new Promise])  |
| Promise.race | Promise.race([new Promise,new Promise]) |

```js
/**
  * 1. Array.from ---> Array Iterator {}
 */

Array.from({length:5})[Symbol.iterator]();
// Array Iterator {}
```

7. ES6 迭代器

- _iterator_ 是被部署在构造函数的原型对象上的

```js
Array.hasOwnProperty(Symbol.iterator); // false
Array.prototype.hasOwnProperty(Symbol.iterator); // true

Map.hasOwnProperty(Symbol.iterator); // false
Map.prototype.hasOwnProperty(Symbol.iterator); // true
```

```js
class SimpleArray {
  constructor(data) {
    this.data = data;
  }

  [Symbol.iterator]() {
    let index = 0;
    return {
      next: () => {
        if (index < this.data.length) {
          return { value: this.data[index++], done: false };
        } else {
          return { done: true };
        }
      },
    };
  }
}
```
