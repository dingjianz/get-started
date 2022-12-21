// 引入的不再是Vue的构造函数了，引入的是一个名为createApp的工厂函数
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 创建应用实例对象 - app（类似于之前vue2中的vm，但app比vm更“轻”，携带的方法属性少很多）
const app = createApp(App)
app.use(store).use(router).mount('#app')

/*
const vm = new Vue({
  render: (h) => h(App)
})
vm.$mount('#app')
*/
