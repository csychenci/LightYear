---
title: 日期与时间
date: 2020-05-03 08:33:45
categories: JavaScript
sidemenu: true
toc: 'content'
order: 17
author: chencicsy
tags:
  - 内置对象
  - JavaScript
  - 日期
  - 时间戳
  - Date
description:
---

## 日期
---
1. 描述
- 该对象用于存储时间和日期，并提供了日期/时间的管理方法

2. 时间戳
- 表示从 1970-01-01 00:00:00 以来经过的毫秒数，它是一个自增的整数。可以理解为从 1970 年 1 月 1 日零时整的 GMT 时区开始的那一刻，到现在的毫秒数，可以精准表示一个时刻，并且与时区无关

3. 时间对象的使用

- 创建一个时间对象

```js
new Date();
// Fri Jan 08 2021 23:55:50 GMT+0800 (中国标准时间)
// 表示系统当前时间
```

```js
/** 
  * 1. 0 表示1970-01-01 00:00:00的时间戳
  * Thu Jan 01 1970 08:00:00 GMT+0800 (中国标准时间)
  * new Date(0).toGMTString() ---> 'Thu, 01 Jan 1970 00:00:00 GMT'
  * 
*/
new Date(0);

/** 
  * 2. 1000 * 60 * 60 * 24 * 30 表示1970-01-31 00:00:00的时间戳
  * Sat Jan 31 1970 08:00:00 GMT+0800 (中国标准时间)
  * new Date(1000 * 60 * 60 * 24 * 30).toGMTString() ---> 'Sat, 31 Jan 1970 00:00:00 GMT'
  * 
*/
new Date(1000 * 60 * 60 * 24 * 30);
```

- 传入负的时间戳整数可以获取 1970-01-01 以前的日期

```js
/** 
  * 表示1969-12-31 00:00:00的时间戳
  * Sat Jan 31 1970 08:00:00 GMT+0800 (中国标准时间)
  * new Date(-1000 * 60 * 60 * 24).toGMTString() ---> ''Wed, 31 Dec 1969 00:00:00 GMT''
*/
new Date(-1000 * 60 * 60 * 24);
```

- 以一定的格式自定义创建一个时间对象

```js
let date = new Date(2020, 6, 15, 18, 20, 35, 123);
/** 
  * 分别指定年月日时分秒毫秒
  * Jul 15 2020 18:20:35 GMT+0800 (中国标准时间
*/
```

|  参数字段   |           描述            | 位置 | 是否必需 |
| --------- | ----------------------- | --- | ------ |
|    year     |     年份,需要是四位数     |  1   |    √     |
|    month    | 月份,从 0-11,表示 1-12 月 |  2   |    √     |
|    date     |    日期,不填默认值为 1    |  3   |    ×     |
|    hours    |     时,不填默认值为 0     |  4   |    ×     |
|   minutes   |     分,不填默认值为 0     |  5   |    ×     |
|   seconds   |     秒,不填默认值为 0     |  6   |    ×     |
| millseconds |    豪秒,不填默认值为 0    |  7   |    ×     |

```js
let date = new Date(2020, 5);
console.log(date);
// Jun 01 2020 00:00:00 GMT+0800 (中国标准时间)
```

4. 自动校准

- 设置时间对象中的相应信息，它会自动为我们调整到正确的相应信息

```js
let date = new Date()
new Date(date + 1000 * 60 * 60 * 24 * 30); // 设置为一个月后的时间
// Tue Feb 09 2021 00:24:29 GMT+0800 (中国标准时间)
new Date().setDate(date.getDate() + 2);
// Tue Feb 23 2021 00:26:01 GMT+0800 (中国标准时间)
new Date(new Date().setDate(0));
// 日期从1开始算，因此会被自动校准到前一天
//  Thu Dec 31 2020 00:28:58 GMT+0800 (中国标准时间)
```

5. 时间操作的性能问题
- 通常，在使用场景中，我们会遇到这样一种情况，计算两个时间的差值。根据 v8 的工作原理，被执行的多次的函数会被标记为热点函数，会被编译成机器码，因此，运行的性能更好、优化更好。多次进行对时间对象的操作，可以考虑运行之前即多次运行该函数，以便拥有更好的优化结果

---
## 获取时间对象
---

1. getFullYear
- 获取时间对象中的年份信息

```js
let date = new Date();
date.getFullYear(); // 2020
```

2. getMonth
- 获取时间对象中的月份信息，从 0-11 表示 1-12 月

```js
let date = new Date();
date.getMonth(); // 4
```

3. getDate
- 获取时间对象中的日期信息

```js
let date = new Date();
date.getDate(); // 3
```

4. getHours
- 获取时间对象中的小时，24 小时制

```js
let date = new Date();
date.getHours(); // 14
```

5. getMinutes
- 获取时间对象中的分钟数

```js
let date = new Date();
date.getMinutes(); // 25
```

6. getSeconds
- 获取时间对象中的秒数

```js
let date = new Date();
date.getSeconds(); // 37
```

7. getDay
- 获取时间对象所在周的第几天，从 0-6，星期天到星期六

```js
let date = new Date();
date.getDay(); // 3，表示星期
```

8. getMilliseconds
- 获取时间对象中的毫秒数

```js
let date = new Date();
date.getMilliseconds(); // 732
```

9. 基于时区的 UTC 对应项
- 会返回基于 UTC+0（非夏令时的伦敦时间）的相关信息，只需要加上 UTC 即可

```js
let date = new Date();
date.getUTCDate(); // 9
date.getMonth(); // 10
date.getUTCHours(); // 16
date.getHours(); // 0
```

10. getTime
- 返回时间对象的时间戳，从 1970-1-1 00:00:00 UTC+0 开始到现在所经过的毫秒数。还可以使用 + 来转换时间对象位数字以达到获取时间戳的目的

```js
let date = new Date();
date.getTime(); // 1610208704965
```

```js
let date = new Date();
+date; // 1610209877073
```

11. getTimezoneOffset
- 返回 UTC 与本地时区之间的时差，单位为分钟

```js
new Date().getTimezoneOffset(); // -480 UTC+8 -8*60
```

12. 设置时间对象
- 以下除了 setTime 均有 UTC 变体，但未被设置的信息不会被更改

| API                                | 描述                                                        |
| :--------------------------------- | :---------------------------------------------------------- |
| setFullYear(year, [month], [date]) | 可接收 1-3 个参数，分别设置年月日                           |
| setMonth(month, [date])            | 可接收 1-2 个参数，分别设置月日                             |
| setDate(date)                      | 设置日期                                                    |
| setHours(hour, [min], [sec], [ms]) | 可接收 1-4 个参数，分别设置时分秒毫秒                       |
| setMinutes(min, [sec], [ms])       | 可接收 1.-3 个参数，分别设置分秒毫秒                        |
| setSeconds(sec, [ms])              | 可接收 1-2 个参数，分别设置秒毫秒                           |
| setMilliseconds(ms)                | 可接收 1 个参数，即设置毫秒数                               |
| setTime(milliseconds)              | 使用自 1970-01-01 00:00:00 UTC+0 以来的毫秒数来设置整个日期 |

13. Date.now
- 返回当前时间的时间戳，相当于 new Date().getTime()。但它不会先实例化 Date 对象，因此处理会更快，而且不会对垃圾处理造成额外的压力

```js
Date.now(); // 1610210036193
new Date().getTime(); // 1610210036193
```

14. Date.parse
- 可以从一个指定格式的字符串中读取日期，返回一个时间戳。格式可以为：YYYY-MM-DDTHH:mm:ss.sssZ，其中 T 作为一个分隔符存在；Z 可以用于设置时区。或者是格式化的时间格式，YYYY-MM-DD、YYYY-MM、YYYY、YYYY-MM-DD hh:mm:ss 等。格式不正确时返回 NaN

```js
new Date(Date.parse('2020-12-11 12:22:33'));
// Fri Dec 11 2020 12:22:33 GMT+0800 (中国标准时间)
Date.parse('2020-12-11 12');
// NaN
new Date(Date.parse('2020-06-15T18:20:35.875+08:00'));
// Mon Jun 15 2020 18:20:35 GMT+0800 (中国标准时间)

new Date(Date.parse('2020-06-15T18:20:35.875+00:00'));
// Tue Jun 16 2020 02:20:35 GMT+0800 (中国标准时间)
```
