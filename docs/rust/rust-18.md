---
title: Trait(二)
date: 2023-06-26 21:53:40
categories: Rust
order: 19
tags:
  - Rust
  - trait
---

## Trait
---
1. 如何把 Trait 作为参数
- 使用 impl Trait 语法，它适用于简单情况

```rs
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

/**
  * 此时既可以传进去 NewsArticle 也可以传进去 Tweet
  * 如果有其它的类型也实现了 Summary，那么也可以作为参数传进去
*/
pub fn notify(item:impl Summary) {
    println!("Breaking news! {}",item.summarize());
}
```

- Trait bound 语法，适合于比较复杂的情况。下面的例一看不出来 trait bound 的优势，换一种写法看看

```rs
pub trait Summary {
    fn summarize(&self) -> String;
}

pub fn notify<T: Summary>(item:T) {
    println!("Breaking news! {}",item.summarize());
}
```


```rs
pub trait Summary {
    fn summarize(&self) -> String;
}

pub fn notify<T: Summary>(item1:T,item2:T) {
    println!("Breaking news! {}",item1.summarize());
}

pub fn notify1(item1:impl Summary,item2:impl Summary) {
    println!("Breaking news! {}",item1.summarize());
}
```

- impl Trait 语法是 Trait bound 的语法糖。还可以使用 + 指定多个 trait

```rs
/**
  * 要求实现 Summary 和标准库的 Display 这两个 trait
*/
use std::fmt::Display;

pub trait Summary {
    fn summarize(&self) -> String;
}

pub fn notify<T: Summary + Display>(item:T) {
    println!("Breaking news! {}",item.summarize());
}

pub fn notify1(item:impl Summary + Display) {
    println!("Breaking news! {}",item.summarize());
}
```

- 但是这种写法也是有缺点的，因为每个泛型都有自己的 trait 约束，如果是多个泛型参数的话，这个函数名和函数参数列表之间就可能会写大量的 trait 约束信息，这个时候函数的签名就不太直观、不太好理解了

```rs
use std::fmt::{Display,Debug};

pub trait Summary {
    fn summarize(&self) -> String;
}

pub fn notify<T: Summary + Display,U:Clone + Debug>(a:T,b:U) -> String {
    println!("Breaking news! {}",a.summarize());
}

pub fn notify<T, U>(a: T, b: U) -> String
where
    T: Summary + Display,
    U: Clone + Debug,
{
    let v = a.summarize();
    println!("Breaking news! {}", v);
    return v;

}
```

- 这样写就直观很多了，通过在 方法签名后指定 where 子句

2. 实现 Trait 作为返回类型
- 同样返回类型也可以使用 impl Trait。但这种写法有一点注意，如果让返回类型实现了某个 trait，那么必须让这个函数或者方法它可能返回的 **具体的类型**。也就是说，impl Trait 只能返回确定的同一种类型，返回可能不同类型的代码会报错

```rs
pub trait Summary {
    fn summarize(&self) -> String;
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

pub fn notify(s:&str) -> impl Summary {
    return Tweet {
        username:"xiaoming".to_string(),
        content:"dioajkdkajsnfjdan sjnndajsdnjasn".to_string(),
        reply:false,
        retweet:false
    };
}
```

```rs
/**
  * 以下的写法就会报错
*/
pub fn notify(flag:bool) -> impl Summary {
    if flag {
        return Tweet {
            username:"xiaoming".to_string(),
            content:"dioajkdkajsnfjdan sjnndajsdnjasn".to_string(),
            reply:false,
            retweet:false
        };
    } else {
        return NewsArticle {
            headline: String::from("xxxxx"),
            location: String::from("xxxxx"),
            author: String::from("xxxxx"),
            content: String::from("xxxxx"),
        }
    }
}
```

- 使用 Trait bound 修复之前报错的 largest 函数。这个只要将 PartialOrd 这个 trait 加入到泛型的约束里面就可以了

```rs
/**
  * can't compare `T` with `T`
  * > 对应的是 标准库上的 std::cmp::PartialOrd ,这个 trait 上面有一个默认的方法
  * 所以，只有 T 这个类型实现了这个 trait，那么它才可以使用 大于号来进行比较
*/
fn largest<T>(list:&[T]) -> T {
    let mut largest = list[0];

    for &item in list.iter() {
        if item > largest {
            largest = item;
        }
    }

    return largest
}
```

```rs
/**
  * can't compare `T` with `T`
  * > 对应的是 标准库上的 std::cmp::PartialOrd ,这个 trait 上面有一个默认的方法
  * 所以，只有 T 这个类型实现了这个 trait，那么它才可以使用 大于号来进行比较
*/
fn largest<T:PartialOrd + Clone>(list:&[T]) -> T {
    let mut largest = list[0].clone();

    for item in list.iter() {
        if *item > largest {
            largest = item.clone();
        }
    }

    return largest
}
```
```rs
fn largest<T:PartialOrd + Clone>(list:&[T]) -> &T {
    let mut largest = list[0];

    for item in list.iter() {
        if *item > &largest {
            largest = item;
        }
    }

    return largest
}
```

3. 使用 trait bound 有条件的实现方法
- 在使用泛型类型参数的 impl 块上使用 Trait bound，我们可以有条件的为实现了特定 trait 的类型来实现方法

```rs
use std::fmt::Display;

struct Pair<T> {
    x: T,
    y: T
}

impl<T> Pair<T> {
    fn new(x:T,y:T) -> Self {
        return Self {x,y}
    }
}

impl <T: Display + PartialOrd> Pair<T> {
    fn cmp_display(&self) {
        if self.x > self.y {
            println!("{} is more than {}",self.x,self,y);
        } else {
            println!("{} is more than {}",self.y,self,x);
        }
    }
}
```

- 在上面的例子中，不管 T 是什么类型，Pair\<T> 都会有一个 new 方法；而 T 只有实现了 Display、PartialOrd 这两个 trait 的时候，它才拥有 cmp_display 这个方法
- 我们也可以为实现了其他 trait 的任意类型有条件的实现某个 Trait。而为满足 Trait bound 的所有类型上实现 Trait 叫做覆盖实现(blanket implementations)

```rs
/** 
  * 针对所有实现了 Display trait 的类型都给它们实现了 ToString 这个 trait
  * 而在 ToString 这个方法上，就存在一个 to_string 方法，这样实现了 Display trait 的类型就可以调用 to_string 方法
*/
impl <T: fmt::Display> ToString for T {

}
```