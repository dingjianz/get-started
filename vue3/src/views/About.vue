<template>
  <h1>一个人的信息</h1>
  <h2>姓名：{{ name }}</h2>
  <h2>年龄：{{ age }}</h2>
  <h3>job种类：{{ job.type }}</h3>
  <h4>工资：{{ job.salary }}</h4>
  <button @click="changeInfo">修改信息</button>
</template>

<script>
import { isObject } from '@vue/shared'
import { ref, reactive } from 'vue'
export default {
  name: 'About',
  setup () {
    const name = ref('jianding9')
    const age = ref(28)
    // const job = ref({
    //   type: '前端开发工程师',
    //   salary: '30k'
    // })

    const job = reactive({
      type: '前端开发工程师',
      salary: '30k'
    })

    function changeInfo () {
      name.value = 'Lisi'
      age.value = 18
      // job.value.type = 'UI设计师'
      // job.value.salary = '60k'
      job.type = 'UI设计师'
      job.salary = '60k'
    }
    return {
      name,
      age,
      job,
      changeInfo
    }
  }
}
</script>
