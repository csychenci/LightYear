---
title: 结构体
date: 2023-05-04 20:35:44
categories: Rust
order: 10
tags:
  - Rust
  - struct
  - 结构体
---

## 结构体
---
1. 结构体用法
- 它是一组自定义的数据类型，它允许为相关联的值命名，并打包成有意义的组合，使用 struct 关键字命名，并且它支持字段简写(也就是字段名和字段值的变量名相同时)

```rs
// 为每个字段指定具体值，且无需按照声明的顺序进行指定
// 最后一组字段也需要逗号
struct User {
    name:String,
    email:String,
    account:u64,
    active:bool
}

// 实例化一个 User 时，不能缺少其他其中声明的字段
let user1 = User {
    name: String::from("Tom"),
    email:String::from("tom@gmail.com"),
    account:444333123,
    active:true
}
```

- 一旦 struct 的实例是可变的，那么实例中的所有的字段都是可变的。rust 不允许我们声明 struct 中的一部分字段是可变的而另一部分字段是不可变的

```rs
// user1 是可变的，其中的所有字段都是可变的
let mut user1 = User {
    name: String::from("Tom"),
    email:String::from("tom@gmail.com"),
    account:444333123,
    active:true
}
```
- struct 还可以作为函数的返回值
```rs
struct User {
    name:String,
    email:String,
    account:u64,
    active:bool
}
fn main() {
    let user1 = get_user(String::from("bob@gmail.com"),String::from("bob"));
}

fn get_user(email:String,name:String) -> User {
    return User {
        name,
        email,
        account:123456,
        active:true
    }
}
```

2. struct 更新语法
- 当想基于某个 struct 实例创建一个新实例的时候，可以使用 struct 更新语法。如下所示，这表示 user2 中除了已设定的值外，其他的字段都与 user1 的字段具有相同的值

```rs
let user1 = User {
    name: String::from("Tom"),
    email:String::from("tom@gmail.com"),
    account:444333123,
    active:true
};

let user2 = User {
    name: String::from("Bob"),
    email:String::from("bob@gmail.com"),
    ..user1
};

println!("{},{}",user2.name,user2.active); // Bob,true
```

3. tuple struct
- 可定义类似 tuple 的 struct，tuple struct 整体有个名，但里面的元素没有名。它适用于想给整个 tuple 起名，并让它不同于其它 tuple，而且又不需要给每个元素起名

```rs
struct Color(i32,i32,i32);
struct Point(i32,i32,i32);

let black = Color(0,0,0);
let origin = Point(0,0,0);
```
- black 与 origin 是不同的类型，因为它们是不同的 tuple struct 的实例，即便它们里面的字段完全相同

4. unit-like struct
- rust 还支持定义没有任何字段的 struct，称作 unit-like struct(与()，单元类型类型)
- 适用于需要在某个类型上实现某个 trait，但是在里面又没有想要存储的数据

5. struct 数据的所有权
- 字段不存放引用的情况下：struct 实例拥有其所有数据的所有权，只要该实例是有效的，那么里面的字段数据也是有效的

```rs
struct User {
    name:String,
    email:String,
    account:u64,
    active:bool
}

// user1 拥有其内所有数据的所有权
let user1 = User {
    name: String::from("Tom"),
    email:String::from("tom@gmail.com"),
    account:444333123,
    active:true
}
```
- 而 struct 内也可以存放引用，但这需要使用生命周期，生命周期可以保证只要 struct 实例是有效的，那么里面的引用也是有效的；如果 struct 里面存储了引用，而不使用生命周期，就会报错

```rs
struct User {
    name:&str,
    email:String,
    account:u64,
    active:bool
}

// user1 拥有其内所有数据的所有权
let user1 = User {
    name: String::from("Tom"),
    email:String::from("tom@gmail.com"),
    account:444333123,
    active:true
}
```

- 在 struct 中使用引用，必须要标注生命周期，而且引用的数据的生命周期需要比结构体实例的生命周期长。这是因为只要结构体还存在于内存中，它就会一直持有对数据的引用

6. 输出显示结构体
- 由于结构体默认没有实现 std::fmt::Display 这个 trait，所以可以通过在格式化字符串中使用 {:?} 或者 {:#?} 来代替 {}

```rs
struct User {
    name:&str,
    email:String,
    account:u64,
    active:bool
}

fn main() {
    let user1 = User {
        name: String::from("Tom"),
        email:String::from("tom@gmail.com"),
        account:444333123,
        active:true
    };
    println!("{:?}",user1);
    // help: the trait `Debug` is not implemented for `User`
    //    = note: add `#[derive(Debug)]` to `User` or manually `impl Debug for User`
    //    = note: this error originates in the macro `$crate::format_args_nl` which comes from the expansion of the macro `println` (in Nightly builds, run with -Z macro-backtrace for more info)
    // help: consider annotating `User` with `#[derive(Debug)]`
}
```

```rs
// derive：派生
// rust 添加了很多 trait，让我们可以进行 derive
// 这些 trait 可以为我们自定义的 struct 添加很多功能
// 这里就相当于让 User 派生于 debug 这个 trait
#[derive(Debug)]
struct User {
    name:&str,
    email:String,
    account:u64,
    active:bool
}

fn main() {
    let user1 = User {
        name: String::from("Tom"),
        email:String::from("tom@gmail.com"),
        account:444333123,
        active:true
    };
    println!("{:?}",user1);
    // User { name: "Tom", email: "tom@gmail.com", account: 444333123, active: true }
}
```
- 这是因为 rust 包含了打印调试(debug)的功能，但我们必须为自己的 struct 显示地选择这一功能或者自己实现 Debug 的功能，这时候就需要在 struct 前面加上 `#[derive(Debug)]`
- 如果你希望你的输出更易读一些，可以使用 {:#?} 来格式化结构体
7. struct 的方法
- 方法是与函数类似的，都具有参数和返回值，使用 fn 关键字定义。但是方法是在 struct、enum、trait对象的上下文中定义的；其次方法的第一个参数总是 self，它表示方法被调用(正在被调用的)的 struct 实例
- 使用 impl 块定义方法，方法的第一个参数可以是 &self，也可以获得其所有权或可变借用，和其他参数一样

```rs
struct User {
    name:String,
    email:String,
    account:u64,
    active:bool
}

impl User {
    fn get_name(&self) -> &String {
        return &self.name
    }
}
```

- 在调用方法时，rust 会自动引用或解引用。rust 会根据情况自动添加 &、&mut 或 *(自动解引用)，以便 object 可以匹配方法的签名

```rs
// 以下代码效果相同
p1.distance(&p2);
(&p1).distance(&p2);
```

- 方法还可以添加多个参数

```rs
impl User {
    fn get_name(&self,other:&User) -> &String {
        return &self.name
    }
}
```
- 一个结构体还可以拥有多个 impl 块

8. 关联函数
- 可以在 impl 块里定义不把 self 作为第一个参数的函数，它们叫关联函数(并不时方法)，例如 String::from。关联函数通常用于构造器，也就是创造被关联类型的实例