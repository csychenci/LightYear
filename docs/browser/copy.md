---
title: 深浅复制
date: 2020-09-21 23:13:31
categories:
tags:
  - JavaScript
description:
---


## 区别于赋值

---

1. 深浅拷贝与复制的区别

- 一般来说，我们说的浅拷贝与深拷贝都是针对 **引用类型** 来说的。即使是浅拷贝，它也与 js 中的复制(赋值)也是有区别的
- 对于引用数据类型的复制操作，不管是该对象内的元素是原始数据类型还是引用数据类型，在复制后的新数据上进行的修改，都会影响到原始数据
- 一层拷贝，对于引用数据类型的浅拷贝操作，在新的数据上的修改操作，不会影响到原始数据中的原始数据类型，但会影响到原始数据中的引用数据类型
- 无限层级拷贝，对于引用数据类型的深拷贝操作，在新的数据上的修改操作，无论是对原始数据类型还是引用数据类型的修改，都不会影响到原始数据

|  操作  | 引用同一内存地址 | 修改原始数据类型影响(原始数据) | 修改引用类型影响(原始数据) |
| ---- | -------------- | ---------------------------- | ------------------------ |
|  复制  |        是        |               是               |             是             |
| 浅拷贝 |        否        |               否               |             是             |
| 深拷贝 |        否        |               否               |             否             |

---

## 浅拷贝

---

1. 描述

- 根据浅拷贝的概念，意味着一个问题，对于 Object 来说，无论是给拷贝的对象添加一个基本数据类型还是引用数据类型的元素，都不会影响到被拷贝的对象，也就是原始数据
- 本质上来说，拷贝的只是对象属性的引用，而不是对象本身。也就是说，此对象非彼对象，它们在内存空间的引用地址都是不同的，因此，操作的也不会是同一个对象了
- 根据上面浅拷贝的特性，我们可以手写一个简单的浅拷贝

```js
function easyClone(obj) {
  if (typeof obj === 'object' && obj != null) {
    const res = Array.isArray(obj) ? [] : {};
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        res[key] = obj[key];
      }
    }
    return res;
  } else {
    return obj;
  }
}
```

- 对上述代码进行测试，符合预期

```js
const obj = { name: 'bob', age: 20, address: { country: 'China', city: 'SZ' } };
const obj1 = easyClone(obj);
obj1.name = 'Bill';
obj1.address.city = 'CS';
obj1.family = { father: 'james', mother: 'mary' };
console.log(obj);
// {age: 20,name: "bob",address: {country: "China", city: "CS"}}
console.log(obj1);
// {age: 20,name: "Bill",address: {country: "China", city: "CS"},family:{father:'james',mother:'mary'}}

const arr = [1, 'hello world', { age: 18, name: 'Bob' }];
const arr1 = easyClone(arr);
arr1[0] = 1024;
arr1.push('jetmine');
arr.push({ blogWriter: 'jetmine' });
arr1[2].sex = 'boy';
console.log(arr);
// // [1,"hello world",{age: 18, name: "Bob", sex: "boy"},{blogWriter:'jetmine'}]
console.log(arr1);
// [1024,"hello world",{age: 18, name: "Bob", sex: "boy"},jetmine]
```

2. Object.assign

- 该方法可以把任意多个源对象的 **可枚举属性** 和 **Symbol** 属性(但不包括从原型对象上继承来的属性以及自身的 **不可枚举** 属性)拷贝给目标对象，然后将目标对象返回，此方法属于浅拷贝，拷贝的是 `对象的属性的引用`，而不是对象自身

```js
const obj = { name: 'bob', age: 20, address: { country: 'China', city: 'SZ' } };

/** 将 address 属性设置为不可枚举 */
Object.defineProperty(obj,'address',{enumerable:false})

/** 添加一个 symbol 属性 */
obj[Symbol('id')] = '1001';

const obj1 = Object.assign({}, obj);
/**
 * {name: 'bob', age: 20, Symbol(id): '1001'}
 */


const arr = [1, 'hello world', { age: 18, name: 'Bob' }];
const arr1 = Object.assign([], arr);
```

3. [].prototype.concat

- 该方法是 `Array` 原型上的方法，用于将 `多个元素/数组进行合并`，会返回一个新的数组，不会改变原数组

```js
const arr = [1, 'hello world', { age: 18, name: 'Bob' }];
const arr1 = arr.concat();
arr1[0] = 1024;
arr1.push('jetmine');
arr.push({ blogWriter: 'jetmine' });
arr1[2].sex = 'boy';
console.log(arr);
// // [1,"hello world",{age: 18, name: "Bob", sex: "boy"},{blogWriter:'jetmine'}]
console.log(arr1);
// [1024,"hello world",{age: 18, name: "Bob", sex: "boy"},jetmine]
```

4. [].prototype.slice

- 该方法是 `Array` 原型上的方法，用于 `截取数组指定索引区间的元素`，返回一个新数组，不会改变原数组

```js
const arr = [1, 'hello world', { age: 18, name: 'Bob' }];
const arr1 = arr.slice();
arr1[0] = 1024;
arr1.push('jetmine');
arr.push({ blogWriter: 'jetmine' });
arr1[2].sex = 'boy';
console.log(arr);
// // [1,"hello world",{age: 18, name: "Bob", sex: "boy"},{blogWriter:'jetmine'}]
console.log(arr1);
// [1024,"hello world",{age: 18, name: "Bob", sex: "boy"},jetmine]
```

5. 使用展开运算符

- 该方法是 `ES6` 的新特性，可以用于操作数组、普通对象

```js
const obj = { name: 'bob', age: 20, address: { country: 'China', city: 'SZ' } };
const obj1 = { ...obj };
obj1.name = 'Bill';
obj1.address.city = 'CS';
obj1.family = { father: 'james', mother: 'mary' };
console.log(obj);
// {age: 20,name: "bob",address:{country: "China", city: "CS"}}
console.log(obj1);
// {age: 20,name: "Bill",address:{country: "China", city: "CS"},family:{father:'james',mother:'mary'}}

const arr = [1, 'hello world', { age: 18, name: 'Bob' }];
const arr1 = [...arr];
arr1[0] = 1024;
arr1.push('jetmine');
arr.push({ blogWriter: 'jetmine' });
arr1[2].sex = 'boy';
console.log(arr);
// // [1,"hello world",{age: 18, name: "Bob", sex: "boy"},{blogWriter:'jetmine'}]
console.log(arr1);
// [1024,"hello world",{age: 18, name: "Bob", sex: "boy"},jetmine]
```

---

## 深拷贝

---

1. 初探深拷贝

- 深拷贝会另外创造一个一模一样的对象，新对象与源对象不共享内存。我们只需要对前面的浅拷贝代码进行修改，即可实现一个简单的深拷贝

| 原始方法       | 限制                                                                         |
| -------------- | ---------------------------------------------------------------------------- |
| JSON.stringify | 对象中的函数、symbol、undefined 的键值对会被忽略，并且 **无法拷贝不可枚举** 的属性 |

```js
function isObject(target) {
  return typeof target === 'object' && target !== null;
}

function deepClone(obj) {
  if (isObject(obj)) {
    const res = Array.isArray(obj) ? [] : {};
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        res[key] = isObject(obj[key]) ? deepClone(obj[key]) : obj[key];
      }
    }
    return res;
  } else {
    return obj;
  }
}
```

- 测试以后，发现结果符合预期

```js
const obj = { name: 'bob', age: 20, address: { country: 'China', city: 'SZ' } };
const obj1 = deepClone(obj);
obj1.name = 'Bill';
obj1.address.city = 'CS';
obj1.family = { father: 'james', mother: 'mary' };
console.log(obj);
// {age: 20,name: "bob",address:{country: "China", city: "SZ"}}
console.log(obj1);
// {age: 20,name: "Bill",address:{country: "China", city: "CS"},family:{father:'james',mother:'mary'}}

const arr = [1, 'hello world', { age: 18, name: 'Bob' }];
const arr1 = deepClone(arr);
arr1[0] = 1024;
arr1.push('jetmine');
arr.push({ blogWriter: 'jetmine' });
arr1[2].sex = 'boy';
console.log(arr);
// // [1,"hello world",{age: 18, name: "Bob"},{blogWriter:'jetmine'}]
console.log(arr1);
// [1024,"hello world",{age: 18, name: "Bob", sex: "boy"},jetmine]
```

- 注意：使用 `typeof` 来判断变量的数据类型时需要注意判断 _null_ 的存在。因为使用 `typeof` 实际上会出现一些问题，比如 `typeof null === object` 或者使用 `new String()` 方式创建的字符串等，因此，建议使用更加完美的 `Object.prototype.toString` 来判断数据类型

2. 环(循环引用)的问题

- 环是什么？来一个简单的例子就知道了

```js
const obj={
	field1:1,
	field2:undefined,
	field3:{
		child:'child'
	},
	field4:[2,4,8]
}
obj.obj=obj
console.log(deepClone(obj))；
// Uncaught RangeError: Maximum call stack size exceeded
```

- 可以发现，因为 `环的关系` (对象的属性间或直接的引用了自身的情况) 导致死递归，然后堆栈溢出了
- 解决思路：额外开辟一个存储空间，来存储当前对象和拷贝对象之间的对应关系。在要拷贝当前对象之前，先去之前的存储空间寻找，如果存在的话，说明已经被拷贝过了，我们直接将这个对象返回即可；如果没有的话继续拷贝

```js
function isObject(target) {
  return typeof target === 'object' && target !== null;
}

function deepClone(obj, map = new Map()) {
  if (map.has(obj)) {
    return map.get(obj);
    // 检查map中有无克隆过的对象，有，直接返回该对象
  }
  if (isObject(obj)) {
    // 没有，将当前对象作为key，克隆对象作为value进行存储
    let res = Array.isArray(obj) ? [] : {};
    map.set(obj, res);
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        res[key] = deepClone(obj[key], map);
      }
    }
    return res;
  } else {
    return obj;
  }
}
```

```js
const obj={
	field1:1,
	field2:undefined,
	field3:{
		child:'child'
	},
	field4:[2,4,8]
}
obj.obj=obj
console.log(deepClone(obj))；
// 正常输出我们拷贝过的对象
```

3. 使用 WeakMap 代替 Map

- WeakMap：该对象是一组键值对的集合，其中的键是弱引用的且必须是一个对象，值可以为任意值
- 弱引用：相对于强引用来说，弱引用是指不能确保其引用的对象不会被垃圾回收器回收。一个对象若只被弱引用所引用，则被认为是不可访问或弱可访问的，并因此可能在任何时刻被回收
- 在全局环境下使用 `const ojb={}` 就默认创建了一个强引用的对象，只有手动将 `obj=null`，他才会被垃圾回收机制回收

```js
let obj5 = { name: 'bob' };
const target1 = new Map();
target1.set(obj5, 'jim');
obj5 = null;
```

- 使用 `Map` 的情况下，对象间是存在强引用关系的，即使手动将 obj 进行释放，然而 target1 依然对 obj 存在强引用关系，所以这部分内存可能依然得不到释放

```js
let obj5 = { name: 'bob' };
const target1 = new WeakMap();
target1.set(obj5, 'jim');
obj5 = null;
```

- 如果是 WeakMap 的话，它的键与值之间对应的关系是弱引用，因此，下一次垃圾回收机制执行时，这块内存就会被回收。使用 _WeakMap_ 可以有效防止内存泄漏

```js
function isObject(target) {
  return typeof target === 'object' && target !== null;
}
function deepClone(obj, map = new WeakMap()) {
  if (map.has(obj)) {
    return map.get(obj);
    // 检查weakmap中有无克隆过的对象，有，直接返回该对象
  }
  if (isObject(obj)) {
    // 没有，将当前对象作为key，克隆对象作为value进行存储
    let res = Array.isArray(obj) ? [] : {};
    map.set(obj, res);
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        res[key] = deepClone(obj[key], map);
      }
    }
    return res;
  } else {
    return obj;
  }
}
```

4. 对象的不可枚举属性与 symbol 类型

- 目前的方法尚不能够拷贝对象的不可枚举属性以及 `Symbol` 类型的属性，但我们可以利用 _Reflect.ownKeys_ 来获取对象自身的可枚举属性及不可枚举属性、`Symbol` 类型的属性

```js
let obj = {
  name: 'Mary',
  [Symbol('id')]: 123456,
  [Symbol('alias')]: 'xiaohong',
};

Object.defineProperties(obj, {
  address: {
    enumerable: false,
    value: '不可枚举',
  },
  weight: {
    enumerable: true,
    value: '可枚举',
  },
});

let cloneObj = deepClone(obj);
// {name: "Mary", weight: "可枚举"}
```

```js
function isObject(target) {
  return typeof target === 'object' && target !== null;
}
function deepClone(obj, map = new WeakMap()) {
  if (map.has(obj)) {
    return map.get(obj);
    // 检查weakmap中有无克隆过的对象，有，直接返回该对象
  }
  if (isObject(obj)) {
    // 没有，将当前对象作为key，克隆对象作为value进行存储
    let res = Array.isArray(obj) ? [] : {};
    map.set(obj, res);
    for (let key of Reflect.ownKeys(obj)) {
      if (isObject(obj[key])) {
        res[key] = deepClone(obj[key], map);
      }
    }
    return res;
  } else {
    return obj;
  }
}
```

- 目前我们使用 _Reflect.ownKeys_ 获取了对象上的不可枚举的属性以及 _Symbol_ 类型的属性，并将它拷贝到了新对象中，现在我们来测试一下

```js
let obj = {
  name: 'Mary',
  [Symbol('id')]: 123456,
  [Symbol('alias')]: 'xiaohong',
};

Object.defineProperties(obj, {
  address: {
    enumerable: false,
    value: '不可枚举',
  },
  weight: {
    enumerable: true,
    value: '可枚举',
  },
});

let cloneObj = deepClone(obj);
// {name: "Mary", address: "不可枚举", weight: "可枚举", Symbol(id): 123456, Symbol(alias): "xiaohong"}
// 拷贝成功
```

5. 其他内置对象

- 如果我们要拷贝一个内置对象类型，如 _Date_、_RegExp_ 等类型时，此时应该使用该对象的构造函数方法，重新生成一份新的实例对象，完成深拷贝

```js
function isObject(target) {
  return (typeof target === 'object' || typeof target === 'function') && target !== null;
}
function deepClone(target, map = new WeakMap()) {
  if (map.has(target)) {
    return map.get(target);
  }
  if (isObject(target)) {
    let constructor = target.constructor;
    // 检测当前对象target是否与正则、日期格式对象匹配
    if (/^(RegExp|Date)$/i.test(constructor.name)) {
      // 创建一个新的特殊对象(正则类/日期类)的实例
      return new constructor(target);
    }
    let cloneTarget = Array.isArray(target) ? [] : {};
    map.set(target, cloneTarget);
    for (let key of Reflect.ownKeys(target)) {
      cloneTarget[key] = deepClone(target[key], map);
    }
    return cloneTarget;
  } else {
    return target;
  }
}
```

```js
let obj = {
  name: 'Mary',
  [Symbol('id')]: 123456,
  [Symbol('alias')]: 'xiaohong',
  reg: /\d/g,
};

Object.defineProperties(obj, {
  address: {
    enumerable: false,
    value: '不可枚举',
  },
  weight: {
    enumerable: true,
    value: '可枚举',
  },
  time: {
    value: new Date(),
  },
});
let cloneObj = deepClone(obj);
// {name: "Mary", weight: "可枚举", address: "不可枚举", time: Mon Apr 26 2021 03:36:34 GMT+0800 (中国标准时间), Symbol(id): 123456, …}
```

6. 继承属性的问题

- 目前拷贝下来的对象，它是无法拷贝原始对象的继承关系的。因此，我们可以将拷贝下来的对象设置它的 `[[Prototype]]` 属性指向原始对象的原型

```js
function isFunction(target) {
  typeof target === 'function';
}
function isObject(target) {
  return (typeof target === 'object' || typeof target === 'function') && target !== null;
}
function deepClone(target, map = new WeakMap()) {
  if (map.has(target)) {
    return map.get(target);
  }
  if (isObject(target)) {
    let constructor = target.constructor;
    // 检测当前对象target是否与正则、日期格式对象匹配
    if (/^(RegExp|Date)$/i.test(constructor.name)) {
      // 创建一个新的特殊对象(正则类/日期类)的实例
      return new constructor(target);
    }
    let cloneTarget = Object.create(Object.getPrototypeOf(target));
    // 设置原型链并返回一个object
    map.set(target, cloneTarget);
    for (let key of Reflect.ownKeys(target)) {
      if (isFunction(target[key])) {
        cloneTarget[key] = Object.assign(target[key]);
      } else {
        cloneTarget[key] = deepClone(target[key], map);
      }
    }
    return cloneTarget;
  } else {
    return target;
  }
}
```

```js
let map = new Map().set({ name: 'map1' }, [1, 2, 3]);
let set = new Set().add({ name: 'set1' });
let obj = {
  name: 'Mary',
  [Symbol('id')]: 123456,
  [Symbol('alias')]: 'xiaohong',
  test: function () {
    console.log(1);
  },
  test1: () => {
    console.log(2);
  },
};

Object.defineProperties(obj, {
  address: {
    enumerable: false,
    value: '不可枚举',
  },
  weight: {
    enumerable: true,
    value: '可枚举',
  },
  time: {
    value: new Date(),
  },
});

Object.setPrototypeOf(obj, {
  getName: function () {
    return this.name;
  },
});

let cloneObj = deepClone(obj);
cloneObj.getName(); // "Mary"
obj.getName(); // "Mary"
```

7. 拷贝 Map、Set 结构

```js
function isFunction(target) {
  return typeof target === 'function';
}
function isObject(target) {
  return (typeof target === 'object' || typeof target === 'function') && target !== null;
}
function deepClone(target, map = new WeakMap()) {
  if (map.has(target)) {
    return map.get(target);
  }
  if (isObject(target)) {
    let cloneTarget;
    let constructor = target.constructor;
    // 检测当前对象target是否与正则、日期格式对象匹配
    if (/^(RegExp|Date)$/i.test(constructor.name)) {
      // 创建一个新的特殊对象(正则类/日期类)的实例
      return new constructor(target);
    }
    if (isFunction(target)) {
      return Object.assign(target);
    }
    if (constructor.name === 'Map') {
      cloneTarget = new Map();
      target.forEach((val, key) => {
        cloneTarget.set(key, val);
      });
      return cloneTarget;
    }
    if (constructor.name === 'Set') {
      cloneTarget = new Set();
      target.forEach((val) => {
        cloneTarget.add(val);
      });
      return cloneTarget;
    }
    // 设置原型链并返回一个object
    cloneTarget = Object.create(Object.getPrototypeOf(target));
    map.set(target, cloneTarget);
    for (let key of Reflect.ownKeys(target)) {
      if (isFunction(target[key])) {
        cloneTarget[key] = Object.assign(target[key]);
      } else {
        cloneTarget[key] = deepClone(target[key], map);
      }
    }
    return cloneTarget;
  } else {
    return target;
  }
}
```

8. 深拷贝函数

- 函数分为 `普通函数` 与 `箭头函数`。而箭头函数是不具有 `prototype` 的，因此，可以利用这个进行区分
- 下面的克隆函数的方法引自 [conardli](http://www.conardli.top/blog/article/JS%E8%BF%9B%E9%98%B6/%E5%A6%82%E4%BD%95%E5%86%99%E5%87%BA%E4%B8%80%E4%B8%AA%E6%83%8A%E8%89%B3%E9%9D%A2%E8%AF%95%E5%AE%98%E7%9A%84%E6%B7%B1%E6%8B%B7%E8%B4%9D.html#%E5%85%8B%E9%9A%86%E5%87%BD%E6%95%B0) 的博客，但是其中的 `new Function` 的 `词法环境` 指向会有问题，使用 _new Function_ 创建的函数，它的 _outer_ 指向会指向全局词法环境，而不是嵌套的函数词法环境

```js
// 正常嵌套函数词法环境
let [arg1, arg2] = ['hello', 'world'];
let fn = function (arg1, arg2) {
  function fn1() {
    return arg1 + arg2;
  }
  console.log(fn1());
};
fn(1, 'jet'); // 1jet
```

```js
// new Function 嵌套函数词法环境
let [arg1, arg2] = ['hello', 'world'];
let fn = function (arg1, arg2) {
  let fn1 = new Function('return arg1+arg2');
  console.log(fn1());
};
fn(1, 'jet'); // helloworld
```

```js
function cloneFunction(fun) {
  const bodyReg = /(?<={)(.|\n)+(?=})/m;
  const paramReg = /(?<=\().+(?=\)\s+{)/;
  const funcString = fun.toString();
  if (fun.prototype) {
    console.log('普通函数');
    const param = paramReg.exec(funcString);
    const body = bodyReg.exec(funcString);
    if (body) {
      console.log('匹配到函数体：', body[0]);
      if (param) {
        const paramArr = param[0].split(',');
        console.log('匹配到参数：', paramArr);
        return new Function(...paramArr, body[0]);
      } else {
        return new Function(body[0]);
      }
    } else {
      return null;
    }
  } else {
    return eval(funcString);
  }
}
```

- 我们直接使用 `eval` 创建一个函数即可

```js
function cloneFunction(target) {
  return eval('(' + target.toString() + ')');
}
```

```js
function cloneFunction(target) {
  let cloneTarget = eval('(' + target.toString() + ')');
  return cloneTarget;
}
function isFunction(target) {
  return typeof target === 'function';
}
function isObject(target) {
  return (typeof target === 'object' || typeof target === 'function') && target !== null;
}
function deepClone(target, map = new WeakMap()) {
  if (map.has(target)) {
    return map.get(target);
  }
  if (isObject(target)) {
    let cloneTarget;
    let constructor = target.constructor;
    // 检测当前对象target是否与正则、日期格式对象匹配
    if (/^(RegExp|Date)$/i.test(constructor.name)) {
      // 创建一个新的特殊对象(正则类/日期类)的实例
      return new constructor(target);
    }
    if (isFunction(target)) {
      cloneTarget = cloneFunction(target);
      if (target.prototype) {
        cloneTarget.prototype = target.prototype;
      }
      return cloneTarget;
    }
    if (constructor.name === 'Map') {
      cloneTarget = new Map();
      target.forEach((val, key) => {
        cloneTarget.set(key, val);
      });
      return cloneTarget;
    }
    if (constructor.name === 'Set') {
      cloneTarget = new Set();
      target.forEach((val) => {
        cloneTarget.add(val);
      });
      return cloneTarget;
    }
    // 设置原型链并返回一个object
    cloneTarget = Object.create(Object.getPrototypeOf(target));
    map.set(target, cloneTarget);
    for (let key of Reflect.ownKeys(target)) {
      if (isFunction(target[key])) {
        cloneTarget[key] = cloneFunction(target[key]);
        if (target[key].prototype) {
          cloneTarget[key].prototype = target[key].prototype;
        }
      } else {
        cloneTarget[key] = deepClone(target[key], map);
      }
    }
    return cloneTarget;
  } else {
    return target;
  }
}
```

- 目前的版本下，我们可以拷贝函数并且成功设置了它的原型对象。但还存在一个问题，函数的静态属性我们尚未拷贝过来

```js
// 除了自定义属性以外，函数原有的属性均是不可遍历的
function test() {}

test.class = 'test';
Object.getOwnPropertyDescriptors(test);

// arguments: {value: null, writable: false, enumerable: false, configurable: false}
// caller: {value: null, writable: false, enumerable: false, configurable: false}
// class: {value: "test", writable: true, enumerable: true, configurable: true}
// length: {value: 0, writable: false, enumerable: false, configurable: true}
// name: {value: "test", writable: false, enumerable: false, configurable: true}
// prototype: {value: {…}, writable: true, enumerable: false, configurable: false}
```

- 我们将部分代码抽离出来，同时简化我们的深拷贝

```js
function isFunction(target) {
  return typeof target === 'function';
}
function isObject(target) {
  return (typeof target === 'object' || typeof target === 'function') && target !== null;
}

function cloneFunction(target) {
  let cloneTarget = eval('(' + target.toString() + ')');
  if (target.prototype) {
    cloneTarget.prototype = target.prototype;
  }
  for (let key in target) {
    cloneTarget[key] = target[key];
  }
  return cloneTarget;
}

function cloneMap(target) {
  let map = new Map();
  target.forEach((val,key) => {
    map.set(key,val)
  })
  return map
}

function cloneSet(target) {
  let set = new Set();
  target.forEach(val => {
    set.add(val)
  })
  return set
}

function deepClone(target,map = new WeakMap()) {
  if(map.has(target)) return map.get(target)

  if(isObject(target)) {
    let cloneTarget;
    let constructor = target.constructor;
    
    if(target instanceof Date || /^(RegExp)$/i.test(constructor.name)){
      return new constructor(target)
    }

    if(isFunction(target)) {
      return cloneFunction(target)
    }

    if(constructor.name === 'map') {
      return cloneMap(target)
    }

    if(constructor.name === 'set') {
      return cloneSet(target)
    }

    cloneTarget = Object.create(Object.getPrototypeOf(target));
    map.set(target, cloneTarget);

    for (let key of Reflect.ownKeys(target)) {
      cloneTarget[key] = deepClone(target[key], map);
    }
    return cloneTarget

  } else {
    return target
  }
}
```

9. 破解递归爆栈

- 一般来说，破解递归爆栈有两种方法：一是消除尾递归；二是使用循环的方式，维护一个栈，存储下一个要拷贝的节点，遍历当前子节点，当子元素是对象时就放到栈中，否则直接拷贝

```js
function isType(data) {
  if (/^(RegExp|Map|Set)$/i.test(data.constructor.name) || target instanceof Date || typeof data === 'function') {
    return true;
  }
  return false;
}

function isObject(data) {
  return typeof data === 'object' && typeof data !== null;
}

function cloneDate(data, res, key) {
  // 拷贝正则、函数、时间以及Map和Set对象
  let name;
  let cloneTarget;
  name = data.constructor.name;
  if(target instanceof Date || /^(RegExp)$/i.test(constructor.name)){
    res[key] =  new data.constructor(target)
  } else if (typeof data === 'function') {
    cloneTarget = eval('(' + data.toString() + ')');
    if (data.prototype) {
      cloneTarget.prototype = data.prototype;
    }
    for (let item in data) {
      cloneTarget[item] = data[item];
    }
    res[key] = cloneTarget;
  } else if (name === 'Map') {
    cloneTarget = new Map();
    data.forEach((val, key) => {
      cloneTarget.set(key, val);
    });
    res[key] = cloneTarget;
  } else if (name === 'Set') {
    cloneTarget = new Set();
    data.forEach((val) => {
      cloneTarget.add(val);
    });
    res[key] = cloneTarget;
  }
}


function cloneLopp(target) {
  if (!(target instanceof Object)) {
    return target;
  }

  const map = new WeakMap();
  const stack = [
    {
      parent: new target.constructor(),
      key: undefined,
      data: target,
    },
  ];

  while (stack.length) {
    const node = stack.pop();

    const parent = node.parent;
    const key = node.key;
    const data = node.data;

    let res = parent;

    if (typeof key !== undefined) {
      if (isType(data)) {
        // 拷贝其他对象
        cloneDate(data, res, key);
      } else if (isObject(data)) {
        // 拷贝普通对象或者数组

        Object.setPrototypeOf(res, Object.getPrototypeOf(data));
        // 设置对象的原型指向

        for (let ownkey of Reflect.ownKeys(data)) {
          // 获取被拷贝对象的所有键，包括不可枚举的、symbol类型的

          if (isType(data[ownkey])) {
            // 拷贝键值表示的其他对象
            cloneDate(data[ownkey], res, ownkey);
          } else if (isObject(data[ownkey])) {
            if (map.has(data[ownkey])) {
              // 当缓存中存在该对象时，返回被拷贝过的对象
              res[ownkey] = map.get(data[ownkey]);
              continue;
            }
            
            res[ownkey] = Object.create(Object.getPrototypeOf(data[ownkey]));
            // 根据被拷贝对象的结构创建一个新的结果，并设置原型指向
            map.set(data[ownkey], res[ownkey]);
            // 当缓存中不存在该对象时，缓存该对象

            stack.push({
              parent: res[ownkey],
              key: ownkey,
              data: data[ownkey],
            });
            // 往栈中添加下一个子元素对象节点
          } else {
            // 非对象情况，直接复制
            res[ownkey] = data[ownkey];
          }
        }
      } else {
        // 其余不支持的情况抛出错误
        throw new Error('Object type not supported');
      }
    }
  }
  return root;
}
```

- 以下测试案例全部通过

```js
let map = new Map().set({ name: 'map1' }, [1, 2, 3]);
let set = new Set().add({ name: 'set1' });
let obj = {
  name: 'Mary',
  [Symbol('id')]: 123456,
  [Symbol('alias')]: 'xiaohong',
  test: function () {
    console.log(1);
  },
  test1: () => {
    console.log(2);
  },
  map,
  set,
  item: {
    name: 1,
    add: {
      hj: 2,
    },
  },
};
obj.item.add.__proto__ = {
  test: '测试',
};
obj.obj = obj;
Object.defineProperties(obj, {
  address: {
    enumerable: false,
    value: '不可枚举',
  },
  weight: {
    enumerable: true,
    value: '可枚举',
  },
  time: {
    value: new Date(),
  },
});

Object.setPrototypeOf(obj, {
  getName: function () {
    return this.name;
  },
});

let cloneObj = cloneLopp(obj);
```
