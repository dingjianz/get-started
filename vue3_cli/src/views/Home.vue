<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/>
    <Dj name="'jiadning9" sex="男" age="28" />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import HelloWorld from '@/components/HelloWorld.vue' // @ is an alias to /src
import Dj from './dj.vue'

@Options({
  components: {
    HelloWorld,
    Dj
  }
})
export default class Home extends Vue {}
</script>
