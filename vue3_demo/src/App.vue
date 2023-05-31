<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
</script>

<template>
  <div id="nav">
    <router-link to="/">Home</router-link>&emsp;|&emsp;
    <router-link to="/about">About</router-link>&emsp;|&emsp;
    <router-link to="/test">Test</router-link>&emsp;|&emsp;
    <router-link to="/pinia">Pinia</router-link>&emsp;|&emsp;
    <router-link to="/todolist">TodoList</router-link>&emsp;|&emsp;
    <router-link to="/mapBox">mapBox</router-link>
  </div>
  <router-view v-slot="{ Component }">
    <Transition mode="out-in">
      <!-- 因为Transition，此处的component 子组件内部必须有一个根元素，否则无动画效果，控制台会报错 -->
      <KeepAlive include="TodoList">
        <component :is="Component" />
      </KeepAlive>
    </Transition>
  </router-view>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  overflow-x: hidden;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.v-enter-active,
.v-leave-active {
  transition: all 0.5s ease;
}

.v-leave-to {
  /* 消失的css样式 */
  opacity: 0;
  transform: translate3d(-20px, 0, 0);
}

.v-enter-from {
  /* 出现的css样式 */
  opacity: 0;
  transform: translate3d(20px, 0, 0);
}
</style>
