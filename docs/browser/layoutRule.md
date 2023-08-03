---
title: 布局方式
date: 2022-04-07 20:56:05
categories: Browser
tags:
  - Browser
  - javascript
  - context
---

## 布局方式
---
1. html + css 结构描述了内容的结构以及这些内容如何被渲染的，默认情况下它们处在 **正常文档流** 中，文档流在页面中表示的应是一个位置,在正常文档流中 **元素** 会根据自己的 **外部展示类型** 表现不同的效果，正常文档流中，外部显示类型可描述为 *块级盒子* 和 *内联盒子*
- 在 css 中，所有的元素都是由 *content(内容)*、*padding(空白部分/内间距)*、*border*、*margin(与其他元素的间距/外间距)* 这几部分组成，它们就像是一个 个 **盒子** 一样，构成了页面的基本组成部分
- 其中盒模型又分为 *标签盒模型* 与 *怪异盒模型*，盒模型的大小包含 *content-box* + *padding-box* + *border-box* 这三个区域的大小，标准盒模型显式设置的宽高是 *content-box* 的大小。而 怪异盒模型的内容宽度是盒子的总大小(显式设置的宽高) - *padding-box* - *border-box* 的大小

```tsx
import React from 'react';
const BlockFormatContext = () => {

  const blockbox = {
    border: '1px solid #333',
    padding: '10px',
    margin:'12px',
    height:'50px',
    background:'blue'
  }

  const box1 = {
    background:'red'
  }

  return (
    <div style={{
      width: '500px',
      height: '200px',
      border: '1px solid #333',
      background:'#efeeee'
    }}
    >
      <span>块级盒子</span>
      <div style={blockbox}>
        block-box1
      </div>
      <div style={{...blockbox,...box1}}>
        block-box2
      </div>
      <div style={{
        width:'410px'
      }}>
        <div style={{float:'left',height:'50px'}}></div>
      </div>
    </div>
  )
}

export default BlockFormatContext;
```
- 块级盒子表现的行为是：水平方向上独占父元素的整行(这表示每个块级盒子都会占据一行，表现出换行的效果)，可以设置盒子的 *width* 与 *height* 属性，padding、margin、border会将其他元素从当前盒子周围推开，相邻盒子垂直方向上的margin会进行叠加(以值较大的为准)

```tsx
import React from 'react';

const InlineFormatContext = () => {

  const blockbox = {
    border: '1px solid #333',
    padding: '10px',
    margin:'12px',
    height:'50px',
    display:'inline',
    background:'blue'
  }

  const box1 = {
    background:'red'
  }

  return (
    <div style={{
      width: '500px',
      height: '200px',
      border: '1px solid #333',
      background:'#efeeee'
    }}
    >
      <span>内联盒子</span>
      <div style={blockbox}>
        inline-box1
      </div>
      <div style={{...blockbox,...box1}}>
        
      </div>
    </div>
  )
}

export default InlineFormatContext
```
- 内联盒子表现的行为是：盒子会在一行上进行排列，行上的空间不够时，其他内联盒子会被移到新的一行；设置盒子的 *width* 与 *height* 属性不起作用，盒子的大小取决于盒子内部的内容大小；只有水平方向padding、margin、border会将其他内联盒子从当前盒子周围推开

- 正常文档流中的元素会根据这些规则从上到下、从左到右的排列在页面上
2. BFC
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
3. 如果需要在网页中实现常见的两栏布局或三栏布局，也就是说我们需要元素在一行显示并且还可以控制它的大小，这种情况下无法通过正常文档流的规则进行排版
- 虽然我们有 `inline-block` 元素可以使用，但它无法实现左右对齐，并且多个 `inline-block` 元素在同一行之间会出现间距
- 此时 **浮动** 就派上用场了，浮动可以使得元素脱离正常流的控制，它们将 **吸附** 到指定位置

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
- 总结起来的话，浮动的核心目的就是为了让多个块级盒子在同一行显示

4. 浮动解决了同一行显示的问题，如果需要让盒子自由的在某个盒子内移动位置或固定屏幕中的某个位置，那标准流和浮动都无法快速实现

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

|值|描述|作用|
|---|---|---|
|static|静态定位|将元素放入它在文档布局流中的正常位置|
|relative|相对定位|仍然占据正常的文档流位置，但可通过 `top`、`left`、`bottom`、`right` 移动元素位置|
|absolute|绝对定位|绝对定位的元素不再存在于文档流中，它具有独立的层级，它根据定位上下文(html或最近的定位父级(设置了定位属性且值不为static))来调整它的位置|
|fixed|固定定位|与绝对定位工作方式相同，但固定定位的定位父级是浏览器视口本身|
|sticky|粘性定位|表现为在跨越特定阈值前为相对定位，跨越之后为固定定位|

5. flex弹性盒子
- 用于解决 `float` 及 `position` 的局限性。一：在父内容里面垂直居中一个块内容，二：使容器的所有子项占用等量的可用宽度/高度，而不管有多少宽度/高度可用，三：使多列布局中的所有列采用相同的高度，即使它们包含的内容量不同。浮动和定位难以或无法实现上面的需求

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
- 通过在父级上设置 *display;flex* 可以将盒子的内部显示类型修改为 *flex*，同时内部的元素将按照 弹性盒子 规则进行布局。弹性盒子内会将盒子分为两条轴：主轴与交叉轴，可通过 `flex-direction` 来指定主轴的方向，默认情况下是横向方向
