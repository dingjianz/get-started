<template>
  <div>
    学生信息：
    <p>姓名：{{ name }}</p>
    <p>性别：{{ sex }}</p>
    <p>年龄：{{ age }}</p>
  </div>
</template>

<script lang="ts">
export default {
  name: 'Dj',
  props: ['name', 'sex', 'age']
}
</script>
