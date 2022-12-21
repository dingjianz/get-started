<template>
  <div class="about">
    <h1>{{ msg }}</h1>
    <child-component :message="msg" @dj="getDj" />
    <!-- <child-component2 :message2="msg" @dj2="getDj" /> -->
  </div>
</template>

<script>
import ChildComponent from '@/components/ChildComponent.vue'

export default {
  name: 'About',
  components: { ChildComponent },
  data () {
    return {
      msg: '你好世界'
    }
  },
  methods: {
    getDj (val) {
      console.log(val)
      this.msg = val
    }
  }
}
</script>
