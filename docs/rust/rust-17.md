---
title: Trait(一)
date: 2023-06-26 09:49:10
categories: Rust
order: 18
tags:
  - Rust
  - trait
---

## Trait
---
1. 什么是 trait
- Trait 告诉编译器，某种类型具有哪些并且可以与其它类型共享的功能。trait 可以以抽象的方式来定义共享行为，类似其他语言中的 interface，但有些区别
- trait bounds(约束): 它可以将泛型类型参数指定为实现了特定行为的类型，就是要求泛型的类型参数实现了某些 trait

2. 定义一个 trait
- 类型它的行为由该类型本身可调用的方法来组成的，但是有时候不同的类型上边他们都具有相同的方法，这个时候就称这些类型共享了相同的行为
- trait 提供了一种方式，它可以把一些方法放在一起，来定义实现某种目的所必需的一组行为。在 trait 的定义内，只有方法签名，没有具体实现。trait 内可以定义多个方法，以 ; 结尾

```rs
pub trait Summary {
    sn summarize(&self) -> String;
}
```

3. 在类型上实现 trait
- 与为类型实现方法类似，但也有不同之处。需要在 impl 的块内，对 trait 的方法签名进行具体的实现(有点类似抽象类 + 继承)

```rs
// Cargo.toml
[package]
name = "rust_demo"
```

```rs
/** 
  * Summary 定义了方法签名，如果要在类型上实现 trait，需要实现该方法
  * src/lib.rs
*/
pub trait Summary {
    fn summarize(&self) -> String;
}

pub struct NewsArticle {
    pub headline: String,
    pub location: String,
    pub author: String,
    pub content: String,
}

impl Summary for NewsArticle {
    fn summarize(&self) -> String {
        return format!("{}, by {} ({})",self.headline,self.author,self.location);
    }
}

pub struct Tweet {
    pub username: String,
    pub content: String,
    pub reply: bool,
    pub retweet: bool,
}

impl Summary for Tweet {
    fn summarize(&self) -> String {
        return format!("{}: {}",self.username,self.content);
    }
}
```

```rs
// src/main.rs
use rust_demo::Tweet;
use rust_demo::NewsArticle;

fn main () {
    let tweet = Tweet {
        username:"xiaoming".to_string(),
        content:"dioajkdkajsnfjdan sjnndajsdnjasn".to_string(),
        reply:false,
        retweet:false
    };

    println!("new tweet: {}",tweet.summarize());
}
```

- 这里可以发现，这个 trait 也被我们引入进来了，这是因为来自 trait 里面的东西，只有当这个 trait 在作用域的时候才能被使用(还需要是公共的)

4. 实现 trait 的约束
- 在某个类型上实现某个 trait 的前提条件是，这个类型或这个 trait 是在本地 crate 里定义的
- 无法为外部类型来实现内部的 trait，例如在本地库里面为标准库里面 vector 这个类型实现标准库里面的 display trait，这就是不可以的
- 这个限制是程序属性的一部分(也就是一致性)，更具体地说是孤儿规则：之所以这样命名是因为它的父类型并没有定义在当前的库里边；此规则可以确保其他人的代码不能破坏你写的代码，反之亦然
- 如果没有这个规则，两个 crate 可以为同一类型实现同一个 trait，rust 就不知道应该使用哪个实现了

5. 默认实现
- 有时为 trait 中的某些或者所有方法提供默认行为是非常有用的，它可以使我们无需为每一个类型的实现都提供自定义的行为，我们可以针对某些特定的类型实现 trait 里面的方法
- 当我们为某个特定类型实现 trait 时，我们可以选择保留或者是重载每个方法的默认实现


```rs
/** 
  * summarize 没有方法实现，我们可以给它做一个默认的实现
  * src/lib.rs
*/
pub trait Summary {
    // fn summarize(&self) -> String;
    fn summarize(&self) -> String {
        String::from("(Read more ... )")
    }
}

pub struct NewsArticle {
    pub headline: String,
    pub location: String,
    pub author: String,
    pub content: String,
}

/**
 * 有了默认的实现，如果没需要的话，就可以不用进行自己的实现，但不妨碍类型的调用
*/
impl Summary for NewsArticle {
    // fn summarize(&self) -> String {
    //     return format!("{}, by {} ({})",self.headline,self.author,self.location);
    // }
}

pub struct Tweet {
    pub username: String,
    pub content: String,
    pub reply: bool,
    pub retweet: bool,
}

/**
 * 这里针对 summarize 有了一个具体的实现，我们把这个实现叫做默认实现的一个重写的实现
*/
impl Summary for Tweet {
    fn summarize(&self) -> String {
        return format!("{}: {}",self.username,self.content);
    }
}
```

- 默认实现的方法也可以调用 trait 中其它的方法，即使这些方法没有默认实现

```rs
/** 
  * summarize_author 只有方法签名没有默认实现，但 trait 中的 summarize 方法仍然可以调用它
  * src/lib.rs
*/
pub trait Summary {
    fn summarize_author(&self) -> String;

    fn summarize(&self) -> String {
        String::from("(Read more from {} ... )",self.summarize_author())
    }
}

pub struct NewsArticle {
    pub headline: String,
    pub location: String,
    pub author: String,
    pub content: String,
}

/**
 * 如果想在具体的类型上使用 summarize 这个默认实现的话，我们就需要实现这个 summarize_author 方法，这样类型就可以正常使用 summarize 这个方法了
*/
impl Summary for NewsArticle {
    fn summarize_author(&self) -> String {
        return format!("@{}",self.author);
    }
}
```

- 但需要注意的是，无法从方法的重写中调用 trait 默认的方法实现