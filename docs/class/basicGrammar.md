---
title: 基础语法
date: 2020 05-07 12:25:48
categories: JavaScript
order: 2
tags:
  - class
  - JavaScript
description:
---

## class

---

1. 基本语法

- 通常，我们会使用 new function 的方式来批量创建相似地对象。es6 给出了一种更高级的类构造方式，它就是 class

```js
// class ClassObj {
//     constructor() {}
//     method() {}
// }
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
    this.getName = function () {
      return this.name;
    };
  }

  static name = 'Person';

  getMessage() {
    return "i 'm " + this.name + ',' + this.age + ' years age at toyear';
  }

  sayHi() {
    return 'Hi,i "m ' + this.name;
  }

};

let p1 = new Person('Jim', 15);
```

- 使用 new class 来实例化该类，new 会自动调用 constructor 函数。因此，constructor 可用于初始化对象自身的属性和方法。new class 被调用时，一个新的对象会被创建，同时 constructor 会使用给定的参数运行，并为其分配相应地属性

```diff
- var p1 = new Person('Jim',15)

+ Person {name: "Jim", age: 15, getName: ƒ}
-    age: 15
-    getName: ƒ ()
-    name: "Jim"
+    __proto__:
-        constructor: class Person
-        sayHi: ƒ sayHi()
-        getMessage: ƒ getMessage()
-       __proto__: Object
```

2. class 的本质

- 实际上，class 并不是 es6 的新特性，但它不单单是一种语法糖，它是一种函数

```js
class Person {
  constructor(name) {
    this.name = name;
  }
  getName() {
    return this.name;
  }
}
typeof Person; // function
Person instanceof Function; // true
```

- new class 被调用时，会使用 contructor 方法来实例化自身的属性，并将实例化的对象的原型指向该类的原型对象
- 与手动创建的差异有：一、通过 class 创建的函数具有 **特殊的内部属性标记 [[IsClassConstructor]]:true** ，该属性会指明该构造函数只能通过 new 来调用；而以字符串形式呈现时，通常以 class... 开头

```js
class Person {
  constructor(name) {
    this.name = name;
  }
  getName() {
    return this.name;
  }
}
function User(name) {
  this.name = name;
}
User.prototype.getName = function () {
  return this.name;
};

Object.toString.call(Person);
// "class Person{
//     constructor(name){
//         this.name = name
//     }
//     getName(){
//         return this.name
//     }
// }"

Object.toString.call(User);
// "function User(name){
//     this.name = name
// }"
```

- 二、类的方法不可被枚举，这是因为类的原型对象上的所有方法的 enumerable 都被设置成了 false

```js
Object.getOwnPropertyDescriptors(Person.prototype);
// constructor: {writable: true, enumerable: false, configurable: true, value: ƒ}
// getName: {writable: true, enumerable: false, configurable: true, value: ƒ}

Object.getOwnPropertyDescriptors(User.prototype);
// constructor: {writable: true, enumerable: false, configurable: true, value: ƒ}
// getName: {writable: true, enumerable: true, configurable: true, value: ƒ}
```

- 三、函数声明会出现提升的情况，而类声明/类表达式不会。因此，需要先声明类，再去使用它

```js
let u1 = new Person();
class User {}
// ReferenceError: User is not defined
```

```js
let u1 = new Person();
let User = class {};
// ReferenceError: User is not defined
```

- 四、类总是在其内部使用 use strict，也就是类构造函数中的所有代码都会进入严格模式。这意味着，当你调用静态或原型方法而没有指定 this 时，这个 this 会指向 undefined

```js
function User() {}

User.run = function () {
  return this;
};

User.prototype.stop = function () {
  return this;
};

let u1 = new User();

u1.stop(); // User {}

User.run(); // function User{...}

let [run, stop] = [User.run, u1.stop];

run(); // window
stop(); // window
```

```js
// 类
class User {
  constructor() {}
  static run() {
    return this;
  }
  stop() {
    return this;
  }
}

let u1 = new User();

u1.stop(); // User {}

User.run(); // class User{...}

let [run, stop] = [User.run, u1.stop];

run(); // undefined
stop(); // undefined
```

3. class 的其他特性

- 和函数一样，类可以在另外一个表达式中被定义，被传递，被返回，被赋值等

```js
let Person = class {
  sayHi() {
    return 'Hello World';
  }
};
```

- 另外，和函数命名表达式一样，我们可以给类起一个名字，该名字仅在类内部可见

```js
let Person = class PersonList {
  sayHi() {
    return 'Hello World ' + PersonList;
  }
};
console.log(PersonList); // Uncaught ReferenceError: PersonList is not defined

Person.name; // PersonList

let p1 = new Person();
p1.sayHi();

// "Hello World class PersonList {
//     sayHi(){
//         return 'Hello World ' + PersonList
//     }
// }"
```

- **公共字段**：可以让我们设定预定的属性，在被实例化时，它会为每一个实例化的独立对象中添加上该属性，而不是预设在类的原型对象或构造函数上

```js
let test = class {
  classname = 'network one'; // 预设属性

  getDescriptor = () => {
    return `${this.sex} from ${this.classname}`
  }

  constructor(sex, idcard) {
    this.sex = sex;
    this.idcard = idcard;
  }
  getName() {
    return this.name;
  }
};
let t1 = new test('Boy', 151231);
// test {classname: "network one", sex: "Boy", idcard: 151231}
```

- 注意：新特性中，class 中方法的写法不同，会导致不同的结果，如以下所示

```js
// 该方法会成为每一个实例化的对象的自由属性
class Button {
  constructor(value) {
    this.value = value;
    console.log(this);
  }
  click = () => {
    alert(this.value);
  };
}
let p1 = new Button('test');
// Button {value: 223, click: ƒ}
p1.hasOwnProperty('click'); // true
'click' in Object.getPrototypeOf(p1); // false
```

```js
// 该方法会被挂载到类的原型对象下
class Button {
  constructor(value) {
    this.value = value;
    console.log(this);
  }
  click() {
    alert(this.value);
  }
}
let p1 = new Button('test');
// Button {value: "test"}
p1.hasOwnProperty('click'); // false
'click' in Object.getPrototypeOf(p1); // true
```

- 我们还可以为 class 添加 `getter/setter` 属性，用于拦截该属性的存取行为

```js
class Person {
  #name;
  constructor(name) {
    this.#name = name;
  }
  get _name() {
    return this.#name;
  }
  set _name(val) {
    this.#name = val;
  }
}
```
