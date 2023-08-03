---
title: Lightyear - Learn new Thought and strive to be a new youth
order: 10
hero:
  title: csychenci's blog
  desc: 学习新思想,争做新青年
  actions:
    - text: Get Into
      link: /
  style: { backgroundColor: 'inherit' }
# features:
#   - icon: https://gw.alipayobjects.com/zos/bmw-prod/881dc458-f20b-407b-947a-95104b5ec82b/k79dm8ih_w144_h144.png
#     title: Out of the box
#     desc: Elegant default configrations and convention routing assist developers to get started as simple as possible, that focus all attentions on developing libraries & writting docs
#   - icon: https://gw.alipayobjects.com/zos/bmw-prod/d1ee0c6f-5aed-4a45-a507-339a4bfe076c/k7bjsocq_w144_h144.png
#     title: For developing libraries
#     desc: Rich Markdown extensions are not limited to rendering component demos, making component documents not only easy to write and manage, but also beautiful and easy to use
#   - icon: https://gw.alipayobjects.com/zos/bmw-prod/b8570f4d-c1b1-45eb-a1da-abff53159967/kj9t990h_w144_h144.png
#     title: Theme system
#     desc: Progressive custom theme capabilities, ranging from expanding your own Markdown tags to customizing complete theme packages, are up to you
#   - icon: https://gw.alipayobjects.com/zos/bmw-prod/b3e102cd-5dad-4046-a02a-be33241d1cc7/kj9t8oji_w144_h144.png
#     title: API automatically generated
#     desc: Component API can be automatically generated based on TypeScript type definitions, and components will always be『the same in appearance』
#   - icon: https://gw.alipayobjects.com/zos/bmw-prod/3863e74a-7870-4874-b1e1-00a8cdf47684/kj9t7ww3_w144_h144.png
#     title: Mobile component library development
#     desc: Install the theme package to quickly enable mobile component R&D capabilities, built-in mobile HD rendering solution
#   - icon: https://gw.alipayobjects.com/zos/bmw-prod/f093e060-726e-471c-a53e-e988ed3f560c/kj9t9sk7_w144_h144.png
#     title: Asset dataization capabilities
#     desc: One-line command digitizes component assets, and standardized asset data can be connected with downstream productivity tools
# footer: Open-source MIT Licensed | Copyright © 2019-present<br />Powered by self
showEnder: false
footer: <a href="https://beian.miit.gov.cn/">湘ICP备20013944号-1</a> 
---

<!-- ## Who are using -->

<!-- <embed src="../packages/dumi/README.md#RE-/<table>[^]+?[\r\n]<\/table>/"></embed> -->

<!-- ## Feedback -->

<!-- Please visit [GitHub](https://github.com/umijs/dumi) or join the discuss group: -->

<!-- <embed src='../packages/dumi/README.md#RE-/<img data-type="dingtalk"[^>]+\/>[\r\n\s]*<img data-type="wechat"[^>]+\/>/'></embed> -->

<!-- ```tsx
// import VConsole from 'vconsole';
import React from 'react';
// import 'antd/dist/antd.css';
import '../public/react-weui.css'

export default () => {
  return <div style={{ textAlign: 'center' }}>📖 <font style={{
    fontWeight:"blod",
    color:"skyblue"
  }}>我们在拿到任何问题任何知识点的时候,一定要想明白到底为什么,为什么会出这个知识点,而不是一开始就去想它的具体实现,也就是不应该是什么,而是为什么?了解一个事物的背景才是最重要并且最应该去搞明白的,其次才是是什么和结论</font>
    {hour}:{minute}:{second}
  </div>;
};
``` -->

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

    return <div style={{
      width:"100%",
      display:"flex",
      justifyContent:"center",
      alignItems:"center"
    }}>
      <canvas ref={canvasRef} width="300" height="300" id="canvas_clock"></canvas>
    </div>
}
```
