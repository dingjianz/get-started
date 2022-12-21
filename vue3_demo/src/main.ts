import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import i18nPlugin from './plugins/i18n';
import { createPinia } from 'pinia';
import { ElButton } from 'element-plus';
import '@/assets/styles/reset.css';

const pinia = createPinia();

const app = createApp(App);

app
  .use(i18nPlugin, {
    greetings: {
      hello: '你好!',
      world: '世界',
    },
  })
  .use(router)
  .use(pinia).use(ElButton);

app.mount('#app');
