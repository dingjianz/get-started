import { defineStore } from 'pinia';
import { ref, watch } from 'vue';

export const useStore = defineStore('main', () => {
  const count = ref<number>(0);
  function increment () {
    count.value++;
  }

  watch(count, (newVal) => {
    // console.log('pinia中的count改变了~~~~', newVal);
  });

  return {
    count,
    increment,
  };
});
