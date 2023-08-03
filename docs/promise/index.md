---
order: 1
---

## Promise

---

1. 面试题

- 以下代码在任何情况下的行为相同吗

```js
let p1 = new Promise((resolve, reject) => {
  // ...
});

p1.then((res) => {
  // ..
}).catch((reson) => {
  // ..
});

p1.then(
  (res) => {},
  (reason) => {},
);
```
- 正常情况下，结果是一样的。不论是在 Promise 构造函数中 resolve 或 reject、抛出一个错误，都能被正确处理

```jsx
import React from 'react';

export default () => {
  const [text1,setText1] = React.useState('');
  const [text2,setText2] = React.useState('');

  const handleClick = (type) => {
    let p1 = new Promise((resolve, reject) => {
      if(type === 'resolve') resolve('fulfilled')
      else if(type === 'reject') reject('rejected')
      else {
        throw new Error('error from throw')
      }
    });

    p1.then(val => {
      setText1('p1 then '+val)
    }).catch(err => {
      setText1('p1 catch '+err)
    })

    p1.then((val) => {
      setText2('p2 then '+val)
    },(err) => {
      setText2('p2 catch '+err)
    })
  }

  return (
    <>
      <div>
        {
          [text1,text2].map((text,idx) => {
            return <p key={idx}>{text}</p>
          })
        }
      </div>
      {
        ['resolve','reject','throw'].map((ch,idx)=>{
          return <button key={idx} onClick={()=>{handleClick(ch)}}>
            {ch}
          </button>
        })
      }
    </>
  )
}
```
- 但是，如果在 then 的 onFulfillCallback 中出现了一个错误，它就会呈现不一样的效果。第二种是无法捕获同一级的回调函数中出现的错误的

```js
let p1 = new Promise((resolve, reject) => {
  if(type === 'resolve') resolve('fulfilled')
  else if(type === 'reject') reject('rejected')
  else {
    throw new Error('error from throw')
  }
});

p1.then(val => {
  throw new Error(Number('0 / 0'))
}).catch(err => {
  /** 
   * 这里能够捕获前面的 then 回调中出现的错误
  */
  console.log(err)
})

p1.then((val) => {
  throw new Error(Number('0 / 0'))
},(err) => {
  /** 
   * 这里无法捕获前面的 then 回调中出现的错误
  */
  console.log(err)
})
```
- 以下两个 `promise` 对象相等吗?

```js
let p1;
async function testAsync() {
  p1 = Promise.resolve(2);
  return p1;
}
let p2 = testAsync();
p1 === p2;
```
