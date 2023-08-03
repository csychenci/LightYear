---
title: 数字类型
sidemenu: true
toc: 'content'
order: 3
author: chencicsy
date: 2020-04-02 15:45:57
categories: JavaScript
tags:
  - 原始数据类型
  - JavaScript
  - 数字
---

## Number

---

1. 简要描述

- 在 `JavaScript` 中，数字不区分 `整数`和 `浮点数`，它们统一使用 `Number` 来表示。常规数字以 64 位的格式 `IEEE-754` 存储，也被称为 `双精度浮点数`，它的取值范围在 `-2^53 - 2^53` 之间
- 在 `Number` 表示的值中，有两个特殊的值。其中一个是 `NAN`，意为 `Not a Number`，表示无法计算结果。NaN 与所有值都不相等(正确比较需要用 Object.is，全等比较认为 NaN 与 NaN 是不相等的)

```js
NaN === NaN; // fasle
Object.is(NaN,NaN); // true
```

- 另一个是 `Infinity`，表示 `无限大`，当数值超过 `Number` 所能表示的最大值时，使用 `Infinity` 来表示；同理，`Number` 无法表示的最小值可以用 `-Infinity` 来表示

2. 进制表示形式

- 整数可以以十进制(10)、十六进制(16)、八进制(8) 以及二进制(2) 的方式来表示
- 使用 `0x/0X` 前缀表示一个十六进制数，可以包括数字(0-9)和字母(a-f/A-F)

```js
0xff; // 十进制 255
0xff; // 十进制 255
0x7f; // 十进制 127
```

- 使用 `0b/0b` 前缀来表示一个二进制数，只能包括数字(0 和 1)

```js
0b11111111; // 255
0b1110; // 14
```

- 使用 `0o` 前缀来表示一个八进制数，只能包括数字(0-7)

```js
0o337; // 255
0o555; // 365
```

3. 科学计数法

- `js` 也支持科学计数法，也就是 `e记法`

```js
1e-7 === 0.0000001; // true
1.72e5 === 172000; // true
```

---

## 有关 Number 的 API

---

1. Number(value)

- 如果参数 `value` 无法被转换为数字，则返回 `NaN`。构造器上下文中，会将转换成功的数字或 `NaN` 作为新创建对象的值

```js
let num = new Number(5);
// num
// {[[PrimitiveValue]]:5,[[Prototype]]: Number}

let num2 = new Number('55ff');
// {[[PrimitiveValue]]:NaN[[Prototype]]: Number}

typeof num1 === 'object'; // true
```

- 非构造器上下文中(不存在 new 操作符的情况)，`Number` 能被用来执行类型转换，将其他类型转换为数字或者 `NaN`

| 类型 | 转换结果 |
| --- | --- |
| 布尔值 | true 转换为 1,false 转换为 0 |
| 数字 | 返回该数字 |
| null | 0 |
| undefined | NaN |
| 字符串 | 空字符串转换为 0，数字或浮点数格式转换为数字，其他格式返回 NaN |
| Symbol | 抛出错误 |
| 对象 | 部署 _[Symbol.toPrimitive]_ 方法则调用此方法，否则如果对象的 _valueOf_ 方法的结果是原始值，则返回这个原始值；如果对象的 _toString_ 方法返回原始值，则返回这个值；否则返回一个错误。同时，这个原始值经过 _Number_ 的再次转换后返回的值才是转换的结果 |

```js
// 1. 转换常规数字
Number(0.0254); // 0.0254

// 2. 转换e计法
Number(5e-3); // 0.005

// 3. 转换特殊符号字符
Number(-5.55); // -5.55
Number('-5.55'); // -5.55
Number(''); // 0
Number('  '); // 0
Number('55fa'); // NaN

// 4. 转换布尔值/null/undefined/Infinity
Number(false); // 0
Number(true); // 1
Number(null); // 0
Number(undefined); // NaN
Number(-Infinity); // -Infinity

// 5. 转换任意除Symbol以外的对象或函数
Number(Object); // NaN
Number(function () {}); // NaN
Number(Symbol(5)); // Error报错
Number(new Date()); // 1644414968425

// 6. 转换进制数成十进制数，只有携带进制标识的字符能被转换
Number('0b1111'); // 15
Number('11111'); // 11111
Number(0xff); // 255
Number(0o55); // 45
Number('FF'); // NaN

/** 
 * 存在 valueOf、Symbol.toPrimitive、toString 方法的对象
*/
let obj = {
  value: 'obj',
  valueOf() {
    return this.value;
  },
};

let obj1 = {
  value: 2,
  [Symbol.toPrimitive]() {
    return this.value;
  },
};

let obj2 = {
  value: '12',
  toString() {
    return this.value;
  },
};

let obj3 = {
  value: '1e2',
  valueOf(){
    return this.value
  }
}

Number(obj); // NaN
Number(obj1); // 2
Number(obj2); // 12
Number(obj3); // 100
```

- 使用 `+` 也可以进行转换，总体来说，它所转换的结果与 `Number(value)` 基本上是一致的(你可以认为它的内部转换机制就是 Number)

```js
// 1. 转换常规数字
+0.0254; // 0.0254

// 2. 转换e计法
+5e-3; // 0.005

// 3. 转换特殊符号字符
+-5.55; // -5.55
+'-5.55'; // -5.55
+''; // 0
+'  '; // 0
+'55fa'; // NaN

// 4. 转换布尔值/null/undefined/Infinity
+false; // 0
+true; // 1
+null; // 0
+undefined; // NaN
+-Infinity; // -Infinity

// 5. 转换任意除Symbol以外的对象或函数
+Object; // NaN
+function () {}; // NaN
+Symbol(5); // Error报错
+new Date(); // 1644414968425

// 6. 转换进制数成十进制数，只有携带进制标识的字符能被转换
+'0b1111'; // 15
+'11111'; // 11111
+0xff; // 255
+0o55; // 45
+'FF'; // NaN
```

2. isNaN(value)

- `Number.isNaN(value)`：不会自行将参数转换为数字，只有在参数是值为 `NaN` 的数字时，才会返回 `true`

```js
// 1. 检测值为NaN的值
Number.isNaN(NaN); // true
Number.isNaN(Number.NaN); // true
Number.isNaN(0 / 0); // true

// 2. 检测其他数值
Number.isNaN('NaN'); // false,字符串 "NaN" 不会被隐式转换成数字 NaN
Number.isNaN(undefined); // false
Number.isNaN({}); // false
Number.isNaN('ffaaa5'); // false
Number.isNaN(true); // false
Number.isNaN(null); // false
Number.isNaN(37); // false
Number.isNaN('37'); // false
Number.isNaN('37.37'); // false
Number.isNaN(''); // false
Number.isNaN(' '); // false
```

- `window.isNaN(value)`：当参数的类型不是 `Number` 时，此方法会尝试将该参数转换为数字，然后才会判断转换后的结果是否为 `NaN`。其用于类型转换的方式与 `Number(value)` 一致

```js
// 1. 检测常规字符
isNaN(+123); // false, Number(+123) === 123
isNaN('+123'); // false, Number('+123') === 123
isNaN('1E12'); // false, Number(Infinity) === Infinity
isNaN(''); // false, Number('') === 0
isNaN(0xfd); // false，Number(0xfd) === 253

// 2. 检测特殊值
isNaN(NaN); // true, Object.is(Number(NaN),NaN) === true
isNaN(undefined); // true, Object.is(Number(undefined),NaN) === true
isNaN('fff'); // true, Object.is(Number('fff'),NaN) === true

isNaN(Infinity); // false, Number(Infinity) === Infinity
isNaN(null); // false, Number(null) === 0
isNaN(true); // false, Number(true) === 1
isNaN(Symbol(5)); // 报错。Number(Symbol(5))报错，Cannot convert a Symbol value to a number

// 3. 检测内置对象
isNaN({}); // true, Object.is(Number({}),NaN) === true
isNaN(new Date().toString()); // true, Object.is(Number(new Date().toString()),NaN) === true
isNaN(new Date()); // false, Number(new Date()) === 1644414968425
```

- 这也意味着，当参数能被 `isNaN` 转换时，也就是 `isNaN(a)==false` 时，在任何算数表达式中都不会使表达式等于 `NaN`；如果返回 `true`，a 会使所有算数表达式返回 `NaN`

```js
// 非算术表达式
+123 + 'abc'; // "123abc"
Infinity + 'abc'; // "Infinityabc"

Infinity / 0; // Infinity
Infinity + 1; // Infinity
```

3. isFinite(value)

- `Number.isFinite(value)`：该方法不会强制将一个非数值的参数转换成数值，这就意味着，只有数值类型的值，且是有穷的（finite），才返回 `true`

```js
/** 
 * 1. 检测特殊值
*/
Number.isFinite(undefined); // false
Number.isFinite(null); // false
Number.isFinite(true); // false
Number.isFinite({}); // false

/** 
 * 2. 检测常规数字
*/
Number.isFinite(0xff); // true
Number.isFinite(-2e-2); // true
Number.isFinite('0'); // false
Number.isFinite(0); // true

/** 
 * 3. 检测特殊数字
*/
Number.isFinite(NaN); // false
Number.isFinite(Infinity); // false
Number.isFinite(-Infinity); // false
```

- `window.isFinite(value)`：该方法检测它参数的数值，如果不是 `Number` 类型的情况，该参数会被先转换为数字，再对结果进行判断。对于特殊数字 `NaN`、`-Infinity`、`Infinity`，会返回 `false`。其用于类型转换的方式与 `Number(value)` 一致

```js
/** 
 * 1. 检测常规字符
*/
isFinite(+123); // true, Number(+123) === 123
isFinite('+123'); // true, Number('+123') === 123
isFinite('1E12'); // true, Number(1E12) === 1000000000000
isFinite(''); // true, Number('') === 0
isFinite(0xfd); // true，Number(0xfd) === 253

/** 
 * 2. 检测特殊值
*/
isFinite(NaN); // false, Object.is(NaN,NaN) === true
isFinite(undefined); // false, Object.is(Number(undefined),NaN) === true
isFinite('fff'); // false, Object.is(Number('fff'),NaN) === true

isFinite(Infinity); // false, Number(Infinity) === Infinity
isFinite(null); // true, Number(null) === 0
isFinite(true); // true, Number(true) === 1
isFinite(Symbol(5)); // 报错。Number(Symbol(5))报错，Cannot convert a Symbol value to a number

/** 
 * 3. 检测内置对象
*/
isFinite({}); // false, Object.is(Number({}),NaN) === true
isFinite(new Date().toString()); // false, Object.is(Number(new Date().toString()),NaN) === true
isFinite(new Date()); // true, Number(new Date()) === 1644414968425
```

4. Number.prototype.toString(radix)

- 返回在给定 base 进制情况下该数字的表示形式，是一个字符串。base 的范围是 2-36，缺省值为 10。如参数不在(2-36)范围内时，将会抛出一个 `RangeError`

```js
let num = 255;
num.toString(2); // 11111111
num.toString(16); // ff
num.toString(66); // radix argument must be between 2 and 36
```

- 该方法并不是继承自 Object.prototype.toString，Number.prototype.toString 对该方法进行了覆写。并且在调用者是负数的情况，负数会得到保留，但它并不是数值的二进制补码

```js
(1).toString === Number.prototype.toString; // true
(1).toString === Object.prototype.toString; // false

(-10).toString(2); // '-1010''1010'
(10).toString(2); // '1010'
```

- 注意：在使用一个代表数字的原始值调用方法时，需注意以两个 `.` 的形式去调用。一个点的情况下会报错，因为 js 语法的关系会错把 `.` 后面的部分当成是小数部分。放两个 `.` 的情况下，js 会知道小数部分为空，从而正确调用该方法

```js
1314.toString(2) // Uncaught SyntaxError: Invalid or unexpected token

1314..toString(2) // "10100100010"
(1314).toString(2) // "10100100010"，也可以这样调用
```

5. parseInt

- 可以将字符串或者浮点数转化为整型 Number，使用 + 也可以进行转换，但区别在于 `+` 遇到一个不完全是数字的值时会失败，并且字符串开头或结尾的空格会被忽略

```js
/**
 * 小数部分被直接忽略
*/
parseInt(1.5); // 1
parseInt(-1.8); // -1
parseInt('123'); // 123
parseInt('1.23'); // 1
```

```js
/**
 * 遇到第一个不可转化的字符部分会直接返回
*/
parseInt(1e5); // 10000
parseInt('1051a'); // 1051
parseInt('a1051'); // NaN
parseInt('1 2 3')；// 1

parseInt('1.2.3'); // 1
```

- 可接收第二个参数，该参数用于指定数字的基数，缺省基数为 10。该数字会被转换为 `十进制数`，因此还可用于解析十六位、二位进制等字符串

```js
// 指定0xff为16进制数，并将其转化为十进制数255
parseInt('0xff', 16); // 255

// 指定ff为16进制数，并将其转化为十进制数255
parseInt('ff', 16); // 255，没有 0x 仍然有效

// 指定2n9c为36进制数，并将其转化为十进制数123456
parseInt('2n9c', 36); // 123456
```

- 但需要注意的是，为字符串加上进制前缀的方式和不加的情况都会导致不同的结果

```js
parseInt('0xff'); // 255
// 0x为16进制前缀，parseInt自动设置基数为16

parseInt('ff'); // NaN
// 未设置基数，默认为10，ff不能被转化，因为十进制数只能由0-9组成

parseInt('ff', 16);
// 设置基数为16，按照16进制转换的规则进行转换
```

- 数值的情况下，第二个小数点并不是一个有效的数值字符

6. parseFloat

- 可以将字符串或整型数转化为浮点数，如果参数字符串中的第一个字符不能被解析为数字，那么 parseInt/parseFloat 会返回 NaN。第二个小数点也会使解析停止

```js
parseFloat('1.52'); // 1.52
parseFloat('1.5e5'); // 150000
parseFloat('-1.52'); // -1.52
parseFloat('1.52.52414'); // 1.52
parseFloat('1.52f'); // 1.52
parseFloat('ffn'); // NAN
```

- 值得注意的是，在解析过程中，如果遇到了 `+`、`-`、`数字(0-9)`、`小数点`、`e记法中的e/E` 之外的字符，那么从该字符后所有字符都会被忽略，只保留该字符前已经解析到的浮点数/整数

7. Number.prototype.toFixed(digits)

- 根据 digits 的值来格式化一个数字，会在必要时四舍五入，返回一个 **字符串**。digits 的范围介于 0-20 之间，不传的情况下默认为 0。当数值大于 1e+21 时，此方法会调用 Number.prototype.toString 并返回一个指数形式的字符串

```js
(1.23e20).toFixed(2); // '123000000000000000000.00'
1e+20.toFixed(); // '1e+20'

(2.55).toFixed(1); // '2.5' 奇怪的表现
(2.15).toFixed(1); // '2.1' 奇怪的表现

(2.35).toFixed(1); // '2.4'

(1e22).toFixed(); // '1e+22' 大于1e21

-(2.35).toFixed(1); // -2.4 符号优先级
(-2.35).toFixed(1); // '-2.4'
```
