<script lang="ts">
export default {
  inheritAttrs: false,
};
</script>

<script setup lang="ts">
import { inject } from "vue";
const i18n = inject<I18n.IOptions>("i18n");

console.log(i18n);

const emit = defineEmits({
  submit(text: string) {
    if (text === "123") {
      return true;
    } else {
      return false;
    }
  },
});

const cancelFun = (text: string) => {
  emit("submit", text);
};
</script>

<template>
  <div>
    <div>{{ i18n?.greetings?.["hello"] }}</div>
    <div>{{ i18n?.greetings?.["world"] }}</div>
    <button :class="$attrs.class" @click="cancelFun('123')">Click</button>
  </div>
</template>
