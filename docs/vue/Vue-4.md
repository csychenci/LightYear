---
title: 组件通信
date: 2020-09-07 10:30:36
categories: Vue
tags:
  - JavaScript框架
  - Vue
---


## 组件

---
1. 全局组件的使用
- 组件分为全局组件和局部组件。全局组件会在所有的 Vue 实例中生效，一般使用时要先注册组件，再初始化实例

```js
Vue.component('component-a',{
  data:function(){
    return {
      title:"我是全局组件"
    }
  },
  methods:{},
  template:'<div>{{title}}</div>'
});

new Vue({ el: '#app' });

<div id='app'><component-a /></div>
```

- 当对项目打包上线时，它会被包裹在最终的构建结果中，这会造成用户下载的 js 无谓的增加，所以可以使用局部注册的方式

2. 局部组件的注册

```js
var ComponentA = {
  data: function () {
    return {
      title: '我是全局组件',
    };
  },
  methods: {},
  template: '<div>{{title}}</div>',
};
```

```js
new Vue({
  el: '#app',
  components: {
    'component-a': ComponentA,
  },
});
```

- 局部注册的组件在其子组件中不可用

```js
// 在子组件中使用
var ComponentA = {
  /* ... */
};

var ComponentB = {
  components: {
    'component-a': ComponentA,
  },
  // ...
};
```

3. 组件通信
- 组件作用域：父组件模板的内容在父组件作用域内编译，子组件模板的内容在子组件作用域内编译
- 组件实例的作用域是孤立的，这意味着不能也不该在子组件的模板内直接引用父组件的数据，父组件的数据需要通过 `props` 才能下发到子组件中，`props` 是子组件访问父组件的唯一接口
- 子组件把数据传递给父组件通过触发自定义事件来实现
- 一个组件可以直接在模板里面渲染 data 里面的数据(双花括号)，子组件不能直接在模板里面渲染父元素的数据
- 如果子组件想要引用父元素的数据，那么就在 prop 里面声明一个变量（比如 a），这个变量就可以引用父元素的数据，然后在模板里渲染这个变量（前面的 a），这时候渲染出来的就是父元素里面的数据

4. 组件生命周期调用顺序

- 组件的调用顺序都是 `先父后子`，渲染完成的顺序的是 `先子后父`
- 组件的销毁操作是 `先父后子`，销毁完成的顺序是 `先子后父`

| 过程 | 顺序 |
| :-: | --- |
| 加载渲染过程 | 父 beforeCreate->父 created->父 beforeMount->子 beforeCreate->子 created->子 beforeMount- >子 mounted->父 mounted |
| 子组件更新过程 | 父 beforeUpdate->子 beforeUpdate->子 updated->父 updated |
| 父组件更新过程 | 父 beforeUpdate -> 父 updated |
| 销毁过程 | 父 beforeDestroy->子 beforeDestroy->子 destroyed->父 destroyed |

---
## 组件通信
---

1. 父组件向子组件传值

- 子组件标签上可以写自定义属性，在使用标签的时候，告诉子组件使用哪些标签，子组件中使用 `props` 定义可以使用的属性，可以传递多个属性
- 先在父组件使用的子组件标签中绑定自定义属性

```html
<!-- 父组件 -->
<template>
  <div id="app">
    <el-paper v-bind:title="title" v-bind:name="name"></el-paper>
  </div>
</template>
<script>
  import ElPaper from "./components/elpaper.vue";
  export default {
    data:function() {
      return {
        title:"my-app",
        name:"father components"
      }
    },
    components:{
      "el-paper":ElPaper
    }
  }
</script>
```

- 在子组件中使用 `props` 接收，props 可以是一个数组或者对象

```html
<!-- 子组件 -->
<template>
  <div class="el-paper">
    <p>title:{{title}}</p>
    <p>name:{{name}}</p>
  </div>
</template>
<script>
  export default {
    name:"el-paper",
    data:function() {
      return {}
    },
    props:["title","name"]
  }
</script>
```

2. 改变父组件传递给子组件的值

- 不建议使用函数去修改传递过来的值，可能造成数据混乱，因为在子组件中修改父组件传递过来的值，只会在子组件中生效，而父组件中值不会改变
- 可以将父组件传递过来的值在 data 中使用一个变量接收，再改变这个变量

```html
<body>
  <div id="app">
    <app-component :Myprops="name"></app-component>
  </div>
</body>
<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
<script type="text/javascript">
  Vue.component('app-component', {
    template: `<span @click="changeprops" style="color:red;">{{app_name}}</span>`,
    props: ['Myprops'],
    data: function () {
      return {
        app_name: this.Myprops,
      };
    },
    methods: {
      changeprops: function () {
        this.app_name = 'hello appcomponent';
      },
    },
  });
  var app = new Vue({
    el: '#app',
    data: {
      name: 'hello world',
    },
  });
</script>
```

3. props 验证

- `props` 可以写成一个对象或者数组，通过设置一些参数去定义接收的值。如果 props 的类型是一个 `object`，`default/缺省值` 需要使用工厂函数

```js
props:{
      myProps:{
            type:String,
            // required:true
            // 如果为true则代表必须传值
            default:'xiaoming' // 没有传值则使用默认值，和required二选一
      },
      age:[Number,String,Array],
      myObj:{
            type:Object,
            // required:true // 如果为true则代表必须传值
            default:function(){
                  return {

                  }
                  // 没有传值则使用默认值，和required二选一
            }
      }
}
```

---

### 子组件向父组件传值

---

1. 通过自定义事件传递

- 首先在子组件中绑定一个函数

```js
// 子组件内
template: `<div class="app-component1"><button @click="done">传递</button></div>`;
```

- 在子组件中定义函数，用来触发父组件上的自定义事件

```js
// 子组件内
methos:{
      done:function(){
            this.$emit('vh',this.myProps)
      }
}
```

- 为父组件中使用的子组件绑定一个自定义事件，用来接收子组件传递过来的数据

```html
<div id="app">
  <app-component @vh="getSoncomponent"></app-component>
</div>
```

- 编写父组件上的事件处理函数

```js
// 父组件内
methods:{
      getSoncomponent(data){
            this.con=data;
            console.log(data)
      }
}
```

2. 通过回调函数传递

- 先在父组件内写一个 callBack 函数

```js
var app = new Vue({
  el: '#app',
  data: {
    name: 'hello world',
    con: '',
  },
  methods: {
    callBack: function (name) {
      console.log(name);
      this.name = name;
    },
  },
});
```

- 通过 `自定义属性` 给子组件传递 callback，子组件利用 `props` 接收

```html
<div id="app" :val="name">
  <span>{{name}}</span>
  <app-component :callback="callBack"></app-component>
  <!--  注意这里callBack的this是指向父组件实例的 -->
</div>
```

```js
Vue.component('app-component', {
  template: `<span @click="callback(app_name)" style="color:red;">点击</span>`,
  props: {
    callback: Function,
  },
  data: function () {
    return {
      app_name: '我是子组件中的数据',
    };
  },
});
```

- 完整代码

```html
<div id="app" :val="name">
  <span>{{name}}</span>
  <app-component :callback="callBack"></app-component>
</div>
<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
<script>
  Vue.component('app-component', {
    template: `<span @click="callback(app_name)" style="color:red;">点击</span>`,
    props: {
      callback: Function,
    },
    data: function () {
      return {
        app_name: '我是子组件中的数据',
      };
    },
  });
  var app = new Vue({
    el: '#app',
    data: {
      name: 'hello world',
      con: '',
    },
    methods: {
      callBack: function (name) {
        console.log(name);
        this.name = name;
      },
    },
  });
</script>
```

- 利用子组件中的事件触发 props 的 callback，把自己的值传递给父组件，父组件的值成功改变。本质上还是利用 props，只不过传递给子组件的是一个函数，通过函数来操作子组件的值

---

### 兄弟组件通信

---

1. 事件总线

- 该模式是一个 **订阅发布** 模式，是为了解决兄弟组件的通信问题而诞生的
- 首先，先暴露一个 Vue 实例

```js
var EventBus=new Vue(); // 暴露一个Vue实例
var app=new Vue（{
      el:'#app'
}
```

- 分别定义两个子组件，并分别注册并监听一个事件（事件注册）、触发一个事件（事件触发）

```js
// 子组件child1
Vue.component('child1', {
  data: function () {
    return {
      msg1: 'child1',
      receive: [],
      value1: '',
    };
  },
  created() {
    var that = this;
    EventBus.$on('child1', function (data) {
      // 注册并监听一个事件，当有事件被触发时会执行这里的逻辑
      if (that.receive.indexOf(data) === -1) {
        that.receive.push(data);
      }
    });
  },
  methods: {
    toChild2() {
      if (this.value1 !== '') {
        var that = this;
        var value1 = that.value1;
        that.value1 = '';
        EventBus.$emit(
          'child2',
          (function () {
            // 触发一个事件
            return value1;
          })(),
        );
      }
    },
  },
  template: `<div style="background:gray;" class="childclass"><p>{{msg1}}</p><p v-for="item in receive" :key="item">{{item}}</p><input type="text" v-model="value1" /><button @click="toChild2" type="button">发送给Child2</button></div>`,
});
```

```js
// 子组件child2
Vue.component('child2', {
  template: `<div style="background:gray" class="childclass"><p>{{msg2}}</p>
      <p v-for="item in receive" :key="item">{{item}}</p><input type="text" v-model="value2" />
      <button @click="toChild1" type="button">child2</button>
      </div>`,
  data: function () {
    return {
      msg2: 'child2',
      value2: '',
      receive: [],
    };
  },
  methods: {
    toChild1() {
      if (this.value2 !== '') {
        var that = this;
        var value2 = that.value2;
        that.value2 = '';
        EventBus.$emit(
          'child1',
          (function () {
            // 触发一个事件child2
            return value2;
          })(),
        );
      }
    },
  },
  created() {
    var that = this;
    EventBus.$on('child2', function (data) {
      // 注册监听一个事件clild1，当有事件被触发时会执行这里的逻辑
      if (that.receive.indexOf(data) === -1) {
        that.receive.push(data);
      }
    });
  },
});
```

- 在父组件内使用子组件，两者之间通信可以不通过父组件传递数值

```js
<div id="app">
  <child1></child1>
  <child2></child2>
</div>
```

- 组件 css 样式如下

```css
#app {
  display: flex;
  justify-content: space-between;
  border: 1px solid gray;
}
.childclass {
  width: 300px;
  border-top: 1px solid gold;
}
.red {
  color: red;
}
.pink {
  color: pink;
}
```

2. 通过父组件间接传递

- 也就是通过都绑定父组件的某个变量，然后将其中某个子组件的值传给父组件，再去改变这个父组件的变量，从而达到兄弟组件之间传值
- 父组件中使用子组件，传值的子组件绑定一个自定义事件

```html
<div id="app">
  <child1 :age_1="age"></child1>
  <child2 :age_2="age" @sendage="changeFadata"></child2>
</div>
```

- 父组件中定义一个自定义事件处理函数

```js
var app = new Vue({
  el: '#app',
  data: {
    name: 'father',
    age: 45,
  },
  methods: {
    changeFadata(data) {
      this.age = data;
    },
  },
});
```

- 使用某一个子组件发送数据给另一个子组件

```js
// 传值的子组件
Vue.component('child2', {
  template: `<div style="background:gray" class="childclass">
	<span v-text="age"></span>
	<button @click="toChild1" type="button">child2</button>
	</div>`,
  data: function () {
    return {
      age: 20,
    };
  },
  props: {
    age_2: {
      type: Number,
    },
  },
  watch: {
    age_2: function (newVal, oldVal) {
      this.age = newVal;
    },
  },
  methods: {
    toChild1() {
      this.$emit('sendage', this.age);
    },
  },
});
```

- 在另一个子组件中接收数值

```js
Vue.component('child1', {
  template: `<div style="background:gray" class="childclass">
	<span v-text="age"></span>
	<button type="button">child1</button>
	</div>`,
  data: function () {
    return {
      age: 0,
    };
  },
  props: {
    age_1: {
      type: Number,
    },
  },
  watch: {
    age_1: function (newVal, oldVal) {
      this.age = newVal;
    },
  },
  methods: {},
});
```

- 总结：将共享的状态 `提升` 到父组件中，当要传值的子组件通过触发父组件的自定义事件改变父组件的数据，父组件又可以把改变的值传递给所绑定变量的其他子组件，实现兄弟间传值

3. 通过 callback 传递

- 请看子组件向父组件传值的 `callback`，可能出现嵌套过多的情况，不好处理

4. 使用状态管理工具 vuex

- 移步 `Vue` 框架之 vuex
