<template>
  <div>
    <h2>{{ message }}</h2>
    <button @click="change">点击</button>
  </div>
</template>

<script>
export default {
  name: "ChildComponent",
  model: {
    prop: "message",
    event: "dj",
  },
  props: {
    message: {
      require: true,
      default: "hello world",
    },
  },
  methods: {
    change() {
      this.$emit("dj", "hello ");
    },
  },
};
</script>
