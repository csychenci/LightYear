---
title: 文档对象模型
date: 2020-04-26 09:12:56
categories: JavaScript
sidemenu: true
toc: 'content'
order: 22
author: chencicsy
tags:
  - 前端
  - JavaScript
  - 动态语言
description:
---


## Document 对象
---
1. 什么是文档对象模型
- 它是 js 提供的给用户操作 html 标签的一些能力，如获取一个元素、移除一个元素、创建一个元素、向页面里添加一个元素、给元素绑定一些事件、获取元素的属性、给元素添加一些 css 样式等
- dom 对象的核心就是 document 对象，该对象中存储着一些用来操作元素的方法。页面中的标签，在被获取到以后，这个对象就是 Dom 对象，此时可以直接操作此 DOM 元素的属性

2. DOM 节点
- 常用的有三大类，分别是：元素节点、文本节点、属性节点
- 通过方法获取到的元素就是元素（标签）节点，在标签中写的文字就是文本节点，写在每一个标签上的书写，就是属性节点

```html
<div id="box">盒子</div>
<!-- id 是属性节点，盒子是文本节点，div是元素节点 -->
```

---
## 元素的获取
---

1. getElementById
- 通过标签的 id 属性来获取标签。因为在 css 中，每一个 id 选择器都具有唯一性，因此只能获取到一个元素

```html
<body>
  <div id="box"></div>
  <script type="text/javascript">
    var oBox = document.getElementById('box');
    console.log(oBox); // <div id="box"></div>
  </script>
</body>
```

2. getElementsByClassName
- 通过标签的 class 属性来获取标签，css 中 class 选选择器可能有多个标签在使用，因此获取到的是一组元素，但不算真的数组，属于伪数组，有一个和数组一样的数据结构，按照索引排列

```html
<body>
  <div class="box"></div>
  <div class="box"></div>
  <script type="text/javascript">
    var oBox = document.getElementsByClassName('box');
    console.log(oBox); // HTMLCollection(2) [div.box, div.box] 0: div.box1: div.box length: 2 __proto__: HTMLCollection
    console.log(oBox[0]); // <div class="box"></div>
    console.log(oBox[1]); // <div class="box"></div>
  </script>
</body>
```

3. getElementsByTagName
- 通过标签的标签名称来获取标签，页面中标签也有多个，因此获取到的也是一组（伪）元素

```html
<body>
  <div class="box"><p></p></div>
  <div class="box"><p>我是第二个p标签</p></div>
  <script type="text/javascript">
    var oBox = document.getElementsByTagName('p');
    console.log(oBox[0]); // <p></p>
    console.log(oBox[1]); // <p>我是第二个p标签</p>
  </script>
</body>
```

4. querySelector
- 按照书写 css 样式的方式来获取元素，获取到页面中第一个满足条件的元素

```html
<body>
  <div class="box"><p>我是第一个p标签</p></div>
  <span>我是一个span标签</span>
  <div class="box"><p>我是第二个p标签</p></div>
  <span>我是一个span标签</span>
  <script type="text/javascript">
    var oDiv = document.querySelector('div');
    var oP = document.querySelector('p');
    var oSpan = document.querySelector('span');
    var oClass = document.querySelector('.box');
    console.log(oDiv); // <div class="box"><p>我是第一个p标签</p></div>
    console.log(oP); // <p>我是第一个p标签</p>
    console.log(oSpan); // <span>我是一个span标签</span>
    console.log(oClass); //<div class="box"><p>我是第一个p标签</p></div>
  </script>
</body>
```

5. querySelectorAll
- 按照书写 css 样式的方式来获取元素，获取到页面中所有满足条件的元素，返回一组（伪）元素

```html
<body>
  <div class="box"><p>我是第一个p标签</p></div>
  <span>我是一个span标签</span>
  <div class="box_2"><p>我是第二个p标签</p></div>
  <span>我是一个span标签</span>
  <script type="text/javascript">
    var oDiv = document.querySelectorAll('div');
    var oP = document.querySelectorAll('p');
    var oSpan = document.querySelectorAll('span');
    var oClass = document.querySelectorAll('.box');
    console.log(oDiv); // NodeList(2) [div.box, div.box]
    console.log(oP); // NodeList(2) [p, p]
    console.log(oSpan); // NodeList(2) [span, span]
    console.log(oClass); //NodeList [div.box]
  </script>
</body>
```

6. getElementsByName
- 类似于 getElementsByClassName，但是它查询元素的 name 属性，而不是 class 属性，返回的也是一组（伪）元素

```html
<body>
  <input type="checkbox" name="one" />
  <input type="checkbox" name="one" />
  <input type="checkbox" name="one" />
  <input type="checkbox" name="one" />
  <input type="checkbox" name="one" />
  <input type="checkbox" name="one" />
  <input type="checkbox" name="one" />
  <input type="checkbox" name="one" />
  <input type="checkbox" name="one" />
  <script type="text/javascript">
    var oIup = document.getElementsByName('one');
    console.log(oIup);
    // NodeList(9)0:
    // input1:
    // input2:
    // input3:
    // input4:
    // input5:
    // input6:
    // input7:
    // input8:
    // input
    // length: 9__proto__: NodeList
  </script>
</body>
```

7. document.forms
- 能够选中并获取到页面中的所有表单元素

```html
<body>
  <form action="" method="">
    <input type="text" name="" id="" value="" />
    <input type="button" name="" id="" value="" />
  </form>
  <form action="" method="">
    <input type="text" name="" id="" value="" />
    <input type="button" name="" id="" value="" />
  </form>
</body>
<script type="text/javascript">
  console.log(document.forms); // HTMLCollection(2) [form, form]
</script>
```

---
## 元素的属性
---

1. innerHTML
- 获取或设置某标签内的内部 html 结构（不包括它自身），当设置该属性时，原先存在的内部 html 内容将被覆盖（替换）

```html
<body>
  <div id="box">
    <span>内部结构</span>
    标签内结构
  </div>
</body>
<script>
  var box = document.querySelector('#box');
  console.log(box.innerHTML);
  // <span>内部结构</span>
  // 	标签内结构
</script>
```

- 可使用 `innerHTML+='HTML结构'`，不会替换原来的结构，会累加在后面

2. innerText
- 获取或设置元素内部的文本内容，只能获取到文本内容，获取不到 html 标签。在设置元素内部的文本时，设置的文本里面的标签不会被解析。该标签里面原先有的内部的 text 内容将被覆盖（替换）

```html
<body>
  <div id="box">
    <span>内部结构</span>
    标签内结构
  </div>
</body>
<script>
  var box = document.querySelector('#box');
  console.log(box.innerText);
  //内部结构 标签内结构
</script>
```

3. outerHTML
- 获取或设置当前元素自身的 html 结构，在设置时会将自己自身的结构进行替换

4. outerText
- 获取或设置当前元素本身的文本内容，不包含标签，在设置时会将自身的结构进行替换

5. getAttribute/removeAttribute/setAttribute
- getAttribute: 用于获取某个元素的属性，包含它的 **自定义属性**
- removeAttribute: 用于移除元素的某个属性

```html
<body>
  <div just="自定义属性" class="box">
    <p>我是第一个p标签</p>
    <p>我是第三个p标签</p>
  </div>
  <span>我是一个span标签</span>
  <div class="box_2"><p>我是第二个p标签</p></div>
  <span>我是一个span标签</span>
  <script type="text/javascript">
    var oDiv = document.querySelector('div');
    var oP = document.querySelector('.box_2');
    console.log(oDiv.getAttribute('class')); // box
    console.log(oDiv.getAttribute('just')); // 自定义属性
    oDiv.removeAttribute("class");
    console.log(oDiv); //<div><p>我是第一个p标签</p><p>我是第三个p标签</p></div>
    console.log(oP.getAttribute('class')); // box_2
  </script>
</body>
```

- setAttribute: 可以用于设置选中的元素的属性的属性值

```js
document.querySelector('#box').setAttribute('class', 'hbyid');
```

6. style
- 用于获取或设置元素的 css 样式，设置的样式会替换元素之前设置的样式(只会覆盖相同的声明)，且设置的样式为 **行内样式**。可以用 style.cssText 集中设置元素的 css 样式
- 通过该属性获取时，只能获取到内联样式，无法获取到内部样式和外部样式

```html
<body>
  <div class="box">
    <p>我是第一个p标签</p>
    <p>我是第三个p标签</p>
  </div>
  <span>我是一个span标签</span>
  <div class="box_2"><p>我是第二个p标签</p></div>
  <span>我是一个span标签</span>
  <script type="text/javascript">
    var oDiv = document.querySelector('div');
    /**
     * oDiv.style.width='300px';
     * oDiv.style.height='250px';
     * oDiv.style.backgroundColor='green';
     */

    oDiv.style.cssText = 'width:300px;height:250px;backgroundColor:green';
    console.log(oDiv); // <div class="box" style="width: 300px; height: 250px; background-color: green;"><p>我是第一个p标签</p><p>我是第三个p标签</p></div>
  </script>
</body>
```

7. className
- 获取或设置元素的类名，会覆盖之前设置的类名（不管有没有设置类名）;同样可以使用 _element.className += ' box'_，此种方式不会覆盖元素之前设置的类名(注意空格)

```html
<body>
  <div class="box">
    <p>我是第一个p标签</p>
    <p>我是第三个p标签</p>
  </div>
  <span>我是一个span标签</span>
  <div class="box_2"><p>我是第二个p标签</p></div>
  <span>我是一个span标签</span>
  <script type="text/javascript">
    var oDiv = document.querySelector('div');
    console.log(oDiv); // <div class="box"><p>我是第一个p标签</p><p>我是第三个p标签</p></div>
    oDiv.className = 'test'; // 给获取的元素的类名替换成test
    console.log(oDiv); // <div class="test"><p>我是第一个p标签</p><p>我是第三个p标签</p></div>
  </script>
</body>
```

8. scrollIntoView
- 该方法会滚动元素的父容器，使被 **调用** 该方法的元素 **对用户可见**
- `alignToTop`：参数，为一个布尔值。如果为 `false`，元素的顶端将和其所在滚动区的可视区域的顶端对齐。相应的 `scrollIntoViewOptions: {block: "start", inline: "nearest"}`，这是这个参数的默认值。如果为 `true`，元素的底端将和其所在滚动区的可视区域的底端对齐。相应的 `scrollIntoViewOptions: {block: "end", inline: "nearest"}`
- `scrollIntoViewOptions`：该对象包含以下属性

| 属性     | 属性值                         | 描述               |
| :------- | :----------------------------- | :----------------- |
| behavior | auto(缺省)/smooth              | 定义动画的过渡效果 |
| block    | start(缺省)/center/end/nearest | 定义垂直方向的对齐 |
| inline   | start/center/end/nearest(缺省) | 定义水平方向的对齐 |


```html
<style>
  .box {
    width: 45%;
    height: 100%;
    border: 1px solid #000000;
  }
  .content1,
  .content2 {
    width: 90%;
    height: 80%;
    margin: 5px auto;
    overflow-x: hidden;
    overflow-y: auto;
    text-indent: 2px;
    border: 1px solid #000000;
  }
  .but {
    display: flex;
    justify-content: space-between;
    width: 90%;
    height: 7%;
    margin: 0 auto;
  }
</style>
<body>
  <div style="width: 600px;height: 400px;display: flex;justify-content: space-around;">
    <div class="box">
      <div class="content1">
        <p>点击发送将内容发送到content2</p>
      </div>
      <div class="but">
        <input type="text" id="inp1" />
        <button type="button" id="bt1">发送</button>
      </div>
    </div>
    <div class="box">
      <div class="content2">
        <p>点击发送将内容发送到content1</p>
      </div>
      <div class="but">
        <input type="text" id="inp2" />
        <button type="button" id="bt2">发送</button>
      </div>
    </div>
  </div>
  <script type="text/javascript">
    var con1 = document.querySelector('.content1');
    var con2 = document.querySelector('.content2');
    var inp1 = document.querySelector('#inp1');
    var inp2 = document.querySelector('#inp2');
    var bt1 = document.querySelector('#bt1');
    var bt2 = document.querySelector('#bt2');
    var box = document.getElementsByClassName('box');
    bt1.onclick = function (e) {
      if (inp1.value.trim().length != 0) {
        var p = document.createElement('p');
        p.innerText = inp1.value;
        con2.appendChild(p);
        p.scrollIntoView(true);
      }
    };
    bt2.onclick = function (e) {
      if (inp2.value.trim().length != 0) {
        var p = document.createElement('p');
        p.innerText = inp2.value;
        con1.appendChild(p);
        p.scrollIntoView(false);
      }
    };
  </script>
</body>
```

9. select
- 用于表单元素 input 中，表示为发送或者触发某事件后选中框中文字获取焦点

```html
<body>
  <input type="button" value="click" />
  <input type="text" value="select" />
</body>
<script type="text/javascript">
  var btn = document.getElementsByTagName('input')[0];
  var inp = document.getElementsByTagName('input')[1];
  btn.addEventListener('click', function () {
    inp.select();
  });
</script>
```

---
## 元素的操作
---
1. createElement
- 创建一个可使用的、由标签名称 tagName 指定的 html 元素。如果 tagName 无法被识别，则会生成一个未知 html 元素(HTMLUnknownElement)

```js
let oBox = document.createElement('div');
```

2. createTextNode
- 创建一个包含文本内容的节点

```js
let oT = document.createTextNode('文本内容');
```

3. appendChild
- 向一个 **元素节点的子节点列表的末尾** 追加一个节点，需要配合 createElement 和 createTextNode 使用。使用 appendChild 创建的元素是动态的，而且是唯一的，无论对其创建的元素调用多少次，该元素都是属于根据最后一次被调用的节点来判断。也就是说，同时添加该元素，写在后面的节点将获得该元素，前面的不再拥有

```js
var oBox = document.createElement('div');
var oT = document.createTextNode('这里是一段文本');
oBox.innerHTML = '<p>这里是添加的p标签</p>';
oBox.appendChild(oT);
console.log(oBox);
// <div><p>这里是添加的p标签</p>这里是一段文本</div>
```

4. insertBefore(frontNode,behindNode)
- 将 frontNode 插入到 behindNode 的前面，并不一定需要 frontNode/behindNode 已经存在，可以是一个刚创建的节点

```js
var oBox = document.createElement('div');
var oT = document.createTextNode('这里是一段文本');
oBox.innerHTML = '<p>这里是添加的p标签</p>';
oBox.appendChild(oT);
console.log(oBox);
// <div><p>这里是添加的p标签</p>这里是一段文本</div>
var oSpan = document.createElement('span');
var oP = oBox.querySelector('p');
oBox.insertBefore(oSpan, oP);
console.log(oBox);
// <div><span></span><p>这里是添加的p标签</p>这里是一段文本</div>
```

- 针对 insertBefore 封装 insertAfter

```js
function insertAfter(parantNode, afterNode, node) {
  return parantNode.insertBefore(node, afterNode.nextSibling);
}
```

5. removeChild
- 移除某一节点下的某一节点，ie 下不支持该方法。兼容写法为 _node.remove()_

```js
var oBox = document.createElement('div');
var oT = document.createTextNode('这里是一段文本');
oBox.innerHTML = '<p>这里是添加的p标签</p>';
oBox.appendChild(oT);
console.log(oBox);
// <div><p>这里是添加的p标签</p>这里是一段文本</div>
var oSpan = document.createElement('span');
var oP = oBox.querySelector('p');
oBox.insertBefore(oSpan, oP);
console.log(oBox);
// <div><span></span><p>这里是添加的p标签</p>这里是一段文本</div>
oBox.removeChild(oP);
console.log(oBox);
// <div><span></span>这里是一段文本</div>
```

6. replaceChild
- 修改页面中的某一个节点(替换)

```html
<body>
  <div>
    <p>这是一个p标签</p>
    <span>这是一个span标签</span>
  </div>
  <script type="text/javascript">
    var oDiv = document.querySelector('div');
    var oP = document.querySelector('p');
    var oTEXT = document.createElement('text');
    oTEXT.innerHTML += '这是一个text标签';
    oDiv.replaceChild(oTEXT, oP);
    console.log(oDiv);
    // <div>
    // 		<text>这是一个text标签</text>
    // 		<span>这是一个span标签</span>
    //</div>
  </script>
</body>
```

7. getComputerStyle
- 该方法属于 Window 对象下的方法，可获取到 style 获取不到的外部样式和内部样式。它可用获取到内联与外部样式，但获取到的内容是 **只读** 的。在 ie 下使用 currentStyle 来获取外部样式
- 如果元素没有在 style 属性中设置宽高，也没有在样式表中设置宽高，那么 getcomputedstyle 可以获取到，而 currentStyle 不可以

```js
// 兼容写法
let eleMargin = window.getComputerStyle
  ? window.getComputerStyle(element).margin
  : element.currentStyle.margin;
```

```html
<style type="text/css">
  .box {
    width: 200px;
    height: 150px;
    margin: 50px auto;
  }
</style>
<body>
  <div class="box" style="background: pink;">
    <p>这是一个p标签</p>
    <span>这是一个span标签</span>
  </div>
  <script type="text/javascript">
    var oDiv = document.querySelector('.box');
    console.log(window.getComputedStyle(oDiv).margin); // 50px 382px
    console.log(window.getComputedStyle(oDiv).background); // rgb(255, 192, 203) none repeat scroll 0% 0% / auto padding-box border-box
    console.log(window.getComputedStyle(oDiv).width); // 200px
    console.log(window.getComputedStyle(oDiv).height); // 150px
  </script>
</body>
```

8. 文档碎片
- 当我们向页面中插入节点时，页面会 **更新并反映这个变化**。少量的插入时，我们一般会使用循环的方式进行插入。当需要向页面中添加大量数据时，逐条进行插入，会显得非常缓慢
- 这时可以利用到 createDocumentFragment 方法，该方法可以创建一个文档碎片，把要插入的新节点先附加到它上面，在一次性添加到节点上，这种方法能使浏览器的性能很明显地提高

```js
//先创建文档碎片
var oFragmeng = document.createDocumentFragment();
for (var i = 0; i < 10000; i++) {
  var ospan = document.createElement('span');

  var oText = document.createTextNode(i);

  ospan.appendChild(oText);
  //先附加在文档碎片中
  oFragmeng.appendChild(ospan);
}
//最后一次性添加到节点中
document.body.appendChild(oFragmeng);
```

9. cloneNode
- 复制某节点，并将复制出来的节点作为返回值。参数为 _true_ 时，完全复制该节点(包括该节点下的子元素)；否则，仅复制自身，内部的子节点不参与复制过程

```html
<body>
  <div>
    外部文本
    <p>内部文本</p>
  </div>
</body>
<script type="text/javascript">
  var eleDiv = document.querySelector('div');
  var eleDiv1 = eleDiv.cloneNode(true);
  document.body.appendChild(eleDiv1);
</script>
```

---
## 节点的获取
---

1. childNodes
- 获取某节点下的所有子一级节点，返回的是一个伪数组。包含 **文本节点** 与 **元素节点**，不包含 **属性节点**

```html
<body>
  <div class="box">
    <p>我是第一个p标签</p>
    <p>我是第三个p标签</p>
  </div>
  <span>我是一个span标签</span>
  <div class="box_2">
    <p>我是第二个p标签</p>
  </div>
  <span>我是一个span标签</span>
  <script type="text/javascript">
    var oDiv = document.querySelector('div');
    console.log(oDiv.childNodes);
    // NodeList(5) [text, p, text, p, text]
    // 0: text // div与p标签之间的换行和空格，属于文本节点，第一个子节点
    // 1: p // p标签，属于元素节点，第二个节点
    // 2: text // p标签与p标签之间的换行和空格，属于文本节点，第三个子节点
    // 3: p // p标签，属于元素节点，第四个节点
    // 4: text // p标签与div标签之间的换行和空格，属于文本节点，第五个子节点
    // length: 5
    // __proto__: NodeList
  </script>
</body>
```

2. children
- 获取某节点下的所有子一级节点中的 **元素节点**，返回一个伪数组

```html
<body>
  <div class="box">
    <p>我是第一个p标签</p>
    <p>我是第三个p标签</p>
  </div>
  <span>我是一个span标签</span>
  <div class="box_2">
    <p>我是第二个p标签</p>
  </div>
  <span>我是一个span标签</span>
  <script type="text/javascript">
    var oDiv = document.querySelector('div');
    console.log(oDiv.children);
    // HTMLCollection(2) [p, p]
    // 0: p // 第一个元素节点，是一个p标签
    // 1: p // 第二个元素节点，是一个p标签
    // length: 2
    // __proto__: HTMLCollection
  </script>
</body>
```

3. firstChild
- 获取某节点下的第一个子一级节点

```html
<body>
  <div class="box">
    <p>我是第一个p标签</p>
    <p>我是第三个p标签</p>
  </div>
  <span>我是一个span标签</span>
  <div class="box_2">
    <p>我是第二个p标签</p>
  </div>
  <span>我是一个span标签</span>
  <script type="text/javascript">
    var oDiv = document.querySelector('div');
    console.log(oDiv.firstChild); // #text 第一个子节点,是一个文本节点,也就是div和p之间的换行符和空格
  </script>
</body>
```

4. lastChild
- 获取某节点下最后一个子一级节点

```html
<body>
  <div class="box">
    <p>我是第一个p标签</p>
    <p>我是第三个p标签</p>
  </div>
  <span>我是一个span标签</span>
  <div class="box_2">
    <p>我是第二个p标签</p>
  </div>
  <span>我是一个span标签</span>
  <script type="text/javascript">
    var oDiv = document.querySelector('div');
    console.log(oDiv.lastChild); // #text 最后一个子节点,是一个文本节点,也就是div和p之间的换行符和空格
  </script>
</body>
```

5. firstElementChild
- 获取某节点下第一个子元素节点

```html
<body>
  <div class="box">
    <p>我是第一个p标签</p>
    <p>我是第三个p标签</p>
  </div>
  <span>我是一个span标签</span>
  <div class="box_2">
    <p>我是第二个p标签</p>
  </div>
  <span>我是一个span标签</span>
  <script type="text/javascript">
    var oDiv = document.querySelector('div');
    console.log(oDiv.firstElementChild); // <p>我是第一个p标签</p>
  </script>
</body>
```

6. lastElementChild
- 获取某节点下最后一个子元素节点

```html
<body>
  <div class="box">
    <p>我是第一个p标签</p>
    <p>我是第三个p标签</p>
  </div>
  <span>我是一个span标签</span>
  <div class="box_2">
    <p>我是第二个p标签</p>
  </div>
  <span>我是一个span标签</span>
  <script type="text/javascript">
    var oDiv = document.querySelector('div');
    console.log(oDiv.lastElementChild); // <p>我是第三个p标签</p>
  </script>
</body>
```

7. nextSibling
- 获取某一节点的下一个同级节点

```html
<body>
  <div class="box">
    <p>我是第一个p标签</p>
    <p>我是第三个p标签</p>
  </div>
  <span>我是一个span标签</span>
  <div class="box_2">
    <p>我是第二个p标签</p>
  </div>
  <span>我是一个span标签</span>
  <script type="text/javascript">
    var oDiv = document.querySelector('div');
    console.log(oDiv.nextSibling); // #text 下一个节点为div与span之间的换行符和空格
  </script>
</body>
```

8. previousSibling
- 获取某一节点的上一个同级节点

```html
<body>
  <div class="box">
    <p>我是第一个p标签</p>
    <p>我是第三个p标签</p>
  </div>
  <span>我是一个span标签</span>
  <div class="box_2">
    <p>我是第二个p标签</p>
  </div>
  <span>我是一个span标签</span>
  <script type="text/javascript">
    var oDiv = document.querySelector('div');
    console.log(oDiv.previousSibling); // #text 上一个节点为div与body之间的换行符和空格
  </script>
</body>
```

9. nextElementSibling
- 获取某一节点的下一个同级元素节点

```html
<body>
  <div class="box">
    <p>我是第一个p标签</p>
    <p>我是第三个p标签</p>
  </div>
  <span>我是一个span标签</span>
  <div class="box_2">
    <p>我是第二个p标签</p>
  </div>
  <span class="span_1">我是一个span标签</span>
  <script type="text/javascript">
    var oP = document.querySelector('.box_2');
    console.log(oP.nextElementSibling); //  <span class="span_1">我是一个span标签</span>
  </script>
</body>
```

10. previousElementSibling
- 获取某一节点的上一个同级元素节点

```html
<body>
  <div class="box">
    <p>我是第一个p标签</p>
    <p>我是第三个p标签</p>
  </div>
  <span>我是一个span标签</span>
  <div class="box_2">
    <p>我是第二个p标签</p>
  </div>
  <span>我是一个span标签</span>
  <script type="text/javascript">
    var oP = document.querySelector('.box_2');
    console.log(oP.previousElementSibling); // <span>我是一个span标签</span>
  </script>
</body>
```

11. attributes
- 获取某个元素节点下的所有属性节点

```html
<body>
  <div class="box" id="boxone" title="i">
    <p>我是第一个p标签</p>
    <p>我是第三个p标签</p>
  </div>
  <span>我是一个span标签</span>
  <div class="box_2">
    <p>我是第二个p标签</p>
  </div>
  <span class="span_1">我是一个span标签</span>
  <script type="text/javascript">
    var oP = document.querySelector('.box');
    console.log(oP.attributes);
    //NamedNodeMap {0: class, 1: id, 2: title, class: class, id: id, title: title, length: 3}
    //0: class
    //1: id
    //2: title
    //length: 3
    //class: class
    //id: id
    //title: title
  </script>
</body>
```

12. parentNode
- 获取某一节点的父节点

```html
<body>
  <div class="box" id="boxone" title="i">
    <p>我是第一个p标签</p>
    <p>我是第三个p标签</p>
  </div>
  <span>我是一个span标签</span>
  <div class="box_2">
    <p>我是第二个p标签</p>
  </div>
  <span class="span_1">我是一个span标签</span>
  <script type="text/javascript">
    var oP = document.querySelector('p');
    var oParentNode = oP.parentNode;
    console.log(oParentNode);
    //<div class="box" id="boxone" title="i">
    //<p>我是第一个p标签</p>
    //<p>我是第三个p标签</p>
    //</div>
  </script>
</body>
```

13. 不同节点之间的区别

|    -     | nodeType |  nodeName  | nodeValue |
| :------: | :------: | :--------: | :-------: |
| 元素节点 |    1     | 大写标签名 |   null(不存在nodeValue)    |
| 属性节点 |    2     |   属性名   |  属性值   |
| 文本节点 |    3     |   #text    | 文本内容  |
| 注释节点 |    8     |  #comment  | 注释内容  |

- 当 nodeType === 1 时，nodeName 可用 tagName 来表示，即获取到元素节点

```html
<body>
  <div class="box" id="boxone" title="i">
    <p>我是box内第一个p标签</p>
    <p>我是box内第二个p标签</p>
    <p>我是box内第三个p标签</p>
  </div>
  <span>我是一个span标签</span>
  <div class="box_2">
    <p>我是第二个p标签</p>
  </div>
  <span class="span_1">我是一个span标签</span>
  <script type="text/javascript">
    var oBox = document.querySelector('.box'); // 获取到类名为box的元素
    var oP = document.querySelector('p'); // 获取第一个为p的元素,它处于.box内
    console.log(oBox.nodeType); // 1
    console.log(oBox.nodeName); // p
    console.log(oBox.nodeValue); // null
    var oBox_first = oBox.firstChild; // 获取.box下第一个子级节点
    console.log(oBox_first.nodeType); // 3
    console.log(oBox_first.nodeName); // #text
    console.log(oBox.nodeValue); // null
    var oBox_attr = oBox.attributes; // 获取oBox的所有属性节点
    console.log(oBox_attr[0].nodeName); // class
    console.log(oBox_attr[0].nodeValue); // box
    console.log(oBox_attr[0].nodeType); // 2
    console.log(oBox_attr[1].nodeName); // id
    console.log(oBox_attr[1].nodeValue); // boxone
    console.log(oBox_attr[1].nodeType); // 2
    console.log(oBox_attr[2].nodeName); // title
    console.log(oBox_attr[2].nodeValue); // i
    console.log(oBox_attr[2].nodeType); // 2
  </script>
</body>
```
