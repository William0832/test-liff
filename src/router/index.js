import { createRouter, createWebHashHistory } from 'vue-router';
import Home from '@/pages/Home.vue'
import { useShopStore } from '../stores/shop'
import { useMenuStore } from '../stores/menu'
import { useGlobalStore } from '../stores/global'
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
  }, {
    path: '/admin',
    name: 'Admin',
    component: () => import('@/pages/Admin/Admin.vue'),
    children: [
      {
        path: '',
        name: 'Login',
        component: () => import('@/pages/Admin/components/Login.vue')
      },
      {
        path: 'foods',
        name: 'FoodTable',
        component: () => import('@/pages/Admin/components/FoodTable.vue')
      },
      {
        path: 'orders',
        name: 'OrderTable',
        component: () => import('@/pages/Admin/components/OrderTable.vue')
      },
    ]
  },
  {
    path: '/menuItem/:foodId',
    name: 'MenuItem',
    component: () => import('@/pages/MenuItem.vue'),
    beforeEnter: async (to, from, next) => {
      const {foodId} = to.params
      const food = await useMenuStore().fetchFood(+foodId)
      if(food?.foodType?.name === '主餐') {
        await useMenuStore().fetchAddItems()
      }
      next()
    }
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
})

router.beforeEach((to, from) => {
  const globalStore = useGlobalStore()
  if (to.path.includes('admin')) {
    if (to.name === 'Login' || globalStore.isAuth) return true
    return { name: 'Login' }
  }
  return true
})

export default router;