---
title: 切片
date: 2023-05-04 20:35:44
categories: Rust
order: 9
tags:
  - Rust
  - 所有权
---

## 切片
---
1. 描述
- 它是 rust 中的另一种不持有所有权的数据类型，切片(slice)
2. 字符串切片
- 字符串切片是指向字符串中一部分内容的引用。写法为 &s[s..e]，& 表示的是引用的是 s 这个字符串，[s..e] 表示的是这个字符串的一部分(包含 s 但不包含 e)
```rs
fn main() {
  let s = String::from("hello world");

  let h1 = &s[..5];
  let h2 = &s[6..];
  let h3 = &s[0..s.len()];
  let h4 = &s[..];
}
```

- 另外，字符串切片的范围索引必须发生在有效的 utf-8 字符边界内，如果尝试从一个多字节的字符中创建字符串切片，程序会报错并退出
- 字符串字面值就是一个切片，它被直接存储在二进制程序中。它是指向二进制程序特定位置的一个切片，是一个不可变引用，所以字面值是不可变的
```rs
fn main() {
  let s = "abcde";
  // s:&str

  println!("{}",s);
}
```
- 而当我们采用 &str 作为参数类型时，函数就可以同时接收 String 和 &str 类型的参数了。使用字面值作为参数时，完整传递即可；使用 String 时，传递一个完整的引用即可

```rs
fn main() {
  let s = "abcde";
  let s1 = String::from("fghjk");

  let s2 = get_s(s);
  let s3 = get_s(&s1[..]);
  // s:&str

  println!("{},{}",s2,s3);
}

fn get_s(s:&str) -> &str {
  return &s
}
```
3. 其它类型的切片
- 数组切片，与字符串切片类似

```rs
fn main() {
  let arr = [1,2,3,4,5];
  
  let arr_slice = &arr[..2];
  // &[i32]
  println!("{}",arr_slice);
}
```