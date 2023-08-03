---
title: 通用拖拽模型
date: 2023-05-15 10:49:25
categories: drag
order: 2
tags:
  - 拖拽
  - 可视化
---

## 通用拖拽
---
1. 基于坐标系
- 在页面中的元素、鼠标等，它们的位置信息都是已知的，而这些信息都是基于页面中的一个坐标系(也就是x、y、z所组成的)来确定的
- 从拖拽的角度来说，就是从一个位置移动到另一个位置，而一般情况下元素的位置是根据它的样式是固定的，如果想要它移动，通常的做法是鼠标按下(目标元素) -> 鼠标移动(目标元素跟随移动) -> 鼠标抬起(停止移动)
- 那么，本质上改变的就是元素的位置信息(一般是x、y)。这里面的已知信息有：*鼠标移动的x轴、y轴信息*、*拖拽元素的位置信息*，那么其中拖拽元素的移动距离的变化率就等于鼠标的位置的变化率

```tsx
import React,{useRef,useState,useEffect} from "react";
import "./style/drag/singleDrag.scss";

const Drag:React.FC<{}> = (props) => {
	const maxMap = useRef({
		x:0,
		y:0
	});
	const page = useRef({
		x:0,
		y:0
	});
	const containerRef = useRef<HTMLDivElement | null>(null);
	const dragRef = useRef<HTMLDivElement | null>(null);

	const init = () => {
		maxMap.current.x = containerRef.current?.clientWidth! - dragRef.current?.clientWidth!;
		maxMap.current.y = containerRef.current?.clientHeight! - dragRef.current?.clientHeight!;
	}

	const mouseMove = (e:MouseEvent) => {
		e.stopPropagation();

		/**
		 * 计算拖拽元素应移动的距离
		 * */
		let x = e.pageX - page.current.x + dragRef?.current?.offsetLeft!
		let y = e.pageY - page.current.y + dragRef?.current?.offsetTop!;
		
		/**
		 * 边界值处理
		 * */
		if(x<=0) x = 0;
		if(y<=0) y = 0;
		if(x>=maxMap.current.x)x = maxMap.current.x;
		if(y>=maxMap.current.y)y = maxMap.current.y;

		/**
		 * 记录鼠标上次移动的位置信息
		 * */
		page.current.x = e.pageX;
		page.current.y = e.pageY;

		dragRef!.current!.style.top = y + 'px';
		dragRef!.current!.style.left = x + 'px';
	}

	const mouseDown:React.MouseEventHandler<HTMLDivElement> = (e) => {
		e.stopPropagation();

		page.current.x = e.pageX;
		page.current.y = e.pageY;
		containerRef.current?.addEventListener("mousemove",mouseMove);
		document.addEventListener("mouseup",mouseUp)
	}

	const mouseUp = () => {
		containerRef?.current?.removeEventListener("mousemove",mouseMove);
		document.removeEventListener("mouseup",mouseUp);
	}

	useEffect(()=>{
		init();
		return () => {
			mouseUp()
		}
	},[])

  return <div ref={containerRef} className="drag__container">
		<div onMouseDown={mouseDown} ref={dragRef} className="drag__rect"></div>
  </div>
}

export default Drag
```

2. 多个元素的拖拽
- 如果要涉及到多个元素的拖拽，我们就需要封装一套通用的逻辑，并且其中还涉及到每次选择某个元素进行拖拽时，该元素与其他元素的层级关系
- 先来封装一个拖拽类，它接收两个参数，一个是拖拽区域的 dom 节点，另一个是初始化时生成几个子级元素
- 位置相关的属性放在实例属性上，它是实例独有的(记录每个节点当前的位置信息)。层级关系(count)，每点击一个就要去改变它，相互关系是共享的。count 始终是最大值(共享)，每个元素有自己的独立的层级。每当要移动一个元素时，就将 count++，然后给当前移动的元素该层级即可(即当前实例最高的那一个)
- 实例化拖拽对象的时候，需要关注那些是需要做的，那些是不需要做的

```js
let zIndex = 0;

class DragElement {
	constructor(container,childlen) {
		// 获取父级区域dom节点
		this.container = document.querySelector(container);

		// 生成子级拖拽元素
		this.createElement(childlen);

		// 保存所有的拖拽子级元素
		this.nodeList = Array.from(this.container.children);

		// 获取拖拽区域的边界值
		this.offsetLeft = this.container.offsetLeft;
		this.offsetTop = this.container.offsetTop;

		// 初始化绑定事件
		this.init()
	}

	createElement(len,type) {

	}

	init() {

	}

}
```

- 接下来来完成其中创建元素的方法

```js
function randColor() {
	return `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`
}

class DragElement {
	// ...
	createElement(len) {
		const fragElement = document.createDocumentFragment();

		for(let i = 0;i<len;i++) {
			const child = document.createElement("div");
			child.className = `dragEle dragEle--${i}`;
			child.style.backgroundColor = randColor();
			child.style.top = i * 30 + 'px';
			child.style.cursor = "pointer";
			child.style.userSelect = "none";
			fragElement.appendChild(child);
		}

		this.container.appendChild(fragElement);
		// this.nodeList = Array.from(this.container.children);
	}
}
```

- 再来完成初始化绑定事件的方法，需要给每一个生成的子元素绑定鼠标按下事件，先来完成该方法

```js
let zIndex = 0;
let mousemoveListener = null;
let mousedownListener = [];
let mouseupListener = null;

class DragElement {
	// ...
	onMouseMove(node, event) {
		// 获取元素应移动的距离
		let x = event.pageX - this.startX - this.offsetLeft;
		let y = event.pageY - this.startY - this.offsetTop;
		
		// 处理边界条件
		let maxX = this.container.clientWidth - node.clientWidth;
		let maxY = this.container.clientHeight - node.clientHeight;

		if (x <= 0) x = 0;
		if (y <= 0) y = 0;
		if (x >= maxX) x = maxX;
		if (y >= maxY) y = maxY;

		node.style.top = y + 'px';
		node.style.left = x + 'px';
	}

	onMouseDown(node, event) {
		// 这里我们可以记录鼠标点在元素的哪个位置，这样就不用记录上一个鼠标的位置信息了
		this.startX = event.pageX - this.offsetLeft - node.offsetLeft;
		this.startY = event.pageY - this.offsetTop - node.offsetTop;

		// 每次选中那个元素，就将 zIndex 属性+1，这样每次选中的元素层级都是比其他兄弟节点高的
		node.style.zIndex = ++zIndex;

		// 绑定鼠标移动事件
		mousemoveListener = this.onMouseMove.bind(this, node);
		document.addEventListener("mousemove", mousemoveListener);
	}

	init() {
		let children = this.container.children;
		for (let i = 0; i < children.length; i++) {
			let mousedownCallback = this.onMouseDown.bind(this, children[i]);
			mousedownListener.push(mousedownCallback);
			// 方便统一进行解绑操作
			children[i].addEventListener("mousedown", mousedownCallback)
		}

		mouseupListener = () => {
			document.removeEventListener("mousemove", mousemoveListener)
		}

		document.addEventListener("mouseup", mouseupListener);

	}
}
```

- 现在已经可以进行多元素的拖拽了，并且层级关系也已处理好，但现在只能初始化，而不能后续添加；同时元素的边界可以初始化的时候存储起来，只需要在移动的时候去取就可以了

```js
const maxMapping = {};
class DragElement {
	// ...
	onMouseMove(node, event) {
		// 获取元素应移动的距离
		let x = event.pageX - this.startX - this.offsetLeft;
		let y = event.pageY - this.startY - this.offsetTop;
		
		// 处理边界条件
		const [maxX,maxY] = maxMapping[node.className];

		if (x <= 0) x = 0;
		if (y <= 0) y = 0;
		if (x >= maxX) x = maxX;
		if (y >= maxY) y = maxY;

		node.style.top = y + 'px';
		node.style.left = x + 'px';
	}
	init() {
		let children = this.container.children;
		for (let i = 0; i < children.length; i++) {
			let className = children[i].className;
			if (!maxMapping[className]) maxMapping[className] = [0, 0];
			maxMapping[className] = [
				this.container.clientWidth - children[i].clientWidth,
				this.container.clientHeight - children[i].clientHeight
			];
			let mousedownCallback = this.onMouseDown.bind(this, children[i]);
			mousedownListener.push(mousedownCallback);
			// 方便统一进行解绑操作
			children[i].addEventListener("mousedown", mousedownCallback)
		}

		mouseupListener = () => {
			document.removeEventListener("mousemove", mousemoveListener)
		}

		document.addEventListener("mouseup", mouseupListener);

	}

	createElement(len,type) {
		const fragElement = document.createDocumentFragment();

		let startIdx = type === "add" ? this.nodeList.length : 0;
		let endIdx = type === "add" ? (startIdx + len) : len;

		for(let i = startIdx;i < endIdx;i++) {
			const child = document.createElement("div");
			child.className = `dragEle dragEle--${i}`;
			child.style.backgroundColor = randColor();
			child.style.top = i * 30 + 'px';
			child.style.cursor = "pointer";
			child.style.userSelect = "none";
			fragElement.appendChild(child);
		}

		this.container.appendChild(fragElement);
		type === add && (this.nodeList = Array.from(this.container.children));
	}

	unBind() {
		document.removeEventListener("mouseup",mouseupListener);

		const children = this.nodeList;

		for(let i = 0;i< children.length;i++) {
			children[i].removeEventListener("mousedown",mousedownListener[i])
		}

		mousedownListener = []
	}

	appendElement(len = 1) {
		this.createElement(len,"add");
		this.unBind();
		this.init()
	}
}
```

3. 完整效果

```jsx
import React,{useEffect} from "react";
import "./style/drag/moreDrag.scss";

function randColor() {
	return `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`
}

const maxMapping = {};
let zIndex = 0;
let mousemoveListener = null;
let mousedownListener = [];
let mouseupListener = null;


class DragElement {

	constructor(container, childlen) {
		// 获取父级区域dom节点
		this.container = document.querySelector(container);

		// 生成子级拖拽元素
		this.createElement(childlen);

		// 保存所有的拖拽子级元素
		this.nodeList = Array.from(this.container.children);

		// 获取拖拽区域的边界值
		this.offsetLeft = this.container.offsetLeft;
		this.offsetTop = this.container.offsetTop;

		// 初始化绑定事件
		this.init()
	}
	createElement(len, type) {
		const fragElement = document.createDocumentFragment();

		let startIdx = type === "add" ? this.nodeList.length : 0;
		let endIdx = type === "add" ? (startIdx + len) : len;

		for (let i = startIdx; i < endIdx; i++) {
			const child = document.createElement("div");
			child.className = `dragEle dragEle--${i}`;
			child.style.backgroundColor = randColor();
			child.style.top = i * 30 + 'px';
			child.style.cursor = "pointer";
			child.style.userSelect = "none";
			fragElement.appendChild(child);
		}

		this.container.appendChild(fragElement);
		type === "add" && (this.nodeList = Array.from(this.container.children));
	}

	onMouseMove(node, event) {
		// 获取元素应移动的距离
		let x = event.pageX - this.startX - this.offsetLeft;
		let y = event.pageY - this.startY - this.offsetTop;

		// 处理边界条件
		const [maxX, maxY] = maxMapping[node.className];

		if (x <= 0) x = 0;
		if (y <= 0) y = 0;
		if (x >= maxX) x = maxX;
		if (y >= maxY) y = maxY;

		node.style.top = y + 'px';
		node.style.left = x + 'px';
	}

	onMouseDown(node, event) {
		this.startX = event.pageX - this.offsetLeft - node.offsetLeft;
		this.startY = event.pageY - this.offsetTop - node.offsetTop;

		node.style.zIndex = ++zIndex;
		node.innerText = `zIndex:${zIndex}`;
		mousemoveListener = this.onMouseMove.bind(this, node);
		document.addEventListener("mousemove", mousemoveListener);
	}

	init() {
		let children = this.container.children;
		for (let i = 0; i < children.length; i++) {
			let className = children[i].className;
			if (!maxMapping[className]) maxMapping[className] = [0, 0];
			maxMapping[className] = [
				this.container.clientWidth - children[i].clientWidth,
				this.container.clientHeight - children[i].clientHeight
			];
			let mousedownCallback = this.onMouseDown.bind(this, children[i]);
			mousedownListener.push(mousedownCallback);
			// 方便统一进行解绑操作
			children[i].addEventListener("mousedown", mousedownCallback)
		}

		mouseupListener = () => {
			document.removeEventListener("mousemove", mousemoveListener)
		}

		document.addEventListener("mouseup", mouseupListener);

	}

	unBind() {
		document.removeEventListener("mouseup", mouseupListener);

		const children = this.nodeList;

		for (let i = 0; i < children.length; i++) {
			children[i].removeEventListener("mousedown", mousedownListener[i])
		}

		mousedownListener = []
	}

	appendElement(len = 1) {
		this.createElement(len, "add");
		this.unBind();
		this.init()
	}
}

export default () => {
	useEffect(() => {
		const drag = new DragElement(".drag__container_1",4);
		console.log(drag)
	},[])

	return <div className="drag__container_1"></div>
}
```