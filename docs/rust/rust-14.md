---
title: HashMap
date: 2023-06-24 23:39:55
categories: Rust
order: 15
tags:
  - Rust
  - HashMap
  - 集合
---

## HashMap
---
1. 什么是 HashMap
- 它以键值对的形式存储数据，一个键(Key)对应一个值(Value)的这样一种映射关系。而 HashMap 的内部实现使用了 Hash 函数，它决定了如何在内存中存放 K 和 V
- 它的适用场景是通过 K(任何类型) 来寻找数据，而不是通过索引

2. 创建 HashMap
- HashMap::new()：创建一个 HashMap。需要提供 HashMap 的类型，否则会报错，因为不提供的话 rust 就无法推断出 HashMap 的类型。也可以创建以后马上为 HashMap 添加数据，这样 rust 就能推断出它的类型了
- insert(&mut self, k: K, v: V)：添加数据

```rs
// HashMap 不在 prelude 中，需要引入
use std::collections::HashMap;

fn main () {
    let mut scores:HashMap<String,i32> = HashMap::new();
}
```

- HashMap 不在 prelude 中，需要手动引入。而且标准库对其支持也比较少，没有内置的宏来创建 HashMap。HashMap 和 vertor 一样，数据存储在 heap 也就是堆空间上。它还是同构的，这意味着在同一个 HashMap 中，它的 K 必须是同一个类型，它的 V 也必须是同一种类型
- collect()：另一种创建 HashMap 的方式，通过在元素类型为 Tuple 的 Vector 上使用 collect 方法，可以组建一个 HashMap，这种方式要求 Tuple 有两个值，一个作为 K，另一个作为 V
- collect 方法可以把数据整合成很多种集合类型，包括 HashMap，但返回值的类型需要显式指明

```rs
fn main () {
    let teams = vec![String::from("Blue"),String::from("Red")];
    let intial_scores = vec![10.50];

    let scores:HashMap<_,_> = teams.iter().zip(intial_scores.iter()).collect();
    // rust 可以根据 vector 中的类型推导出 Key 和 Value 的类型
}
```

3. HashMap 和所有权
- 在使用 HashMap 存储数据时，对于实现了 Copy trait 的类型(例如 i32)，值会被复制到 HashMap 中；而对于拥有所有权的值(例如 String)，值会被移动，所有权会转移给 HashMap

```rs
fn main () {
    let k_name = String::from("name");
    let v_name = String::from("xiaoming");

    let mut usermap = HashMap::new();
    usermap.insert(k_name,v_name);

    println!("{},{}",k_name,v_name);
    //error:  borrow of moved value: `k_name`
}
```

- 但如果将值的引用插入到 HashMap，值本身就不会发生移动，变量还可以继续使用。在 HashMap 有效的期间，被引用的值必须保持有效

```rs
fn main () {
    let k_name = String::from("name");
    let mut v_name = String::from("xiaoming");

    let mut usermap = HashMap::new();
    usermap.insert(&k_name,&v_name);

    println!("{},{}",k_name,v_name);
}
```

4. 访问 HashMap 中的值
- get(K) -> Option\<V>

```rs
fn main () {
    let k_name = String::from("name");
    let v_name = String::from("xiaoming");

    let k_id = String::from("id");
    let v_id = String::from("1234567");

    let v_id_copy = String::from("1234567");

    let mut usermap = HashMap::new();
    usermap.insert(&k_name, &v_name);
    usermap.insert(k_id, v_id);

    let user_id = usermap.get(v_id_copy);

    match usermap.get(&k_name) {
        Some(name) => println!("{}", name),
        None => println!("name not exist!"),
    }

    match user_id {
        Some(id) => println!("id:{}", id),
        None => println!("id not exist!"),
    }
    // xiaoming
    // id not exist! 
}
```

5. 遍历 HashMap

```rs
fn main() {
        let k_name = String::from("name");
    let v_name = String::from("xiaoming");


    let k_id = String::from("id");
    let v_id = String::from("1234567");

    let mut usermap = HashMap::new();
    usermap.insert(&k_name,&v_name);
    usermap.insert(&k_id,&v_id);

    // 使用模式匹配
    for (k,v) in &usermap {
        println!("k:{},v:{}",k,v);
    }

    // k:id,v:1234567
    // k:name,v:xiaoming
}
```

6. 更新 HashMap
- HashMap 的大小是可变的，也就是键值对是可变的，每个 K 同时只能对应一个 V
- 当 K 已存在时，后续插入的 KV 中，K 相同而 V 不同，那么原来的 V 会被替换

```rs
fn main () {
    let mut usermap = HashMap::new();
    usermap.insert(String::from("name"),String::from("xiaoming"));
    usermap.insert(String::from("name"),String::from("xiaohong"));
    // usermap.insert(&k_id,&v_id);

    println!("{:?}",usermap);
    // {"name": "xiaohong"}
}
```

- 当 K 不存在时，才进行插入 V。可以使用 entry() 方法，返回值是 enum Entry，表示值是否存在；entry.or_insert()，如果 K 存在，返回到对应的 V 的一个可变引用；如果 K 不存在，将方法参数作为 K 的新值插入进入，返回到这个新值的可变引用

```rs
fn main () {
    let mut usermap = HashMap::new();
    usermap.insert(String::from("name"),String::from("xiaoming"));

    let name_entry = usermap.entry(String::from("name"));
    // Entry(OccupiedEntry { key: "name", value: "xiaoming", .. })
    println!("{:?}",name_entry);

    name_entry.or_insert(String::from("xiaohong"));

    usermap.entry(String::from("id")).or_insert(String::from("123456"));

    println!("{:?}",usermap);
    // {"id": "123456", "name": "xiaoming"}
}
```

- 还可以基于现有 K 来更新 V

```rs
/** 
  * split_whitespace: 切割字符串，以空格作为切割符号
*/
fn main () {
    let text = "tree red flower water tree water black";

    let mut nummap = HashMap::new();

    for word in text.split_whitespace() {
        let count = nummap.entry(word).or_insert(0);
        *count += 1;
    }

    println!("{:?}",nummap);
    // {"red": 1, "black": 1, "tree": 2, "flower": 1, "water": 2}
}
```

7. Hash 函数
- 默认情况下，HashMap 使用加密功能强大的 Hash 函数，可以抵抗拒绝服务攻击(Dos)。虽然它不是可用的最快的 Hash 算法，但具有更好安全性
- 如果你感觉它的性能不好，也可以指定不同的 hasher 来切换到另一个函数。这个 hasher 是指实现了 BuildHasher trait 的类型