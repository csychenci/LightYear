---
title: 示例程序
date: 2023-02-23 21:14:05
categories: Rust
order: 3
tags:
  - Rust
---

## 示例程序
---
1. 代码分析

```rust
use std::io;
use rand::Rng;

fn main() {
    println!("猜数!");

    let mut guess = String::new();

    let rand_number = rand::thread_rng().gen_range(1..10);



    io::stdin().read_line(&mut guess).expect("无法运行");

    println!("你猜测的数是：{}",guess)
}
```

- std(*The Rust Standard Library*) 是 rust 的标准库，默认情况下，rust 会将 *prelude* 这样一个模块的内容导入到每个程序的作用域中(**std::prelude：预导入。如果你要使用的内容不在prelude这个模块中，就需要使用use这个关键字来显式地将模块导入到程序中**)
```rust
  println!("猜数!");
```
- `println!`，加感叹号的函数表示它是一个宏，并且 rust 的宏是基于 ast 语法树的，而不是 c/c++ 那种 #define 简单的文本替换
```rust
  let mut guess = String::new();
```
- rust 中所有的变量默认情况下是不可变(inmutable)的，rust 认为，应该显式地区分可变与不可变的数据。使用 mut 可以定义一个可被修改的变量，声明可变就意味着该变量能被修改，而默认不可变是因为，根据统计，一般而言，不被修改的变量要比被修改的变量多

```rust
let foo = 1; // 不可变
let bar = foo; // 不可变
foo = 2; // 报错，不可修改

let mut foo1 = 1; // 可变
let bar1 = foo1; // 不可变
bar = 2; // 报错
// 被赋值的变量并不会携带上这个特性(也就是赋值的变量是个可变的这个特性)
```

- 其中，声明变量可以使用 let、const 进行声明变量，使用 const 进行初始化时，必须确保右边的值是个常量，比如1、2这种字面常量，或者常量函数的返回值。const 声明的常量是大写字母组成，而且必须强制地加上类型注释，而且必须声明与赋值一起，let 与 const 最大的区别在于初始化

- 而双冒号::是运算符允许我们调用置于 String 命名空间下面的特定函数，在上面的代码中，String::new 表示 new 是 string 类型的关联函数，而不需要使用类似于 string_from 这样的名字。关联函数意味着它是按照这个类型的本身来实现的，而不是针对字符串的某个特定实例来实现的

```js
// 关联函数类似于 js 对象上的类方法，而非实例方法
function Person (name,age) {
  this.name = name;
  this.age = age;
  this.getName = function () {
    return this.name
  }
}

Person.Whoami = function () {
  return "person"
}
```

2. read_line
- 可用于获取用户的输入，将用户的输入放到一个字符串中。它需要一个字符串作为它的参数，并且这个参数需要是可变的，因为这个方法会随着用户的输入来修改这个字符串的内容
- *&* 表示取地址符号，通过引用在代码的不同地方来访问同一块数据，方法的参数按引用传递，这种情况下它们指向同一块内存地址、同一块数据。 rust 的一个核心竞争力是，它可以保证我们可以简单并且安全的使用这个引用功能，而引用在默认情况下也是不可变的
- read_line 的返回值是一个 Result，在 rust 的标准库中有很多 Result，既有标准的 result（也称为泛型的result），也有特定版本的子模块的 result，result 是一个枚举类型。枚举类型通常有几个固定的值，这些值称为枚举类型的变体
- 其中 io::result 有两个变体，一个是 OK，一个是 Err，result 上面还定义了许多的方法，例如except，这个方法假如 io::result 返回的值是 Err，except 就会中断当前的程序，并将传入的参数显示出来；如果是ok，会将ok中附加的值作为结果返回给用户
- 如果不调用except，Result未被处理，rust会提出警告，因为我们未对代码中潜在的错误进行处理

3. thread_rng
- 返回的类型是 Thread_Rng，这个类型就是一个随机数生成器，它位于本地线程空间，并通过操作系统获得随机数的种子。通过它上面的 `gen_range` 方法来生成随机数

4. {}
- {} 是一个占位符，会进行替换后面变量的值，多个 {} 按后面变量的顺序进行替换

5. Ordering

```rs
pub enum Ordering {
    /// An ordering where a compared value is less than another.
    #[stable(feature = "rust1", since = "1.0.0")]
    Less = -1,
    /// An ordering where a compared value is equal to another.
    #[stable(feature = "rust1", since = "1.0.0")]
    Equal = 0,
    /// An ordering where a compared value is greater than another.
    #[stable(feature = "rust1", since = "1.0.0")]
    Greater = 1,
}
```

- 它是一个枚举类型，它有三个类型/变体，如上所示，它们分别表示小于、等于、大于

```rust
use std::io;
use std::cmp::Ordering;

fn main() {
  let mut guess = String::new();
  io::stdin().read_line(&mut guess).expect("无法运行");
  let guess:u32 = guess.trim().parse().expect("please type a number");
  // let guess = guess.trim().parse::<u32>().expect("please type a number"); 或者这样使用，就不需要显式指定 guess 的类型
  // 不想明确类型时，就靠默认值和上下文类型推导确定；想要明确类型，就:u32明确在变量后，不让编译器确定，自己确定
  match guess.cmp(&1) {
    Ordering::Less => println!("too Small"),
    Ordering::Greater => println!("too Big"),
    Ordering::Equal => println!("same number,ok!")
  }
}

```
- `trim` 表示去除字符串类型左右两边的空白(*包括用户输入时按下的空格*)，`parse` 会将结果解析成整数，但无法保证用户输入的一定是数字，也可能是英文字符等，因此可能会失败(无法解析成整数)，所以 `parse` 的返回值类型是一个 Result 枚举类型(Err/ok)，所以要对 Err 的类型结果进行截断处理
- 在 guess 变量上有一个方法 cmp(compare)，表示比较，它会将 guess 与传入 cmp 内的参数的值/引用进行比较，它的返回值的类型是 Ordering。而 `match` 方法可以根据 cmp 返回的 `Ordering` 的值来决定下一步做什么，一个 `match` 表达式是由多个手臂/分支来组成的，每一个分支有一个用于匹配的模式，如果某个 arm 能匹配上，就会执行其后的代码，它会按顺序从上到下进行匹配
- 在上面的代码中我们可以发现，声明了两个同名的变量，但它并不会提示或构建错误。这是因为 rust 中，它允许我们使用同名的新变量来隐藏(shadow)原来同名的旧变量(*上述代码中转换成u32的行之后都是使用的新的guess*)。通常用于需要类型转换的场景中，它允许我们复用同名的变量而无需创建新的变量

6. loop
- 调用loop表示无限循环，而不是 while true（Rust里有while关键字）。它将不会在程序走到最后的时候结束，会重复地从头开始执行你的程序。如果需要跳出你的循环，只需要在匹配的情况下执行完其他代码后使用 break 跳出循环。如果需要处理某些特殊情况而又不想让程序结束运行，可以使用 `continue` 关键字，跳过本轮循环开启下一轮循环
```rs
use std::io;
use std::cmp::Ordering;

fn main() {
  loop {
    let mut guess = String::new();

    io::stdin().read_line(&mut guess).expect("无法运行");

    let guess:u32 = guess.trim().parse().expect("please type a number");

    // let guess = guess.trim().parse::<u32>().expect("please type a number"); 或者这样使用，就不需要显式指定 guess 的类型
    // 不想明确类型时，就靠默认值和上下文类型推导确定；想要明确类型，就:u32明确在变量后，不让编译器确定，自己确定

    match guess.cmp(&1) {
      Ordering::Less => println!("too Small"),
      Ordering::Greater => println!("too Big"),
      Ordering::Equal => {
        println!("same number,ok!");
        break;
      }
    }
  }

}
```
- 这里需要注意，不能将 guess 放在循环体之外。但是现在的代码还存在一个问题，当输入一个非数字的字符时，程序会抛出错误并结束运行，因此，我们需要对这种情况进行额外处理

```rs
use std::io;
use std::cmp::Ordering;

fn main() {
  loop {
    let mut guess = String::new();

    io::stdin().read_line(&mut guess).expect("无法运行");

    let guess:u32 = match guess.trim().parse() {
      Ok(num) => num,
      // 将接收到的数字直接返回给 guess
      Err(_) => continue
      // 当输入有误时我们并不关心输入的是什么，因此我们使用_通配符，这时只需要让用户重新输入即可
    };

    match guess.cmp(&1) {
      Ordering::Less => println!("too Small"),
      Ordering::Greater => println!("too Big"),
      Ordering::Equal => {
        println!("same number,ok!");
        break;
      }
    }
  }

}
```

- 我们可以使用 match 代替 expect 处理错误，这是 rust 中处理错误的惯用手段。前面知道了 Result 枚举类型有两个子类型，Ok/Err，它们分别能接受对应的参数并返回出来，这里就可以使用 match 对不同的类型进行模式匹配并处理