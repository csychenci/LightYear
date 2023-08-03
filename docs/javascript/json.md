---
title: JSON
date: 2020-05-05 09:25:48
categories: JavaScript
sidemenu: true
toc: 'content'
order: 18
author: chencicsy
tags:
  - JSON
  - JavaScript
description:
---
## JSON

---

1. 什么是 JSON
- json 是表示值和对象的通用格式。最初是为 js 创建的，但是目前很多编程语言也有了处理它的库，可以很方便的进行数据交换

2. JSON.stringify
- 将传入的参数转化为一个 json 格式的字符串或序列化成 json 格式。可接收第二个参数(可以是函数、数组)，用于控制如何筛选对象的键值，可以选择自己指定的属性

```js
let obj = { name: 'Bob', age: 18, sex: '男' };
JSON.stringify(obj); // "{"name":"Bob","age":18,"sex":"男"}"
```

- 该方法得到的 json 字符串是一个被称为 json 编码（JSON-encoded） 或序列化或字符串化或编组化的对象。它与普通对象的区别有：一、字符串使用双引号，不能是单引号或反引号；二、对象属性名需要为双引号

| 数据类型 | 支持序列化 | 示例 | 序列化结果 | 是否忽略 |
| --- | --- | --- | --- | --- |
| Object | √ | {name:'Jim',age:'18'} | "{"name":"Jim","age":"18"}" | × |
| Array | √ | [1,2,"arr"] | "[1,2,"arr"]" | × |
| String | √ | 'hello world' | '"hello world"' | × |
| Number | √ | 999、NaN、Infinity | "999"、"null"、"null" | × |
| Boolean | √ | true、false | "true"、"false" | × |
| null | √ | null | "null" | × |
| Function | × | {test:function(){return "Function"}} | "{}" | √ |
| undefined | × | {name:undefined} | "{}" | √ |
| Symbol | × | {[Symbol("name")]:"Bob",id:Symbol(123456)} | "{}" | √ |

- 该方法支持对复杂的结构嵌套转换。但不允许存在循环引用的情况，此种情况将会报错

```js
let obj = {
  name: 'home',
  dog: ['dog1', 'dog2', { child: 'dog3' }],
  cat: {
    name: 'Bob',
    age: 2,
    test: function () {
      return '喵喵喵';
    },
  },
  [Symbol('id')]: 541367,
};
JSON.stringify(obj);
// "{"name":"home","dog":["dog1","dog2",{"child":"dog3"}],"cat":{"name":"Bob","age":2}}"
// symbol与function被忽略
```

```js
let obj1 = { id: 'obj1' };
let obj2 = { id: 'obj2' };
obj1.obj = obj2;
obj2.obj = obj1;
JSON.stringify(obj1);
// ncaught TypeError: Converting circular structure to JSON
//     --> starting at object with constructor 'Object'
//     |     property 'obj' -> object with constructor 'Object'
//     --- property 'obj' closes the circle
//     at JSON.stringify (<anonymous>)
//     at <anonymous>:5:6
```

- 该方法还可以接受第二个参数。第二个参数可以是一个数组或方法，可以对每一个键值对进行替换并返回已替换的值，如果值被忽略则为 undefined

```js
let obj = {
  name: 'home',
  dog: ['dog1', 'dog2', { child: 'dog3' }],
  cat: {
    name: 'Bob',
    age: 2,
    test: function () {
      return '喵喵喵';
    },
  },
  [Symbol('id')]: 541367,
};

obj1 = {
  system: 'windows',
};

obj.obj1 = obj1;
obj1.obj = obj;

JSON.stringify(obj, ['name', 'dog', 'cat']);
// "{"name":"home","dog":["dog1","dog2",{}],"cat":{"name":"Bob"}}"  用于指定需要的属性
JSON.stringify(obj, ['name', 'dog']);
// "{"name":"home","dog":["dog1","dog2",{}]}"  用于指定需要的属性
```

```js
let obj = {
  name: 'home',
  dog: ['dog1', 'dog2', { child: 'dog3' }],
  cat: {
    name: 'Bob',
    age: 2,
    test: function () {
      return '喵喵喵';
    },
  },
  [Symbol('id')]: 541367,
};
obj1 = {
  system: 'windows',
};
obj.obj1 = obj1;
obj1.obj = obj;
JSON.stringify(obj, function (key, value) {
  console.log(`${key}+${value}`);
  return key == 'obj' ? undefined : value;
  // 破除循环引用
});

// +[object Object]
// name+home
// dog+dog1,dog2,[object Object]
// 0+dog1
// 1+dog2
// 2+[object Object]
// child+dog3
// cat+[object Object]
// name+Bob
// age+2
// test+function () {
//     return "喵喵喵"
// }
// obj1+[object Object]
// system+windows

// "{"name":"home","dog":["dog1","dog2",{"child":"dog3"}],"cat":{"name":"Bob","age":2},"obj1":{"system":"windows"}}"
// symbol键被忽略，方法被忽略
```

- 使用函数的情况下，每个嵌套对象和数组项的键值对都会被获取到，并且其中的嵌套结构会被递归调用，第一次被调用的对象是整个需要序列化的对象 `{"":obj}`，它的键是空的，该值是整个目标对象，其中函数的 this 是包含当前属性的对象
- 第三个参数用于格式化输出的 json 格式字符串，常用于日志记录和美化输出

```js
let obj = {
  name: 'Mary',
  age: '11',
};
JSON.stringify(obj, null, 2);
// 缩进两个空格
// "{
//   "name": "Mary",
//   "age": "11"
// }"
```

- 在使用 stringify 调用进行转换时，如果 toJSON 方法可用，stringify 会自动调用该方法

```js
let age = {
  num: 23,
  toJSON() {
    return this.num;
  },
};

let person = {
  name: 'Mary',
  age,
  born: new Date(),
};

JSON.stringify(person);
// "{"name":"Mary","age":23,"born":"2021-01-10T11:18:17.097Z"}"
// date对象中具有toJSON方法，因此自动被调用，而 age 对象自定义的toJSON方法也会被调用

JSON.stringify(age); // 23
```

3. JSON.parse
- 该方法用于解码 json 字符串，称之为反序列化。可接收两个参数，第一个为要解码的 json 字符串，第二个参数为需要对解码后的字符串进行处理的方法

```js
let person = {
  name: 'Mary',
  born: new Date(),
};

let person_json = JSON.stringify(person);

JSON.parse(person_json, function (key, value) {
  return key == 'born' ? new Date(value) : value;
});
// {name: "Mary", born: Sun Jan 10 2021 19:25:19 GMT+0800 (中国标准时间)}
// 转换过的date是一个Date对象
JSON.parse(person_json);
// {name: "Mary", born: "2021-01-10T11:25:37.655Z"}
// 未进行转换的date是一个字符串
```

4. 手写 stringify
- 边界处理。当数据类型为 _Symbol_、_function_、_undefined_ 时，该数据会被忽略，不会参与序列化的过程

```js
const myStringify = function (data) {
  let type = typeof data;

  // 非对象值情况
  if (type !== 'object') {
    let res = data;
    /** 1. 判断特殊数字情况，NaN、Infinity、-Infinity */
    if ([NaN,Infinity,-Infinity].includes(data)) {
      res = 'null';
    } else if (type === 'function' || type === 'undefined' || type === 'symbol') {
      /** 2. symbol、undefined、function 类型的值会被忽略 */
      return undefined;
    } else if (type === 'string') {
      /** 3. 字符串形式会被多包裹一层引号 */
      res = '"' + data + '"';
    }
    /** 4. 其他原始值(数字、布尔值)直接调用String转化 */
    return String(res);
  } else if (type === 'object') {
    // 对象的情况
    if (data === null) {
      /** 5. typeof null === object ，值为 null情况*/
      return 'null';
    } else if (data.toJSON && typeof data.toJSON === 'function') {
      /** 6. 判断对象是否携带 toJSON 方法，如果携带需要调用 toJSON 方法 */
      return myStringify(data.toJSON());
    } else if (data instanceof Array) {
      /** 7. 判断是否是数组 */
      let res = [];
      data.forEach((item, idx) => {
        /** 数组的元素为 undefined、symbol、function 的情况下，这些元素会被转化为 "null" */
        if (['function','undefined','symbol','null'].includes(typeof item)) {
          res[index] = 'null';
        } else {
          res[index] = myStringify(item);
        }
      });
      /** 将可能进入递归序列化的元素上添加的多余引号去掉 */
      return ('['+res.join(',')+']').replace(/'/g,'"')
    } else {
      /** 8. 判断是否是对象 */
      let res = [];
      Object.keys(data).forEach((item, idx) => {
        /** 无论是 key 的类型是 symbol，还是value的类型是 symbol，序列化时都会被忽略 */
        if (typeof item !== 'symbol') {
          if (!['function','symbol','undefined'].includes(typeof data[item])) {
            res.push('"' + item + '"' + ':' + myStringify(data[item]));
          }
        }
      });
      return ('{' + res + '}').replace(/'/g, '"');
    }
  }
};
```
