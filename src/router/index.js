import { createRouter, createWebHashHistory } from 'vue-router';
import Home from '@/pages/Home.vue'
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  // {
  //   path: '/about',
  //   name: 'frontDesk',
  //   component: () => import('@/components/About.vue'),
  // }
];
const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
export default router;