---
title: 字符串类型
sidemenu: true
toc: 'content'
order: 4
author: chencicsy
date: 2020-04-02 20:12:38
categories: JavaScript
tags:
  - 原始数据类型
  - JavaScript
  - 字符串
---


## 字符串

---

1. 简要描述

- 通俗意义上来讲，字符串是使用单引号或双引号包裹起来的任意文本数据，它们的内部格式始终是 `UTF-16`，不依赖于页面编码

2. 创建字符串的方式

- 字面量创建(基本字符串)

```js
let str = 'Hello Jetmine';
let str1 = 'Hello Jetmine';
```

- 使用 String/非构造器上下文 创建(基本字符串)，实际上相当于将其他类型转化为字符串，值得注意的是，在解析过程中，如果遇到了 `+`、`-`、`数字(0-9)`、`小数点`、`e记法中的e/E` 之外的字符，且并未使用单引号或双引号包裹起来，会报错，~~第二个小数点也会使 `String` 报错~~(这是因为出现第二个小数点且未被引号包裹起来的数字并不是一个有效的数字)

```js
var str = String(12); // '12'
var str1 = String('ab12'); // 'ab12'
var str2 = String(1.2e5); // 120000
```

- 通过构造器上下文的方式创建，不过这样创建出来的是一个字符串对象

```js
var str = new String(`1.2.5`);
// String {"1.2.5"}
// 0: "1"
// 1: "."
// 2: "2"
// 3: "."
// 4: "5"
```

3. 字符串的一些特性

- 字符串属于原始数据类型，它对应未知的属性并不是可读或可配置的，对字符串中的单个字符赋值不会报错，也不会有效果

```js
// 改变字符串中的字符
var str = 'Hello World';
str[1] = 'B';
console.log(str);
/**
 * 结果还是[Hello World]，说明字符串的单个字符的值无法通过赋值的方式改变
 */
```

- 注意，对 String 类型的变量进行赋值，并不是字符串本身改变了，而是该变量指向了新的字符串，原字符串本身是没有改变的，原字符串因为失去了引用，因此会被自动垃圾回收机制回收

```js
/**
 * 引用字符串的变量地址变了(指向了新的字符串)，字符串本身没有变
 * 此时，str指向的是字符串的内存地址
 */
let str = 'Hello World';
str = 'How Are You?';
console.log(str);
// 结果是 How Are You?
```

- 以上说明为字符串重复赋值、字符串的拼接等都会引用新的地址空间来存放字符串的值，这是一种消耗内存的操作
- 字符串可使用某些数组的相关操作，如获取字符串长度 `str.length`、操作下标 `str[index]`索引值从 0 开始、索引超出 `length` 不会报错会返回 `undefined`

4. 特殊字符

- 也称为转义字符，即使用反斜杠来使用原本没有意义的字符具备某种含义

| 字符 | 描述 |
| :-: | :-- |
| \n | 换行 |
| \r | 回车：不单独使用。Windows 文本文件使用两个字符 `\r\n` 的组合来表示换行 |
| \\' ,\\" | 引号 |
| \\\\ | 反斜线 |
| \t | 制表符 |
| \b, \f, \v | 退格，换页，垂直标签。为了兼容性，现在已经不使用了 |
| \xXX | 具有给定十六进制 `Unicode XX` 的 `Unicode` 字符，例如：`'\x7A'` 和 `'z'` 相同 |
| \uXXXX | 以 `UTF-16` 编码的十六进制代码 `XXXX` 的 `unicode` 字符，例如 `\u00A9` 是版权符号 `©` 的 `unicode`。它必须正好是 4 个十六进制数字 |
| \u{X…XXXXXX}（1 到 6 个十六进制字符） | 具有给定 `UTF-32` 编码的 `unicode` 符号。一些罕见的字符用两个 `unicode` 符号编码，占用 4 个字节。这样我们就可以插入长代码了 |

```js
'\u00A9'; // ©
'\u{20331}'; // 佫，罕见的中国象形文字（长 unicode）
'\u{1F60D}'; // 😍，笑脸符号（另一个长 unicode）
```

5. 模板字符串

- 不同字符串可以使用 `+` 连接，以达到 `拼接` 的效果

```js
let str = 'Hello';
let str1 = str + ' Jetmine';
console.log(str1); // Hello Jetmine
```

- 模板字符串属于 `ES6` 的新特性，它会自动替换字符串中的变量，使用模板字符串需使用反引号包裹

```js
let item = 'world';
let message = `hello,${item}`;
console.log(message); // hello,world
```

- 模板字符串还可用于存储多行文本

```js
let str = `I
love
jetmine`;

// 'I\nlove\njetmine'
```

---

## 字符串的常用方法

---

1. 字符串是不可变的

- 调用某一些方法不会改变原有字符串，而是返回一个新字符串，需要注意

2. toUpperCase

- 将一个字符串全部变为大写

```js
let str = 'Hello Jetmine';
str.toUpperCase();
/**
 * HELLO JETMINE
 */
```

3. toLowerCase

- 将一个字符串全部变为小写

```js
let str = 'HELLO JETMINE';
str.toUpperCase(); // hello jetmine
```

4. indexOf

- 搜索 `指定字符串` 出现的 `位置`，参数为某元素，若找到该元素则返回该元素在字符串中的 `索引值`，未找到则返回 `-1`

```js
var str = "i 'm 100% cool";
str.indexOf('cool'); // 找到'cool'返回'c'的位置的下标10
str.indexOf("'"); // 找到"'"的位置并返回其下标2
str.indexOf('looc'); // 未找到子串,返回-1
```

- 可指定第二个参数，该参数为正，则从该参数代表的索引值往后进行查找；该参数为负，该参数 `无效`，从 `0` 开始查找

```js
var str = "i 'm 100% cool";
str.indexOf('o', -3); // 传入负数无效，从字符串索引0的位置开始查找'o'的下标为11
str.indexOf('0', 7); // 顺数从索引7开始查找(也就是第八个)'o',返回其下标7
str.indexOf('o', str.length); // -1
```

5. charAt

- 传入一个索引，返回索引位置在字符串中的内容，如果该索引在字符串中 `不存在`，则会返回一个 `空字符串`

```js
var str = "i'm100% cool";
str.charAt(-1); // ''
str.charAt(0); // i
str.charAt(str.length); // ''
```

6. charCodeAt

- 传入一个索引，返回索引位置在字符串中的对应内容的 `unicode` 编码。如果该索引在字符串中 `不存在`，则会返回一个 `NAN`；不传参数的情况下，默认将索引为 0 位置的字符 unicode 编码返回

```js
var str = "i'm100% cool";
str.charCodeAt(-1); // NAN
str.charCodeAt(5); // 48
str.charCodeAt(0); // 105
str.charCodeAt(str.length); // NAN
```

7. substring(startIndex,endIndex)

- 返回指定索引区间的字符串，包括 startIndex，不包括 endIndex。并且，它允许 startIndex 大于 endIndex，同时，接受的的负参数会被视为 0

```js
var str = "i 'm 100% cool";
str.substring(0, 6); // 返回索引0-6的子串，不包括6，i 'm 1
str.substring(6, 2); // 返回索引2-6的子串，
str.substring(); // 复制原字符串，i 'm 100% cool
str.substring(5); //  返回从5开始到结束的子串，100% cool
str.substring(-1, 6); // 返回从0到6的子串，i 'm 1
str.substring(6, -1); // 返回从0到6的子串，i 'm 1
```

8. substr(startIndex,count)

- 截取字符串，传入两个参数，第一个表示从哪个索引开始(支持负数，表示从末尾开始)，第二个表示截取多少个字符
- 如果只传一个参数，表示从该位置开始截取后面所有的字符

```js
var str = "i'm100%cool";
str.substr(1, 3); // 'ml
str.substr(); // i\'m100%cool
str.substr(1); // 'm100%cool
str.substr(-3, 5); // "ool"
```

9. slice

- 返回指定索引区间的字符串，包括 startIndex，不包括 endIndex。可接收负值参数，即从字符串末尾开始的负值索引

```js
var str = 'hello world';
str.slice(-4, -2); // or
```

10. split

- 指定以方法中的参数作为符号对字符串进行切割，返回一个数组。该字符串中作为 `切割符号` 的字符会被 `隔离` 在切割完的数组之外

```js
var str = "i 'm 100% cool";
str.split(''); // ["i", " ", "'", "m", " ", "1", "0", "0", "%", " ", "c", "o", "o", "l"]
str.split(); // ["i 'm 100% cool"]
str.split(' '); // ["i", "'m", "100%", "cool"]
var str2 = 'John,Bob,James,Jeason';
str2.split(','); // ["John", "Bob", "James", "Jeason"]
```

- 该方法可接受第二个参数，用于指定返回的数组长度，超出截取长度的效果为不指定第二个参数

```js
let str = 'John,Bob,James,Jeason';
str.split(',', 3); //  ["John", "Bob", "James"]
str.split(',', 1000); // ["John", "Bob", "James", "Jeason"]
```

11. replace

- 字符串替换，只会替换第一个匹配到的子串，未匹配到不会进行替换

```js
var str = "i'm100% cool";
str = str.replace('o', 'O');
console.log(str); // i'm100% cOol
str = str.replace('oo', 'O');
console.log(str); // i'm100% cOl
```

12. String.fromCharCode()

- 将 `unicode` 码转化为对应的字符，会进行强制类型转换，即将字符串内的数字转换为 `Number` 类型。非 _unicode_ 的字符会返回一个长度为 1 的空字符串

```js
String.fromCharCode(102); // f
String.fromCharCode('72'); // H
String.fromCharCode('102'); // f

let zero = String.fromCharCode(true); // '\x01'
zero.charCodeAt(); // ‘0’
zero.length; // 1
```

13. trim

- `trim`，去掉字符串左右两边的空格，该方法不兼容 ie8；`trimLeft`，去掉字符串左边的空格，该方法不兼容 ie；`trimRight`，去掉字符串右边的空格，该方法不兼容 ie

```js
var str = '  jetmine  ';
str.length; // 11
str.trim().length; // 7
```

14. includes

- 可接收单个字符或子串，表示包括、包含。类似于 indexOf，但区别在于，`includes` 返回的是布尔值，存在该字符或子串即返回 true，否则返回 false，也可以接第二个参数，其作用与 indexOf 的第二个参数效果一致

```js
var str = '  jetmine  ';
str.includes('j'); // true
str.includes('j', -1); // true
str.includes('j', str.length); // false
```

15. startsWith/endWidth

- startsWith：判断字符串是否以某参数开头，可接收单个字符或子串

```js
var str = 'jetmine';
str.startsWith('je'); // true
str.startsWith('e'); // false
```

- endsWith：判断字符串是否以某参数结尾，可接受单个字符或子串

```js
var str = 'jetmine';
str.endsWith('je'); // false
str.endsWith('ne'); // true
```

16. padStart/padEnd

- `padStart`，第一个参数用于指定新字符串的长度，第二个参数用于拼接到调用该方法的字符串前面，返回一个新字符串

```js
var str = 'jetmine';
str.padStart(12, 'hello'); // hellojetmine
str.padStart(12, 12); // 12121jetmine

str.padStart(); // jetmine
str.padStart('12'); // '     jetmine'
```

- `padEnd`，第一个参数用于指定新字符串的长度，第二个参数用于拼接到调用该方法的字符串后面，返回一个新字符串

```js
var str = 'jetmine';
str.padEnd(12, 'hello'); // jetminehello
str.padEnd(12, 12); // jetmine12121
```

- 如原字符串长度大于等于第一个参数指定长度的值，则不会拼接任何字符

```js
var str = 'jetmine';
str.padStart(6, ' hello'); // 'jetmine'
```

- 只指定第一个参数(长度)而未指定第二个参数的情况下，会拼接空字符上去

```js
let str = 'csychenci';
str.padEnd(12); // 'csychenci   '
```

17. repeat

- 在原字符串的基础上重复拼接一定次数的原字符串，返回一个新字符串，次数为参数指定的值

```js
var str = 'jetmine';
str.repeat(2); // jetminejetmine
str.repeat(3); // jetminejetminejetmine
```

18. lastIndexOf

- 类似于 indexOf，只不过 lastIndexOf 会从后往前开始查找。也可以传入第二个参数指定从那个索引开始查找，若该参数为负值，直接返回 -1

```js
var str = 'jetmine';
str.lastIndexOf('e', 0); // -1
str.lastIndexOf('e', 1); // 1
str.lastIndexOf('e'); // 6
str.lastIndexOf('e', -1); // -1
```

19. codePointAt

- 返回参数位置的 ACCII 编码，默认参数为 0

```js
'z'.codePointAt(0); // 122
'Z'.codePointAt(0); // 90

'zZ'.codePointAt(); // 122
'zZ'.codePointAt(0); // 122
'zZ'.codePointAt(1); // 90
```

20. String.fromCodePoint

- 将数字或 unicode 编码转化为字符

```js
String.fromCodePoint(90); // Z
String.fromCodePoint(122); // z
```

21. localeCompare

- 可用于数组中排序的字符串的正确比较

```js
var arr = ['bob', 'add', 'bgb', 'ccc'];
arr.sort((a, b) => a.localeCompare(b)); // ["add", "bgb", "bob", "ccc"]
```

22. slice、substring、substr 的区别

| API       | 区别                                           | 允许负值索引                |
| :-------- | :--------------------------------------------- | :-------------------------- |
| slice     | 获取 `startIndex-endIndex`（不包含）           | √                           |
| substring | 获取`startIndex-endIndex`（不包含）            | ×，负值被转化为 0           |
| substr    | 获取 `startIndex` 开始的 `length` 长度的字符串 | √，允许 `startIndex` 为负值 |
