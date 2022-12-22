<!-- Vue3组件中的模板结构可以没有根标签 -->
<!-- <template>
  <img alt="Vue logo" src="../assets/logo.png" />
  <Dj name="'jiadning9" sex="男" age="28" />
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import Dj from './dj.vue'

@Options({
  components: {
    Dj
  }
})
export default class Home extends Vue {}
</script> -->

<template>
  <h1>一个人的信息</h1>
  <h2>姓名：{{ name }}</h2>
  <h2>年龄：{{ age }}</h2>
  <h2>message：{{ message }}</h2>
  <button @click="sayHello">sayHello</button>
  <br>
  <br>
  <button @click="sayWellCome">sayWellCome</button>
  <br>
  <br>
  <button @click="test1">测试一下在Vue2的配置中读取Vue3中的数据、方法</button>
  <br>
  <br>
  <button @click="test2">测试一下在Vue3的setup配置中读取Vue2中的数据、方法</button>
</template>

<script>
import { h } from 'vue'

export default {
  name: 'Home',
  data () {
    return {
      message: 'keep coding'
    }
  },
  methods: {
    sayWellCome () {
      console.log('welcome to iFiletek')
    },
    test1 () {
      console.log(this.message)
      console.log(this.name)
      console.log(this.age)
      console.log(this.sayHello)
    }
  },
  // 此处只是测试一下setup 暂时不考虑响应式的问题。
  setup () {
    const name = 'jianding9'
    const age = 28
    const sayHello = () => {
      console.log(`你好，我的名字是${name},今年${age}岁了`)
    }
    const test2 = () => {
      console.log(this.message)
      console.log(this.name)
      console.log(this.age)
      console.log(this.sayHello)
    }

    // 返回一个对象（常用），对象中的属性、方法，在模板中可以直接使用
    return {
      name,
      age,
      sayHello,
      test2
    }

    // 返回一个函数（渲染函数）
    // return () => h('h2', 'hello world')
  }
}
</script>
