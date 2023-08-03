---
title: 继承
date: 2020-09-21 23:13:31
categories:
tags:
  - 前端
  - JavaScript
description:
---

## 继承

---
1. 继承是什么
- 继承可以使得子类具有父类别的各种属性和方法，而不需要再次编写相同的代码。继承是一个类从另一个类获取方法和属性的过程，他是对类的封装
- js 中实现继承的原理：复制父类的属性和方法来重写子类原型对象。引用「你不知道的JavaScript」中的话，继承意味着复制操作，然而 js 默认并不会复制对象的属性，相反，js 只是在两个对象之间创建了一个关联，这样，一个对象就可以通过委托访问另一个对象的属性和方法，所以与其叫继承，委托的说法反而更准确些

2. 构造函数的继承
- 构造函数的本质是在 new 内部实现的一个复制过程。因此，实现构造函数的继承，只需要将父级构造函数中的操作在子级构造函数中重现一遍即可

```js
// 1. 先定义一个父级构造函数
function Person(name, age) {
  this.name = name;
  this.age = age;
}

Person.prototype.getName = function () {
  return this.name;
};
```

```js
// 2. 实现继承
function Son(name, age, sex) {
  Person.call(this, name, age);
  this.sex = sex;
}
Son.prototype.getAge = function () {
  return this.age;
};
var s1 = new Son('Bob', 20, '男');
```

- 构造函数的继承，只能实现父类属性与方法的继承，也就是通过 this 声明的属性，无法继承父类的原型对象上的属性与方法

```js
s1.getName(); // s1.getName is not a function
Object.getPrototypeOf(Son.prototype) === Person.prototype; // false
Object.getPrototypeOf(Son.prototype) === Object.prototype; // true
```

3. 原型的继承
- 原型的继承，只需要将子级的原型对象设置为父级的一个实例对象，加入到原型链 中即可

```js
// 1. 先定义一个父级构造函数
function Person(name, age) {
  this.name = name;
  this.age = age;
}
Person.prototype.getName = function () {
  return this.name;
};
```

```js
// 2. 定义一个子类构造函数
function Son(name, age, sex) {
  this.sex = sex;
}
// 此时，子类Son的原型链上还没有getName的方法
```

```js
// 3. 实现原型对象方法上的继承
Son.prototype=new Person();
// 将中间对象指定为子类的原型对象，可以不指定constructor，因为仅仅是将该中间对象作为一个父子类连接的桥梁
var s1 =new Son('Bob',20,'男')
console.log(s1.getName())； // undefined
```

- 原型继承的缺点：一是父类使用 this 声明的属性会被所有实例共享，因为实例化的父类「Son.prototype=new Person()」是一次性赋值到子类实例的 原型(Son.prototype)上，因此父类通过 this 声明的属性也将赋值到 Son.prototype 上
- 二是创建子类实例时，无法向父类传参，可以理解为，无法实例化父类的成员属性并复制给子类

```js
function Person(name, age) {
  this.name = name;
  this.age = age;
}
Person.prototype.getName = function () {
  return this.name;
};
function Son(name, age, sex) {
  this.sex = sex;
}
Son.prototype = new Person();
Son.prototype.getAge = function () {
  return this.age;
};
var s1 = new Son('Bob', 20, '男');
s1; // Son {sex: "男"}
s1.getAge(); // undefined
// 父类构造函数上this指定的属性无法通过创建子类实例继承得到
```

4. 组合继承

- 借用构造函数的继承将父类通过 this 声明的属性和方法继承到子类实例上，借用原型的继承将父类的原型对象上的方法继承到子类的 prototype 上

```js
function Person(name, age) {
  this.name = name;
  this.age = age;
}
Person.prototype.getName = function () {
  return this.name;
};
// 2. 构造函数的继承
function Son(name, age, sex) {
  Person.call(this, name, age);
  this.sex = sex;
}
// 3. 原型的继承
Son.prototype = new Person();
Son.prototype.constructor = Son;
Son.prototype.getAge = function () {
  return this.age;
};
var s1 = new Son('Bob', 20, '男');
s1; // Son {name: "Bob", age: 20, sex: "男"}
Object.getPrototypeOf(s1) === Son.prototype; // true
Object.getPrototypeOf(Son.prototype) === Person.prototype; // true
```

- 组合继承的缺点：一是两次调用父类构造函数，导致父类通过 this 声明的属性和方法生成了两次，可能造成一定的性能损耗；二是在子类的原型对象上添加的属性/方法和父类的原型对象上添加的属性/方法都会存在于子类的原型对象中(父类的原型对象上的属性/方法会被子类的原型对象继承 )

5. 原型式继承

- 如果原型链的终点 Object.prototype 为原型链的 E(end)端，原型链的起点为 S(start)端
- 根据原型链的特点，处于 S 端的对象，可以通过 S -> E 的单向查找，访问到原型链上的所有方法与属性，这给继承提供了理论基础
- 所以我们只需在 S 端添加新的对象，那么新对象就能通过原型链访问到父级的方法与属性

```js
// 1. 先封装一个方法，该方法可以根据父类对象的原型创建一个实例，该实例将会作为子类对象的原型
function create(proto, options) {
  // 创建一个空对象
  var tmp = {};

  // 让这个新的空对象的原型指向父类的原型
  tmp.__proto__ = proto;

  // 传入的方法都挂载到新对象上，新的对象将作为子类对象的原型
  Object.defineProperties(tmp, options);
  return tmp;
}
```

```js
// 2. 使用该方法实现原型对象的继承
Student.prototype = create(Person.prototype, {
  // 不要忘了重新指定构造函数
  constructor: {
    value: Student
  }
  getGrade: {
    value: function() {
      return this.grade
    }
  }
})
```

```js
// 3. 完整代码
// 声明构造函数
function Person(name, age) {
  this.name = name;
  this.age = age;
}
// 通过prototype属性,将方法挂载到原型对象上
Person.prototype.getName = function () {
  return this.name;
};

function Student(name, age, grade) {
  // 构造函数继承
  Person.call(this, name, age);
  this.grade = grade;
}
function create(proto, options) {
  // 创建一个空对象
  var tmp = {};

  // 让这个新的空对象成为父类对象的实例
  tmp.__proto__ = proto;

  // 传入的方法都挂载到新对象上，新的对象将作为子类对象的原型
  Object.defineProperties(tmp, options);
  return tmp;
}
Student.prototype = create(Person.prototype, {
  // 不要忘了重新指定构造函数
  constructor: {
    value: Student,
  },
  getGrade: {
    value: function () {
      return this.grade;
    },
  },
});
var s1 = new Student('ming', 22, 5);
```

- 利用 Object.create 可以直接实现上面 create 方法的功能

```js
// 3. 完整代码
// 声明构造函数
function Person(name, age) {
  this.name = name;
  this.age = age;
}
// 通过prototype属性,将方法挂载到原型对象上
Person.prototype.getName = function () {
  return this.name;
};

function Student(name, age, grade) {
  // 构造函数继承
  Person.call(this, name, age);
  this.grade = grade;
}
Student.prototype = Object.create(Person.prototype, {
  // 不要忘了重新指定构造函数
  constructor: {
    value: Student,
  },
  getGrade: {
    value: function () {
      return this.grade;
    },
  },
});
var s1 = new Student('ming', 22, 5);
```

6. 寄生组合式继承(call+寄生式封装)
- 使用 call 继承父类 this 声明的属性/方法
- 通过寄生式封装函数设置父类 prototype为子类 prototype 的原型来继承父类的 prototype 声明的属性/方法
- 最成熟/常用的集成方法，避免了在子类 prototype 上创建不必要的多余的属性
- 只调用一次父类的构造函数，同时还保持了原型链上下文不变

```js
function Person(name, age) {
  this.name = name;
  this.age = age;
  this.getName = function () {
    return this.name;
  };
}
Person.prototype.getAge = function () {
  return this.age;
};
// 1. 借用构造函数继承父类的属性和方法
function Son(name, age, sex, address) {
  Person.call(this, name, age);
  // 使用call继承父类通过this声明的属性和方法
  this.sex = sex;
  this.address = address;
  this.getSex = function () {
    return this.sex;
  };
}
// 2. 寄生式继承,封装了son.prototype对象原型式继承father.prototype的过程，并且增强了传入的对象。
function inheritPrototype(son, father) {
  const fatherPrototype = Object.create(father.prototype);
  // 原型式继承：浅拷贝father.prototype对象 father.prototype为新对象的原型
  son.prototype = fatherPrototype;
  // 设置father.prototype为子类son.prototype的原型
  son.prototype.constructor = son;
  // 将子类的原型对象上的constructor指向为自身
}
inheritPrototype(Son, Person);
Son.prototype.getAddress = function () {
  return this.address;
};
const S1 = new Son('Bob', 20, '男', 'SZ');
```

7. ES6 extends 继承

- es5 实现 es6 继承

```js
// extends 核心代码
function _inherits(son, father) {
  // 原型式继承: 设置father.prototype为son.prototype的原型 用于继承father.prototype的属性/方法
  son.prototype = Object.create(father && father.prototype);
  son.prototype.constructor = son; // 修正constructor 指向
  // 将父类设置为子类的原型 用于继承父类的静态属性/方法(father.some)
  if (father) {
    Object.setPrototypeOf ? Object.setPrototypeOf(son, father) : (son.__proto__ = father);
  }
}
```

- 示例代码

```js
function Person(name, age) {
  this.name = name;
  this.age = age;
  this.getName = function () {
    return this.name;
  };
}
// 设置父类的静态属性/方法
Person.static_pro_one = 'static_one';
Person.static_pro_two = function () {
  console.log('我是Person的静态方法');
};
Person.prototype.getAge = function () {
  return this.age;
};
// 1. 借用构造函数继承父类的属性和方法
function Son(name, age, sex, address) {
  Person.call(this, name, age);
  this.sex = sex;
  this.address = address;
  this.getSex = function () {
    return this.sex;
  };
}
function _inherits(son, father) {
  // 原型式继承: 设置father.prototype为son.prototype的原型 用于继承father.prototype的属性/方法
  son.prototype = Object.create(father && father.prototype);
  son.prototype.constructor = son; // 修正constructor 指向
  // 将父类设置为子类的原型 用于继承父类的静态属性/方法(father.some)
  if (father) {
    Object.setPrototypeOf ? Object.setPrototypeOf(son, father) : (son.__proto__ = father);
  }
}
_inherits(Son, Person);
const S1 = new Son('Bob', 20, '男', 'SZ');
console.log(Son.static_pro_one); // static_one
```

8. es5 与 es6 继承的区别
- es5 的继承实质上是先创建子类的实例对象，再将父类的方法添加到 this 上
- es6 的继承是先创建父类的实例对象 this，再用子类的构造函数修改 this，因为子类没有自己的 this 对象，所以必须先调用父类的 super() 方法
