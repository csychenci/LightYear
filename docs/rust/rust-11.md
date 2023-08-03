---
title: Package、Crate、Module
date: 2023-06-07 13:40:44
categories: Rust
order: 12
tags:
  - Rust
  - Package
  - Crate
  - Module
---

## Package、Crate、Module
---
1. rust 的代码组织
- 代码组织主要包括：那些细节可以暴露、那些细节是私有的；作用域内哪些名称有效等。这些统称为 **模块系统**

2. 模块系统
- Package(包)：最顶层的，Cargo 的特性，让你构建、测试、共享 crate
- Crate(单元包)：一个模块树，它可产生一个 library 或可执行文件
- Module(模块)、use：让你控制代码的组织、作用域、私有路径
- Path(路径)：为 struct、function 或 module 等项命名的方式

3. Package 和 Crate
- Crate 的类型：binary(二进制的)、library(库)
- Crate Root：Crate 的根，是源代码文件，rust 编译器从这里开始，组成你的 Crate 的根 Module
- 一个 package：包含一个 Cargo.toml，它描述了如何构建这些 Crates；只能包含 0-1 个 library crate；可以包含任意数量的 binary crate；但必须至少包含一个 crate(library 或 binary)

4. Cargo 的惯例
- src/main.rs：是 binary crate 的 crate root，Cargo 会默认将这个文件作为 crate 的根；crate 名与 package 名相同
- src/lib.rs：package 包含一个 library crate，它是 library crate 的 crate root；crate 名与 package 名相同
- 上述两个文件的内容形成了名为 crate 的模块，位于整个模块树的根部；而整个模块树都位于隐式的 crate 模块下
- Cargo 会把 crate root 文件交给 rustc 来构建 library 或 binary
- 一个 package 可以有多个 binary crate。文件放在 src/bin，每个文件是单独的 binary crate

5. crate 的作用
- 将相关的功能组合到一个作用域内，便于在项目间进行共享。可以防止命名冲突

6. Module 的作用
- Module 是在一个 crate 内，将代码进行分组，能够增加代码可读性，易于复用。定义 module 可以控制作用域和私有性
- 它可以控制项目(item)的私有性，是可以对外暴露的(public)，还是私有的(private)

```rs
// 定义一个酒店的 mod，其中包含 eat(吃饭)、住宿(stay) 两个子 mod
mod hotel {
    mod stay {
        clean_room() {}
        replace_supplies() {}
        other_services() {}
    }

    mod eat {
        fn take_breakfast() {}
        fn take_lunch() {}
        fn take_dinner() {}
    }
}
```

```md
-crate
--hotel
---stay
----clean_room
----replace_supplies
----other_services
---eat
----take_breakfast
----take_lunch
----take_dinner
```
---
## Path
---
1. 路径
- 为了在 rust 的模块中找到某个条目，需要使用路径。路径分为两种形式，绝对路径：从 crate root 开始，使用 crate 名或字面值 crate；相对路径：从当前模块开始，使用 self(本身)、super (上一级)或当前模块的标识符
- 路径至少由一个标识符组成，标识符之间使用 :: 分割

```rs
mod hotel {
    mod stay {
        fn clean_room() {}
        fn replace_supplies() {}
        fn other_services() {}
    }

    mod eat {
        fn take_breakfast() {}
        fn take_lunch() {}
        fn take_dinner() {}
    }
}

// pub将项目标记为公有的
pub fn eat_at_hotel() {
    crate::hotel::eat::take_breakfast();

    // hotel::eat::take_breakfast();
}
```

2. 私有边界
- 模块不仅可以组织代码，还可以定义私有边界。如果想把函数或 struct 等设为私有，可以将它放到某个模块中
- rust 中所有的条目（函数、方法、struct、enum、模块、常量）默认是私有的
- 父级模块无法访问子模块中的私有条目，子模块里可以使用所有祖先模块中的条目

3. pub 关键字
- 使用它可以将某些条目标记为公共模块
- 同一文件中的 mod 视为同一级下的兄弟 mod，可以直接调用；而其下面的子条目需要声明为公共的，才能被兄弟 mod 调用

4. super 关键字
- 文件系统中使用 .. 来访问上一级目录(也就是父级目录)，rust 中所使用 super 来访问父级模块路径中的内容

```rs
mod hotel {
    pub mod stay {
        pub fn clean_room() {
            println!("clean end!");
        }
        fn replace_supplies() {}
        fn other_services() {}
    }

    pub mod eat {
        fn take_breakfast() {}
        fn take_lunch() {}
        pub fn take_dinner() {
            // 相对路径
            super::stay::clean_room();
            // 绝对路径：crate::hotel::stay::clean_room();
        }
    }
}

fn main () {
    hotel::eat::take_dinner();
}
```

5. pub struct
- 将 pub 放在 struct 前，可将结构体声明为公共的。虽然这样做以后结构体是公共的，但结构体内的字段默认是私有的。如果想让它的字段是共有的，就需要单独的添加 pub 关键字
```rs
mod hotel {
    pub struct People {
        name:String;
        pub room:0u8;
        id:String;
    }

    impl People {
        pub fn call(phone:&str) -> &str {
            println!("calling！");
            return phone;
        }
    }

    pub mod stay {
        pub fn clean_room() {
            println!("clean end!");
        }
        fn replace_supplies() {}
        fn other_services() {}
    }

    pub mod eat {
        fn take_breakfast() {}
        fn take_lunch() {}
        pub fn take_dinner() {
            // 相对路径
            super::stay::clean_room();
            // 绝对路径：crate::stay::clean_room();
        }
    }
}
```

6. pub enum
- pub 放在 enum 的前面，enum 是公共的，他的变体也都是公共的
---
## use 关键字
---
1. 导入路径
- 可以使用 use 关键字将路径导入到作用域内，引入的东西仍遵循 **私有性规则**，也就是只有公共的部分引入进来才可以用。还可以使用 use 来制定相对路径

```rs
mod hotel {
    pub mod stay {
        pub fn clean_room() {
            println!("clean end!");
        }
        fn replace_supplies() {}
        fn other_services() {}
    }

    pub mod eat {
        fn take_breakfast() {}
        fn take_lunch() {}
        pub fn take_dinner() {
            // 相对路径
            super::stay::clean_room();
            // 绝对路径：crate::stay::clean_room();
        }
    }
}

use crate::hotel::stay;
// 绝对路径
use hotel::stay;
// 相对路径

fn main() {
    stay::clean_room();
    // ok
    stay::other_services();
    // error: function `other_services` is private
}
```

- 一般将函数的父级模块引入到作用域（指定到父级）；而 struct、enum、其他等则指定完整路径（指定到条目本身）；而对于同名的条目，则指定到它的父级模块
- as 关键字可用于将引入的路径重命名

2. pub use/重导出
- 通常情况下使用 use 引入的模块相对于文件内是私有的，而如果想其他的文件内也能访问到(外部代码也能访问到)，就可以使用 pub use

```rs
pub use crate::hotel::stay;
```

- 它可以将条目引入作用域，该引入的条目可以被外部代码引入到它们的作用域

3. 嵌套路径
- 可以使用嵌套路径清理大量的 use 语句。如果使用同一个包或模块下的多个条目，可以使用嵌套路径在同一行内将上述条目进行引入

```rs
use std::cmp::Ordering;
use std::io;
```

```rs
// use 路径相同的部分::{路径不同的部分}
use std::{cmp::Ordering,io}
```

- 如果两个 use 路径之一是另一个的子路径，那就需要用到 self
```rs
use std::io;
use std::io::Write;
```

```rs
use std::io::{self,Write};
```

- 还可以使用通配符 * 将路径中所有的公共条目都引入到作用域。但需要谨慎使用，一般用于测试的时候将所有被测试代码引入到 tests 模块、有时也被用于预导入(prelude)模块

```rs
use std::collections::*;
```

4. 将模块内容移动到其他文件
- 模块定义时，如果模块名后边是 ;，而不是代码块。那么 rust 会从与模块同名的文件中加载内容，模块树的结构并不会变化
- 当模块增大时，该技术让我们可以将模块的内容移动到其他文件中

```rs
// hotel/eat.rs
fn take_breakfast() {}
fn take_lunch() {}
pub fn take_dinner() {
    // 相对路径
    super::stay::clean_room();
    // 绝对路径：crate::stay::clean_room();
}

```

```rs
// hotel/stay.rs
pub fn clean_room() {
    println!("clean end!");
}
fn replace_supplies() {}
fn other_services() {}
```

```rs
// hotel.rs
pub mod stay;
pub mod eat;
```

```rs
// main.rs
pub mod hotel;
use hotel::stay;

fn main() {
    stay::clean_room();
    hotel::eat::take_dinner();
    println!("Hello, world!");
}
```