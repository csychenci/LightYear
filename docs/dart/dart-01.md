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