---
order: 1
---

## React

---

- [初学 React 必须知道的 8 个问题](https://mp.weixin.qq.com/s?__biz=MzI3ODU4MzQ1MA==&mid=2247485423&idx=1&sn=7f525091a04fe3943073803e4db9ff57&chksm=eb55861adc220f0c375455c5374f1e69830982081ed23cbb9085569fa55f5689bd0266f9d9ce&scene=126&sessionid=1602318208&key=9701b8bf0b69875a625f3e40c2d6cd0d04194dd7d4d72cc9c6cd13f72bc32bfaf5c7b6faf212f579799c9c6576079e96a0d4667a757fe589a07438a95b478caf8defa94ac2ac70ca835922efdd58d1fde45bf2a86e7d2796c0b1d9c376e12abfb06bee1d82742ff4f38b5ac9cf11bf2748f826fcaf6ca96861892d41084de381&ascene=1&uin=NDU2NzUzMzg0&devicetype=Windows+10+x64&version=6209007b&lang=zh_CN&exportkey=AWIjf6mkbc7QTXGqm02CJHg%3D&pass_ticket=8yKKY4wNep7UoFpznZ0nV3wzBbByodtes3TRW5s1IPdl68OPsucovPfGLXPVMnZF&wx_header=0)
- [深入理解 React 底层原理](https://bingxiong.vip/?p=17491)
- [redux 为什么必须是一个纯函数](https://zhuanlan.zhihu.com/p/25218718)，可预测、可维护
- [为什么不使用一个全单例模式代替 redux](https://www.zhihu.com/question/428851039)
- `纯函数`：相同的输入得到相同的输出，函数在执行过程中，不能产生副作用，副作用即为对某一个状态进行了修改

```js
function fn(count1, count2) {
  return count1 + count2;
}
// 输出依赖于输入的内容
// 中间没有产生副作用
```

```js
let count = 5;
function fn(num) {
  return count + num;
}
// 变量依赖于一个外部变量，变量发生改变时，输出会不一样，将let改为const能达到相同的效果
```
