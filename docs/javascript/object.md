---
title: 对象
date: 2020-04-20 12:58:45
categories: JavaScript
sidemenu: true
toc: 'content'
order: 16
author: chencicsy
tags:
  - 对象
  - JavaScript
  - 引用数据类型
description:
---


## 对象

---
1. 对象的定义
- 一组无序属性的集合，其属性值可以包含基本值，对象或者函数，由若干键值对组成
- 对象是类的实例，一个类定义了对象的特征。用于描述现实世界中的某个对象，如某一个人是一个对象，他具有姓名、年龄、身高、性别等，每一个人的这些属性都各自不同
- 是一对键值对（key-value）的组合，其中 key 是一个字符串或者 symbol 类型，value 可以为任意值

2. 创建方式
- 字面量方式

```js
// 创建一个空对象
var obj = {};

// 创建一个名为xiaoming的对象
var xiaoming = {
  name: '小明',
  birth: 1990,
  school: 'No.1 Middle School',
  height: 1.7,
  weight: 65,
  score: 99,
};
```

- 构造函数方式

```js
// 创建一个空对象
var obj = new Object();

var obj2 = new Object({
  name: 'jetmine',
  age: 18,
});
```

3. 操作对象的成员/属性
- 添加成员/属性

```js
var obj = {
  name: 'Wu',
  age: 18,
};
obj.height = 1.71;
obj['weight'] = 67;
obj.friends = {
  friend1: 'Jack',
  friend2: 'Bill',
  friend3: {
    name: 'Bob',
    age: '18',
  },
};
```

- 删除成员/属性

```js
var obj = {
  name: 'Wu',
  age: 18,
  university: '北方民族大学',
};
obj.height = 1.71;
obj['weight'] = 67;
obj.friends = {
  friend1: 'Jack',
  friend2: 'Bill',
  friend3: {
    name: 'Bob',
    age: '18',
  },
};
delete obj.height;
console.log(obj.height); // undefined
delete obj.height; // 删除一个不存在的成员不会报错
```

4. 访问方式
- 通过 <u>对象名.属性名/键名</u> 或 <u>对象名[属性名/键名]</u> 来访问。此时如果属性名不是一个有效的变量名，需要用单引号或双引号包裹起来，如 <u>对象名['属性名/键名']</u>
- 访问一个不存在的键，不会报错，会返回一个 undefined

5. 属性简写
- 简写的对象方法不能用作构造函数，会报错，因此其也不存在 prototype

```js
var obj = {
  fn() {
    return 'hello';
  },
};
new obj.fn(); // TypeError: obj.fn is not a constructor

obj.fn.prototype; // undefined
```

- es6 支持将同名的变量和对象的属性名进行简写操作

```js
let name = 'James';
let sex = 'Boy';
let obj = {
  name,
  sex,
};
// {name: "James",sex: "Boy"}

/** 
 * 与 key-value 的方式也可以混用
*/
let obj1 = {
  name,
  sex: sex,
};
```

6. name 属性
- 函数的 name 属性，用于返回函数名，对象的方法也是函数，也具有 name 属性

```js
const fn = function () {
  console.log(1);
};
fn.name; // fn
var obj = {
  fn() {
    return 'hello';
  },
};
obj.fn.name; // fn
```

7. super
- 该方法等同于 Object.getPrototypeOf(obj).property，表示获取自身构造函数的原型对象上的属性
- 用 super 表示原型对象，只能用于对象的方法之中

```js
// 错误写法
const obj1 = {
  property: super.property,
};
const obj2 = {
  property: () => super.property,
};
const obj3 = {
  property: function () {
    return super.property;
  },
};
// 实际以上三种情况都是对property属性的赋值
```

```js
// 正确写法
const obj = {
  property() {
    return super.property;
  },
};
```

8. 可选链
- 可选链 ?. 可用于安全的访问嵌套对象属性，即使被访问的属性不存在，也不会出现错误。
- 短路效应：可选链前面的部分是 undefined/null 时，它会停止运算并返回该部分

```js
let obj = {};
obj?.name?.firstname;
obj?.['name']
// 当name属性存在时，会接着进行访问；当name属性为null/undefined时，运算会停止
```

- 需要注意的是，可选链?. **前面的变量必须已声明**。也就是说，仅适用于已声明的变量。它可以是被声明，也可以是一个函数参数。同时，可选链 可以安全的读取或删除，但 **不能用于写入操作**
- 可选链可用于调用一个可能不存在的函数，还可以与 delete 一起使用

```js
let obj = {
  name: 'Bob',
};
obj.getName?.();
delete obj?.getName;
// 当obj.getName存在时则删除它
```

9. 计算属性
- 在创建对象时，可以在对象字面量中使用方括号，即 **计算属性**

```js
let key = 'name';
let props = 'age';
let user = {
  [key]: 'Bob',
  [props]: '18',
};
// user:{name:"Bob",age:"18"}
```

- 计算属性还可以是表达式

```js
let key = 'name';
let user = {
  ['first' + key]: 'James',
};
user['first' + key]; // James
```
---
## 部分 API
---

1. Object.is
- 用于比较两个参数是否严格相等，与 `===` 的行为基本一致，他们不同之处只有下面两种情况

| 方式      | 表达式             | 结果  |
| --------- | ------------------ | ----- |
| Object.is | Object.is(NaN,NaN) | true  |
| ===       | NaN===NaN          | false |
| Object.is | Object.is(+0,-0)   | false |
| ===       | +0===-0            | true  |

```js
const is = (l, r) => {
  if (l === r) {
    return l !== 0 || r !== 0 || 1 / l === 1 / r;
  } else {
    return l !== l && r !== r;
  }
};
```

2. Object.assign
- 用于对象的合并，将源对象的所有 **可枚举属性**，复制到目标对象（浅拷贝）

```js
const obj = Object.assign({}, { name: 'bob', age: 18 });
const obj = Object.assign({ name: 'james', sex: 'boy' }, { name: 'bob', age: 18 });
```

- 可用于为对象添加属性或添加方法、合并对象

3. for...in
- 遍历对象自身的和继承的 **可枚举属性**，浏览器默认屏蔽了原型上的属性

```js
let obj = {
  name: 'Mary',
  age: 18,
  alias: 'xiaohong',
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

for (let key in obj) {
  console.log(key, obj[key]);
}

// name Mary
// age 18
// alias xiaohong
// weight 可枚举
```

- 但通过指定对象的原型对象的情况下，继承来的属性会被此方式遍历到

```js
let obj = {
  name: 'Mary',
  age: 18,
  alias: 'xiaohong',
};

let obj1 = {
  name: 'Bill',
  home: 'China',
};

obj.__proto__ = obj1;

for (let key in obj) {
  console.log(key, obj[key]);
}

// name Mary
// age 18
// lias xiaohong
// home China
```

4. Object.keys
- 返回一个数组，包含对象自身的所有 **可枚举属性**，不包含继承来的

```js
let obj = {
  name: 'Mary',
};

obj.__proto__.age = 18;

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

Object.keys(obj);
// ["name", "weight"]
```

5. Object.getOwnPropertyNames(obj)
- 返回一个数组，包含对象自身的所有属性(可枚举与不可枚举的，但不包括 symbol)的键名

```js
let obj = {
  name: 'Mary',
  [Symbol('id')]: 123456,
};

obj.__proto__.age = 18;

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

Object.getOwnPropertyNames(obj);
// ["name", "address", "weight"]
```

6. Object.getOwnPropertySymbols(obj)
- 返回一个数组，包含对象自身的所有 symbol 属性的键名

```js
let obj = {
  name: 'Mary',
  [Symbol('id')]: 123456,
  [Symbol('alias')]: 'xiaohong',
};

obj.__proto__.age = 18;

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

Object.getOwnPropertySymbols(obj);
// [Symbol(id), Symbol(alias)]
```

7. Reflect.ownkeys
- 返回一个数组，包含对象自身的所有键名，不论是否是 symbol 还是不可枚举

```js
let obj = {
  name: 'Mary',
  [Symbol('id')]: 123456,
  [Symbol('alias')]: 'xiaohong',
};

obj.__proto__.age = 18;

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

Reflect.ownKeys(obj);
// ["name", "address", "weight", Symbol(id), Symbol(alias)]
```
