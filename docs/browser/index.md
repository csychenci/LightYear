---
order: 0
---

# Browser kernel

---

## 有关页面的疑问

---

1. 单个页面卡死最终崩溃导致所有页面崩溃的情况

- 通常情况下，一个页面使用一个进程，但是，在多个页面符合 _同一站点(same-site)_ 的情况下，它们将会被分配到一个渲染进程里面去，这样一个页面崩溃，会导致同一站点的页面同时崩溃，因为它们使用了同一个渲染进程(在同一个渲染进程里面，它们会共享 js 的执行环境，也就是说 A 页面可以直接在 B 页面中执行脚本)
- **同一站点**：根域名加上协议(https:// 或 http://)，还包含了 **该根域名下的所有子域名和不同的端口**

```js
'https://jetmine.cn';
'https://blog.jetmine.cn';
'https://example.jetmine.cn';
```

- **process-per-site-instance**：Chrome 的默认策略是，每个标签对应一个渲染进程。但是如果 **从一个页面打开了新页面**，而新页面和当前页面属于同一站点时，那么新页面会复用父页面的渲染进程

2. 浏览器可以同时打开多个页签，他们端口一样吗？如果一样，数据怎么知道去哪个页签？

- 端口一样的，网络进程知道每个 tcp 链接所对应的标签是那个，所以接收到数据后，会把数据分发给对应的渲染进程。

3. TCP 传送数据时 浏览器端就做渲染处理了么？如果前面数据包丢了 后面数据包先来是要等么？类似的那种实时渲染怎么处理？针对数据包的顺序性？

- 接收到 http 响应头中的 content-type 类型时就开始准备渲染进程了，响应体数据一旦接受到便开始做 DOM 解析了！基于 http 不用担心数据包丢失的问题，因为丢包和重传都是在 tcp 层解决的。http 能保证数据按照顺序接收的（也就是说，从 tcp 到 http 的数据就已经是完整的了，即便是实时渲染，如果发生丢包也得在重传后才能开始渲染）

4. http 和 websocket 都是属于应用层的协议吗？

- 都是应用层协议，而且 websocket 名字取的比较有迷惑性，其实和 socket 完全不一样，可以把 websocket 看出是 http 的改造版本，增加了服务器向客户端主动发送消息的能力。

5. 关于 "数据在传输的过程中有可能会丢失或者出错"，丢失的数据包去哪里了？凭空消失了吗？出错的数据包又变成啥了？ 为什么会出错？

- 比如网络波动，物理线路故障，设备故障，恶意程序拦截，网络阻塞等等