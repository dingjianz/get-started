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
  <button onclick="sayHello">说话</button>
</template>

<script>
export default {
  name: 'app',
  // 此处只是测试一下setup 暂时不考虑
  setup () {
    const name = 'jianding9'
    const age = 28
    function sayHello () {
      console.log(`你好，我的名字是${name},今年${age}岁了`)
    }
    return {
      name,
      age,
      sayHello
    }
  }
}
</script>
