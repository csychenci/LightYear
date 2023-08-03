---
title: String
date: 2023-06-10 18:41:00
categories: Rust
order: 14
tags:
  - Rust
  - String
  - 集合
---

## String
---
1. 被字符串困扰的原因
- rust 倾向于暴露可能的错误，并且字符串这种数据结构比开发者所认为的要复杂得多，最后的是 rust 使用的是 utf-8 编码
- rust 选择将正确处理 String 数据作为所有 rust 程序的默认行为，程序员必须在处理 utf-8 数据之前投入更多的精力，这样就可以防止在开发后期处理设计非 ascii 字符的错误

2. 什么是字符串
- 在 rust 中，字符串是基于字节(byte)的集合，它提供了一些方法，这些方法可以将字节解析为文本
- rust 的核心语言层面，只提供了一个字符串类型，那就是字符串切片(&str)，通常是以借用的形式出现，它是对 **存储在其他地方、utf-8 编码的字符串的引用**。对于字符串字面值，它是存储在二进制文件中，也是字符串切片；对于 String 来说，它来自 **标准库** 而不是核心语言，它是一种可增长、可修改、可获得所有权的类型，采用的 utf-8 编码
- 所以，在 rust 中通常说的字符串就是 String 和 &str 这两种类型。它两在标准库中用得非常频繁，也都使用的 utf-8 编码。但 rust 的标准库中还包含了很多其他的字符串类型，如下所示。其中，以 String 结尾的字符串类型，它是可获得所有权的；而以 str 结尾的，通常是指可借用的

|-|
|---|
|OsString|
|OsStr|
|CString|
|CStr|

- 这些字符串类型可以使用不同的编码来存储文本，也就是说它们在内存中的展示形式是不同的。而某些 library crate 还针对存储字符串提供了更多的选项

3. String
- String::new，用于创建一个空的 String

```rs
fn main() {
  let s = String::new();
}
```

- to_string()，可用于实现了 Display trait 的类型，包括字符串字面值，会被转化成 String 类型

```rs
fn main() {
  let data = "string slice";

  let s1 = data.to_string();
  // let s1:String😍
}
```

- String::from(&str)，可直接从字面值创建 String。由于字符串是基于 utf-8 编码的，所以可以将任何合法的数据编进字符串中

```rs
fn main() {
  let s1 = String::from("😍");
  let s2 = String::from("佫");
}
```

4. 更新 String
- push_str(&mut self, string: &str)：可以把一个字符串切片附加到 String，这个方法不会获得参数的所有权

```rs
fn main() {
  let mut country = String::from("country:");
  let mut country2 = String::from("country:");
  let c_china = String::from("China");

  country2.push_str("England");
  country.push_str(&c_china);
  println!("{},{}",c_china,country2);
  // China,country:England。不会报错，说明 c_china 还拥有 String 的所有权
}
```

- push(&mut self, ch: char)：将单个字符附加到 String
- +：可用于连接字符串。但如果不使用借用的方式，变量可能会失去对被拼接字符串的拥有权。这是因为 + 使用了类似这个签名的方法 `fn add(self,s:&str) -> String {...}`，并且调用 add 方法的时候 rust 使用了解引用强制转换(deref corecion)，它把 String 的引用转换成了字符串切片，这样编译就会通过

```rs
fn main() {
  let s1 = String::from("hello ");
  let s2 = String::from("s2");
  let s3 = String::from("s3");

  let s4 = s1 + &s2;
  // ok

  let s5 = s1 + s2;
  // faied

  let s6 = &s1 + &s2;
  // faied
}
```

- format!：可以更灵活的连接多个字符串，并且它不会取得任何参数的所有权

```rs
fn main() {
  let s1 = String::from("aaa");
  let s2 = String::from("bbb");
  let s3 = String::from("ccc");

  // let s4 = s1 + "-" + &s2 + "-" + &s3;
  let s4 = format!("{}-{}-{}", s1, s2, s3);
  // let s4:String = aaa-bbb-ccc
}
```

5. 访问 String
- String 在内部是对 Vec\<u8> 的包装。按索引语法访问 String 的某部分，会报错；rust 的字符串是不支持索引语法访问的，这是因为 unicode 标量值可能占据不同的字节数，这会导致访问索引的时候返回的可能不是合法的字符(比如占据两个字节，而返回第一个字节的表示形式，并不是用户所理解的或没什么实际的意义，虽然它就是那个索引上的字节)
- 另一个原因是，索引操作应消耗一个常量时间(O(1))，但 String 却无法保证这个时间。因为需要从头到尾遍历所有内容，来确定有多少个合法的字符

6. 字节(bytes)、标量值(scalar values)、字形簇(grapheme clusters)
- 在 rust 中有三种看待字符串的方式：字节、标量值、字形簇，其中字形簇是最接近所谓的字母这个概念的。在下面的代码中，输出的字节就是计算机存储这个字符串数据的样子

```rs
fn main() {
  let w = "संस्कृतावाक्"; // 梵文

  for byte in w.bytes() {
    println!("{}",byte);
  }
}

// 对应的所有字节
// 224
// 164
// 184
// 224
// 164
// 130
// 224
// 164
// 184
// 224
// 165
// 141
// 224
// 164
// 149
// 224
// 165
// 131
// 224
// 164
// 164
// 224
// 164
// 190
// 224
// 164
// 181
// 224
// 164
// 190
// 224
// 164
// 149
// 224
// 165
// 141
```

- 还可以从 unicode 标量的形式来看待它

```rs
// 这里后一个是前一个的音标
fn main() {
  let w = "संस्कृतावाक्"; // 梵文

  for byte in w.chars() {
    println!("{}",byte);
  }
}

// स
// ं
// स
// ्
// क
// ृ
// त
// ा
// व
// ा
// क
// ्
```

- 从字形簇的形式来看待，它得到的就是原始的字符。但由于从字形簇内获得字符相对复杂一些，因此标准库就没有提供这个功能，可以使用第三方库中具有类似功能的库

7. 切割 String
- 使用 [] 和一个范围来创建字符串的切片。切割需要谨慎使用，在切割的时候，必须沿着 char(字符) 边界来切割，如果跨越了字符边界，程序就会 panic。例如下方的梵文如果使用 [0..4] 来获取，程序就会恐慌

```rs
fn main() {
  let w = "संस्कृतावाक्"; // 梵文

  let s = String::from("abcdef");
  let s1 = &w[0..12];
  let s2 = &s[0..3];

  println!("{},{}",s1,s2);
  // संस् abc。梵文中一个字符占据三个字节，其中音标还要占据三个字节
}
```