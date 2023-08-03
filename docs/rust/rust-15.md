---
title: 错误处理
date: 2023-06-25 14:53:55
categories: Rust
order: 16
tags:
  - Rust
  - 错误处理
---

## 错误处理
---
1. 错误处理概述
- rust 具有极高的可靠性，而它这种可靠性也延伸到了错误处理的领域。在大部分情况下，rust 会迫使你意识到可能会出现错误的地方，然后在编译阶段就确保他们能够得到妥善的处理
- 在 rust 中，错误分为两大类，一类是可恢复的错误，例如文件未找到，这种情况下就可能把这个错误信息返回给用户并让用户再次尝试寻找这个文件；另一类就是不可恢复的错误(bug)，例如访问的索引超出范围，这意味着可能访问到无效的内存地址，程序这时候运行就是不可靠的。其它的语言中并没有刻意的区分这两种错误，他们通常是使用异常这种机制来统一处理他们，但 rust 内却没有类似异常的机制

|类别|提供方式|描述|
|---|---|---|
|可恢复错误|Result<T,E>||
|不可恢复错误|panic!宏|执行宏的时候程序会立即终止运行｜

2. 不可恢复的错误
- 当 panic! 宏执行时，默认情况下，它会打印出一个错误信息，然后它会展开(unwind)、清理调用栈(Stack)，最后它会退出程序
- 为了应对 panic，默认可以展开调用栈，也可以将这个动作设置成中止(abort)调用栈。默认情况下，当 panic 发生时，程序会展开调用栈(工作量大)，这意味着调用栈会沿着调用栈往回走，在往回走的过程中，每遇到一个函数，rust 就会把这个函数的数据给清理掉
- 另一种做法是立即中止调用栈，这种做法就是不进行清理动作，直接停止程序，这样的话内存就需要 OS 来进行清理
- 那如果想让二进制文件更小，就可以把默认的展开改为中止

```toml
# cargo.toml 生产环境下当程序恐慌的时候立即中止程序
[profile.release]
panic = "abort"
```

```rs
fn main() {
    panic!("crash on you");
}
// thread 'main' panicked at 'crash on you'
```

- panic! 可能出现在我们写的代码中，也可能出现在我们依赖的代码中，可通过调用 panic! 的函数的回溯信息来定位引起问题的代码。通过设置环境变量 RUST_BACKTRACE 可得到回溯信息
- 为了获取带有调试信息的回溯，必须启用调试符号(cargo run/build 不带 --release)

3. Result 枚举与可恢复的错误
- 在大部分情况下，错误其实都没有严重到要停止整个应用程序的地步。例如你想打开某个文件，但如果这个文件不存在，你通常会考虑创建这个文件，而不是中止这个程序的运行
- 那么在 rust 里面我们就可以使用 Result 来处理这种可能失败的情况，这个枚举类型的定义如下所示

```rs
// T: 操作成功情况下， OK 变体里返回的数据的类型
// E: 操作失败情况下，Err 变体里返回的错误的类型
enum Result<T,E> {
    Ok(T),
    Err(E)
}
```

- 处理 Result 的一种方式就是使用 match 表达式，和 Option 枚举一样，Result 及其变体也是由 prelude 预导入的

```rs
// kind() 的返回值是一个枚举，它里面的变体是用于描述 io 操作可能引起的不同的错误
use std::fs::File;

fn main () {
    let f = File::open("text.txt");

    let f = match f {
       Ok(file) => file,
       Err(error) => match error.kind() {
           ErrorKind::NotFound => match File::create("text.txt") {
               Ok(new_file) => new_file,
               Err(err) => panic!("Error createing file: {:?}",err),
           },
           other_error => panic!("Error opening the file: {:?}",other_error),
       }
    };
}
```

- unwrap: match 表达式的一个快捷方法，如果 Result 的结果是 Ok，那就返回 Ok 里面的值；如果 Result 结果是 Err，那就会调用 panic! 宏

```rs
use std::fs::File;

fn main () {
    let f = File::open("text.txt").unwrap();
    // 这里的 open 类似于拿到文件的句柄并且获取资源锁
}
```

- 缺点就是错误信息不可以自定义错误信息，针对这个缺点 rust 提供了另一个方法 expect，它的功能和 unwrap 非常类似，但是可以指定 panic! 宏附带的错误信息

```rs
use std::fs::File;

fn main () {
    let f = File::open("text.txt").expect("文件不存在!");
}
// thread 'main' panicked at '文件不存在!:
```

- 有了这种自定义的错误信息，我们就可以轻松地定位代码中产生这个错误的位置。而 unwrap 触发的 panic 都会打印出同样的错误信息，如果多个地方触发了 panic 而且想找到哪一个 unwrap 导致了 panic，就需要花费更多的时间

4. 传播错误
- 当你的函数中包含了一些可能会执行失败的调用时，你除了可以在这个函数处理这个错误外，还可以将这个错误返回给这个函数的调用者，然后让它们来决定如何进一步处理这个错误

```rs
fn read_username_from_file() -> Result<String,io::Error> {
    let f = File::open("hello.txt");

    let mut f = match f {
        Ok(file) => file,
        Err(e) => return Err(e)
    };

    let mut s = String::new();
    return match f.read_to_string(&mut s) {
        // read_to_string 将文件内的内容读取到变量 s 内
        Ok(_) => Ok(s),
        Err(e) => Err(e)
    }
}
```

- 还可以用 ? 来作为传播错误的快捷方式，以下的代码与上述的代码作用一致。如果 Result 是 Ok，Ok 中的值就是表达式的结果，然后继续执行程序；如果 Result 是 Err，Err 就是整个函数的返回值，就像是使用了 return

```rs
fn read_username_from_file() -> Result<String,io::Error> {
    let mut f = File::open("hello.txt")?;
    let mut s = String::new();
    
    f.read_to_string(&mut s)?;
    // 还支持链式调用
    // let mut f = File::open("hello.txt")?.read_to_string(&mut s)?;
    Ok(s);
}
```

- 被 ? 所应用的错误，会隐式的被 std::convert::From 上的 from 函数所处理。它的处理方式是，当 ? 调用 from 函数时，它所接收的错误类型会被转化为当前函数返回类型所定义的错误类型。它用于针对不同的错误原因，返回同一种错误类型，但它有一个前提条件，只要每个错误类型实现了转化为所返回的错误类型的 from 函数就可以
- ? 运算符只能用于返回类型为 Result 的函数。Box\<dyn Error> 是 trait 对象，可以简单理解为任何可能的错误类型

5. 何时使用 pannic
- 总体原则是，在定义一个可能失败的函数时，优先考虑返回 Result；否则的话，如果你认为某种情形肯定是不可恢复的，就使用 panic!

｜场景|
|---|
|演示某些概念:unwrap|
|原型代码:unwrap、except|
|测试:unwrap、except|

- 有时你比编译器掌握更多的信息时，也就是说你可以确定 Result 就是 Ok，那你就使用 unwrap
