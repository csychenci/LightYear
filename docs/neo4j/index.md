---
order: 1
---

## neo4j

---

1. 简单使用

- 类似于关系型数据库的 sql 语句，neo4j 使用 Cypher 查询语言(cql)来进行图形数据库的查询。所有节点会有一个默认生成的 id 作为唯一标识
- 添加节点: CREATE (\<node-name\>:\<label-name\>)。node-name 是节点名称，label-name 是标签名称。标签名称相当于关系型数据库的表名，而节点名称则代指这一条数据

```md
<!-- 在 Aircraft 表中创建一条没有属性的空数据 -->

CREATE (Boeing:Aircraft)
```

```md
<!-- 创建包含属性的节点时，可以在标签后面追加一个描绘属性的 json 字符串 -->

CREATE ( <node-name>:<label-name> { <key1\>:<value1>, <keyN\>:<valueN> } )
```

```md
CREATE (Boeing:Aircraft { name:"波音 737", produce:"美国波音公司" })
```

- 查询节点: MATCH(\<node-name\>:\<label-name\>)。使用 MATCH 匹配命令查询已存在的节点及属性的数据，MATCH 命令在后面配合 RETURN、DELETE 等命令使用，执行具体的返回或删除等操作

```md
MATCH (p:Person) RETURN p;
```

- 删除节点：使用 MATCH 配合 DELETE 进行删除

```md
<!-- 使用 WHERE 过滤条件，通过节点的id进行了过滤 -->

MATCH (p:Person) WHERE id(p)=100 DELETE p
```

- 添加关联：neo4j 图数据库中，遵循属性图模型来存储和管理数据，也就是我们可以维护节点之间的关系

```md
<!-- 1. 先创建一个节点，作为其中关系的一端 -->

CREATE ()
```
