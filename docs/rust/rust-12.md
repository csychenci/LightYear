---
title: Vector
date: 2023-06-09 01:45:00
categories: Rust
order: 13
tags:
  - Rust
  - Vector
  - 集合
---

## Vector
---
1. 描述
- 在 rust 标准库中，提供了很多集合类型的数据结构，这些集合可以包含多个值。而这些集合和数组、tuple 是有所不同的，这些集合是指向在 heap 上的数据，这也就意味着这些集合的大小无需在编译时就确定，在运行时可以动态的变大或者变小

2. Vector
- 由标准库提供，写法是 `Vec<T>`，它可以存储多个值，但只能 **存储相同类型的数据**，这些值在内存中连续存放

```rs
// Vec::new 创建的是一个空的vector，里面没有数据，这样 rust 会无法推断出它的类型
// 因此需要显示指明 vector 内的类型
fn main () {
    let v:Vec<i32> = Vec::new();
}
```

- 还可以使用初始值来创建 `Vec<T>`，使用 vec! 宏，这样 rust 就能推断出 vector 内的类型
```rs
fn main () {
    let v = vec![1,2,3];
}
```

- 更新 vector，向 vector 添加元素，使用 push 方法

```rs
fn main () {
    let mut v = Vec::new();
    v.push(1);
}
```

- 删除 vector，与其他 struct 一样，当 vector 离开作用域后它就被清理掉了，此时它的所有元素也会被清理掉
- 读取 vector 中的元素可以使用索引或者 get 方法获取。需要注意的是，get 方法返回的是 Option 枚举，所以需要用到模式匹配

```rs
fn main() {
    let v = vec![1,2,3];
    let third:&i32 = &v[2];

    println!("index:{}",third);

    match v.get(2) {
        Some(i) => println!("get:",i),
        None => ()
    }
}

// index:3
// get:3
```

- 使用索引的方式访问，当越界时，程序会恐慌；而 get 方法不会，因为 match 中对获取为空，也就是 None 的变体进行了处理
- 所有权和借用规则，不能在同一作用域内同时拥有可变和不可变引用。vector 在内存中的位置是连续的，在以下的代码中，push 向 vector 添加元素时，在内存中就可能没有这么大的连续内存，rust 就会将这段内存重新分配一下，再找一个足够大的内存来放置一个添加元素之后的 vector，这样的话，它原先的那块儿内存就有可能被释放或者重新分配，在内存分配或者重新释放掉后，first 变量仍会指向之前的内存地址，这样的话这个程序就会出问题，而借用规则就会防止类似情况发生

```rs
//  这里会保存的原因是 first 变量保存了一个 v 的不可变引用
// 而 v.push 则是一个可变的引用，自然就编译不通过了
fn main () {
    let mut v = vec![1,2,3,4,5];
    let first = &v[0];
    v.push(6);
    // error
    println!("{}",first);
    // 使用了不可变借用
}
```

- 遍历 vector 内的值可以使用 for 循环

```rs
fn main () {
    let mut v = vec![1,2,3,4,5];
    for i in &mut v {
        *i+=5;
    }
    // *是取这个地址的值，i对应的是v的每个元素的地址，所以要取这个地址的值
    for i in &mut v {
        println!("{}",i);
    }
}
```

- vector 只能存储相同类型的数据，如果要存储多种数据类型的话，可以利用 **enum 的变体可以附加不同类型的数据** 的特点，并且变体的类型跟枚举类型一致。下面的 vector 的类型就是 SpreadsheetCell

```rs
enum SpreadsheetCell {
    Int(i32),
    Float(f64),
    Text(String)
}

fn main () {
    let row = vec![
        SpreadsheetCell::Int(1),
        SpreadsheetCell::Text(String::from("red")),
        SpreadsheetCell::Float(1.5),
    ];
    
}
```