import { createRouter, createWebHashHistory } from 'vue-router';
import Home from '@/pages/Home.vue'
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/menuItem/:id',
    name: 'MenuItem',
    component: () => import('@/pages/MenuItem.vue'),
  }
];
const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
export default router;