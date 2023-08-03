---
title: 队列
date: 2020-03-30 17:18:00
categories: JavaScript
order: 2
tags:
  - 队列
  - JavaScript
  - 数据结构与算法
description:
---

## 队列

---

1. 队列是什么

- `队列` 是一种遵循先进先出 `FIFO` 原则的一组有序的项。队列在尾部添加元素，并从顶部移除元素。最新添加的元素必须排在队列的末尾
- 在 `js` 中，队列会用来处理异步事件的结果，每个异步事件会以排队的方式被主线程处理

2. 队列数据结构

- 我们可以使用基于 `数组` 的方式来创建一个队列，也可以使用基于 `对象` 的方式来创建，而 `对象` 的情况会更加高效。由于队列先进先出的原则，我们需要一个 `指针` 专门来指向当前的队列顶部元素。并且它具有以下方法

| 方法             | 作用                                            |
| ---------------- | ----------------------------------------------- |
| enqueue(element) | 添加一个或多个元素至队列尾部                    |
| dequeue          | 移除并返回队列的的第一项，即队列顶部的元素      |
| peek             | 将队列顶部的元素返回，但不对队列做任何修改      |
| isEmpty          | 判断队列是否为空，为空返回 true，否则返回 false |
| size             | 返回队列中的元素个数                            |

```js
class Queue {
  constructor() {
    this.#items = {};
    this.#count = 0;
    this.#lowsetCount = 0;
  }
}
```

- `enqueue(element)`：此方法用于向队列尾部添加元素，称之为 `入队`

```js
enqueue(element){
   this.#items[this.#count] = element
   this.#count++
}
```

- `dequeue`：此方法用于移除队列顶部的元素并返回，称之为 `出队`

```js
dequeue(){
   if(this.isEmpty()){
      return undefined
   }
   const res = this.#items[this.#lowsetCount]
   delete this.#items[this.#lowsetCount]
   this.#lowsetCount++
   return res
}
```

- `peek`：此方法用来查看队列最前端的元素，也就是当前指针所指向的元素

```js
peek(){
   if(this.isEmpty()){
      return undefined
   }
   return this.#items[this.lowsetCount]
}
```

- `isEmpty`：用于检查队列是否为空，这里与栈的有一些区别

```js
isEmpty(){
   return this.#count - this.#lowsetCount === 0
}
```

- `size`：用于返回队列中的元素个数，与栈的相关方法也有差异

```js
size(){
   return this.#count - this.#lowsetCount
}
```

- `clear`：用于清空队列中的所有元素并重置队列

```js
clear(){
   while(!this.isEmpty()){
      this.dequeue()
   }
}
```

```js
clear(){
   this.#items = {}
   this.#count = 0
   this.#lowsetCount = 0
}
```

- `toString`：此方法用于实现和 _Stack_ 类似的方法

```js
toString(){
   if(this.isEmpty()){
      return ''
   }
   let queueString = ''
   for(let i = this.#lowsetCount;i<this.count;i++){
      queueString += `${this.#items[i]}`+','
   }
   return queueString
}
```

- 完整队列结构

```js
class Queue {
  #items = {};
  #count = 0;
  #lowsetCount = 0;
  constructor() {}
  enqueue(element) {
    this.#items[this.#count] = element;
    this.#count++;
  }
  dequeue() {
    if (this.isEmpty()) {
      return undefined;
    }
    const res = this.#items[this.#lowsetCount];
    delete this.#items[this.#lowsetCount];
    this.#lowsetCount++;
    return res;
  }
  peek() {
    if (this.isEmpty()) {
      return undefined;
    }
    return this.#items[this.#lowsetCount];
  }
  isEmpty() {
    return this.#count - this.#lowsetCount === 0;
  }
  size() {
    return this.#count - this.#lowsetCount;
  }
  clear() {
    while (!this.isEmpty()) {
      this.dequeue();
    }
  }
  toString() {
    if (this.isEmpty()) {
      return '';
    }
    let queueString = '';
    for (let i = this.#lowsetCount; i < this.count; i++) {
      queueString += `${this.#items[i]}` + ',';
    }
    return queueString;
  }
}
```

---

## 双端队列数据结构

---

1. 双端队列

- 是一种允许我们同时从前端和后端添加和移除元素的特殊队列。由于它同时遵守了先进先出和后进先出的原则，可以说是把队列和栈相结合起来的一种数据结构
- 在计算机中，双端队列的一个常见应用是存储一系列的撤销操作。每当用户在软件中点击了一个操作，该操作会被存在一个双端队列中。当用户点击撤销按钮时，该操作会被从双端队列中弹出，表示它从后面被移除了；当进行了预先定义的一定数量的操作后，最先进行的操作会被从双端队列中的前端移除

2. 双端队列实现

- 创建 Deque 类

```js
class Deque {
  constructor() {
    this.#items = {};
    this.#count = 0;
    this.#lowsetCount = 0;
  }
}
```

- 由于双端队列允许在两端添加和移除元素，因此在队列的基础上会增加几个方法
- _`addFront`_：该方法在双端队列前端添加新的元素

```js
addFront (element) {
   if(this.isEmpty()){
      this.addBack(element)
   } else if(this.#lowestCount > 0){
      this.#lowestCount --;
      this.#items[this.#lowestCount] = element;
   } else {
      for(let i = this.#count;i>0;i--){
         this.#items[i] = this.#items[i-1];
      }
      this.#count++;
      this.#lowestCount = 0;
      this.#items[0] = element
   }
}
```

- 要将一个元素添加到双端队列的前端，存在三种情况。① 双端队列为空时，此时可以复用 _`addBack`_ 方法将元素添加到双端队列的后端，同时也是它的前端；② 在双端队列不为空时，有元素被从前端移除过，也就是 _lowestCount_ 属性会大于等于 1，因此我们只需要将 _lowestCount_ 减 1，并且将新元素放在 _lowestCount(新键)_ 的位置上即可；③ 在双端队列不为空时，且此时 _lowestCount_ 为 0 的情况下，此时我们需要设置一个负值的键，并且需要更新双端队列长度。我们可以将所有元素后移一位，但我们又不想丢失任意元素，因此我们需要从最后一位开始迭代，将每一个元素移动到它的索引加一的位置，在所有元素完成移动后，将新元素添加到第一位即可(此时第一位为空闲状态)

3. 完整双端队列

```js
class Deque {
  #items = {};
  #count = 0;
  #lowsetCount = 0;

  // 该方法在双端队列前端添加新的元素
  addFront(element) {
    if (this.isEmpty()) {
      this.addBack(element);
    } else if (this.#lowestCount > 0) {
      this.#lowestCount--;
      this.#items[this.#lowestCount] = element;
    } else {
      for (let i = this.#count; i > 0; i--) {
        this.#items[i] = this.#items[i - 1];
      }
      this.#count++;
      this.#lowestCount = 0;
      this.#items[0] = element;
    }
  }

  // 该方法在双端队列后端添加新的元素(与队列的enqueue方法相同)
  addBack(element) {
    this.#items[this.#count] = element;
    this.#count++;
  }

  // 该方法会从双端队列前端移除第一个元素(与队列的dequeue方法相同)
  removeFront() {
    if (this.isEmpty()) {
      return undefined;
    }
    const res = this.#items[this.#lowsetCount];
    delete this.#items[this.#lowsetCount];
    this.#lowsetCount++;
    return res;
  }

  // 该方法会从双端队列后端移除第一个元素(与栈的pop方法相同)
  removeBack() {
    if (this.isEmpty()) {
      return undefined;
    }
    this.#count--;
    const res = this.#items[this.#count];
    delete this.#items[this.#count];
    return res;
  }

  // 该方法返回双端队列前端的第一个元素(与队列的peek方法相同)
  peekFront() {
    if (this.isEmpty()) {
      return undefined;
    }
    return this.#items[this.#lowsetCount];
  }

  // 该方法返回双端队列后端的第一个元素(与栈的peek方法相同)
  peekBack() {
    if (this.isEmpty()) {
      return undefined;
    }
    return this.#items[this.#count - 1];
  }

  isEmpty() {
    return this.#count - this.#lowsetCount === 0;
  }

  size() {
    return this.#count - this.#lowsetCount;
  }

  clear() {
    while (!this.isEmpty()) {
      this.removeBack();
    }
  }

  toString() {
    if (this.isEmpty()) {
      return '';
    }
    let queueString = '';
    for (let i = this.#lowsetCount; i < this.count; i++) {
      queueString += `${this.#items[i]}` + ',';
    }
    return queueString;
  }
}
```

4. 双端队列应用

- example 击鼓传花游戏：多个人围成一个圆圈，把花尽快地传递给旁边的人，某一时刻传花停止，这个时候花在谁手里，谁就退出圆圈、结束游戏

```js
const hotPotato = (elementList, num) => {
  const _queue = new Queue();
  const elimitatedList = [];

  for (let i = 0; i < elementList; i++) {
    _queue.enqueue(elementList());
  }
  // 将所有参加游戏的人添加进队列

  while (_queue.size() > 1) {
    // 当队列的长度大于1时，游戏继续

    for (let i = 0; i < num; i++) {
      _queue.enqueue(_queue.dequeue());
    }
    // 拿过花的人将其添加到队尾(先进后出)

    elimitatedList.push(_queue.dequeue());
    // 次数到了，此时拿花的人被淘汰，添加到游戏参与者队列
  }

  return {
    eliminated: elimitatedList,
    winner: _queue.dequeue(),
  };
};
```

- example 回文检查器：回文是正反都能读通的单词、词组、数或一系列字符的序列

```js
const palindromeChecker = (astring) =>{
   if(astring === undefined || astring === null || (astring !=== null && astring.length === 0)) {
      return false
   }
   // 判断传入的字符串是否合法

   const _deque = new Deque();
   const lowserString = astring.toLocaleLowerCase().split(' ').join('');
   // 将所有字符串转化为小写，并移除其中的空白字符

   let isEqual = true;
   let firstChar,lastChar;

   for(let i = 0; i < lowserString.length; i++) {
      _deque.addBack(lowserString.charAt(i));
      // 往双端队列中添加所有的字符
   }

   while(_deque.size() > 1 && isEqual){
      firstChar = _deque.removeFront();
      lastChar = _deque.removeBack();
      if(firstChar !== lastChar) {
         isEqual = false
      }
      // 只要前后字符有一次不同，它就不是回文
      // 只有一个字符的情况下属于回文
   }

   return isEqual;
}
```

- example 任务队列：浏览器在处理多个任务时(渲染 html、执行 JavaScript 代码等)会使用队列来进行控制，这个行为被称作事件循环
