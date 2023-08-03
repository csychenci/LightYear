---
title: 手写原型方法
date: 2020-08-15 10:13:26
categories: React-Hooks
tags:
  - JavaScript框架
  - React
---

<div style="text-align: center;font-weight: 900;"> 手写原型方法 </div>

<!-- more -->

---

# 手写原型方法

---

## 数组

---

1. Array.prototype.flat

- 该方法用于实现嵌套数组的扁平化

```js
// 示例
var arr = [1, 2, [3, [4, 5]]];
arr.flat(); // [1,2,3,4,5]
```

- 最简单的实现，使用递归即可/深拷贝的思路

```js
Array.prototype.myFlat = function () {
  let arr = [];
  this.forEach((item, index) => {
    if (Array.isArray(item)) {
      arr = arr.concat(item.myFlat());
    } else {
      arr.push(item);
    }
  });
  return arr;
};
```

```js
Array.prototype.myFlat = function () {
  return this.toString()
    .split(',')
    .map((item) => +item);
};
```

2. Array.prototype.of

- 可用于替代 `Array/new Array` 由于参数不同导致的差异性行为

```js
Array.prototype.myArrayof = function () {
  return Array.prototype.slice.call(arguments);
};
```

3. Object.getOwnPropertyDescriptors

- 返回指定对象所有自身属性（非继承属性）的描述对象，该对象的属性名为原始对象的属性名，该对象的属性值为该属性的描述对象

```js
function myGetOwnPropertyDescriptors(obj) {
  const res = {};
  for (let key of Reflect.ownKeys(obj)) {
    res[key] = Object.getOwnPropertyDescriptor(obj, key);
  }
  return res;
}
```

4. Array.prototype.map

```js
Array.prototype.myMap = function (callback, thisArg) {
  if (typeof callback !== 'function') {
    throw new Eroor('callback must be a function');
  }
  let arr1 = [];
  let that = this;
  let count = 0;
  let res;
  let arg = Symbol('临时属性');
  thisArg = thisArg ? thisArg : that;
  for (let key of Reflect.ownKeys(that)) {
    debugger;
    if (+key === count) {
      res = callback.call(thisArg, ...[that[key], key, that]);
      if (res) {
        arr1.push(res);
      } else {
        arr1.push(that[key]);
      }
      count++;
    } else if (key === 'length') {
      break;
    } else {
      while (count < +key) {
        arr1.push(arg);
        delete arr1[count];
        count++;
      }
      res = callback.call(thisArg, ...[that[key], key, that]);
      if (res) {
        arr1.push(res);
      } else {
        arr1.push(that[key]);
      }
    }
  }
  return arr1;
};
```
