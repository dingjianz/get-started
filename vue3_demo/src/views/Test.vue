<template>
  <div>
    <TestDemoVue class="123" @submit="handleSubmit" />
    <p style="color: orange">isRef and unref watch watchEffect 小demo</p>
    <h2>{{ count }}</h2>
    <h2>shallowReactive: {{ r.b.b2 }}</h2>
    <button @click="add">+</button>
    <button @click="reduce">-</button>
  </div>
</template>

<script setup lang="ts">
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ref, isRef, unref, watchEffect, watch, reactive, shallowReactive, isReactive } from 'vue';
import TestDemoVue from '@/components/TestDemo.vue';

const count = ref(8);
const r = shallowReactive({
  a: 1,
  b: {
    b2: 2,
  },
});
function add () {
  // console.log(isRef(count));
  count.value++;
  // r.a++;
  r.b.b2++; // 此处虽是reactive() 的浅层作用形式，但是经过实践，同时改变其他的ref或者reactvie的值，r.b.b2也会更新，单独r.b.b2++ 视图则不会改变
  // console.log(isReactive(r.b));
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
    // console.log({ newVal, oldVal, });
  }
);

watchEffect(() => {
  // console.log('######', count.value);
});
</script>
