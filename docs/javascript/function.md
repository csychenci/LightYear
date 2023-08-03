---
title: 函数
date: 2020-04-12 09:58:12
sidemenu: true
toc: 'content'
order: 9
author: chencicsy
categories: JavaScript
tags:
  - 函数
  - JavaScript
  - 引用数据类型
description:
---

## 函数

---

1. 函数的概念
- 使用某种符号去代替一种常用的方式，让人们看到这个符号就能想到这个方式。函数就可以理解为最基本的一种代码抽象的方式
- 对代码进行封装后，代码变得更简洁，并且可以复用，能够降低代码的重复率

2. 函数的生命周期
- 两个阶段：预编译期（预处理）与执行期
- 在预处理期间，js 引擎会对代码块中所有的声明的变量、函数、函数中的 arguments 进行预处理。期间代码块下方的函数声明会覆盖上面的函数声明

3. 函数的定义方式
- 声明式

```js
function fn(x, y) {
  console.log('这里是要输出的语句');
  return x + y;
}
```

- 赋值式

```js
var fn = function (x, y) {
  console.log('这里是要输出的语句');
  return x + y;
};
```

4. 参数的传递
- 传入多余的参数并不会影响函数的调用，这些多余的参数不会被函数使用，可对传入的参数进行检查
- 形参，指的是函数定义过程中的参数；实参，函数运行过程中实际传递进去的参数

```js
function fn(x, y) {
  // x,y即为形参
  console.log('这里是要输出的语句');
  return x + y;
}
```

- 声明的形参比传入的实参多，多出来的形参没有值，即值为 undefined
- 声明的形参比传入的实参少，多出来的实参没办法被函数内部使用，即该实参在函数内部没有存储它的形参

5. return
- 意为返回，它可以赋予函数一个返回值并且终断函数
- 终断函数，函数从执行到结束这一过程中，函数内部代码会从上到下的依次执行，需要等到函数内的代码执行完毕，return 可以在函数内部任意位置提前结束掉函数，return 后面的语句将不再执行

6. arguments
- 是函数内所有参数的集合，该集合是一个伪数组，指向当前函数被调用时传入的所有参数。由于它具有 iterator 接口，因此它是一个可迭代对象，可以使用 for of。利用 arguments 可以拿到调用时传入的所有参数

```js
function test() {
  console.log(arguments);
  return arguments;
}
test1 = test(1, 2.2, null, undefined, ['john', 'bill'], { name: 'John', age: 18 });
// Arguments(6) [1, 2.2, null, undefined, Array(2), {…}, callee: ƒ, Symbol(Symbol.iterator): ƒ]

test1 instanceof Array; // false
test1 instanceof Object; // true
```

- 箭头函数是不具有 arguments 的，之所以有时能访问到，其实是访问到的外层的普通函数的 arguments

7. Rest 参数
- 使用 ...rest 来接收所有传进来的参数，它是一个真正的数组。但是，需要注意的是，rest 参数必须放到参数列表的末尾

```js
function test(...args) {
  console.log(args);
  return args;
}
test1 = test(1, 2.2, null, undefined, ['john', 'bill'], { name: 'John', age: 18 });
//  [1, 2.2, null, undefined, Array(2), {…}]
test1 instanceof Array; // true
```

```js
function test(arg1,...args,arg2){
  console.log(arg1,args,arg2)
  return args
}
test(1,2,3,4,5)
// Uncaught SyntaxError: Rest parameter must be last formal parameter
```

8. spread 语法
- 扩展运算符，使用 ... 的方式来将可迭代对象展开到参数列表中，是很经常使用的一种方式

```js
let arr1 = [1, 2, 3, 4, 4, 1, 2, 2];
let arr2 = [...arr1];
let arr3 = [...new Set(arr1)];
```

- 与 rest 参数的区别是：一般 rest 参数都会出现在函数参数列表的最后，它会收集剩余的参数；而 ... 则出现在函数调用或类似的表达式中，它会将可迭代对象展开到列表中

9. new Function
- 这是另外一种用于创建函数的方式，但一般我们不使用它。它实际上是通过运行时通过传递过来的字符串创建的，它允许我们将任意字符串变为函数，可用于动态的获取代码或从模板编译函数时使用

```js
let fn = new Function([arg1,arg2,...,arg2],functionbody)
// arg1-argn 表示函数的参数，functionbody表示函数体

let fn1 = new Function('a','b','return a + b');
let fn2 = new Function('a,b','return a + b');
let fn3 = new Function('a , b','return a + b');
fn1(1,'a'); // 1a
fn2(1,'a'); // 1a
fn3(1,'a'); // 1a

// 也可以不设定参数，只传递函数体
let fn2 = new Function('return arguments[0] + arguments[1]');
console.log(fn2('a',2)); // a2
```

- 使用 new Function 创建的函数的 [[Environment]] 并不指向嵌套的函数词法环境，而是指向全局词法环境，所以，此种方式创建的函数无法访问 outer 指向的外部环境，因为该指向的值为 null

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

- 当必须通过一个字符串来创建一个函数。在编写脚本时我们不会知道该函数的代码（这也就是为什么我们不用常规方法创建函数），但在执行过程中会知道了。我们可能会从服务器或其他来源获取它

10. 函数的阶段
- 函数的定义阶段：在内存中开辟一个存储空间，将该存储空间的内存地址赋值给函数名。~~函数定义阶段不对变量进行解析，只能在被调用时才进行解析~~，会进行预解析
- 函数调用阶段：按照函数名的地址找到函数的存储空间，对形参赋值，进行全量解析，接着会在内存中开辟一个执行空间，将函数存储空间的代码拿出来在刚刚开辟的执行空间执行，执行完毕后，该开辟的执行空间将被销毁
- 函数的执行空间：每个函数都会有一个存储空间，但每次调用都会生成一个完全不一样的执行空间，执行空间会在函数执行完毕后被销毁，而存储空间不会

---
## 高阶函数
---

1. JS 的函数都指向某个变量，变量可以接收函数

- 函数的参数可以接受变量，因此这个变量也可以是一个函数，称之为高阶函数

2. 回调函数

- 回调函数是一个作为变量传递给另一个函数作为参数的函数，一般在主体函数执行完之后执行
- JS 中，函数也是对象。函数是用 `function()` 构造函数创建的 `function()实例对象`，可以存储在变量中，通过传参传递给另一个函数，在函数的内部创建，而函数中返回结果值

```js
function fn(callBack) {
  console.log('fn', this);
  callBack.call(this);
}
function fn1() {
  console.log('fn1', this);
}
fn(fn1);
// fn中的回调函数就是fn1
```

---

## 递归函数

---

1. 递归函数

- 表示在一个函数内部，反复调用自身的函数。一个没有尽头，无限调用的递归函数，被称为 `死递归`
- 递归的步骤：`初始化`，`自增`，`执行代码`，`条件判断`

```js
// 循环往复对自身进行调用
function func() {
  return func();
}
```

2. 用递归计算 1-n 的和

```js
// 计算1-n的和
function func(n) {
  if (n == 1) {
    return 1;
  } else if (n > 1) {
    return func(n - 1) + n;
  }
}
```

```js
function fn(n) {
  function calc_fn(n, res) {
    if (n === 1) {
      return res;
    }
    return calc_fn(n - 1, res + n);
  }
  return calc_fn(n, 1);
}
```

3. 斐波那契数列

```js
// 斐波拉契数列
function func(x) {
  if (x === 1 || x === 2) {
    return 1;
  } else {
    return fn(x - 1) + fn(x - 2);
  }
}
```

4. 汉诺塔游戏

```js
// 汉诺塔游戏
// 思路：
// 1. 先把a上n-1个盘子移动到b
// 2. 再把a上最后一个盘子移动到c
// 3. 再把b上所有盘子移动到c
function hanoi(n, x = 'A', y = 'B', z = 'C') {
  if (n == 1) {
    console.log(x + '-->' + z);
  } else {
    hanoi(n - 1, x, z, y);
    console.log(x + '-->' + z);
    hanoi(n - 1, y, x, z);
  }
}
n = prompt('请输入汉诺塔游戏的层数');
hanoi(n);
```

---

## 箭头函数

---

1. 箭头函数

- 箭头函数是 `ES6` 的新语法，它能让我们的代码编写更加简洁

2. 箭头函数的特性

- 箭头函数没有自己的 `this`，当在箭头函数内部访问 `this` 时，它会从外部环境进行获取。也就是说，箭头函数的 `this` 始终是函数定义时的 `this`，而非执行时

```js
function test(arg1, arg2) {
  const test1 = () => {
    console.log(this);
  };
  test1();
}
let obj = {
  name: 'Bob',
};
test.call(obj);
//  {name: "Bob"} 从外部获取的this
test();
// Window
```

```js
var o = {
  x: 1,
  func: function () {
    console.log(this.x); // 指向obj，属于对象方法
  },
  test: function () {
    setTimeout(function () {
      this.func(); //指向window
    }, 100);
  },
};
o.test(); // TypeError : this.func is not a function
// this的指向从o变为了全局
```

```js
// 修改一下代码
var o = {
  x: 1,
  func: function () {
    console.log(this.x);
  },
  test: function () {
    var _this = this;
    setTimeout(function () {
      _this.func();
    }, 100);
  },
};

o.test(); // 成功输出
```

```js
// 修改一下代码，使用箭头函数的方式
var o = {
  x: 1,
  func: function () {
    console.log(this.x);
  },
  test: function () {
    setTimeout(() => {
      this.func();
    }, 100);
  },
};

o.test();
// this指向o
```

```js
const obj = {
  fn: function () {
    console.log(this);
  },
  // 这个位置是箭头函数的上一行，但是不能打印出 this
  fun: () => {
    // 箭头函数内部的 this 是书写箭头函数的上一行一个可以打印出 this 的位置
    console.log(this);
  },
};
obj.fn(); // Obj
obj.fun(); // window
```

- 箭头函数中的 `this` 不会改变指向对象，`call` 和 `apply` 也不能改变 `this` 的指向，它们在箭头函数中无效

```js
var x = 1,
var o = {
  x : 10,
  test : () => this.x
};
o.test(); // 1
o.test.call(o); // 依然是1
```

- 不能对箭头函数进行 new 操作，也就是无法将箭头函数用作构造器使用
- 箭头函数没有 arguments，但它会从外部词法环境中获取 arguments

---

## 函数对象

---

1. 函数对象

- 在 js 中，函数也是对象，可以理解为一种可被调用的 `行为对象/action object`，不仅可以调用，还可以操作属性、按引用传递等

2. 函数对象的属性

- `name`：用于表示一个函数的名字，如果函数自己没有提供名字，那么在 `赋值` 中，会根据上下文来推测一个，规范中把这种特性叫做 `上下文命名`

```js
// 常规形式
function fn1() {
  console.log(fn1.name);
}
fn1(); // fn1

// 参数默认值
function fn2(fn3 = function () {}) {
  console.log(fn3.name);
}
fn2(); // fn3

// 对象方法
let obj = {
  name: 'obj',
  getName: function () {
    return obj.getName.name;
  },
};
obj.getName(); // getName

// 无法推测的情况
let arr = [function () {}];
console.log(arr[0].name); // '' 空字符串
```

- `length`：用于记载函数入参/形参的个数，并且 `...rest` 不参与该计数

```js
function fn1() {
  return fn1.length;
}
fn1(1, 2, 3, null, [1, 2, 3]);
// 0

function fn2(a, b, c) {
  return fn2.length;
}
fn2(1, 2, 3, null, [1, 2, 3]);
// 3

function fn4(a, b, c) {
  return fn4.length;
}
fn4(1);
// 3

function fn3(a, b, c, ...rest) {
  return fn3.length;
}
fn3(1, 2, 3, null, [1, 2, 3]);
// 3
```

- `自定义属性`：我们也可以叫它 `类属性/静态属性`，它发挥了函数作为对象存在的特性，因此我们可以在其中存储属性，它与定义在函数内部的变量是不一样的，需要注意区分
- 使用这种方式我们很轻易通过 `类.属性` 去修改它，而闭包内的变量只能通过返回的外部对象去修改，因此属性更加私有化

```js
function test() {
  function innertest() {
    return test.propertyA;
  }
  test.propertyA = 'test';
  console.log(innertest());
}
test(); // test
```

```js
// 用函数属性代替闭包
function test() {
  function innertest() {
    test.count++;
    return test.count;
  }
  test.count = 0;
  return innertest;
}

let outertest = test();
outertest(); // 1
outertest(); // 2

test.count += 1;
console.log(test.count); // 3 轻松修改
```

3. 命名函数表达式

```js
let fn1 = function fn2() {
  // ...
};
```

- 通过此种方式创建的函数表达式允许函数在内部引用自己，并且它在函数外部是不可见的，该名属于内部函数名，同时函数的 `name` 属性被修改为该内部名，可用于函数在自身内部进行自调用

```js
let fn1 = function fn2() {
  console.log(1);
  fn1();
};

let fn3 = fn1;
fn1 = null;
fn3(); // 将会报错
```

```js
let fn1 = function fn2() {
  console.log(1);
  fn2();
};

let fn3 = fn1;
fn1 = null;
fn3(); // 正常运行
fn3.name === fn2; // true
```

- 该特性只针对函数表达式，声明式函数不存在该特性，它没有用于添加内部名的语法
