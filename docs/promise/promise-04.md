---
title: Promise微任务注册与执行
date: 2021-04-12 00:44:25
categories: Promise
order: 5
tags:
  - Promise
  - JavaScript
---


## 微任务

---

1. 异步任务

- ~~Promise 的行为与一个异步任务是一致的，它的分发器 `then`、`catch`、`finally` 都是异步的，因此，它们会在同步代码完成后才会被调用~~。Promise 属于内循环，是 js 自己的内部逻辑，之所以看着像异步任务，是因为 resolve 的时机不确定，很多情况下 resolve 会成为异步任务的一部分
- 当一个 `promise` 准备就绪时，即已经 `resolved` 或者 `rejected` 时，它的处理程序会被放入任务队列中，但它们不会立刻被调用，只有在 js 执行完同步的代码后，它才会从队列中去获取并执行它

```js
console.log('script start ', new Date().toLocaleTimeString() + ':' + new Date().getMilliseconds());

new Promise((resolve, rejct) => {
  console.log(
    'promise called ',
    new Date().toLocaleTimeString() + ':' + new Date().getMilliseconds(),
  );
  setTimeout(() => {
    resolve(
      'status fulfilling..., ' +
        new Date().toLocaleTimeString() +
        ':' +
        new Date().getMilliseconds(),
    );
  }, 1000);
}).then((res) => {
  console.log('change time ', res);
  console.log(
    'then called time ' + new Date().toLocaleTimeString() + ':' + new Date().getMilliseconds(),
  );
});

console.log('script end ', new Date().toLocaleTimeString() + ':' + new Date().getMilliseconds());

// script start  下午1:40:36:832
// promise called  下午1:40:36:832
// script end  下午1:40:36:832
// change time  status fulfilling..., 下午1:40:37:834
// then called time 下午1:40:37:834
```

2. 微任务的注册与执行

- 在 js 中，事件机制是先注册先执行，即队列的模式。一个 promise 被创建或者被决议时，~~会开始将该 `promise` 链接的 `then` 方法注册到微任务队列~~，then 会将对应的回调函数注册到执行队列或者临时中间表，等到同步任务执行完成，js 才会去读取执行队列的任务并将这些任务按照入队的顺序一个个进行执行

```js
new Promise((resolve, reject) => {
  resolve();
})
  .then(() => {
    console.log('第一个then开始执行');
  })
  .then(() => {
    console.log('第二个then开始执行');
  })
  .then(() => {
    console.log('第三个then开始执行');
  });

Promise.resolve()
  .then(() => {
    console.log('第一个then2开始执行');
  })
  .then(() => {
    console.log('第二个then2开始执行');
  })
  .then(() => {
    console.log('第三个then2开始执行');
  })
  .then(() => {
    console.log('第四个then2开始执行');
  });

// 第一个then开始执行
// 第一个then2开始执行
// 第二个then开始执行
// 第二个then2开始执行
// 第三个then开始执行
// 第三个then2开始执行
// 第四个then2开始执行
```

- ~~可以发现 `then` 的注册有两种情况：在状态转变以后，同步执行的 `then` 会被注册到微任务队列；`then` 被执行完以后，接着会注册该 `then` 的下一个 `then` 方法。因此，会出现内外 `then` 交替执行，交替注册的情况。~~
- then 会向 promise 的执行队列和临时中间表注册任务，当一个 promise 的状态已决议时，then 会将对应的任务分发到执行队列；而当依赖的 promise 或 then 状态未确定时，相应的任务会被发往临时中间表，等待状态转变再放到执行队列里面

```js
new Promise((resolve, reject) => {
  console.log('外部promise');
  resolve();
})
  .then(() => {
    console.log('外部第一个then开始执行');
    new Promise((resolve, reject) => {
      console.log('内部promise');
      resolve();
    })
      .then(() => {
        console.log('内部第一个then开始执行');
      })
      .then(() => {
        console.log('内部第二个then开始执行');
      });
  })
  .then(() => {
    console.log('外部第二个then开始执行');
  })
  .then(() => {
    console.log('外部第三个then开始执行');
  });

// 外部promise
// 外部第一个then开始执行
// 内部promise
// 内部第一个then开始执行
// 外部第二个then开始执行
// 内部第二个then开始执行
// 外部第三个then开始执行
```

- 在这里，`then` 注册添加到微任务队列，并不代表 `then` 方法的执行，并且 `then` 会等到上一个状态变化以后才会被注册到微任务队列，因为可以理解为 `then` 没注册到微任务就没有执行
- 链式调用的注册是前后依赖的，后续的 `then` 需要等到前一个 `then` 的同步任务执行完毕才会被注册到微任务。并且，非链式调用多个 `then` 的情况下，会依照顺序同步注册到微任务队列

```js
let p = new Promise((resolve, reject) => {
  console.log('外部promise');
  resolve();
});

p.then(() => {
  console.log('外部第一个then开始执行');
  new Promise((resolve, reject) => {
    console.log('内部promise');
    resolve();
  })
    .then(() => {
      console.log('内部第一个then开始执行');
    })
    .then(() => {
      console.log('内部第二个then开始执行');
    });
})
  .then(() => {
    console.log('外部第二个then开始执行');
  })
  .then(() => {
    console.log('外部第三个then开始执行');
  });

p.then(() => {
  console.log('外部第四个then开始执行');
});

// 外部promise
// 外部第一个then开始执行
// 内部promise
// 外部第四个then开始执行
// 内部第一个then开始执行
// 外部第二个then开始执行
// 内部第二个then开始执行
// 外部第三个then开始执行
```

- 因此，可以知道，`then` 的注册与执行是分开的，被添加到微任务队列并不会马上执行，而是要根据注册到队列中的顺序依次进行执行，但这有一个前提：需要同步任务执行完毕，任务队列的任务才会被读取

3. 异步的内部返回值

- 当在内部 `return` 一个值或 `resolve` 时，如果在这个值是一个 `promise` 对象的情况下，会将这个 `Promise` 的状态转换以后的值或错误作为新的 `Promise` 的值或错误，再将这个新的 `promise` 返回出去

```js
new Promise((resolve, reject) => {
  console.log('外部promise');
  resolve();
})
  .then(() => {
    console.log('外部第一个then开始执行');
    return new Promise((resolve, reject) => {
      console.log('内部promise');
      resolve();
    })
      .then(() => {
        console.log('内部第一个then开始执行');
      })
      .then(() => {
        console.log('内部第二个then开始执行');
      });
  })
  .then(() => {
    console.log('外部第二个then开始执行');
  })
  .then(() => {
    console.log('外部第三个then开始执行');
  })
  .then(() => {
    console.log('外部第四个then开始执行');
  })
  .then(() => {
    console.log('外部第五个then开始执行');
  });

// 外部promise
// 外部第一个then开始执行
// 内部promise
// 内部第一个then开始执行
// 内部第二个then开始执行
// 外部第二个then开始执行
// 外部第三个then开始执行
// 外部第四个then开始执行
// 外部第五个then开始执行
```

- 当我们返回一个新的 `promise` 实例时，外层的 `then` 需要等待里面的执行完成，`return` 才算完成，这代表外部的第二个 `then` 的注册（此时不是执行）需要等待 `return` 之后的结果

```js
new Promise((resolve, reject) => {
  console.log('外部promise');
  resolve();
})
  .then(() => {
    console.log('外部第一个then开始执行');
    new Promise((resolve, reject) => {
      console.log('内部promise');
      resolve();
    })
      .then(() => {
        console.log('内部第一个then开始执行');
      })
      .then(() => {
        console.log('内部第二个then开始执行');
      });
  })
  .then(() => {
    console.log('外部第二个then开始执行');
  })
  .then(() => {
    console.log('外部第三个then开始执行');
  })
  .then(() => {
    console.log('外部第四个then开始执行');
  })
  .then(() => {
    console.log('外部第五个then开始执行');
  });

// 外部promise
// 外部第一个then开始执行
// 内部promise
// 内部第一个then开始执行
// 外部第二个then开始执行
// 内部第二个then开始执行
// 外部第三个then开始执行
// 外部第四个then开始执行
// 外部第五个then开始执行
```

- 这里没有手动 `return` 以后，我们知道 `resolve` 的执行会创建一个 `Promise` 并将值或错误包装进去，因此，这里就是包装的 `undefined`。所以，当内部的 `promise` 的同步代码执行完成以后(注册第一个 then 以后)，控制权会交换到外部

```js
new Promise((resolve, reject) => {
  console.log('外部promise');
  resolve();
})
  .then(() => {
    console.log('外部第一个then开始执行');
    return Promise.resolve()
      .then(() => {
        console.log('内部第一个then开始执行');
      })
      .then(() => {
        console.log('内部第二个then开始执行');
      });
  })
  .then(() => {
    console.log('外部第二个then开始执行');
  })
  .then(() => {
    console.log('外部第三个then开始执行');
  });

Promise.resolve()
  .then(() => {
    console.log('外部第一个then2开始执行');
  })
  .then(() => {
    console.log('外部第二个then2开始执行');
  })
  .then(() => {
    console.log('外部第三个then2开始执行');
  })
  .then(() => {
    console.log('外部第四个then2开始执行');
  })
  .then(() => {
    console.log('外部第五个then2开始执行');
  });

// 外部promise
// 外部第一个then开始执行
// 外部第一个then2开始执行
// 内部第一个then开始执行
// 外部第二个then2开始执行
// 内部第二个then开始执行
// 外部第三个then2开始执行
// 外部第四个then2开始执行
// 外部第二个then开始执行
// 外部第五个then2开始执行
// 外部第三个then开始执行
```

- 在这里，`return Promise.resolve()` 创建了一个 `Promise` 实例，并将状态设置为 `fulfilled`，之后这里就是返回的是经过 `then` 处理后的结果，因此，会将 `then` 注册到微任务队列
- 而在浏览器里面，当 `return` 或 `resolve` 一个 `Promise` 对象时，在这个 `Promise` 的状态改变或处理完毕后，得到这个 `Promise` 的值之后，会把这个值用新的 `Promise` 包装起来，并注册到微任务队列中，也就是多安排一个 `job`，而 `return` 将值(这个值需要是一个 promise)向外传递时(需要后面没有 then 了)，会隐式调用一个 `then` 方法并将值或错误传递给新的 `promise`，这里会产生第二个微任务

```js
new Promise((resolve) => {
  resolve(Promise.resolve(3));
}).then((res) => {
  console.log(res);
});

// 等同于上述代码
// new Promise(resolve => {
//     resolve(3);
// })
// .then(res=>res)
// .then(res=>res)
// .then((res) => {
//     console.log(res)
// })

Promise.resolve()
  .then(() => {
    console.log(1);
  })
  .then(() => {
    console.log(2);
  })
  .then(() => {
    console.log(4);
  })
  .then(() => {
    console.log(5);
  })
  .then(() => {
    console.log(6);
  });

// 1
// 2
// 3
// 4
// 5
// 6
```

```js
Promise.resolve()
  .then(() => {
    return new Promise((resolve) => {
      resolve(3);
    });
    // return Promise.resolve(3)
  })
  .then((res) => {
    console.log(res);
  });

// 等同于上述代码
// Promise.resolve().then(() => {
//     return 3
// })
// .then(res=>res)
// .then(res=>res)
// .then((res) => {
//     console.log(res)
// })

Promise.resolve()
  .then(() => {
    console.log(1);
  })
  .then(() => {
    console.log(2);
  })
  .then(() => {
    console.log(4);
  })
  .then(() => {
    console.log(5);
  })
  .then(() => {
    console.log(6);
  });

// 1
// 2
// 4
// 3
// 5
// 6
```

- 因此，在 `return` 一个 `Promise` 时，会比正常 `return` 一个非 `Promise` 的值，多注册两个个微任务

```js
Promise.resolve()
  .then(() => {
    return new Promise((resolve) => {
      resolve(); // Promise.resolve()
    })
      .then((res) => {
        console.log(0);
      })
      .then((res) => {
        console.log(0.1);
      })
      .then((res) => {
        console.log(0.3);
      });
  })
  .then((res) => {
    console.log(0.2);
  });

Promise.resolve()
  .then(() => {
    console.log(1);
  })
  .then(() => {
    console.log(2);
  })
  .then(() => {
    console.log(3);
  })
  .then(() => {
    console.log(4);
  })
  .then(() => {
    console.log(5);
  })
  .then(() => {
    console.log(6);
  });

// 1
// 0
// 2
// 0.1
// 3
// 0.3
// 4
// 5
// 0.2
// 6
```

- 但是，需要注意的是，如果返回的 `promise` 是经过 `then` 处理后的，那么就只会在 `return` 时创建一个微任务，而包装值的过程，`then` 内部已经帮我们进行了处理，因此不会再产生微任务(但 then 本身会注册一个微任务)

```js
Promise.resolve()
  .then(() => {
    return Promise.resolve(1);
  })
  .then((res) => console.log(res));

// Promise.resolve().then(() => {
//     return 1
// })
// .then(res=>res)
// .then(res=>res)
// .then(res=>console.log(res))
```

```js
Promise.resolve()
  .then(() => {
    return Promise.resolve(1).then((res) => res);
  })
  .then((res) => console.log(res));

// Promise.resolve().then(() => {
//     return 1
// })
// .then(res=>res)
// .then(res=>res)
// .then(res=>console.log(res))
```

- 需要注意以上两种情况的区别，一个是会多产生一个微任务，而另一个会多产生两个微任务。甄别以下代码的区别以及微任务注册与执行的时机

```js
// promise1
Promise.resolve()
  .then(() => {
    console.log(0);
    return Promise.resolve(2);
  })
  .then((res) => {
    console.log(5);
  });

Promise.resolve()
  .then(() => {
    console.log(1);
  })
  .then(() => {
    console.log(3);
  })
  .then(() => {
    console.log(4);
  })
  .then(() => {
    console.log(6);
  })
  .then(() => {
    console.log(7);
  });
```

```js
// promise2
Promise.resolve()
  .then(() => {
    console.log(0);
    return Promise.resolve(2).then((res) => {
      console.log(res);
      return res;
    });
  })
  .then((res) => {
    console.log(5);
  });

Promise.resolve()
  .then(() => {
    console.log(1);
  })
  .then(() => {
    console.log(3);
  })
  .then(() => {
    console.log(4);
  })
  .then(() => {
    console.log(6);
  })
  .then(() => {
    console.log(7);
  });
```

```js
// promise3
Promise.resolve()
  .then(() => {
    console.log(0);
    return Promise.resolve(2).then((res) => console.log(res));
  })
  .then((res) => {
    console.log(5);
  });

Promise.resolve()
  .then(() => {
    console.log(1);
  })
  .then(() => {
    console.log(3);
  })
  .then(() => {
    console.log(4);
  })
  .then(() => {
    console.log(6);
  })
  .then(() => {
    console.log(7);
  });
```

```js
// promise4
Promise.resolve()
  .then(() => {
    console.log(0);
    return Promise.resolve(2).then((res) => res);
  })
  .then((res) => {
    console.log(5);
  });

Promise.resolve()
  .then(() => {
    console.log(1);
  })
  .then(() => {
    console.log(3);
  })
  .then(() => {
    console.log(4);
  })
  .then(() => {
    console.log(6);
  })
  .then(() => {
    console.log(7);
  });
```

| 代码块   | 次序 1 | 次序 2 | 次序 3 | 次序 4 | 次序 5 | 次序 6 | 次序 7 | 次序 8 |
| -------- | ------ | ------ | ------ | ------ | ------ | ------ | ------ | ------ |
| promise1 | 0      | 1      | 3      | 4      | 5      | 6      | 7      | -      |
| promise2 | 0      | 1      | 2      | 3      | 4      | 5      | 6      | 7      |
| promise3 | 0      | 1      | 2      | 3      | 4      | 5      | 6      | 7      |
| promise4 | 0      | 1      | 3      | 4      | 5      | 6      | 7      | -      |
