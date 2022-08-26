import { createRouter, createWebHashHistory } from 'vue-router';
import Home from '@/pages/Home.vue'
import { useShopStore } from '../stores/shop';
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    beforeEnter: async (to, from, next) => {
      await useShopStore().fetchShop(1)
      next()
    }
  },
  {
    path: '/menuItem/:typeId/:itemId',
    name: 'MenuItem',
    component: () => import('@/pages/MenuItem.vue'),
  },
  {
    path: '/confirmOrder',
    name: 'ConfirmOrder',
    component: () => import('@/pages/ConfirmOrder.vue'),
  }
];
const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
export default router;