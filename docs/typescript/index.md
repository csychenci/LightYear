---
title: typescript
date: 2021-03-08 23:39:45
categories: TypeScript
order: 1
tags:
  - JavaScript超集
  - TypeScript
---

## TypeScript

---
1. typescript是什么
- typescript 是一个开源的、渐进式包含类型的 javaScript 超集，由微软创建并维护。创建它的目的是让开发者增强 JavaScript 的能力并使应用的规模扩展变得更容易。它的主要功能之一是为 javaScript 变量提供类型支持。在 javaScript 中提供类型支持可以实现静态检查，从而更容易地重构代码和寻找 bug

- 在使用指令编译 ts 代码生成 es5 代码时。即使终端输出了错误信息（实际上时警告，而不是错误），typescript 编译器还是会生成 es5 代码。这表明尽管 ts 在编译时进行了类型和错误检测，但并不会阻止编译器生成 javaScript 代码。这意味着我们在开发时可以利用这些验证结果写出具有较少错误和 bug 的 javaScript 代码

2. 总结
- ts 使用上就是怎么给 js 添加类型，比如函数、class、构造器、对象等怎么加类型。学会这个以后就是类型编程，也就是如何动态生成一些类型，称之为类型体操
- 类型安全，TypeScript 添加的静态类型系统就是为了保证类型安全的，把一些类型不兼容的错误提前到编译期间检查出来，提高代码的健壮性，这就是为什么大型项目必然会用静态类型的语言来写
- 也就是说，类型系统一般分为两层，一种是直接声明类型，另一种是更高级的---动态生成类型，对类型做增删改，做到精准的类型检查和提示

3. 基于webpack的typescript项目
```sh
npm init -y

npm init typescript -g

tsc --init

npm install webpack webpack-cli webpack-server webpack-dev-server webpack-merge -D

npm i ts-loader typescript -D

npm -i clean-webpack-plugin html-webpack-plugin -D
```
---

## 部分高级类型
---
1. 实现一个类型用于解析参数

```md
scanf: "a=1&b=2&c=3"
print: {a:1,b:2,c:2}
```

- 很明显，类型参数的 param 个数是不确定的，因此需要利用递归来做，首先先实现解析单个 param

```ts
type ParseParam<
  Str extends string
> = Str extends `${infer Key}=${infer Value}` ? {[K in Key]:Value} : {};

type param = ParseParam<'a=1'>;
/**
 * type param = {
    a: "1";
  }
 */
```

- 单个 param 的提取完成了，那么接下来就需要将多个 param 的解析结果进行合并

```ts
type MergeParams<
  FirstParam extends Record<string,any>,
  OtherParam extends Record<string,any>
> = {
  [Key in keyof FirstParam | keyof OtherParam]:
  Key extends keyof FirstParam 
  ? 
    Key extends keyof OtherParam 
      ? 
        MergeValue<FirstParam[Key],OtherParam[Key]> : FirstParam[Key] 
  : Key extends keyof OtherParam
    ? 
      OtherParam[Key] : never
}
```

- 当 params 中出现相同的 key 时，需要将它们的值类型进行合并

```ts
// 如果两个值是同一个就返回一个，否则构造一个数组类型来合并;
// 否则，如果是数组就做数组合并，否则构造一个数组把两个类型放进去
type MergeValue<
  T,
  U
> = T extends U ? T : U extends unknown[] ? [T,...U] : [T,U];

type ParamRes1 = MergeParams<ParseParam<'a=1'>,ParseParam<'a=2'>>;
/**
 * type ParamRes1 = {
    a: ["1", "2"];
  }
 */

type ParamRes2 = MergeParams<ParseParam<'a=1'>,ParseParam<'b=2'>>
/**
 * type ParamRes2 = {
    b: "2";
    a: "1";
  }
 */

```
- 单个 param 解析以及结果的合并都已完成，接下来就应该对原字符串进行解析

```ts
type ParseQueryString<
  Str extends string
> = Str extends `${infer Fisrt}&${infer R}` ? MergeParams<ParseParam<First>,ParseQueryString<R>> : ParseParam<Str>;

type ParamRes = ParseQueryString<'a=1&b=2&c=3&d=4&a=a'>;
/**
 * type ParamRes = {
    a: ["1", "a"];
    b: "2";
    c: "3";
    d: "4";
  }
 */
```