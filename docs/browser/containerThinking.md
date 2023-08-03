---
title: 布局规则与容器思维
date: 2022-04-10 22:16:20
categories: browser
order: 6
tags:
  - css
  - layout
---


## 容器思维
---
1. 从设计的角度分析规则
- 任何的规则都是人为设计出来的，而规则也就是结果本身其实并不重要，因为规则是很容易想到的，重要的是我们在设计这个规则的时候，其中有什么样的因素在影响我们做决定？什么样的因素会影响这个规则的产生呢
- 这些规则的产生，会有一些客观的因素存在，它会在我们做决定的时候潜移默化的影响我们，但我们往往会忽略掉这些客观的因素。而这些因素，会让我们从一开始就会给结果打上一个标签，使它往另一个方向偏移，因此我们需要去挖掘这些自然而然会被忽略掉的因素，它们会影响我们的决定
- 但是规则往往是具体的，所以我们得具体问题具体分析。以一张桌子为例，桌子有它的大小（宽高），决定桌子可以放多少物体、能够摆放在多大的空间内等；那么，更重要的一点是这个桌子有什么特性？放置在这个桌子上的物体又有什么特性？比如说 **材质** ，材质可以决定桌子能够放什么、不能够放什么，而物体的材质则决定了它能不能放置在这个桌子上、它能放置在什么样的物体上
- 从上面的例子可以很清晰的知道，影响规则的两个很重要的因素就是 **制定者** 与 **参与者** 的特性。可以使用一个具象化的内容 -- **往容器里面放东西** 来描述。同样的，也是考虑两个因素：容器具有什么特性、要被放入容器的物体具有什么特性，也就是说我们在制定规则的时候，首先会去确定这两个东西的因素，虽然我们感受到了，但并没有把它具象出来，因此常常容易忽略
2. 从容器的角度思考布局
- 网页布局，其实就是一个容器思维，同样的往容器里面放东西。首先，网页布局，这里面的容器是什么？网页里面的容器，其实是 **视口/viewport** （并不是浏览器）
- 先来研究一下视口的特性，视口是可以变化的，这意味着它不稳定，这就出现了响应式布局，那么这种情况下研究的尺寸就是非绝对性的尺寸了
- 再来就是，我们可以在视口获取鼠标、元素的位置信息？是什么来支撑我们可以获取到这些坐标呢，或者说以什么做参考呢，这个坐标怎么才是有效的？其实就是 **坐标系**（原点是视口左上角，x轴方向是从左到右，y轴方向是从上到下，与数学坐标系相反），有了坐标系的存在之后，那么页面上所有出现的元素都有它的位置信息
- 网页中的所有元素都有它的坐标信息，只要它出现在了网页中，那么他就一定有它的位置信息。任何的一个元素，在任何的位置，不仅有具体的坐标信息、宽高，知道了这些东西就可以做很多事情，它是已经提供好的，不用关注怎么去获取它的宽高，其他的平台包括安卓、ios等都是一样的原理，它们也是在一个小区域里面去做这样的一个布局，去设计这样的一个规则，那么坐标系依然会存在，因此很多的功能原理几乎是一样的
- 另外一个就是视口的边界问题，但视口是有边界的，坐标系是没有边界的
3. 基于坐标系的简单原理
- 拖拽：首先，方块和鼠标的位置信息是知道的，鼠标从一个位置移动到另一个位置也是能获取的(x变了多少，y变了多少)，因此，只需要等变化量的去设置方块的变化量，就能实现拖拽的效果
- 视差效果：当两个物体的变化方向/趋势不一致时，或者说当一个元素在移动时，另一个元素与它移动的方向不一样，就是视差效果，说简单点，就是一个动一个不动；滚动条其实就是一个视察效果
- 在坐标系的支撑之下，整个视差效果，就成了一个数学题，也就是根据已知条件求未知条件。像包括进度条、进度条变化影响颜色深浅变化、音量的控制条、透明度的变化、header往下滚动高度变小然后不动在滚动回去高度变大等，都是属于这样一个过程，这些东西的实现原理都是基于坐标系的存在而实现的
4. 从容器角度具体分析页面布局
- 早期的网页，其实是一个类似于报纸一样的东西，也就是流的展示形式（从上到下、从左到右），在需求的角度来说，这种布局只需要块元素就能完成这种布局
- 那么我们往网页这个容器里面放置的东西，其实就是盒子。那么盒子有什么特性呢？它有内容部分、空白部分、边框部分等，这样一个内容组成一个盒子，那么这样的盒子的一个特性用一个名词来描述就是 **普通盒模型** 或者 **怪异盒模型**。从需求的角度出发，基于这些模型就出现了 **个体**，而根据这些个体的特性，它们被分为 **块元素**、**内联元素**
5. 结合规则分析需求
- **普通文档流**：我们需要从上到下、从左到右的布局，就用到了我们上面需要的个体，就出现了文档流
- **浮动**：如果需要在网页中实现常见的两栏布局或三栏布局，也就是说我们需要元素在一行显示并且还可以控制它的大小，这种情况下无法通过正常文档流的规则进行排版
- 虽然我们有 `inline-block` 元素可以使用，但它无法实现左右对齐，并且多个 `inline-block` 元素在同一行之间会出现间距。此时 **浮动** 就派上用场了，浮动可以使得元素脱离正常流的控制，它们将 **吸附** 到指定位置

```jsx
import React from 'react';

const floatfat = {
  width:'100%',
  height:'50%'
}

const floatLeft ={
  float: 'left',
  backgroundColor: 'red',
  width: '200px',
  height: '100%'
}

const floatRight ={
  float: 'right',
  backgroundColor: 'green',
  width: 'calc(100% - 200px)',
  height: '100%'
}

const FloatContext = () => {

  const imgbox = {
    float:'left',
    width:'50px',
    height:'50px'
  }

  const pbox = {
    margin:'0'
  }

  return (
    <div style={{
      width: '500px',
      height: '200px',
      border: '1px solid #333',
      background:'#efeeee'
    }}
    >
    <img style={imgbox} src="https://img1.baidu.com/it/u=554809536,2732110137&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=560" />
    <p style={pbox}>这些文字将会呈现出一种效果，它们会环绕在图片的周围些文字将会呈现出一种效果，它们会环绕在图片的周围些文字将会呈现出一种效果，它们会环绕在图片的周围些文字将会呈现出一种效果，它们会环绕在图片的周围</p>
    </div>
  )
}

export default () => {
  return (
    <>
    <div 
      style={{
        width:'500px',
        height:'200px',
        marginBottom:15
      }}
      >
      <div style={{...floatfat,marginBottom:'10px'}}>
        <div style={floatLeft}></div>
        <div style={floatRight}></div>
      </div>
      <div style={floatfat}>
        <div style={{...floatLeft,width:50}}></div>
        <div style={{...floatRight,width:50}}></div>
      </div>
    </div>
    <FloatContext />
    </>
  )
}
```
- 但是浮动跟文档流的规则不一样，也就是说浮动出现了脱离文档流这个特性。总结起来的话，浮动的核心目的就是为了让多个块级盒子在同一行显示
- **定位**：动解决了同一行显示的问题，如果现在需要让盒子自由的在某个盒子内移动位置或固定屏幕中的某个位置而无论如何滚动，那标准流和浮动都无法快速实现，这时就引入了定位系统
- 这时候就可以用定位来解决，定位可以将盒子固定在某个位置，它可以自由的漂浮在其他盒子(标准流或浮动都可以)的上面。定位通过 `定位模式` + `边偏移` 来确定盒子在页面中的位置

```jsx
import React from 'react';
const style={
    width:500,
  height:300,
}

const dtstyle = {
  backgroundColor: 'black',
  color: 'white',
  padding: '10px',
  position: 'sticky',
  top: 0,
  left: 0,
  margin: '1em 0'
}

const StickyBox = () => {

  return (
    <div style={style}>
    <h1>Sticky positioning</h1>

    <dl>
        <dt style={dtstyle}>A</dt>
        <dd>Apple</dd>
        <dd>Ant</dd>
        <dd>Altimeter</dd>
        <dd>Airplane</dd>
        <dt style={dtstyle}>B</dt>
        <dd>Bird</dd>
        <dd>Buzzard</dd>
        <dd>Bee</dd>
        <dd>Banana</dd>
        <dd>Beanstalk</dd>
        <dt style={dtstyle}>C</dt>
        <dd>Calculator</dd>
        <dd>Cane</dd>
        <dd>Camera</dd>
        <dd>Camel</dd>
        <dt style={dtstyle}>D</dt>
        <dd>Duck</dd>
        <dd>Dime</dd>
        <dd>Dipstick</dd>
        <dd>Drone</dd>
        <dt style={dtstyle}>E</dt>
        <dd>Egg</dd>
        <dd>Elephant</dd>
        <dd>Egret</dd>
    </dl>
    <div 
    style={{
      bottom:0,
      right:0,
      position:'absolute',
      border:'1px solid #333',
      color:'skyblue'
      }}>返回顶部</div>
    </div>
  )
}

export default StickyBox
```
- **元素与元素影响的规则**：那么当元素与元素之间互相影响了怎么办？所以就针对这些需求，设计出了元素与元素之间的相互规则，其中比较耳熟能详的就是 *bfc*
- `Formatting Context`：指的是页面中的一个渲染区域，而且拥有一套渲染规则，它决定了其子元素如何定位以及与其余元素的相互关系和作用。bfc 就是 `块级格式化上下文`，可以认为它是一个具备 `块级盒子` 某些特性的独立容器，容器内的元素不会与容器外的元素互相干扰
- 块级盒子外间距在垂直方向会叠加，可以将块级盒子设置成 bfc消除掉这种影响
```jsx
import React from 'react';

export default () => {
  return <div style={{border:'1px solid #333'}}>
    <div style={{
      width:'100px',
      height:'50px',
      background:'red',
      margin:'0 0 10px 0'
    }}></div>
    <div style={{display:'flow-root'}}>
      <div style={{
      width:'100px',
      height:'50px',
      background:'blue',
      margin:'15px 0 10px 0'
    }}></div>
    </div>
    <div style={{display:'flow-root'}}>
    <div style={{
      width:'100px',
      height:'50px',
      background:'green',
      margin:'25px 0 10px 0'
    }}></div>
    </div>
  </div>
}
```
- 浮动元素可能会引起父元素的高度塌陷，这时可以将父级元素设置成 bfc，父级就会被浮动元素撑开
```jsx
import React from 'react';

export default () => {
  return <div style={{display:'flow-root',border:'1px solid #333'}}>
    <div style={{
      float:'left',
      width:'100px',
      height:'50px',
      background:'red'
      
    }}></div>
  </div>
}
```
- 浮动元素可能会在文档流中覆盖其他元素，这时候将这个元素设置成bfc就不会被覆盖了
```jsx
import React from 'react';

export default () => {
  return <><div style={{border:'1px solid #333',margin:'0 0 5px 0'}}>
    <div style={{
      float:'left',
      width:'100px',
      height:'50px',
      background:'red'
      
    }}></div>
    <div style={{
      width:'200px',
      height:'100px',
      background:'green'
      
    }}></div>
  </div>
  <div style={{border:'1px solid #333'}}>
    <div style={{
      float:'left',
      width:'100px',
      height:'50px',
      background:'red'
      
    }}></div>
    <div style={{
      width:'200px',
      height:'100px',
      background:'green',
      display:'flow-root'
    }}></div>
  </div></>
}
```
- 在布局上 bfc 将某些效果限定在这个独立空间内，当前看来就是为了限定 float 的边界，将 float 限定在一个上下文中，这样 float 不会影响 bfc 以外的盒子
- **flex弹性盒子**：用于解决 `float` 及 `position` 的局限性。一：在父内容里面垂直居中一个块内容，二：使容器的所有子项占用等量的可用宽度/高度，而不管有多少宽度/高度可用，三：使多列布局中的所有列采用相同的高度，即使它们包含的内容量不同。浮动和定位难以或无法实现上面的需求
```jsx
import React from 'react';

export default () => {
  return <div
    style={{
      width:'100%',
      height:'800px'
    }}
  >
    <div
      style={{
        border:'1px solid #333',
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        marginBottom:'5px'
      }}
    >
      <p>文字文字文字</p>
    </div>

    <div
      style={{
        marginBottom:'5px',
        border:'1px solid #333',
        display:'flex',
        height:'300px'
      }}
    >
      <div style={{background:'red',flex:'200px'}}></div>
      <div style={{background:'blue',flex:'200px'}}></div>
      <div style={{background:'green',flex:'200px'}}></div>
    </div>

    <div
      style={{
        marginBottom:'5px',
        border:'1px solid #333',
        display:'flex',
        height:'300px'
      }}
    >
      <p style={{marginRight:'5px',flex:1}}>文字文字文字文字文字文字文字文字文字文字文字文字</p>
      <p style={{marginRight:'5px',flex:1}}>文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字</p>
      <p style={{flex:1}}>文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字</p>
    </div>

  </div>
}
```
6. 如何联系这些知识体系
- 在上面的场景中，都是往容器里面放东西这样一个形式。那么还有其他的场景，也是往容器里面放东西的 --- 例如函数调用栈。而往容器里面放东西，这个具象化的东西，我们要先去理解它的容器是什么、具有那一些特性，再去理解要放入这个容器的个体是什么、它有什么特性、会造成什么影响
- 像栈也是往容器里面放东西。具象化的场景例如：函数调用栈。同样的，先去了解容器是什么，再去了解放入的个体是什么。只知道先进后出，是没办法运用到实践当中去的。只学规则是没用的，更重要的是学习它的使用场景，它的容器长什么样，以及往里面放的东西是什么，这个东西它的生存周期到底什么样，进栈之前这个个体在哪里，出栈之后个体去哪里了，这些都是研究一个个体需要探讨的问题。这样才能运用在实际场景之中，只有一个毫无支撑的理论是毫无作用的（作用域也是类似的）
- 结论其实是不重要的，结论是对是错其实并不重要，但一定要有理论支撑，所以我们不要去纠结这个结论到底是对还是错，它并不重要，重要的是我们用什么理论去支撑这个结论
- 再回到容器上面来，容器是可以嵌套的，个体也可以是一个容器。嵌套思维，一个很复杂的容器它是如何变复杂的，它是往容器里面放容器变复杂的。因此，在做 **逻辑的解耦**、**组件的拆分**、**逻辑的拆分** 的时候，需要捕捉到哪一些东西实际上是一个子元素，这种嵌套思维可以精准的简化自己的代码。理解嵌套是怎么产生的，才能利用它去简化我们的代码，复杂的项目中，会有很多的细节去干扰我们的判断，这时候就是考验我们精准拆分业务、任务拆分的能力