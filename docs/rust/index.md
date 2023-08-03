---
order: 1
---
# Rust
---
## 编译器合集
---
1. 出现 "Blocking waiting for..."
- 一般在 Cargo build/run 的时候出现，此时先查找到 Cargo 在哪，再进入到那个目录(.cargo)将 .package-cache 删除即可

```sh
where cargo
rm .package-cache
```
