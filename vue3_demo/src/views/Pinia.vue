<script setup lang="ts">
import { computed } from 'vue';
import { storeToRefs } from 'pinia';
import { useStore } from '@/store';

const store = useStore();

// ❌ 这将无法生效，因为它破坏了响应性
// 这与从 `props` 中解构是一样的。
// const { count, increment } = useStore();

// 这个将是响应式的
const count2 = computed(() => useStore().count);

// storeToRefs会跳过任何 action 或非响应式(非 ref/响应式)属性
const { count, } = storeToRefs(store);
// 名为 increment 的 action 可以直接store提取
const { increment, } = store;

function reduce () {
    store.count--;
  // store.$patch((state) => {
    //   state.count--;
  // });
}

store.$subscribe((mutation, state) => {
  console.log({
    mutation,
    state,
  });
  console.log(state.count);
});

</script>

<template>
  <div>
    <a href="https://pinia.vuejs.org/zh/core-concepts/#using-the-store">Pinia官网</a>
    <div>pinia</div>
    <!-- <p>{{ store.count }}</p>
  <button @click="store.increment">add</button> -->
    <p>{{ count }}</p>
    <p>{{ count2 }}</p>
    <button @click="increment">add</button>
    <button @click="reduce">reduce</button>
  </div>
</template>
