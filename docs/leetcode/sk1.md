---
title: Stack-01(大鱼吃小鱼)
date: 2022-07-07 10:29:05
categories: LeetCode
order: 21
tags:
  - LeetCode
  - javascript
  - stack
---

## 大鱼吃小鱼
---
1. 题目
- 在水中有许多鱼，可以认为这些鱼停放在 x 轴上。再给定两个数组 Size，Dir，Size[i] 表示第 i 条鱼的大小，Dir[i] 表示鱼的方向 （0 表示向左游，1 表示向右游）。这两个数组分别表示鱼的大小和游动的方向，并且两个数组的长度相等。鱼的行为符合以下几个条件:

- 所有的鱼都同时开始游动，每次按照鱼的方向，都游动一个单位距离；
- 当方向相对时，大鱼会吃掉小鱼；
- 鱼的大小都不一样。

```md
输入：Size = [4, 2, 5, 3, 1], Dir = [1, 1, 0, 0, 0]
输出：3
```

2. 分析
- 根据题意能够知道，同方向游动的鱼不会被吃掉，相对方向游动的大鱼吃掉小鱼，只有这一种情况，会发生鱼被吃掉的情况

```js

function eatFish(fishSize,fishDir){
  const len = fishSize.length;
  if(len <=1){
    return len
  }

  const stack = []

  for(let i=0;i<len;i++){
    let currFishSize = fishSize[i];
    let currFishDir = fishDir[i];
    let topFish = stack[stack.length - 1]
    let hasEat = false;

    while(stack.length && fishDir[topFish] !== currFishDir) {
      if(fishSize[topFish] > currFishSize){
        hasEat = true;
        break;
      }
      stack.pop()
    }

    if(!hasEat) stack.push(i)
  }

  return stack.length
}
```
