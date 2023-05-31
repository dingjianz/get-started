import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Home.vue';
import Test from '@/views/Test.vue';
import Pinia from '@/views/Pinia.vue';
import TodoList from '@/views/TodoList.vue';
import MapBox from '@/views/MapBox.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/about',
      name: 'About',
      component: () =>
        import(/* webpackChunkName: "about" */ '@/views/About.vue'),
    },
    {
      path: '/test',
      name: 'Test',
      component: Test,
    },
    {
      path: '/pinia',
      name: 'Pinia',
      component: Pinia,
    },
    {
      path: '/todolist',
      name: 'TodoList',
      component: TodoList,
    },
    {
      path: '/mapBox',
      name: 'mapBox',
      component: MapBox,
    }
  ],
});

export default router;
