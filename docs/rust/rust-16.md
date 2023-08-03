---
title: 泛型
date: 2023-06-26 00:54:55
categories: Rust
order: 17
tags:
  - Rust
  - 泛型
---

## 泛型
---
1. 泛型的作用
- 能提高代码复用能力，例如处理重复代码的问题。泛型是 **具体类型或其他属性的抽象代替**，意思是当你写代码时，你编写的代码不是最终的代码，而是一种模版，里面有一些占位符；而编译器在 **编译时** 根据你的使用将占位符替换成具体的类型，这个过程叫单态化

2. 泛型的应用
- 泛型可以在函数中使用，这叫泛型函数

```rs
// 不止可以传人 vector，还可以传入任何能切片的类型
fn largest<T>(list:&[T]) -> T {
    let mut largest = list[0];
    for &item in largest {
        if item > largest {
            largest = item;
        }
    }

    return largest
}
```

- 在 struct 中，可以使用多个泛型的类型参数，但是太多的类型参数意味着你的代码需要重组为多个更小的单元

```rs
struct Point<T> {
    x: T,
    y: T
}

fn main () {
    let integer = Ponit {x:10,y:5};
    let float = Point {x:1.5,y:2.5};
}
```

- 在枚举中使用泛型，可以让枚举的变体持有泛型数据类型，例如 Option\<T>、Result\<T,E>

```rs
enum Option<T> {
    Some(T),
    None,
}

enum Result<T,E> {
    Ok(T),
    Err(E)
}
```

- 方法中定义的泛型，在为 struct 或 enum 实现方法的时候，可在定义中使用泛型。把 T 放在 impl 关键字后，表示在类型 T 上实现方法，如 impl\<T> Point\<T>；另一个就是只针对具体类型实现方法，其余类型没实现方法，例如 impl Point\<i32>

```rs
struct Point<T> {
    x: T,
    y: T
}

// 此处 impl 后边的 <T> 意味着它是针对 Point<T> 来实现的 get_x，而不是某个具体的类型
impl<T> Point<T> {
    fn get_x(&self) -> &T {
        return &self.x
    }
}

// 也可以针对具体的类型来实现
impl Point<i32> {
    fn get_x_i(&self) -> &i32 {
        return &self.x
    }
}
```

- 另外，struct 里的泛型类型参数可以和方法中的泛型类型参数不同

```rs
struct Point<T,U> {
    x: T,
    y: U
}

impl<T,U> Point<T,U> {
    fn mixup<V,W>(self,other:Point<V,W>) -> Point<T,W> {
        return Point {
            x:self.x,
            y:other.y
        }
    }
}
```

3. 泛型代码的性能
- rust 实现泛型的方式决定了使用泛型的代码和使用具体类型的代码运行速度是一样的。这是因为 rust 在编译的时候会执行单态化(monomorphization)这样一个过程(在编译时将泛型替换为具体类型的过程)

```rs
fn main () {
    let integer = Some(5);
    let float = Some(5.0);
}
```

- 在上述的代码中，编译时 rust 会将 Option\<T> 这个泛型定义展开为 Option_i32 和 Option_f64，意思就是将 Option\<T> 这个泛型的定义替换为具体的定义，而单态化后的 main 函数也就变成下面的样子

```rs
enum Option_i32 {
    Some(i32),
    None
}

enum Option_f64 {
    Some(f64),
    None
}

fn main() {
    let integer = Option_i32::Some(5);
    let float = Option_f64::Some(5.0);
}
```