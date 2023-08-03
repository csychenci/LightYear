---
title: 解构赋值
date: 2021-01-05 23:29:59
sidemenu: true
toc: 'content'
order: 13
author: chencicsy
categories: JavaScript
tags:
  - 遍历器对象
  - JavaScript
  - 解构赋值
description:
---

## 数组解构

---
1. 解构的意义

- es6 允许按照一定的模式，从数组和对象中提取值，对变量进行赋值，称之为解构
- 解构并不意味着破坏，它通过将结构中的各元素复制到变量中来达到解构的目的。但数组本身是没有被修改的

```js
let arr = ['Bob', 18, '男'];
let [name, age, sex] = arr;
// 等同于 let name = arr[0]; let age = arr[1]; let sex = arr[2]
```

```js
// 更优雅的使用数组解构
let [name, age, sex] = 'Bob,18,男'.split(',');
```

2. 模式匹配
- 本质上，解构赋值可以属于模式匹配，即等号两边的模式相同，左边的变量就会被赋予对应的值

```js
const [a, b, c] = [1, 2, 3];
console.log(a, b, c); // 1 2 3
```

```js
// 使用空位去忽略不想要的元素
const [a, , b, , c] = [1, 2, 3, 4, 5];
console.log(a, b, c); // 1 3 5
// 2 4 被空位跳过
```

```js
const [, , a] = [1, 2, 3];
console.log(a); // 3
```

- 实际上，解构赋值使用到了遍历器对象，因此，任何部署了 `[Symbol.iterator]` 接口的数据集合都可使用解构赋值

```js
/** 
  * 1. 内置 iterator
*/
let [a, b, c] = '123';
console.log(a, b, c); // 1 2 3

let [a1, b1, c1] = new Set([1, 2, 3]);
console.log(a, b, c); // 1 2 3

/** 
  * 2. 自定义 iterator
*/
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
let myIterator = createIterator(1,2,3,4,5);

let [a2,,b2,,c2] = myIterator;

// a2:1 , b2:3 , c2:5
```

- 还可用于循环结构中，用于遍历特定的属性

```js
// for循环
let user = {
  name: 'John',
  age: 30,
};

// 循环遍历键值对
for (let [key, value] of Object.entries(user)) {
  console.log(`${key}:${value}`); // name:John, then age:30
}
```

- 用于快捷的交换两个变量的值

```js
let Bob = 'Bob';
let James = 'james';
[Bob, James] = [James, Bob];

/** 
  * Bob: 'james'
  * James: 'Bob'
*/
```

- 使用 `...` 来收集剩余的所有元素

```js
const [a, ...c] = [1, 2, 3, 4];
console.log(a, c); // 1 [2,3,4]
```

```js
const arr1=[1,2,3,4];
const arr2=[3,5,4];
console.log([...arr1,arr2]); // [1,2,3,3,4,4,5]
```

- 错误情况，当等号右边不是可遍历的结构时，会抛出一个错误

|   字段    |   结构    |
| ------- | ------- |
|     1     |  Number   |
|   false   |  Boolean  |
|    NaN    |  Number   |
| undefined | undefined |
|   null    |   null    |
|    {}     |  空对象   |

```js
let [obj] = {};
// Uncaught TypeError: {} is not iterable
```

3. 默认值

- 变量数量多于数组中元素的情况，不完全解构，只有一部分模式匹配

```js
const [a,b,...c]=[1]
console.log(a,c); // 1 undefined
```

```js
const [a,[b],c]=[1,[3,4]]
console.log(a,b,c); // 1 3 undefined
```

- 我们还可以在解构之前给变量给提供一个值，当它无法从数组解构到值时（**等号右边严格等于 `undefined`**），它将使用这个默认值

```js
let [a = 1, b = a] = [undefined];
console.log(a, b); // 1 1
```

```js
let [a = 1, b = a] = [undefined, 3];
console.log(a, b); // 1 3
```

```js
let [a = 1, b = a] = [3, undefined];
console.log(a, b); // 3,3
```

```js
let [a = 1, b = a] = [null, undefined];
console.log(a, b); // null null
```

```js
let [a = 1, b = a] = [NaN, 2];
console.log(a, b); // NaN 2
```

- 解构赋值是一个表达式的情况下，它会惰性求值

```js
function fn(){
	console.log('aaa')
}
let [x = fn(), y = x] = [null,2];
console.log(x,y); // null 2
// 因为null 不严格等于 undefined，因此不会被赋予fn()，而fn()就不会执行
```

```js
function fn(){
	console.log('aaa')
}
let [x = fn(), y = x] = [undefined,2];
console.log(x,y);
 // aaa
 // undefined 2
// x会被赋予fn()，而fn()会执行，但因为fn没有明确返回值，因此返回值为undefined
```

---

## 对象解构

---

1. 与数组解构的区别

- 数组的解构赋值对应的是元素的位置，而对象的解构赋值对应的是同名的属性名，它指定了属性与变量之间的映射关系
- 对象的解构赋值的内部机制，是先找到同名属性，然后再赋给对应的变量

2. 对象解构用法

```js
let {num1} = {num1:"hello",num2:"world"};
console.log(num1); // hello
```

```js
let {num3} = {num1:"hello",num2:"world"};
console.log(num3); // undefined
```

```JavaScript
let obj1 = {a:1,b:2};
let obj2 = {b:3,c:5};
console.log({...obj1,...obj2}); // {a:1,b:3.c:5}
```

- 指定变量名并赋值给它

```js
let { num3: n3, num2: n2 } = { num1: 'hello', num2: 'world' };
console.log(n2, n3); // "world" undefined
// 将num3，num2从对象中解构出来，并赋值给冒号右边的变量
```

3. 默认值

- 默认值可以是任意表达式或函数调用，它们仍然会惰性求值。类似于 `数组解构`，当变量在对象中解构出来的值严格等于 `undefined` 时，默认值才会生效

```js
let {
  name = 'Jim',
  age = '18',
  sex = (() => {
    return 'boy';
  })(),
} = { name: null, age: undefined };
// let {name='Jim', age='18'} = {name: null}
console.log(name, age, sex); // null '18' 'boy'
```

```js
let {
  name = 'Jim',
  age = '18',
  sex = (() => {
    return 'boy';
  })(),
} = { name: null, age: undefined, sex: '男' };
// let {name='Jim', age='18'} = {name: null}
console.log(name, age, sex); // null '18' '男'
```

- 指定变量名且指定默认值并赋值

```js
let {
  name: n1 = 'Jim',
  age: a1 = '18',
  sex: s1 = (() => {
    return 'boy';
  })(),
} = { name: null, age: undefined, sex: '男' };
// let {name='Jim', age='18'} = {name: null}
console.log(n1, a1, s1); // null '18' '男'
```

- 解构赋值可以让我们只取我们想要的值

```js
let { name } = { name: 'Jetmine', age: undefined, sex: '男' };
console.log(name); // Jetmine
```

- 使用 `...` 来收集剩余的所有元素，类似于数组

```js
let { name, ...rest } = { name: 'Jetmine', age: undefined, sex: '男' };
console.log(name, rest);
// Jetmine {age: undefined, sex: "男"}
```

- 注意：不使用声明关键字的情况下，可能会报错。左边的表达式被放入 `{}` 中，被当作代码块处理了，因此会报错

```js
{name,...rest} = {name: 'Jetmine', age: undefined, sex:'男'}
// 这种情况会报错
{name,age,sex} = {name: 'Jetmine', age: 18, sex:'男'};
// 这种情况下会报错
({name,age,sex} = {name: 'Jetmine', age: 18, sex:'男'});
// 告诉JavaScript这不是一个代码块，这样就不会报错了
```

- 还可以对对象中的其他复杂元素进行嵌套解构

```js
let family = {
  son: {
    name: 'John',
    age: '18',
  },
  mom: {
    name1: 'Mary',
    sex: 'gril',
  },
  house: ['house1', 'house2'],
};

let {
  son: { name, age },
  mom: { name1 },
  house: [house1, house2],
} = family;

console.log(name);
// "John"
console.log(name1);
// "Mary"
console.log(age);
// "18"
console.log(house1);
// "house1"
console.log(house2);
// "house2"
```

- 我们还可以在函数参数上指定这种解构赋值的方式，以提供默认值

```js
function makedefaultvalue({ name: n1 = 'Mary', age = 100, item: [item1, item2] }) {
  console.log(n1);
  console.log(age);
  console.log(item1, item2);
}
makedefaultvalue({ name: 'James', age: undefined, item: ['test1', 'test2'] });

function makedefaultvalue1({ name: n1 = 'Mary', age = 100 }) {
  console.log(n1);
  console.log(age);
}
makedefaultvalue1({}); // 使用默认值
```

- 需要注意的是，上述情况中，函数参数有 `默认值` 的情况下，当某个函数参数需要解构对象中的数组时，若为空对象，则会报错，因为 `undefined` 没有 `iterator`，因此无法被解构

```js
function makedefaultvalue({ name: n1 = 'Mary', age = 100, item: [item1, item2] }) {
  console.log(n1);
  console.log(age);
  console.log(item1, item2);
}
makedefaultvalue({});
// Uncaught TypeError: undefined is not iterable
```
