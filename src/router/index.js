import { createRouter, createWebHashHistory } from 'vue-router';
import Home from '@/pages/Home.vue'
import { useShopStore } from '../stores/shop';
import { useMenuStore } from '../stores/menu';
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    beforeEnter: async (to, from, next) => {
      await Promise.all [
        useShopStore().fetchShop(1),
        useMenuStore().fetchFoodsByTypes()
      ]
      next()
    }
  },
  {
    path: '/menuItem/:foodId',
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