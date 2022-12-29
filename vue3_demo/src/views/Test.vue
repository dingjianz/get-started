<template>
  <div>
    <TestDemoVue class="123" @submit="handleSubmit" />
    <p style="color: orange">isRef and unref watch watchEffect 小demo</p>
    <h2>{{ count }}</h2>
    <button @click="add">+</button>
    <button @click="reduce">-</button>
  </div>
</template>

<script setup lang="ts">
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ref, isRef, unref, watchEffect, watch, reactive } from 'vue';
import TestDemoVue from '@/components/TestDemo.vue';

const count = ref(8);
function add () {
  // console.log(isRef(count));
  count.value++;
}

function reduce () {
  // console.log(unref(count));
  count.value--;
}

function handleSubmit (val: any) {
  console.log(val);
}

watch(
  () => count.value,
  (newVal, oldVal) => {
    console.log({ newVal, oldVal, });
  }
);

watchEffect(() => {
  console.log('######', count.value);
});
</script>
