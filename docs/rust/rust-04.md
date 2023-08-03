---
title: rust编程概念(二)
date: 2023-04-13 19:36:44
categories: Rust
order: 5
tags:
  - Rust
  - 函数
---

## 函数
---
1. 语句与表达式
- rust 使用 fn 关键字声明一个函数。依照惯例，针对函数和变量名，rust 使用 snake case 命名规范：即所有的字母都是小写的，单词之间使用下划线分开

```rs
fn main() {
  println!("hello world");
  test_fn();
}

fn test_fn() {
  println!("hello test_fn");
}
```

- rust 不关心函数的声明位置，只要同处一个作用域，其他函数就能互相调用
- 函数体由一系列语句组成，可选的由一个表达式结束。rust 是一个基于表达式的语言，语句是执行一些动作的指令，表达式会计算产生一个值/对应一个值，且函数的定义也是语句。*语句不返回值，所以不可以使用 let 将一个语句赋给一个变量*

```rs
fn main () {
  let x = (let y = 6);
  // error

}
```

2. 函数的参数
- `parameters`：形参，函数声明时定义的参数，`arguments`：实参，函数被调用时传进去的参数。函数在声明时必须声明参数的类型，并且调用该函数时必须传入与形参一样的类型

3. 函数的返回值
- 在 -> 符号后边声明函数返回值的类型，但是不可以为返回值命名。在 rust 中，返回值就是函数体里面最后一个表达式的值；若想提前返回，需使用 return 关键字，并指定一个值
- 大多数函数都是默认使用最后一个表达式作为返回值

```rs
fn main () {
  let x = fn_1(6);
  println!("{}",x)
};

fn fn_1 (x:i32) -> i32 {
    x + 5
};
```
- 需要注意的是，如果 `x + 5` 后加了分号后就会变成语句，返回值就不再是指定的返回类型了。所以为了保证可读性，最好是使用 return 的方式进行返回
---
## 控制流
---
1. if 表达式
- if 表达式允许您根据条件来执行不同的代码分支，这个条件必须是 bool 类型，其中与条件相关联的代码块就叫做分支(arm)，支持 else 表达式

```rs
fn main () {
  let num = 2;

  if num < 3 {
    // ...
  } else if num > 2 {
    // ..
  }  else if num == 1 {

  } else {
    // ...
  }
}
```
- 如果你在代码里使用了多于一个 else if，那么最好使用match 来重构代码。并且由于 if 是一个表达式，所以可以将它放在 let 语句中等号的右边，但是要求 if else 代码块中返回的值的类型保持一致

```rs
fn main () {
  let num = if true { 5} else {6};
}
```

2. loop
- loop 关键字告诉 rust 反复的执行一段代码，直到你喊停。通过在 loop 循环中使用 break 关键字来告诉程序何时停止循环

```rs
fn fn_1 () {
  let mut counter = 0;

  let res = loop {
      counter +=1;
      if counter == 10 {
          break counter * 2;
      }
  };

  println!("循环数为:{},{}",res,counter);
  // 20 10
}
```

- 同时，loop 作为一个表达式会返回一个值，可以通过 break 跳出的同时返回一个值

3. while
- 每次执行循环体之前都判断一次条件。while 是不具有返回值的

```rs
fn fn_2 () {
    let mut counter = 0;
  
    while counter < 10 {
      counter +=1;
    }
  
    println!("循环数为:{}",counter);
    // 20 10
}
```

4. for
- 可以使用 while 或 loop 来遍历集合，但是易错且低效。而使用 for 循环更简洁紧凑，它可以针对集合中的每个元素来执行一些代码
- 使用 for 循环遍历集合不会出现索引出错的情况，不会出现索引超出数组长度的情况。另外，在每次遍历的时候，也不需要额外的检查一些条件，类似判断之类的

```rs
fn fn_3() {
	let arr:[i32;4] = [1,2,3,4];

	for ele in arr.iter() {
    // ele &i32
		println!("{}",ele)
	}

  for ele in arr.iter().enumerate() {
    // ele &i32
		println!("{}",ele)
	}
}
```
- 其中 iter() 类似于 js 的迭代器，并且 ele 的类型不是数组的类型，而是有一个取地址符号。这意味着每次遍历的时候，数组中的元素并没有复制出来，而是直接引用了数组里的元素，相当于是一个指针

```rs
fn main() {
  let arr:[i32;4] = [1,2,3,4];

  for (idx,ele) in arr.iter().enumerate() {
    // idx:usize ele:&i32
		println!("{},{}",idx,ele)
	}
}
```
- enumerate 会将 iter 这个方法返回的结果进行包装，并把每个结果作为元组的一部分进行返回，这个元组的第一个元素就是遍历的索引；另一个就是数组中的元素(usize,&item)，它是一个引用

5. Range
- 由标准库提供，指定一个开始数字和结束数字，range 可以生成它们之间的数字（不含结束）。还可以通过 rev 来反转 Range
- 此处不是引用，注意，而是直接取的 range 中的元素

```rs
fn fn_4() {
	println!("反转前");
	for ele in (1..4) {
		println!("{}",ele)
	}

	println!("反转后");
	for ele in (1..4).rev() {
		println!("{}",ele)
	}

}
```