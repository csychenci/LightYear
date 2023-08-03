---
title: 正则表达式
date: 2020-04-21 14:25:33
categories: JavaScript
sidemenu: true
toc: 'content'
order: 19
author: chencicsy
tags:
  - 正则表达式
  - JavaScript
  - 规则匹配
description:
---

## 正则

---
1. 正则是什么
- 规则表达式：通过书写规则，来检测字符串是否符合规则。规则通常使用一些特殊的字符或符号定义一个规则公式，使用这个规则公式去检测字符串是否合格
- 创建一个正则

```js
var reg = /abcdef/;
// 使用两个 / 直接创建
```

```js
var reg = new RegExp('adcdef');
// 使用构造函数创建
```

2. 元字符
- **`.`**：用于匹配非换行的 **任意字符**
- **`\`**：转译符号，用于将无意义的字符转换成有意义的符号，将有意义的符号转换为无意义的字符
- **`\s`**：用于匹配空白字符，包括空格、制表符等

```js
var str1 = "i ' m 100% cool";
var str2 = "im'100%cool";
var reg = /\s/; // 匹配空白字符
reg.test(str1); // true
reg.test(str2); // false
```

- **`\S`**：用于匹配非空白字符

```js
var str1 = "i ' m 100% cool";
var str2 = "im'100%cool";
var str3 = ' ';
var reg = /\S/; // 匹配非空白字符
reg.test(str1); // true
reg.test(str2); // true
reg.test(str3); // false
```

- **`\d`**：用于匹配数字，等价于 `[0-9]`

```js
var str1 = "i ' m 100% cool";
var str2 = "im'100%cool";
var str3 = 'Hello World';
var reg = /\d/;
reg.test(str1); //
```

- **`\D`**：用于匹配非数字

```js
var str1 = "i ' m 100% cool";
var str2 = "im'100%cool";
var str4 = 'Hello World';
var str5 = '100';
var reg = /\D/; // 匹配非数字
reg.test(str1); // true
reg.test(str2); // true
reg.test(str4); // true
reg.test(str5); // false
```

- **`\w`**：用于匹配数字字母下划线

```js
var str1 = "i ' m 100% cool";
var str2 = "im'100%cool";
var str4 = 'Hello World';
var str5 = '100';
var str6 = '#%$';
var str7 = '#%$_';
var reg = /\w/; // 匹配数字字母下划线
reg.test(str1); // true
reg.test(str2); // true
reg.test(str4); // true
reg.test(str5); // true
reg.test(str6); // false
reg.test(str7); // true
```

- **`\W`**：用于匹配非数字字母下划线

```js
var str1 = "i ' m 100% cool";
var str2 = "im'100%cool";
var str4 = 'Hello World';
var str5 = '100';
var str6 = '#%$';
var str7 = '#%$_';
var str8 = '_100';
var reg = /\W/; // 匹配非数字字母下划线
reg.test(str1); // true
reg.test(str2); // true
reg.test(str4); // true
reg.test(str5); // false
reg.test(str6); // true
reg.test(str7); // true
reg.test(str8); // false
```

- **`\f`**：用于匹配一个换页符
- **`\n`**：用于匹配一个换行符
- **`\r`**：用于匹配一个回车符
- **`\t`**：用于匹配一个制表符
- **`\v`**：用于匹配一个垂直制表符

3. 限定符

- **`*`**：前一个内容重复至少 0 次，可以出现 `o-∞` 次
- **`+`**：前一个内容重复至少 1 次，可以出现 `1-∞` 次
- **`?`**：前一个内容重复 0 或者 1 次，可以出现 `0-1` 次
- **`{n}`**：前一个内容重复 n 次，必须出现 n 次
- **`{n,}`**：前一个内容至少出现 n 次，可以出现 `n-∞` 次
- **`{n,m}`**：前一个内容至少出现 n 次最多出现 m 次，可以出现 `n-m` 次

4. 限定符结合元字符的使用

- 验证数字可以出现 `0~∞` 次

```js
var str1 = "i ' m 100% cool";
var str2 = "im'100%cool";
var str4 = 'Hello World';
var str5 = '100';
var reg_1 = /\d*/; // 验证数字可以出现0~∞次
console.log(reg_1.test(str1)); // true
console.log(reg_1.test(str2)); // true
console.log(reg_1.test(str4)); // true
console.log(reg_1.test(str5)); // true
```

- 验证数字可以出现 `1~∞` 次

```js
var str1 = "i ' m 100% cool";
var str2 = "im'100%cool";
var str3 = ' ';
var str4 = 'Hello World';
var str5 = '100';
var reg_2 = /\d+/; // 验证数字可以出现1~∞次
console.log(reg_2.test(str1)); // true
console.log(reg_2.test(str2)); // true
console.log(reg_2.test(str3)); // false
console.log(reg_2.test(str4)); // false
console.log(reg_2.test(str5)); // true
```

- 验证数字可以出现 `0~1` 次

```js
var str1 = "i ' m 100% cool";
var str2 = "im'100%cool";
var str3 = ' ';
var str4 = 'Hello World';
var str5 = '100';
var str7 = '#%$_';
var str8 = '_10054135';
var reg_3 = /\d?/; // 验证数字可以出现0~1次
console.log(reg_3.test(str1)); // true
console.log(reg_3.test(str2)); // true
console.log(reg_3.test(str3)); // true
console.log(reg_3.test(str4)); // true
console.log(reg_3.test(str5)); // true
console.log(reg_3.test(str7)); // true
console.log(reg_3.test(str8)); // true
```

- 数字必须出现 2 次

```js
var str1 = "i ' m 100% cool";
var str2 = "im'100%cool";
var str3 = ' ';
var str4 = 'Hello World';
var str5 = '100';
var str7 = '#%$_';
var str8 = '_10054135';
var str9 = 'asd1';
var reg_4 = /\d{2}/; // 数字必须出现2次
console.log(reg_4.test(str1)); // true
console.log(reg_4.test(str2)); // true
console.log(reg_4.test(str3)); // false
console.log(reg_4.test(str4)); // false
console.log(reg_4.test(str5)); // true
console.log(reg_4.test(str7)); // false
console.log(reg_4.test(str8)); // true
console.log(reg_4.test(str9)); // false
```

- 验证数字可以出现 `3~∞` 次

```js
var str1 = "i ' m 100% cool";
var str2 = "im'100%cool";
var str3 = ' ';
var str4 = 'Hello World';
var str6 = '#%$';
var str7 = '#%$_';
var str8 = '_10054135';
var str9 = 'asd1';
var str10 = 'asd12';
var reg_5 = /\d{3,}/; // 验证数字可以出现3~∞次
console.log(reg_5.test(str1)); // true
console.log(reg_5.test(str2)); // true
console.log(reg_5.test(str3)); // false
console.log(reg_5.test(str4)); // false
console.log(reg_5.test(str6)); // false
console.log(reg_5.test(str7)); // false
console.log(reg_5.test(str8)); // true
console.log(reg_5.test(str9)); // false
console.log(reg_5.test(str10)); // false
```

- 验证数字可以出现 `1~3` 次

```js
var str1 = "i ' m 100% cool";
var str2 = "im'100%cool";
var str3 = ' ';
var str4 = 'Hello World';
var str5 = '100';
var str6 = '#%$';
var str7 = '#%$_';
var str8 = '_10054135';
var str9 = 'asd1';
var str10 = 'asd12';
var reg_6 = /\d{1,3}/; // 验证数字可以出现1~3次
console.log(reg_6.test(str1)); // true
console.log(reg_6.test(str2)); // true
console.log(reg_6.test(str3)); // false
console.log(reg_6.test(str4)); // false
console.log(reg_6.test(str5)); // true
console.log(reg_6.test(str6)); // false
console.log(reg_6.test(str7)); // false
console.log(reg_6.test(str8)); // true
console.log(reg_6.test(str9)); // true
console.log(reg_6.test(str10)); // true
```

5. 边界符
- `^`：表示开头
- `$`：表示结尾
- 限定从开头到结尾只能有数字，并且出现 `1-3` 次

```js
var str1 = "i ' m 100% cool";
var str2 = "im'100%cool";
var str3 = ' ';
var str4 = 'Hello World';
var str5 = '100';
var str6 = '#%$';
var str7 = '#%$_';
var str8 = '_10054135';
var str9 = 'asd1';
var str10 = 'asd12';
var str11 = '1';
var reg_6 = /^\d{1,3}$/; // 限定从开头到结尾只能有数字，并且出现1~3次·
console.log(reg_6.test(str1)); // flase
console.log(reg_6.test(str2)); // false
console.log(reg_6.test(str3)); // false
console.log(reg_6.test(str4)); // false
console.log(reg_6.test(str5)); // true
console.log(reg_6.test(str6)); // false
console.log(reg_6.test(str7)); // false
console.log(reg_6.test(str8)); // false
console.log(reg_6.test(str9)); // false
console.log(reg_6.test(str10)); // false
console.log(reg_6.test(str11)); // true
```

6. 特殊符号
- `()`：限定一组元素
- `[]`：字符集合，表示写在 `[]` 里面的任意一个都行
- `[^]`：反字符集合，表示写在 `[^]` 里面之外的任意一个都行，需要在 `[]` 中开头使用，否则无作用
- `-`：表示范围，比如 `0-9` 表示从数字 0 到 9，`a-z` 表示从字母 a 到 z
- `|`：表示 `或`，`a|b` 表示 a 或 b 都可以

```js
// 非_$开头，任意字符出现至少6次，一个@符号，(163|126|qq|sina)中的任意一个，一个点，(com|cn|net)中的任意一个
var reg = /^[^_$].{6,}@(163|126|qq|sina)\.(com|cn|net)$/;
```

- `\1`、`\2` 等，表示重复正则第一个或第二个分组(圆括号包裹起来的内容)匹配到的内容

```js
/** 
  * 1. /^(123)(abc)\1\2/ : 123abc123abc
*/
/^(123)(abc)\1\2/.test('123abc123abc'); // true
/^(123)(abc)\1\2/.test('123abcabc123'); // false

/** 
  * 2. /^(123)(abc)\1/ : 123abc123
*/
/^(123)(abc)\1/.test('123abc123'); // true

/** 
  * 3. /^(123)(abc)\2/; : 123abcabc
*/
/^(123)(abc)\2/.test('123abcabc'); // true
```

```js
var reg = /(.)\1{0,}/g;
// 匹配任意字符，出现0~无穷次，\1表示重复正则第一个圆括号内匹配到的内容
```

7. 标识符
- `i`： 表示忽略大小写，写在正则最后面 `/i`，表示不区分大小写
- `g`：表示全局匹配，写在正则最后面 `/g`，全局匹配某种规则

8. 部分正则实例
- ` [\u4e00-\u9fa5]`：匹配中文

```js
reg_1 = /^cool/; //匹配所有以'cool'开头的字符串
console.log(reg_1.test('coo')); // false
console.log(reg_1.test('cool')); // true
console.log(reg_1.test('cool123')); // true
console.log(reg_1.test("i ' m 100% cool")); // false
reg_2 = /cool$/; // 匹配所有以'cool'结尾的字符串
console.log(reg_2.test('coo')); // false
console.log(reg_2.test('cool')); // true
console.log(reg_2.test('cool123')); // false
console.log(reg_2.test("i ' m 100% cool")); //true
reg_3 = /^cool$/; //匹配开始和结尾都为cool的字符串
console.log(reg_3.test('coo')); // false
console.log(reg_3.test('cool')); // true
console.log(reg_3.test('cool123')); // false
console.log(reg_3.test("i ' m 100% cool")); //false
reg_4 = /cool/; //匹配任何包含有'cool'的字符串
console.log(reg_4.test('coo')); // false
console.log(reg_4.test('cool')); // true
console.log(reg_4.test('cool123')); // true
console.log(reg_4.test("i ' m 100% cool")); //true
reg_5 = /n/; //匹配包含有字符'n'的字符串
reg_6 = /\n/; //匹配换行符\n
reg_7 = /\//; //匹配 /
reg_8 = /co*/; //匹配一个c,其后跟着0~无穷个o
console.log(reg_8.test('cbbbb')); // true
console.log(reg_8.test('caa')); // true
console.log(reg_8.test('cool')); // true
console.log(reg_8.test('cool123')); // true
console.log(reg_8.test("i ' m 100% cool")); //true
reg_9 = /co+/; //匹配一个c,其后跟着1~无穷个o
console.log(reg_9.test('cbbbb')); // false
console.log(reg_9.test('caoa')); // false
console.log(reg_9.test('cool')); // true
console.log(reg_9.test('cool123')); // true
console.log(reg_9.test("i ' m 100% cool")); //true
reg_10 = /co?/; //匹配一个c,其后跟着0个o或者1个o
console.log(reg_10.test('cbbbb')); // true
console.log(reg_10.test('caoa')); // true
console.log(reg_10.test('cool')); // true
console.log(reg_10.test('cool123')); // true
console.log(reg_10.test("i ' m 100% cool")); //true
reg_11 = /c?o+$/; //匹配字符串末尾有零个或一个c，其后跟着1个o或者无穷个o
console.log(reg_11.test('cbbbb')); // false
console.log(reg_11.test('ooooo')); //true
console.log(reg_11.test('caoa')); //false
console.log(reg_11.test('cool')); //false
console.log(reg_11.test('cool123')); //false
console.log(reg_11.test("i ' m 100% coo")); //true
console.log(reg_11.test("i ' m 100% cool")); //false
reg_12 = /ab{3}/; // 验证字符串中有一个a后面跟着3个b
console.log(reg_12.test('abbb')); // true
console.log(reg_12.test('abb')); //false
reg_13 = /ab{3,}/; // 验证字符串中有一个a后面至少跟着3个b
console.log(reg_13.test('abbb')); // true
console.log(reg_13.test('abb')); //false
reg_14 = /ab{2,5}/; // 验证字符串中有一个a后面跟着2-5个b
console.log(reg_14.test('ab')); // false
console.log(reg_14.test('abb')); //true
console.log(reg_14.test('abbbbbbb')); //true
reg_15 = /[abc]/; // 等价于[a | b | c]
```

- 去除字符串中所有空格

```js
'    a gb    '.replace(/(\s)/g, '');
```

- 去除字符串左右两侧的空格

```js
'    a gb    '.replace(/(^(\s{0,})|(\s{0,})$)/g,''
```

- 去除字符串左边/右边的空格

```js
'   abc    '.replace(/^(\s){0,}/,''); // 左边
'   abc    '.replace(/(\s){0,}$/,'')；//右边
```

---

## 正则或字符串的 API

---

1. test

- 检测一个字符串是否匹配某个模式，如果字符串中含有匹配的文本，返回一个布尔值

```js
var str1 = "i ' m 100% cool";
var str2 = "im'100%cool";
var str3 = ' ';
var str4 = 'Hello World';
var str5 = '100';
var str6 = '#%$';
var str7 = '#%$_';
var str8 = '_10054135';
var str9 = 'asd1';
var str10 = 'asd12';
var str11 = '1';
var reg_6 = /^\d{1,3}$/; // 限定从开头到结尾只能有数字，并且出现1~3次·
console.log(reg_6.test(str1)); // flase
console.log(reg_6.test(str2)); // false
console.log(reg_6.test(str3)); // false
console.log(reg_6.test(str4)); // false
console.log(reg_6.test(str5)); // true
console.log(reg_6.test(str6)); // false
console.log(reg_6.test(str7)); // false
console.log(reg_6.test(str8)); // false
console.log(reg_6.test(str9)); // false
console.log(reg_6.test(str10)); // false
console.log(reg_6.test(str11)); // true
```

2. exec

- 捕获字符串中符合正则条件的内容， 以数组的形式返回字符串中符合正则要求的第一项匹配内容和一些其他的信息

```js
var reg = /\d{3}/;
var str = 'hello123world456';
var str2 = 'hello';
console.log(reg.exec(str));
// ["123", index: 5, input: "hello123world456", groups: undefined]
```

3. search

- 查找字符串中是否有满足正则条件的内容，有满足该条件的内容返回开始索引，否则返回-1

```js
var str1 = 'as1';
var str2 = 'asd12';
var reg = /\d{2}/;
console.log(str1.search(reg)); // -1
console.log(str2.search(reg)); // 3
```

4. match

- 找到字符串中符合正则条件的内容并返回， 末尾没有 `g全局匹配时`，与 `exec` 方法一致，末尾有 `g全局匹配` 时，返回一个数组，其中是被匹配到的内容

```js
var reg = /(.)\1{0,}/g;
var str = 'tttree';
console.log(str.match(reg));
// ["ttt", "r", "ee"]
// 匹配任意字符，出现0~无穷次，\1表示重复正则第一个圆括号内匹配到的内容
```

5. replace

- 将字符串中满足正则条件的字符串替换掉，返回被替换的字符串，`字符串.replace(正则，要替换的字符串)`

```js
var reg = /\d{3}/;
var str = 'hello123world456';
var str2 = 'hello';
console.log(str.replace(reg, 666)); // hello666world456
console.log(str2.replace(reg, 666)); // hello
var reg = /\d{3}/g;
var str = 'hello123world456';
var str2 = 'hello';
console.log(str.replace(reg, 666)); // hello666world666
console.log(str2.replace(reg, 666)); // hello
```
