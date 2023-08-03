---
title: 枚举与模式匹配
date: 2023-05-06 18:32:44
categories: Rust
order: 11
tags:
  - Rust
  - 枚举
---

## 枚举
---
1. 什么是枚举
- 枚举允许我们列举所有可能的值来定义一个类型。枚举中所有可能的值叫做这个枚举的变体

```rs
// 定义一个枚举
enum Color {
  // 变体
  Black,
  White,
  Green,
  Blue
}

fn main() {
	// 创建枚举值，它们的类型是 Color
  let black = Color::Black;
	// let black: Color
  let white = Color::White;
	// let white: Color
	get_color(black);
	get_color(white);
}

fn get_color(color:Color) {

}
```
- 枚举的变体都位于标识符的命名空间下，使用两个冒号 :: 进行分割
- 还可将数据附加到枚举的变体中，这样就不需要使用 struct，且每个变体可以拥有不同的类型以及关联的数据量(甚至可以是另一种枚举类型)

```rs
// Rgb
enum ColorType {
	Rgb(i8,i8,i8),
	Rgba(i8,i8,i8,i8)，
	RMap {x:i32,y:i32}
}

fn main() {
	let rgb1 = ColorType::Rgb(0,0,0);
	let rgba1 = ColorType::Rgba(0,0,255,1);
}
```

2. 为枚举定义方法
- 可以使用 impl 为枚举定义方法
```rs
#[derive(Debug)]
enum ColorType {
	Rgb(i8,i8,i8),
	Rgba(i8,i8,i8,i8),
	RMap {x:i32,y:i32}
}

impl ColorType {
	fn print(&self) {
		println!("{:#?}",self);
	}
}

fn main() {
	let rgb1 = ColorType::Rgb(0,0,0);
	rgb1.print();
}`
```

3. option 枚举
- 在 rust 中是没有 null 的，而在其他语言中，一个变量可以处于两种状态：非空、空值(null)
- 而 null 的问题在于，当你尝试像使用非 null 值那样使用 null 值时，就会引起某种错误；当 null 这个概念还是有用的，因某种情况而变为无效或缺失的值
- 因此，rust 中类似 null 概念的枚举就是 Option\<T\>。它定义于标准库中，在 prelude(预导入模块) 中，它描述了：某个值可能存在、可能是某种类型的或不存在的情况
- 它在标准库中的定义如下所示，它有两个变体。因为它包含在 Prelude 中，所以变体可以直接使用

```rs
// T 是泛型参数
enum Option<T> {
	Some(T),
	None
}
```

```rs
fn main(){
	let some_number = Some(5);
	// Option<i32>
	let some_string = Some("str");
	// Option<&str>
	let absent_number:Option<i32> = None;
	// 在使用 None 这个变体时，编译器无法直接推断出 T 到底是什么类型，需要显式子地声明它的类型
}
```

- 这样设计有什么好处呢？在 rust 中，Option\<T\> 和 T 是不同的类型，不可以把 Option\<T\> 直接当成 T 来使用

```rs
fn main(){
	let x:i8 = 5;
	let y:Option<i8> = Some(5);

	let sum = x + y;
	// 编译报错error: cannot add `Option<i8>` to `i8`
}
```
- 而若想使用 Option\<T\> 中的 T，必须将它转换为 T。在 rust 中，如果某个值不是 Option\<T\>，那么就可以安全的假设这个值肯定不是空的；如果它是 Option\<T\>，就必须将它转换后才能使用
- 这样的设计就比较安全，避免了 null 值泛滥的情况

---
## 模式匹配
---
1. match
- rust 提供了一个极为强大的控制流运算符，match。它允许一个值与一系列模式进行匹配，并执行匹配的模式对应的代码
- 这些模式可以是字面值、变量名、通配符等

```rs
// 美国硬币的枚举
enum Coin {
	Penny,
	Nickel,
	Dime,
	Quarter
}

fn value_in_cents(coin:Coin) -> u8 {
	match coin {
		Coin::Penny => 1,
		Coin::Nickel => 5,
		Coin::Dime => 10,
		Coin::Quarter => 25
	}
}
```
- 在 match 表达式执行的时候，它会将后面的表达式依次与里面的分支进行比较，匹配成功的分支的代码表达式就会作为整个 match 表达式的结果进行返回
2. 绑定值的模式
- 匹配的分支可以绑定到被匹配对象的部分值

```rs
#[derive(Debug)]
enum Cash {
	One,
	Five,
	Ten,
	Twenty,
	Fifty,
	Hundred
}

enum Pay {
	Alipay,
	Wechatpay,
	Cashpay(Cash),
}

fn get_pay_type(pay:Pay) -> i8 {
	return match pay {
		Pay::Alipay => 0,
		Pay::Wechatpay => 1,
		Pay::Cashpay(state) => {
			println!("{:#?}",state);
			return 2;
		},
	};
}

fn main() {
	println!("{}",get_pay_type(Pay::Cashpay(Cash::Hundred)));
	// Hundred 2
}
```

3. 匹配Option\<T>
```rs
fn main () {
	let six =add_one(Some(5));
	let none = add_one(None);
}

fn add_one(num:Option<i32>) -> Option<i32> {
	match num {
		None => None,
		Some(i) => Some(i + 1),
	}
}
```
- match 匹配的时候必须穷举所有的可能，比如枚举中的变体需要都写出表达式。但当匹配的值过多无法一一列出时，我们可以使用通配符来替代其余没列出的值

```rs
fn main() {
	let v = 0u8;
	match v {
		1 => println!("one"),
		2 => println!("two"),
		_ => ()
	}
}
```
- v的值有 256 种可能，0-255，一共是256个整数。如果需要穷举，就需要写256种可能，但实际上我们只需要处理我们需要的，但是要将通配符写到最后

4. if let
- match 是一个控制流表达式，而 if let 是一个简单的控制流，它处理的事只关心一种匹配而忽略其他匹配的情况

```rs
fn main() {
	let v = Some(0u8);
	match v {
		Some(1) => println!("one"),
		_ => ()
	}

	if let Some(1) = v {
		println!("one");
	} else {
		println!("others");
	}
}
```
- 如上所示，当我们只需要处理一种匹配时(这里我们忽略了 None 及其他变体)，就可以使用 if let 替代处理
- 它具有更少的代码、更少的缩进、更少的模版代码，且放弃了穷举的可能，它可以看作是 match 的语法糖，也就是只针对一种特定模式来运行而忽略其他的可能性
```rs
// 如果需要其他情况的处理，也可以搭配 else 进行使用
fn main() {
	let v = Some(0u8);
	// match v {
	// 	Some(1) => println!("one"),
	// 	_ => ()
	// }

	// 这里并不是比对，可以看作是类型转换
	if let Some(1) = v {
		println!("one");
	} else {
		println!("others");
	}
}
```