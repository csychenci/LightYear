---
title: Map/Set
date: 2020-04-15 13:12:35
sidemenu: true
toc: 'content'
order: 11
author: chencicsy
categories: JavaScript
tags:
  - set
  - JavaScript
  - map
description:
---

## Set

---

1. Set 是什么
- 是 es6 的一种新的数据结构集合，类似于数组，但是集合成员的值是 **唯一且无序** 的。Set 结构的键名就是键值，两者是同一个值，Set 本身作为一种构造函数，用来生成 Set 数据结构
- Set 允许存储 **任何类型** 的唯一值，无论是原始值或者对象引用，并且 Set 可以使用具有 iterator 接口的数据结构进行初始化

```js
let map = new Map([
  ['Bob', 15],
  ['Jim', 25],
  ['Mary', 18],
]);

let set = new Set('12364');
// Set(5) {"1", "2", "3", "6", "4"}
let set2 = new Set([1, 2, 3, 4, 5, 6]);
// Set(6) {1, 2, 3, 4, 5, 6}
let set3 = new Set(map);
// 可以使用具有iterator接口的数据结构进行初始化
```

- 向 Set 添加值时，不会发生类型转换。它采取的比较算法类似于 **全等比较**，但它认为 NaN 与 NaN 是相等的。因此，它可以识别出 NaN

```js
let set = new Set();

set.add(5);
set.add('5');

set.add(NaN);
set.add(NaN);

set.add(+0);
set.add(-0);

/** 
  * Set(4) {0, 5, '5', NaN}
  * 由于采取的 Object.is，因此能够识别出 NaN，+0 与 -0
*/
```

- Set 中部署了 Iterator 接口，因此存在 Symbol.iterator 属性，可使用遍历器方法，也可使用扩展运算符

```js
/** 
  * for (let item of set) { console.log(item);}
  * 下面的方式也可以，只不过一个是迭代遍历器，另一个是自动对迭代器进行调用
*/

let set = new Set();

[5, '5', NaN, NaN].forEach((item) => set.add(item));

for (let item of set[Symbol.iterator]()) {
  console.log(item);
}

/** 
  * 还可以利用 set 的唯一性进行数组去重
*/
[...new Set([1, 2, 3, 3, 5, 7, 7])];
```

2. 操作 set 的方法

| 操作   | 描述                                                                           |
| ------ | ------------------------------------------------------------------------------ |
| size   | 获取 set 结构的成员总数                                                        |
| add    | 在 Set 对象尾部添加一个元素，相当于 array 的 push，会返回 set 对象，可链式调用 |
| delete | 删除之前会调用 has 方法，删除集合中的 value，调用 has 方法返回一个布尔值       |
| has    | 判断集合中是否存在 value，返回一个布尔值                                       |
| clear  | 清空集合                                                                       |

- Set 的遍历顺序就是插入顺序，在某种情况下使用可以保证顺序遍历。并且某些方法作用相同是为了与 Map 兼容，如 forEach(value,revalue,set)、Set.keys() 与 Set.values() 作用相同

| 遍历方法 | 描述 | 实际意义 |
| --- | --- | --- |
| Set.prototype.keys | 遍历并返回所有的值 | 返回按插入顺序排列的键名/键值的遍历器 |
| Set.prototype.values | 遍历并返回所有的值 | 返回按插入顺序排列的键值/键值的遍历器 |
| Set.prototype.entries | 遍历并返回所有的键值/键名对 | 返回按插入顺序排列的键值对的遍历器 |
| Set.prototype.forEach | 与数组的类似，有(key/value value/key Set) | 回调操作遍历每个成员 |

```js
let set = new Set('jetmine');

let setIterator = set.entries(); // 键值的遍历器对象

/**
  * SetIterator {"j" => "j", "e" => "e", "t" => "t", "m" => "m", "i" => "i","n" => "n","e" => "e"}
*/

setIterator.next().value; // ['j', 'j']
```

```js
let set = new Set([1, 4, 9]);
set.forEach((value, key) => console.log(key + ' : ' + value));
// 1 : 1
// 4 : 4
// 9 : 9
for (let item of set.entries()) {
  console.log(item);
}
// [1, 1]
// [4, 4]
// [9, 9]
```

3. 可配合数组使用

- Array.prototype.map

```js
let set = new Set([1, 2, 4].map((item) => item * item));
console.log(set);
// Set(3) {1, 4, 16}
```

- Array.prototype.filter

```js
let set = new Set([1, 2, 4, -5, 45, 10].filter((item) => item > 4));
console.log(set);
// Set(2) {45, 10}
```

- Array.from

```js
let set = new Set(Array.from(new Set([1, 2, 4]), (item) => item * 2));
console.log(set);
// Set(3) {2, 4, 8}
```

- 实现并集

```js
let set1 = new Set([1, 2, 4]);
let set2 = new Set([1, 4, 5]);
let set = new Set([...set1, ...set2]);

/** 
  * Set(4) {1, 2, 4, 5}
*/
```

- 实现交集

```js
let set1 = new Set([1, 2, 4]);
let set2 = new Set([1, 4, 5]);
let set = new Set([...set1].filter(item => set2.has(item));

/** 
  * Set(2) {1, 4}
*/
```

- 实现差集

```js
let set1 = new Set([1, 2, 4]);
let set2 = new Set([1, 4, 5]);
let set3 = new Set([...set1].filter(item => !set2.has(item));
// Set(1) {2} set1相对于set2的差集
let set4 = new Set([...set2].filter(item => !set1.has(item));
// Set(1) {5} set2相对于set1的差集
```

---

## Map

---

1. Map 是什么
- Map 是一组键值对的结构，类似于对象，也是键值对的集合，但是 Map 的键可以是任意类型，并且不会被转化为字符串，包括对象。而对象中使用一个对象类型来作为一个键的情况下，会被转化为字符串

```js
// 各种对象被转化为字符串
var obj = { id: 1 };
obj.toString(); // "[object Object]"

var arr = [1, 2, 3, 4];
arr.toString(); // "1,2,3,4"

var fn = function () {
  console.log('function');
};

fn.toString(); // "function(){console.log('function')}"
var obj1 = { [obj]: 'object', [arr]: 'array', [fn]: 'function' };
// {
//    [object Object]: "object",
//    1,2,3,4: "array",
//    function(){console.log('function')}: "function"
// }
// 使用对象类型的key均调用构造函数原型上的toString方法，被转化为字符串
```

- 在一些方面上，Map 与 Object 有一些区别。以下表格来自 MDN

|  | Map | Object |
| --- | --- | --- |
| 意外的键 | Map 默认情况不包含任何键，只包含显式插入的键 | 一个 Object 有一个原型, 原型链上的键名有可能和你自己在对象上的设置的键名产生冲突。注意: 虽然 ES5 开始可以用 Object.create(null) 来创建一个没有原型的对象，但是这种用法不太常见 |
| 键的类型 | 一个 Map 的键可以是任意值，包括函数、对象或任意基本类型 | 一个 Object 的键必须是一个 String 或是 Symbol |
| 键的顺序 | Map 中的 key 是有序的。因此，当迭代的时候，一个 Map 对象以插入的顺序返回键值 | 一个 Object 的键是无序的。注意：自 ECMAScript 2015 规范以来，对象确实保留了字符串和 Symbol 键的创建顺序； 因此，在只有字符串键的对象上进行迭代将按插入顺序产生键 |
| Size | Map 的键值对个数可以轻易地通过 size 属性获取 | Object 的键值对个数只能手动计算 |
| 迭代 | Map 是 iterable 的，所以可以直接被迭代 | 迭代一个 Object 需要以某种方式获取它的键然后才能迭代 |
| 性能 | 在频繁增删键值对的场景下表现更好 | 在频繁添加和删除键值对的场景下未作出优化 |

- 任何部署了 iterator 接口、且每个成员都是一个双元素的数组的数据结构都可以作为 Map 构造函数的参数

```js
let map = new Map([
  ['Bob', 15],
  ['Jim', 25],
  ['Mary', 18],
]);
```

```js
// Object.entries
const obj = {
  name: 'Bob',
  age: 25,
  sex: '男',
};
let map = new Map(Object.entries(obj));
// Object.entries 返回了对象的键值对的迭代器并且是一个双元素的数组
```

- 只有对同一对象的引用，Map 结构才会将其视为同一个键。Map 结构会保持键的唯一性

```js
const map = new Map();
map.set(['a'], 555);
map.get(['a']); // undefined
```

- Map 中比较键（key）的方法类似于 **全等比较**，但它认为 NaN 与 NaN 是相等的。

```js
const map = new Map();

map.set(NaN, 'nanTag1');
map.set(NaN, 'nanTag2');

map.set(+0, '0');
map.set(-0, '-0');

/** 
  * Map(2) {NaN => 'nanTag2', 0 => '-0'}
*/
```

2. Map 的操作方法

|      操作      | 描述                                            |
| :------------: | :---------------------------------------------- |
|      size      | 获取 Map 结构的成员总数                         |
| set(key,value) | 向字典中添加新元素                              |
|    get(key)    | 通过键查找特定的数值并返回,不存在返回 undefined |
|    has(key)    | 判断字典中是否存在 key，返回一个布尔值          |
|  delete(key)   | 通过键 key 从字典中移除对应的数据               |
|     clear      | 将这个字典中的所有元素删除                      |

```js
let map = new Map();
var obj = { id: 1 };
var arr = [3, 4, 5];

map.set(1, 'one');
map.set(arr, 'two');
map.set(obj, 'three');
map.set('1', 'four');

map.get(1); // one
map.get('1'); // four
map.get(arr); // two
map.get(obj); // three
```

- Map 的遍历/迭代顺序遵循元素插入时的原始顺序

| 遍历方法 | 描述 | 实际原理 |
| --- | --- | --- |
| Map.prototype.keys | 遍历并返回所有的键 | 返回键的遍历器(iterator) |
| Map.prototype.values | 遍历并返回所有的值 | 返回键值的遍历器(iterator) |
| Map.prototype.entries | 遍历并返回所有的键值对 | 返回键值对的遍历器(iterator) |
| Map.prototype.forEach | 与数组的类似，有(key value Map)，按插入顺序进行遍历 | 回调操作遍历每个成员 |

- Map.prototype.forEach 方法中的 key、value 与其他迭代结构的 forEach 方法是相反的

```js
let map = new Map();
var obj = { id: 1 };
var arr = [3, 4, 5];

map.set(1, 'one').set(arr, 'two').set(obj, 'three').set('1', 'four');

map.forEach((key,value)=>{
  console.log(key,value)
})

/** 
  * one 1
  * two (3) [3, 4, 5]
  * three {id: 1}
  * four 1
*/
```
- Map 可以链式调用，每一次调用 set 方法都会返回 Map 实例本身，因此可以实现链式调用

```js
let map = new Map();
var obj = { id: 1 };
var arr = [3, 4, 5];
map.set(1, 'one').set(arr, 'two').set(obj, 'three').set('1', 'four');
// Map(4) {1 => "one", Array(3) => "two", {…} => "three", "1" => "four"} 返回map实例本身
```

- Object.fromEntries：给定一个具有 [key, value] 键值对的数组，它会根据给定数组创建一个对象

```js
/** 
  * Object.formEntries(map) 效果是一样的
*/
let map = new Map();
map.set('banana', 1).set('orange', 2).set('meat', 4);
let obj = Object.fromEntries(map.entries()); // 创建一个普通对象（plain object）(*)
```


3. object、map、array 遍历器的区别
- 常见的遍历器方法在 `Object`、`Array`、`Map` 中都有实现，分别是 `keys`、`values`、`entries`

```js
let arr = [1, 2, 3, 4];
let obj = { name: 'Tony', sex: 'boy' };
let map = new Map();
map.set({ id: 1 }, 'idcard').set(['address', 'country'], 'message');

Object.keys(obj); // 返回一个真正的数组，而不是遍历器对象

map.keys(); // MapIterator {1} 返回一个遍历器对象

arr.keys(); // Array Iterator {} 返回一个遍历器对象

Object.keys(obj)[Symbol.iterator](); // Array Iterator {}
```
