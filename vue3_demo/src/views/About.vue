<template>
  <div>
    <h1>一个人的信息-about</h1>
    <h2>姓名：{{ name }}</h2>
    <h2>年龄：{{ age }}</h2>
    <h3>job种类：{{ job.type }}</h3>
    <h4>工资：{{ job.salary }}</h4>
    <button @click="changeInfo" ref="dj">修改信息</button>
  </div>
</template>

<script setup>
import { ref, reactive, watch, getCurrentInstance } from 'vue';
const name = ref('jianding9');
const age = ref(28);
const dj = ref(null); // 操作dom
// const job = ref({
//   type: '前端开发工程师',
//   salary: '30k'
// })

const job = reactive({
  type: '前端开发工程师',
  salary: '30k',
});

function changeInfo () {
  name.value = 'Lisi';
  age.value = 18;
  // job.value.type = 'UI设计师'
  // job.value.salary = '60k'
  job.type = 'UI设计师';
  job.salary = '60k';
}

watch(dj, (newVal, oldVal) => {
  console.log(newVal);
});
</script>
