---
title: canvasApi
date: 2023-05-15 10:49:25
categories: drag
order: 4
tags:
  - canvas
  - 可视化
---


## Canvas速成思路
---
1. 点线矩形
- 大部分情况下，我们会绘制矩形、点、直线、曲线等，让它们组合去展示一些数据，而这些形状也是基于 **坐标系** 而存在。如直线是两个坐标点(x1,y1,x2,y2)的连接、矩形则是一个起点(x,y)和宽高(width,height)构成
- 而 html5 的新标签 canvas 提供了这样一个简单的使用方式，通过创建一个固定大小的画布，并且提供了多个上下文(可以理解为画笔)，我们可以用这个上下文去处理或绘制我们想要展示的内容

2. 常用 api
- `canvas.getContext("2d")`: 获取 canvas 2d上下文对象
- `beginPath()`: 新建一个笔画。需要注意一点的是，如果不重置画笔，会出现 **上一个图形的终点连着下一个图形的起点** 的情况
- `moveTo(x,y)`: 将笔画移到起点(x,y)，相当于将画笔放到画布上了
- `lineTo(x,y)`: 将笔画从起点移动到另一个点(x,y)。如果想要画折线的话，就需要多次移动(lineTo)
- `stroke()/fill()`: stroke 为绘制的内容添加一个轮廓(描边)。fill 将路径的中间填满（如果起点与终点不闭合，会自动闭合）
- `closePath()`: 可以对起点和终点进行闭合

```jsx
import React,{useEffect} from "react";

export default () => {
    useEffect(()=>{
        const canvas_1 = document.getElementById("canvas_1");
        const ctx = canvas_1.getContext("2d");
        ctx.save();
        ctx.strokeStyle = "orange";
        ctx.lineCaps = "round";
        ctx.beginPath();
        ctx.moveTo(50,50);
        ctx.lineTo(100,100);
        ctx.lineTo(150,100);
        ctx.stroke();
        
        ctx.restore()
        ctx.beginPath();
        ctx.moveTo(0,0);
        ctx.lineTo(40,40);
        ctx.lineTo(100,40);
        ctx.fill();


    },[])
    return <canvas id="canvas_1" width="400" height="300"></canvas>
}
```

- `rect(startx,starty,width,height)`: 绘制一个矩形，传入起点x、y坐标以及宽高
- `strokeRect(startx,starty,width,height)`: 它等于 rect + stroke
- `fillRect(startx,starty,width,height)`: 它等于 rect + fill
- `clearRect(startx,starty,width,height)`: 可以擦除矩形的一部分，类似于橡皮擦

```jsx
import React,{useEffect} from "react";

export default () => {
    useEffect(()=>{
        const canvas_1 = document.getElementById("canvas_2");
        const ctx = canvas_1.getContext("2d");
        ctx.beginPath();
        ctx.rect(20,20,100,70);
        ctx.stroke();

        ctx.beginPath();
        ctx.fillRect(20,100,100,70);

        ctx.beginPath();
        ctx.fillRect(130,20,100,70);
        ctx.clearRect(135,25,90,60)
    },[])
    return <canvas id="canvas_2" width="400" height="300"></canvas>
}
```

- `arc(x,y,r,startAngle,endAngle,anticlockwise)`: 圆心(x,y),半径 r, startAngle、endAngle 分别表示画圆开始的角度和终止的角度(**弧度制**)，这个角度从 x 的正半轴开始算，anticlockwise 表示顺逆时针(默认 false 为顺时针)

```jsx
import React,{useEffect} from "react";

export default () => {
    useEffect(()=>{
        const canvas_1 = document.getElementById("canvas_3");
        const ctx = canvas_1.getContext("2d");
        ctx.beginPath();
        ctx.arc(200,50,50,0,Math.PI * 2);
        ctx.fill()

        ctx.beginPath();
        ctx.arc(100,150,50,0,Math.PI);
        ctx.fill();

        ctx.beginPath();
        ctx.arc(200,150,50,0,Math.PI /2);
        ctx.lineTo(200,150);
        ctx.closePath();
        ctx.stroke()

    },[])
    return <canvas id="canvas_3" width="400" height="300"></canvas>
}
```

```jsx
import React,{useEffect,useRef} from "react";

export default () => {
    const canvascontRef = useRef(null);
    const draw = () => {
        const canvas = document.createElement("canvas");
        canvas.width = 600;
        canvas.height = 400;

        const ctx = canvas.getContext("2d");

        canvascontRef?.current?.appendChild(canvas);

        ctx.save();
        ctx.beginPath();
        ctx.arc(200,200,100,0,Math.PI *2);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(150,150,10,0,Math.PI *2);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(250,150,10,0,Math.PI *2);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(200,200,50,0,Math.PI);
        ctx.stroke();
        ctx.restore()
    }

    useEffect(()=>{
        draw()
    },[])

    return <div ref={canvascontRef} className="canvas_container"></div>
}
```
- `ellipse(x, y, radiusX, radiusY, rotation, startAngle, endAngle, anticlockwise)`: 绘制一个椭圆。(x,y) 为椭圆圆心，(radiusX,radiusY) 分别为长轴和短轴半径，rotation 为椭圆旋转角度(弧度值)，startAngle、endAngle 分别表示画椭圆开始的角度和终止的角度(**弧度制**)，这个角度从 x 的正半轴开始算，anticlockwise 表示顺逆时针(默认 false 为顺时针)

```jsx
import React,{useEffect,useRef} from "react";

export default () => {
    const canvascontRef = useRef(null);
    const draw = () => {
        const canvas = document.createElement("canvas");
        canvas.width = 600;
        canvas.height = 400;

        const ctx = canvas.getContext("2d");

        canvascontRef?.current?.appendChild(canvas);

        ctx.beginPath();
        ctx.ellipse(200,200,200,100,Math.PI / 2,0,Math.PI * 2);
        ctx.stroke();
    }

    useEffect(()=>{
        draw()
    },[])

    return <div ref={canvascontRef} className="canvas_container"></div>
}
```

- 贝塞尔曲线，分为一次贝塞尔曲线和二次贝塞尔曲线。`quadraticCurveTo(cp1x,cp1y,x,y)`: 控制点坐标(cp1x,cp1y)，曲线结束点坐标(x,y)，通过额外的一个点来控制曲率。`bezierCurveTo(cp1x,cp1y,cp2x,cp2y,x,y)`:  控制点坐标(cp1x,cp1y,cp2x,cp2y)，曲线结束点坐标(x,y)，通过额外的两个点来控制曲率

```jsx
import React,{useEffect,useRef} from "react";

export default () => {
    const canvascontRef = useRef(null);
    const draw = () => {
        const canvas = document.createElement("canvas");
        canvas.width = 600;
        canvas.height = 400;
        // canvas.style.backgroundColor = "#e0e0e0";

        const ctx = canvas.getContext("2d");

        canvascontRef?.current?.appendChild(canvas);

        ctx?.beginPath();
        ctx?.moveTo(50,50);
        ctx?.quadraticCurveTo(50,100,400,100);
        ctx?.stroke();

        ctx?.beginPath();
        ctx?.moveTo(100,150);
        ctx?.quadraticCurveTo(100,200,300,100,500,200);
        ctx?.stroke();
    }

    useEffect(()=>{
        draw()
    },[])

    return <div ref={canvascontRef}></div>
}
```
- `fillText(text,x,y,[,maxWidth])`: 添加文字，maxWidth 为设置文字的最大长度超过文字会被压缩。但需要注意，画文字时，文字的左下角与 (x,y) 的点位是重合的

```jsx
import React,{useEffect,useRef} from "react";

export default () => {
    const canvascontRef = useRef(null);
    const draw = () => {
        const canvas = document.createElement("canvas");
        canvas.width = 400;
        canvas.height = 200;
        // canvas.style.backgroundColor = "#e0e0e0";

        const ctx = canvas.getContext("2d");

        canvascontRef?.current?.appendChild(canvas);

        ctx?.beginPath();
        ctx?.fillText("canvas world",0,0);
        // 消失出现在了画布之外
        ctx?.fillText("canvas world",14,14);
        
    }

    useEffect(()=>{
        draw()
    },[])

    return <div ref={canvascontRef}></div>
}
```

- `strokeText(text,x,y,[,maxWidth])`: 同上(描边/绘制轮廓)。与 fillText 一样，可通过 ctx.font="700 20px Arial" 来修改文字的样式
- `drawImage(img,x,y,width,height)/drawImage(img,clipx,clipy,clipWidth,clipHeight,x,y,width,height)`: 绘制图片到画布中，img 为 Image 对象，左上角起点(x,y)，width、height 绘制出来的图片宽高，(clix,clipy) 图片裁剪点，(clipWidth,clipHeight) 图片裁剪宽高
- 还可以通过这个 api 来绘制动画，将一张连续的图片截取一部分，以此类推
```js
/**
 * 适用于图片过大未准备好的情况
 * */ 
const image = new Image();
image.onload = function () {
    ctx.drawImage(img,0,0);
};
image.src = "xxx.png"
```

- `strokeStyle/fillStyle`: 默认添加的轮廓/内容是黑色的，可以通过此属性设置颜色。一个上下文如果设置了颜色，那以后它画任何内容都是这个颜色直到再次修改
- `lineWidth`: 默认值为 1，用于设置上下文中线条的宽度，可以理解为线条的粗细度
- `lineCap`: butt(默认)，线末端以方形结束；round，线末端以圆形结束；square：线末端以方形结束
- `lineJoin`: miter(默认)，线拐角处以菱形进行填充；bevel，线拐角处以三角形进行填充；round，线拐角处以扇形进行填充
- `shadowBlur`: 设置阴影的模糊程度
- `shadowColor`: 设置添加的阴影的颜色
- `shadowOffsetX/shadowOffsetY`: 设置添加的阴影的位移
- `direction`: ltr：文本方向从左向右(默认)。rtl：文本方向从右向左。inherit：根据情况继承 canvas 元素或者 Document
- `textBaseline`: 设置文字垂直方向的对齐方式。top：文本基线在文本块的顶部；hanging：文本基线是悬挂基线；middle：文本基线在文本块的中间；alphabetic：文本基线是标准的字母基线(默认)；ideographic：文字基线是表意字基线；如果字符本身超出了 alphabetic 基线，那么 ideograhpic 基线位置在字符本身的底部；bottom：文本基线在文本块的底部。与 ideographic 基线的区别在于 ideographic 基线不需要考虑下行字母

```jsx
import React,{useEffect,useRef} from "react";

export default () => {
    const canvascontRef = useRef(null);
    const draw = () => {
        const canvas = document.createElement("canvas");
        canvas.width = 600;
        canvas.height = 400;

        const ctx = canvas.getContext("2d");

        canvascontRef?.current?.appendChild(canvas);

        ctx.save();
        const gradient = ctx.createLinearGradient(50,50,300,10);
        gradient.addColorStop(0,"red");
        gradient.addColorStop(0.5,"blue");
        gradient.addColorStop(1,"green");

        ctx.beginPath();
        ctx.lineWidth = 5;
        ctx.lineCap = "square";
        ctx.lineJoin = "round";
        ctx.strokeStyle = gradient;
        ctx.moveTo(50,50);
        ctx.lineTo(150,10);
        ctx.lineTo(250,50);
        ctx.lineTo(300,10);
        ctx.stroke();
        ctx.restore()
    }

    useEffect(()=>{
        draw()
    },[])

    return <div ref={canvascontRef} className="canvas_container"></div>
}
```

- `save/restore`: 将之前的状态存档，后续可恢复之前的状态。只存储状态，并不会影响我们绘制的东西
```js
ctx.fillStyle = "black";
ctx.lineCaps = "butt";

ctx.save(); // 保存状态1

ctx.fillStyle = "orange";
ctx.lineCaps = "round";

ctx.restore(); // 删除之前的存档，恢复状态1
```
- `translate(x,y)`: 用于移动画板的坐标系的原点
- `rotate(angle)`: 用于顺时针旋转画板的坐标系
- `scale(x,y)`: 用于放大缩小坐标的比例

3. 实现一个画板功能
```jsx
import React,{useEffect} from "react";
import "./style/canvas/draw.scss";
let mousemoveListener = null;

class Draw {
    constructor(container) {
        this.container = document.querySelector(container);
        this.startProps = {
            x:undefined,
            y:undefined
        }
        this.init();
        this.saveData = []; // 保存操作
    }
    drawLine(point) {
        this.ctx.save();
        this.ctx.beginPath();
        this.ctx.moveTo(point.down.x, point.down.y);
        point.line.forEach((dot) => {
            this.ctx.lineTo(dot.x, dot.y);
        })
        this.ctx.stroke();
        this.ctx.closePath();
        this.ctx.restore();
	}

    onMouseDown(e) {
        this.startProps = {
			x:e.offsetX,
            y:e.offsetY
		};
        // if((this.saveData["length"] - 1) > 5) {
        //     this.saveData.shift();
        // }
        this.saveData.push({
            down:{x:e.offsetX,y:e.offsetY},
            line:[]
        });

        mousemoveListener = (event) => {
            this.saveData[this.saveData.length - 1].line.push({
                x:event.offsetX,
                y:event.offsetY
            });
            this.drawLine(this.saveData[this.saveData.length - 1])
		};
        this.canvas.addEventListener("mousemove",mousemoveListener)
    }

    draw() {
        this.onReset();
        this.saveData.forEach(point => {
            this.drawLine(point)
        })
    }

    handleReset() {
        const len = this.saveData["length"];
        if(len<=0) return;
        this.saveData.pop();
        this.draw()
    }

    init(){
        let frag = document.createDocumentFragment();
        let canvas = document.createElement("canvas");
        canvas.width = 500;
        canvas.height = 500;
        canvas.className = "canvas";
        this.ctx = canvas.getContext("2d");
        canvas.addEventListener("mousedown",this.onMouseDown.bind(this))
        this.canvas = canvas;

        let resetBtn = document.createElement("button");
        let saveBtn = document.createElement("button");

        resetBtn.className = "reset rect-btn";
        saveBtn.className = "save rect-btn";
        resetBtn.innerText = "撤销";
        saveBtn.innerText = "保存";
        resetBtn.onclick = this.handleReset.bind(this);
        saveBtn.onclick = this.onSave.bind(this);

        frag.appendChild(canvas);
        frag.appendChild(resetBtn);
        frag.appendChild(saveBtn);

        this.container.appendChild(frag);

        document.addEventListener("mouseup",(e) => {
            this.canvas.removeEventListener("mousemove",mousemoveListener)
        })

    }

    onReset(){
        this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
    }

    onSave(){
        console.log(this)
        const url = this.canvas.toDataURL("image/png");
        const a = document.createElement("a");
        a.href = url;
        a.download = "image";
        a.target = "_blank";
        a.click();
    }

}

export default () => {
    useEffect(()=>{
        let draw = new Draw(".canvas-draw");
    },[])
    return <div className="canvas-draw">
	</div>
}
```

4. 实现一个时钟

```jsx
import React,{useEffect,useRef} from "react";

export default () => {
    const canvasRef = useRef(null);
    /** 
     * 绘制时针刻度线
     * 时针一共 12 个刻度，两个刻度之前的角度是 360 / 12 = 30 度
    */
    const drawClockwiseDial = (ctx) => {
        ctx.save();
        for(let i = 0;i<12;i++) {
            ctx.beginPath();
            ctx.moveTo(100,0);
            ctx.lineTo(130,0);
            ctx.rotate(Math.PI / 6);
            ctx.stroke();
        }
        ctx.restore();
    }

    /** 
     * 绘制分针/秒针刻度线
     * 分秒针一共 60 个刻度，两个刻度之前的角度是 360 / 60 = 6 度
    */
    const drawMinuteDial = (ctx) => {
        ctx.save();
        ctx.lineWidth = 2;
        for(let i=0;i<60;i++) {
            ctx.beginPath();
            ctx.moveTo(115,0);
            ctx.lineTo(130,0);
            ctx.rotate(Math.PI / 30);
            ctx.stroke()
        }
        ctx.restore();
    }

    /** 
     * 绘制原点
    */
    const drawOrigin = (ctx) => {
        ctx.save();
        // ctx.fillStyle = "white";
        ctx.fillStyle = "#d40000";
        ctx.beginPath();
        ctx.arc(0,0,8,0,Math.PI * 2,true);
        ctx.fill();
        ctx.restore();

        ctx.save();
        ctx.fillStyle = "white";
        ctx.beginPath();
        ctx.arc(0,0,4,0,Math.PI * 2,true);
        ctx.fill();
        ctx.restore();
    }

    /** 
     * 绘制时针指针
     * 分针每走一圈(360度)，时针走一格(30度)，也就是，分针走一格(6度)，时针走0.5度
     * 秒针每走一圈(360度)，分针走一格(6度)，也就是，秒针走一格(6度)，分针走0.1度，时针走1/120度(PI / 21600)
    */
    const drawClockwise = (ctx,sec,minutes,hour) => {
        ctx.save();
        ctx.lineWidth = 5;
        ctx.rotate(
            hour * (Math.PI / 6) + minutes * (Math.PI / 360) + sec * (Math.PI / 21600)
        );
        ctx.beginPath();
        ctx.moveTo(-30,0);
        ctx.lineTo(60,0);
        ctx.stroke();
        ctx.restore();
    }

    /** 
     * 绘制分针指针
     * 秒针每走一圈(360度)，分针走一格(6度)，也就是，秒针走一格(6度)，分针走0.1度
    */
    const drawMinute = (ctx,sec,minutes) => {
        ctx.save();
        ctx.lineWidth = 2;
        ctx.rotate(
            minutes * (Math.PI / 30) + sec * (Math.PI / 1800)
        );
        ctx.beginPath();
        ctx.moveTo(-20,0);
        ctx.lineTo(80,0);
        ctx.stroke();
        ctx.restore();
    }

    /** 
     * 绘制秒针指针
    */
    const drawSec = (ctx,sec) => {
        ctx.save();
        ctx.lineWidth = 1;
        ctx.strokeStyle = "#d40000";
        ctx.rotate(
            sec * (Math.PI / 30)
        );
        ctx.beginPath();
        ctx.moveTo(-15,0);
        ctx.lineTo(100,0);
        ctx.stroke();
        ctx.restore();
    }

    const animate = () => {
        const now = new Date();
        const sec = now.getSeconds();
        const minutes = now.getMinutes();
        let hour = now.getHours();
        hour = hour % 12;
        // 24小时制，需要进行转化成12小时制
        const ctx = canvasRef?.current?.getContext("2d");
        if(!ctx) return;
        ctx.save();
        // 绘制之前清除上一帧绘制的结果
        ctx.clearRect(0,0,canvasRef.current.width,canvasRef.current.height);
        // 将坐标系原点移动到画布中间
        ctx.translate(canvasRef.current.width / 2,canvasRef.current.height / 2);
        // 逆时针旋转90度坐标系
        ctx.rotate(-Math.PI / 2);

        ctx.strokeStyle = "black";
        ctx.lineWidth = 4;
        ctx.lineCap = "round";

        // 绘制时针盘
        drawClockwiseDial(ctx);

        // 绘制分针盘
        drawMinuteDial(ctx);

        // 绘制时针
        drawClockwise(ctx,sec,minutes,hour);

        // 绘制分针
        drawMinute(ctx,sec,minutes);
        
        // 绘制秒针
        drawSec(ctx,sec);

        // 绘制原点
        drawOrigin(ctx);

        ctx.restore();
        window.requestAnimationFrame(animate)
    }

    useEffect(() => {
        window.requestAnimationFrame(animate)
    },[])

    return <canvas ref={canvasRef} width="600" height="600" id="canvas_clock"></canvas>
}
```