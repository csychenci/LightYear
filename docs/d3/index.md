---
order: 1
---

## D3

---

1. d3 简介

- d3Js 是一个基于 web 标准的 js 可视化库，它结合了强大的可视化交互技术以及数据驱动 dom 的技术通过 svg、canvas 或其他 html 标签将数据展示出来

```jsx
import React, { useEffect } from 'react';
import * as d3 from 'd3';

export default () => {
  // const svgRef = useRef(null);
  useEffect(() => {
    const svg = d3.select('.d3_1_svg1');
    const svgMove = svg.append('g').attr('transform', `translate(${50},${50})`);
    const circle = svgMove
      .append('circle')
      .attr('stroke', 'black')
      .attr('r', 33)
      .attr('fill', 'blue');
  }, []);
  return (
    <div>
      <svg class="d3_1_svg1" width="100" height="100"></svg>
    </div>
  );
};
```

- d3 操作的 dom 元素基本都是 svg，这是因为如果操作一张图片的话，对它进行放大缩小就可能造成失真；而 svg 是矢量图，放大和缩小都不会对它的展示造成任何影响

2. 操作过程

- 通过 select 或 selectAll 来选取 svg 元素，然后再设置它的一些属性(id、class、x、y、cx、cy、fill、stroke、width、height、r 等)，以此来实现我们想要的效果
