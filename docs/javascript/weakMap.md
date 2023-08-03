---
title: WeakMap/WeakSet
date: 2020-12-27 23:48:49
sidemenu: true
toc: 'content'
order: 12
author: chencicsy
categories: JavaScript
tags:
  - WeakMap
  - WeakSet
  - JavaScript
  - 弱映射
  - 弱集合
description:
---

## WeakMap

---
1. 引用问题
- 对象类型在 js 中是以引用方式访问的，当该对象能被访问到或被使用，那么它就不会被垃圾回收机制回收

```js
let obj = { id: 1234, name: 'Tony', sex: 'boy' };
// 占据内存空间，可访问
let arr = [obj];
// 占据内存空间，被使用
obj = null;
/** 
  * 让变量obj的原本引用值失去引用，但由于obj原先引用的值被使用，因此不会被回收
*/
```

```js
let obj = { id: 1234, name: 'Tony', sex: 'boy' };
// 占据内存空间，可访问
let map = new Map();
map.set(obj, 'object');
// 占据内存空间，被使用
obj = null;
/** 
  * 让变量obj的原本引用值失去引用，但由于obj原先引用的值被使用，因此不会被回收
*/
```

- 在上述例子中，由于该值能被通过某种方式访问到，因此不会被垃圾回收机制回收

2. 与 Map 的区别
- Map 数据结构允许任意类型的值作为键，而 WeakMap 的 **键只能是对象，不能是原始值**，值可为任意类型
- 在 weakmap 中使用一个对象作为键，当其键所指对象没有其他地方引用的时候，该对象将会被从内存中自动清除
- weakMap 的键是 **不可被枚举** 的，也不支持迭代。因而 **不存在 iterator 接口**，使用需要遍历器对象的方法会报错
- 造成这种情况的原因是：当一个对象失去了引用，那么它会被垃圾回收机制回收，而在 weakMap 中，我们不确定或不知道该引用指向的内存空间何时会被回收。因此当我们访问键值的方法时，我们无法得知它是否被回收了

3. weakMap 的方法

| Api                     | 描述                                                             |
| ----------------------- | ---------------------------------------------------------------- |
| weakMap.get(key)        | 返回 key 对应的 value, key 不存在时返回 undefined                |
| weakMap.set(key, value) | 设置一组 key-value 关联对象，并返回这个 WeakMap 对象，可链式调用 |
| weakMap.delete(key)     | 移除 key 关联的 value                                            |
| weakMap.has(key)        | 判断 key 是否存在                                                |

4. weakMap 的使用场景
- 用于额外数据的存储：假如我们正在处理一个“属于”另一个代码的一个对象，也可能是第三方库，并想存储一些与之相关的数据，那么这些数据就应该与这个对象共存亡 —— 这时候 WeakMap 正是我们所需要的利器。我们将这些数据放到 WeakMap 中，并使用该对象作为这些数据的键，那么当该对象被垃圾回收机制回收后，这些数据也会被自动清除

```js
const privates = new WeakMap();

class Public {
  constructor(name, age) {
    const me = {
      name: name,
      age: age,
      counter: function () {
        return 'name: ' + this.name + ',age: ' + this.age;
      },
    };
    privates.set(this, me);
  }
}

Public.prototype.method = function (type) {
  const me = privates.get(this);
  if (type) {
    return me.counter();
  } else {
    throw new Error('pelease input type');
  }
  // 也可以在这里面处理一些其他的私有数据
};

let p1 = new Public('Bill', 23);
let p2 = new Public('Mary', 18);

p1.name; // undefined
p1.age; // undefined
p1.method('input'); // "name: Bill,age: 23"

p2.name; // undefined
p2.age; // undefined
p2.method('input'); // "name: Mary,age: 18"

export default Public;
```

- 此种情况下，由于 `privates` 未被导出，因此，其他的内容都是不可访问的，只能通过暴露的公共方法来进行访问，这也就达到了数据的私有化，提供了一种保护机制
- 用于缓存操作：当一个函数的结果需要被记住（“缓存”），这样在后续的对同一个对象的调用时，就可以重用这个被缓存的结果；当对象被垃圾回收时，对应的缓存的结果也会被自动地从内存中清除

---
## WeakSet
---

1. 与 Set 的区别
- Set 数据结构允许任意类型的值作为键，而 WeakSet 的 **键只能是对象，不能是原始值**，并且键是唯一的
- 对象只有在其它某个（些）地方能被访问的时候，才能留在 WeakSet 中。WeakSet 不支持迭代，也不存在 iterator 接口，因此使用需要遍历器对象的方法会报错

2. WeakSet 的方法

| Api                 | 描述                              |
| ------------------- | --------------------------------- |
| WeakSet.add(key)    | 添加一个新元素                    |
| WeakSet.delete(key) | 删除一个元素                      |
| WeakSet.has(key)    | 判断 weakset 中是否存在这个 value |

```js
let visitedSet = new WeakSet();

let john = { name: 'John' };
let pete = { name: 'Pete' };
let mary = { name: 'Mary' };

visitedSet.add(john); // John 访问了我们
visitedSet.add(pete); // 然后是 Pete
visitedSet.add(john); // John 再次访问

// visitedSet 现在有两个用户了

// 检查 John 是否来访过？
alert(visitedSet.has(john)); // true

// 检查 Mary 是否来访过？
alert(visitedSet.has(mary)); // false

john = null;

// visitedSet 将被自动清理
```

- 很明显的局限性就是不能迭代，并且无法获知所有当前内容，都不支持引用所有键或其计数的方法和属性。仅允许单个操作，但它们能够在其它地方管理/存储“额外”的对象数据

3. 破解循环引用
- 由于 Map、Set、WeakMap、WeakSet 中的元素都具有有序、唯一的性质，因此它们都可以用作破除循环引用的集合。但是，当我们处理大量对象类型的数据时，WeakMap、WeakSet 会比前两者更加好用

```js
// 创建一个函数，它通过执行某对象中的
function CrackCircularreference(data, fn, ref = null) {
  if (!ref) {
    ref = new WeakSet();
  }
  if (ref.has(data)) {
    return;
  }
  fn(data);
  if (typeof data === 'object') {
    ref.add(data);
    for (let key in data) {
      CrackCircularreference(data[key], fn, ref);
    }
  }
}

let obj1 = {
  name: 'Obj1',
};
let obj2 = {
  name: 'Obj2',
};
obj1.obj2 = obj2;
obj2.obj1 = obj1;

function fn(cont) {
  console.log(cont);
}

CrackCircularreference(obj1, fn);

// {name: "obj1", obj2: {…}}
// "obj1"
// {name: "obj2", obj1: {…}}
// "obj2"
```
