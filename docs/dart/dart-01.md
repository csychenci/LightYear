---
title: 语法基础
date: 2023-08-02 22:39:20
categories: Dart
order: 1
tags:
  - Dart
  - Flutter
---

## 语法基础
---
1. dart 简介
- Dart 是谷歌开发的，**类型安全** 的，面向对象的编程语言，被应用到 web、服务器、移动应用和物联网等领域。它可以运行在 windows、mac、linux 上，它能够基于原生虚拟机或者 javascript 引擎运行

2. 变量
- 变量是一个引用，dart 万物皆对象，变量存储的是对象的引用

```dart
// 明确指定类型
int age = 18;

// 不明确类型
var name = "xiaoming";
dynamie sexy = "boy";
```

- 并且变量名大小写敏感(age 与 Age 是两个不同的变量)。其中变量默认值是 null，而 js 中是 undefined，并且不会做隐式类型转换(例如 null 不会转换为 false)
- 常量是值不可变的变量，一旦声明，它的值就不能更改了。const 不能将运行时的值分配给变量(也就是编译时就能确定的值)，final 可以是运行时的值

```dart
const age = 18;
final name = "xiaoming";

const tiem1 = Date.now(); // error
final time2 = Date.now(); // ok
```

3. 数据类型/Number
- Number: dart 中的数字可以由三个关键字描述
- num 数字类型，既可以是整数，也可以是小数。其中 int 表示整数(必须是整数)；double 表示浮点数，既可以是整数，也可以是小数，当为整数时，输出的是整数的浮点表示形式

```dart
double num1 = 3;
print(double); // 3.0
```

- 当你不确定你应该使用 int 还是 double 类型时，你就可以使用 num 来声明数值类型，它既可以是 int，也可以是 double。你还可以使用 Number 的一些 api 来进行类型转换

|api|描述|
|---|---|
|toInt()|向下取整|
|round()|四舍五入|
|toStringAsFixed(int param)|取小数位的数字，会四舍五入|
|remainder(int param)|返回余数|
|compareTo(num param)|数字比较|
|gcd(num param)|返回最大公约数|
|toStringAsExponential(int param)|科学记数法|
|isNaN|作为数字类型的一个属性存在，判断数字是否是 NaN|
|isFinite|作为数字类型的一个属性存在，判断数字是否是有穷的|

4. 字符串/String
- 可以用单引号、双引号、三个引号(可以包含换行符)来声明字符串，还可以使用正则表达式来匹配一个字符串

```dart
const reg = RegExp(r'\d+');
reg.hasMatch("1234"); // true
```

- 通过 String 来声明一个字符串变量，多行字符串时，引号必须成对出现

```dart
String str1 = "hello world";
String str2 = '''hello,
welcome''';

// 使用加号进行字符串拼接ß
String str3 = str1 + str2;

// 模版字符串代替变量
print("$str1,$str2");
```

- 字符串还有一些常见的 api

|api|描述|
|---|---|
|split(String param)|基于 param 进行字符串分割|
|trim()|去掉字符串内的所有空格|
|trimLeft()/trimRight()|去掉字符串左边/右边的空格|
|isEmpty|字符串的一个属性(不是方法)，判断字符串是否为空，返回一个 bool|
|isNotEmpty|也是字符串的一个属性(不是方法)，判断字符串是否不为为空，返回一个 bool|
|replaceAll(String from,String replace)|将字符串内所有的 from 全量替换成 replace|
|replaceAll(RegExp from,String replace)|将字符串内所有的被正则 from 匹配到的内容全量替换成 replace|
|contains(String param)|查找 param 是否包含在字符串中|
|indexOf(String param)/lastIndexOf(String param)|查找 param 在字符串中的位置，不存在则返回 -1|

```dart
String str = "h1j2k3l4";
print(str.replaceAll(RegExp(r"\d+"),'_'));
//h_j_k_l_
```

5. 布尔类型/Boolean
- dart 通过 bool 关键字来表示布尔类型，布尔类型只有两个值：true 和 false。对变量进行判断时，要显式地检查布尔值

```js
if(bool) {

}
```

```dart
if(bool1 === 0) {

}

if(bool2 === null) {

}
```

6. List
- 是 dart 的数组，它有两种声明方式，一种是不限制元素的数据类型，另一种限制元素的数据类型

```dart
// 字面量方式
List list1 = [1,'a'];

List list2 = <int>[1,2,3,4];

// 构造函数声明
List list3 = new List.empty(); // 如果不设置 growable 为 true，list3无法添加新元素 (new List.empty(growable:true))
```