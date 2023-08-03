---
title: 链表
date: 2020-12-25 00:11:12
categories: JavaScript
order: 3
tags:
  - 链表
  - JavaScript
  - 数据结构与算法
description:
---

## 链表结构

---

1. 结构

- 很多情况下，我们可以利用 _数组_ 存储多个元素。在大部分语言中(_JavaScript_ 除外)数组的大小都是固定的，因此从数组的起点或中间插入或移除项的成本很高，因为需要移动元素
- _链表_ 存储有序的元素集合，但不同于数组，链表中的元素在内存中并不是连续放置的。每个元素由一个存储元素本身的节点和一个指向下一个元素的引用(_指针或链接_)组成
- 对于传统的数组而言，链表在添加或移动元素的时候不需要移动其他元素。但是，链表需要使用指针；并且在数组中可以直接访问任何位置的任何元素，而要访问链表的某个元素，则需要从表头开始迭代链表，直到找到所需的元素
- 现实中链表的例子有：康佳舞队、列车组等

2. 普通链表

- 首先，来创建一个链表的骨架

```js
const defaultEqualFn = (x, y) => {
  return a === b;
};

class LinkedList {
  constructor(equalFn = defaultEqualFn) {
    this.count = 0; // 用于存储链表中的元素数量
    this.head = undefined; // 保存第一个元素的引用
    this.equalFn = equalFn; // 当要找链表中某个位置的元素时，需要进行比较，传入默认的比较方法
  }
}
```

- 我们还需要一个节点类，用于描述链表中的项

```js
class Node {
  constructor(element) {
    this.element = element; // 表示链表元素的值
    this.next = undefined; // 指向链表下一个元素的指针
  }
}
```

- 接着，我们为链表添加一些相关的方法
- `push(elememt)`：向链表尾部添加一个新元素

```js
push(element) {
  const node = new Node(element);
  // 根据传入的参数初始化链表项
  let current;
  if(this.head == null) {
  // 当链表项为空时，head会指向undefiend/null，那么就应该将head指向node，此时node的下一个元素指向为undefined
    this.head = node;
  } else {
  // 当链表不为空时，需要向链表的尾部添加元素，那么就需要先找到最后一个元素
    current = this.head;
    // 第一个元素的引用
    while(current.next != null) {
      // 循环访问找到链表的最后一项，当current的下一个元素指向为undefiend时，说明此时就是链表尾部了
      current = current.next;
    }
    current.next = node;
    // 将链表尾部元素的next指向node
  }
  this.count++;
}
```

- 当一个链表项被创建时，它的 `next` 指针总是指向 `undefined`，即它是链表的最后一项
- `removeAt(index)`：从链表中移除元素(根据特定位置移除)

```js
removeAt(index) {
  // 检查index是否越界
  if(index >= 0 && index <= this.count - 1){
    let current = this.head;

    if(index === 0) {
      // 当index === 0时，表明需要移除第一个元素
      // 此时只需要将head指向第一个元素的next就可以了，也就是this.head = this.head.next
      this.head = current.next;
    } else {
      // 移除其他位置的元素
      let prev;
      for(let i=0;i<index;i++){
        // 迭代链表以找到目标元素
        prev = current;
        // 保存前一个元素的引用
        current = current.next;
        // 保存当前元素引用
      }
      prev.next = current.next;
      // 将当前元素(current)的上一个元素(prev)的next(原来指向当前元素current)改为指向当前元素(current)的下一个元素指向next
    }
    this.count --;
    return current.element;
  }
  // 越界返回undefined
  return undefined;
}
```

- `getElementAt(index)`：根据目标索引找到对应节点

```js
getElementAt(index) {
  // 检查index是否越界
  if(index >= 0 && index <= this.count - 1){
    let node = this.head;
    for(let i = 0;i<index && node!=null;i++){
      // 迭代链表以找到目标元素
      node = node.next;
    }
    return node;
  }
  // 越界返回undefined
  return undefined;
}
```

- 使用上述的 `getElementAt` 重新构造 `removeAt` 方法

```js
removeAt(index) {
  // 检查index是否越界
  if(index >= 0 && index <= this.count - 1){
    let current = this.head;

    if(index === 0) {
      // 当index === 0时，表明需要移除第一个元素
      // 此时只需要将head指向第一个元素的next就可以了，也就是this.head = this.head.next
      this.head = current.next;
    } else {
      // 移除其他位置的元素
      const prev = this.getElementAt(index -1);
      current = prev.next;
      prev.next = current.next;
      // 将当前元素(current)的上一个元素(prev)的next(原来指向当前元素current)改为指向当前元素(current)的下一个元素指向next
    }
    this.count --;
    return current.element;
  }
  // 越界返回undefined
  return undefined;
}
```

- `insert(element,index)`：在任意位置插入元素

```js
insert(element,index) {
  if(index >=0 && index <= this.count) {
    const node = new Node(element);
    if(index === 0){
      // 表示在链表起点插入一个元素
      const current = this.head;
      // 引用链表第一个元素
      node.next = current.next;
      // 将待插入的元素的next指向current
      this.head = node;
      // 将表头指向为node
    } else {
      // 在链表中间或尾部插入
      const prev = this.getElementAt(index - 1);
      // 迭代列表，找到插入位置的前一个元素
      const current = prev.next;
      // 获取插入位置的元素的引用
      node.next = current;
      // 将插入元素的next指向current
      prev.next = node;
      // 将上一个元素的next指向node
    }
    this.count ++;
    return true;
  }
  return false;
}
```

- `indexOf(element)`：返回一个元素的位置

```js
indexOf(element){
  // 用一个变量来帮助我们循环访问列表，从表头开始
  let current = this.head;
  for(let i=0;i<this.count && current!==null;i++){
    // 验证传入的目标元素是否与当前节点的元素相等
    if(this.equalFn(element,current.element)){
      // 返回相应的位置
      return i;
    }
    // 当前位置元素不是我们要找的元素，迭代下一个链表节点
    current = current.next;
  }
  // 没找打目标，返回-1
  return -1;
}
```

- `remove(element)`：从链表中移除元素(根据目标元素)

```js
remove(element){
  // 根据目标元素找到它的位置
  const index = this.indexOf(element);
  // 调用removeAt根据位置删除该节点
  return this.removeAt(index)
}
```

- `size()`：返回链表的元素个数，链表的 `length` 是在内部控制的

```js
size(){
  return this.count
}
```

- `isEmpty()`：如果链表为空则返回 `true`，否则返回 `false`

```js
isEmpty(){
  return this.size() === 0
}
```

- `getHead()`：用于获取链表的头部节点

```js
getHead(){
  return this.head
}
```

- `toString()`：将链表转换成一个字符串输出

```js
toString(){
  if(this.head == null){
    // 链表为空返回一个空字符串
    return ''
  }

  let current = this.head.next;
  let str = '' + current.element;

  // 迭代链表每一个节点直到最后一个节点
  for(let i=0;i<this.size() && current!==null;i++){
    str += (',' + current.element);
    current = current.next
  }
  return str
}
```

3. 双向链表

- _双向链表_ 区别于 _普通链表_ 的地方在于：链表中，一个节点只有链向下一个节点的链接；而双向链表中，链接是双向的，一个链向下一个元素
- 双向链表在结构上具有两个指向(指针)，一个指向上一个节点，一个指向下一个节点，因此我们可以基于普通链表来创建

```js
// 定义双向链表节点类，继承至普通节点类
class DoublyNode extends Node {
  constructor(element, next, prev) {
    super(element, next);
    this.prev = prev;
  }
}
```

```js
// 定义双向链表类，继承至普通链表
class DoublyLinkedList extends LinkedList {
  constructor(equalFn = defaultEqual) {
    super(equalFn);
    this.tail = undefined;
    // 表示对最后一个节点的引用
  }
}
```

- 在普通链表中，如果迭代时错过了要找的元素，就需要回到起点，重新开始迭代，而双向链表则可以通过上一个节点/下一个节点的引用进行迭代
- 接着，我们为双向链表添加一些方法(重写一些方法)，普通链表只需要控制一个 `next` 指针，而双向链表需要同时控制 `prev` 和 `next` 两个指针
- `insert(element,index)`：向任意位置插入一个元素

```js
// 可以做一些改进，如当index>this.count/2时，就从尾部开始迭代，否则从头部开始迭代，可以减少迭代的次数
insert(element,index){
  if(index >=0 && index <=this.count){
    const node = new DoublyNode(element);
    let current = this.head;

    if(index === 0){
      // 在链表第一个位置插入节点
      if(this.head == null){
        // 如果链表为空，则将头部节点和尾部节点都指向新插入的节点即可
        this.head = node;
        this.tail = node;
      } else {
        // 如果链表不为空，则将head的prev指向新插入的节点，将node的next指向head，同时将this.head指向node
        node.next = this.head;
        current.prev = node;
        this.head = node;
      }
    } else if(index === this.count){
      // 在双向链表最后插入元素
      // 将尾部节点tail的next指向node，将node的prev指向tail
      // 将this.tail指向node
      current = this.tail;
      node.prev = current;
      current.next = node;
      this.tail = node;
    } else {
      // 在链表中间某个位置插入新节点
      const prev = this.getElementAt(index -1);
      // 迭代双向节点，找到该位置节点的上一个节点
      current = prev.next;
      // 获取当前位置的节点
      node.next = current;
      // 将node的next指向当前位置的旧节点
      current.prev = node;
      // 将当前位置的旧节点的prev指向node
      prev.next = node;
      // 将旧节点的上一个节点的next指向node
      node.prev = prev;
      // 将node的prev指向旧节点的上一个节点
    }
    this.count++;
    return true
  }
  return false;
}
```

- `removeAt(index)`：从任意位置删除节点

```js
removeAt(index){
  if(index>=0 && index<=this.count){
    let current = this.head;
    if(index === 0){
      // 当要删除第一个位置的节点时
      this.head = current.next;
      // 首先将this.head指向this.head的下一个节点(第一个节点失去引用)
      if(this.count === 1){
        // 链表只有一个元素，this.head.next === undefined。此时，this.head/tail === undefined
        this.tail = undefined;
      } else {
        // 链表有多个元素，this.head.prev指向undefined
        this.head.prev= undefined;
      }
    } else if(index === this.count - 1){
      // 删除链表最后一个元素
      // 将this.tail指向它的prev，并且将this.tail.next指向undefined
      current = this.tail;
      this.tail = current.prev;
      this.tail.next = undefined;
    } else {
      // 删除链表中间元素，即将该位置的上一个节点的next指向该位置的下一个节点，将该位置的下一个节点的prev指向该位置的上一个节点
      current = this.getElementAt(index);
      // 获取该位置的节点
      let prev = current.prev;
      // 获取该位置的节点的上一个节点
      prev.next = current.next;
      // 将prev的next指向current.next(当前位置的节点的下一个节点)
      current.next.prev = prev;
      // 将当前位置的节点的下一个节点的prev指向prev
    }
    this.count --;
    return current.element;
  }
  return undefined;
}
```

4. 循环链表

- 循环链表既可以像普通链表一样只有单向引用，也可以向双向链表一样有双向引用
- 区别于它们的是：普通循环链表的最后一个节点的 `next` 不是指向 `undefined`，而是链表的第一个元素 `head`
- 双向循环链表的最后一个节点的 `next` 指向链表的第一个元素 `head`，第一个节点的 `prev` 指向最后一个节点
- 首先，依旧依据普通链表进行创建循环链表

```js
class CircularLinkedList extends LinkedList {
  constructor(equalFn = defaultEqualFn) {
    super(equalFn);
  }
}
```

- 循环链表大部分方法可以复用链表的，但有一些方法需要重写 `insert(element,index)`：在任意位置插入元素

```js
insert(element,index){
  // 判断边界条件
  if(index>=0 && index <=this.count){
    const node = new Node(element);
    let current = this.head;
    if(index === 0){
      if(this.head == null){
        // 空链表情况下
        this.head = node;
        node.next = this.head;
        // 将新增节点指向头部节点
      } else {
        node.next = current;
        current = this.getElementAt(this.size());
        this.head = node;
        current.next = this.head;
        // 将最后一个节点的next指向头部节点
      }
    } else {
      const prev = this.getElementAt(index-1);
      node.next = prev.next;
      prev.next = node;
    }
    this.count++;
    return true;
  }
  return false;
}
```

- `removeAt(index)`：从任意位置删除节点

```js
removeAt(index){
  if(index>=0 && index<=this.count){
    let current = this.head;
    if(index === 0){
      if(this.size() === 1){
        this.head = undefined;
      } else {
        // 需要修改最后一个节点的指向
        const removed = this.head;
        current = this.getElementAt(this.size());
        // 获取最后一个节点的引用
        this.head = this.head.next;
        // 头部节点指向下一个节点
        current.next = this.head;
        // 最后一个节点的next指向新的头部节点
        current = removed;
      }
    } else {
      const prev = this.getElementAt(index -1);
      current = prev.next;
      prev.next = current.next;
    }
    this.count--;
    return current.element;
  }
  return undefined;
}
```

5. 有序链表

- 指的是保持元素有序的链表结构。除了需要使用排序算法以外，要将元素插入到正确的位置来保证链表的有序性

```js
const Compare = {
  LESS_THAN: -1,
  BIGGER_THAN: 1,
};

// 用于进行排序以保证链表的有序性
const defaultCompare = (a, b) => {
  if (a === b) {
    return 0;
  }
  return a < b ? Compare.LESS_THAN : Compare.BIGGER_THAN;
};

class SortedLinkerList extends LinkedList {
  constructor(equalFn = defaultEqual, compareFn = defaultCompare) {
    super(equalFn);
    this.compareFn = compareFn;
  }
}
```

- `insert(element,index)`：有序的插入元素

```js
getIndexNextSortedElement(element){
  // 迭代整个链表以找到合适的位置
  let current = this.head;
  let i=0;
  for(;i<this.size() && current;i++){
    const comp = this.compareFn(element,current.element);
    if(comp === Compar.LESS_THAN){
      // 当要插入的元素小于当前迭代的元素时，此时位置也就被找到了
      return i
    }
    current = current.next
  }
  return i
}
insert(element,index = 0){
  if(this.isEmpty()){
    return super.insert(element,0)
  }
  const targetIndex = this.getIndexNextSortedElement(elememt);
  return super.insert(element,targetIndex)
}
```

6. 根据链表创建其他的数据结构

- `栈`：后进先出。这里我们使用双向链表，栈最常操作的是尾部的节点，而双向链表保存有尾部的节点的引用，这样我们不用迭代整个链表，减少过程中性能的损耗，它的时间复杂度与原来的 `Stack` 实现相同(O(n))

```js
class StackLinkedList {
  constructor() {
    this.items = new DoublyLinkedList();
  }
  push(element) {
    this.items.push(element);
  }
  pop() {
    if (this.isEmpty()) {
      return undefined;
    }
    return this.items.removeAt(this.size() - 1);
  }
  peek() {
    if (this.isEmpty()) {
      return undefined;
    }
    return this.items.getElemetAt(this.size() - 1).element;
  }
  isEmpty() {
    return this.items.isEmpty();
  }
  size() {
    return this.items.size();
  }
  clear() {
    this.items.clear();
  }
  toString() {
    return this.items.toString();
  }
}
```

7. 结语

- 当需要添加和移除很多元素时，最好的选择就是链表，而非数组
