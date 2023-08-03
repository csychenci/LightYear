---
title: extends
date: 2021-03-09 12:25:48
categories: JavaScript
order: 3
tags:
  - class
  - JavaScript
  - extends
description:
---

## extends

---

1. 扩展类

- 在 es6 中，我们可以使用 extends 关键字去继承一个类，它使用了旧的原型机制来实现继承

```js
// 先创建一个基类
class Fruit {
  constructor(name, address, price) {
    this.name = name;
    this.address = address;
    this.price = price;
    this.getPrice = function () {
      return this.price;
    };
  }
  increasePrice(data) {
    this.price += data;
  }
}

// 创建一个继承至水果Fruit的西瓜类Watermelon
class Watermelon extends Fruit {
  get_season() {
    return 'summer';
  }
}

let fruit = new Fruit('fruit', 'earth', 3.5);
// Fruit {name: "fruit", address: "earth", price: 3.5, getPrice: ƒ}

let watermelon = new Watermelon('watermelon', 'china', 1.5);
// Watermelon {name: "watermelon", address: "china", price: 1.5, getPrice: ƒ}

watermelon.getPrice(); // 1.5

watermelon.increasePrice(8);
watermelon.price; // 9.5

watermelon.get_season(); // summer
```

- 从上面我们可以看到，extends 将 `Watermelon` 的 `prototype.__proto__` 设置成了 `Fruit.prototype`，继承关系如下

```js
Object.getPrototypeOf(Watermelon.prototype) === Fruit.prototype; // true

watermelon.__proto__ === Watermelon.prototype; // true

fruit.__proto__ === Fruit.prototype; // true
```

- 类语法不仅允许指定一个类，在 extends 后可以指定任意表达式

```js
function fn(data) {
  return class {
    constructor(data) {
      this.data = data;
    }
    getData() {
      return data;
    }
  };
}

class Fn1 extends fn('myClass') {}
// Fn1 继承至 fn的结果
```

2. super 关键字

- 当我们在子类中定义了与父类同名的方法时，在我们使用子类的实例去调用该方法时，总是会使用到子类或子类的 `原型对象` 上的方法，而不会寻找到父类上去
- 当我们需要调用父类的方法时，我们应该怎么办呢？`class` 提供了 `super` 关键字。我们可以使用 `super.method()` 来调用一个父类方法；或者使用 `super()` 来调用一个父类的 `constructor`，但只能在子类的 `constructor` 中调用

```js
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  getName() {
    return this.name;
  }
}

class User extends Person {
  getInfo() {
    return super.getName() + this.age;
  }
}

let user1 = new User('Jim', 18);

user1.getInfo(); // "Jim18"
```

- 在箭头函数中没有 `super`，但它可能会从外部函数中获取 `super`

```js
class Person {
  sayHi() {
    console.log('hello world');
  }
}

class User extends Person {
  start() {
    let fn = () => super.sayHi();
    fn();
  }
}

let u1 = new User();
u1.start(); // 'hello world'
```

3. constructor

- 一个类中只能出现一个 `constructor` 方法，多次构造函数的出现将会 `导致` 一个错误
- 对于基类来说，如果没有显式的指定构造方法，则使用默认构造函数

```js
class User {}
// 等价于 class User{
//     constructor(){

//     }
// }
```

- 当子类继承父类时，并且子类中没有自己的 `constructor`，那么它会生成一个空的 `constructor`，并且会在其中调用父类的 `constructor` 并传递所有的参数

```js
class Person {
  //...
}

class Son extends Person {}
// 等价于 class Son extends Person{
//     constructor(...args){
//         super(args)
//     }
// }
```

```js
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  sayHi() {
    console.log('hello world');
  }
}

class User extends Person {
  constructor(...args) {
    super(...args);
  }
}
// 简写方式：class User extends Person{}
```

- 当子类继承至父类时，并且子类中有自己的 `constructor` 时，一定要在 `this` 之前调用 `super()`

```js
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  sayHi() {
    console.log('hello world');
  }
}
class User extends Person {
  constructor(name, age, sex) {
    super(name, age);
    this.sex = sex;
  }
}
```

> 为什么必须调用 super？在 js 中，继承类(所谓的派生构造器，英文为 _derived constructor_) 的构造函数与其他函数之间是有区别的。派生构造器具有特殊的内部属性 **[[ConstructorKind]]:"derived"**。这是一个特殊的内部标签，它会影响它的 new 行为。当通过 new 执行一个常规函数时，它将创建一个空对象，并将这个空对象赋值给 this。但是当继承的 constructor 执行时，它不会执行此操作。它期望父类的 constructor 来完成这项工作。因此，派生的 constructor 必须调用 super 才能执行其父类(_base_)的 constructor，否则 this 指向的那个对象将不会被创建，并且我们会收到一个报错。来自 [现代 JavaScript 教程](https://zh.javascript.info/)

- 在类初始化时，父类构造器总是会使用它自己字段的值，而不是被重写的那一个。预设字段有以下初始化情况：一、对于基类(**还未继承任何东西的那种**)，在构造函数调用前初始化。二、对于 `派生类`，在 `super()` 后立刻初始化

```js
/** 
  * 1. 对于基类来说，预设字段在 constructor 调用之前初始化。也就是说，constructor 中是可以访问到的
  * 2. 对于派生类来说，预设字段在 super 之后才初始化。可以理解为此时 super 未调用，this 还没创建
*/
class Person {
  class_name = 'Person';
  constructor(name, age) {
    this.name = name;
    this.age = age;
    console.log(this.class_name);
  }
  sayHi() {
    console.log(this,'hello world');
  }
}
class User extends Person {
  class_name = 'User';
  constructor(name,age){
    super(name,age)
  }
}

new Person('tom', 18); // 'Person'
new User('jim', 20); // 'Person'
// 这种行为仅在一个被重写的字段被父类构造器使用时才会显现出来
```

4. [[HomeObject]]

- 这是一个 js 提供的特殊的内部属性，当一个函数被定义为 **`类`** 或者 **`对象方法`** 时，它的 `[[HomeObject]]` 属性就成为了该对象，而 super 会使用它来解析父类原型及其方法

```js
let user = {
  name: 'user',
  sayhi() {
    // user.sayhi.[[HomeObject]] == user
    return this.name;
  },
};

let person = {
  __proto__: user,
  sayhi() {
    // person.sayhi.[[HomeObject]] == person
    console.log(super.sayhi());
  },
};

person.sayhi(); // user
// 通过其 [[HomeObject]] 并且从其原型中获取父方法
```

- `[[HomeObject]]` 仅被用于 `super`，它是为类和普通对象中的方法定义的。但是对于对象而言，方法必须确切指定为 `method()`，而不是 `method: function()`。对象方法会记住它们的对象。`[[HomeObject]]` 不能被更改，所以这个绑定是永久的

```js
let user = {
  name: 'user',
  sayhi: function () {
    // user.sayhi.[[HomeObject]] == user
    return this.name;
  },
};

let person = {
  __proto__: user,
  sayhi: function () {
    console.log(super.sayhi());
    // 这里没有[[HomeObject]]，未设置 [[HomeObject]]属性，并且继承无效
  },
};

person.sayhi(); // 'super' keyword unexpected here
```

- 方法在内部的 `[[HomeObject]]` 属性中记住了它们的类/对象，因此，将一个带有 `super` 的方法从一个对象复制到另一个对象是不安全的
