<template>
  <div></div>
</template>

<script setup lang="ts">
const emit = defineEmits({
  submit (text: string) {
    if (text === '123') {
      return true
    } else {
      return false
    }
  }
})

const cancelFun = (text: string) => {
  emit('submit', text)
}
</script>
