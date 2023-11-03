import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '@/pages/Home/Home.vue'
import { useShopStore } from '../stores/shop'
import { useMenuStore } from '../stores/menu'
import { useGlobalStore } from '../stores/global'
import { useFoodStore } from '../stores/foods'
// import { useAdminOrderStore } from '../stores/adminOrder'
import { ng, ok } from '../utils/swal'
import { useOrderStore } from '../stores/order'
import { useUserStore } from '../stores/user'
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    beforeEnter: async (to, from) => {
      const globalStore = useGlobalStore()
      const userStore = useUserStore()
      useOrderStore().readCart()
      try {
        if (!import.meta.env.DEV) {
          await userStore.getLineUserData()
        }

        const { name } = userStore.userData
        if (name && !userStore.isAlreadyLogin) ok(`Welcome ${name}`)
        await Promise.all([
          useShopStore().fetchShop(1),
          useMenuStore().fetchFoodsByTypes()
        ])
        return true
      } catch (err) {
        console.warn(err)
        ng('發生錯誤')
      }
    }
  }, {
    path: '/admin',
    name: 'Admin',
    component: () => import('@/pages/Admin/Admin.vue'),
    children: [
      {
        path: '',
        name: 'Login',
        component: () => import('@/pages/Admin/pages/Login.vue')
      },
      {
        path: 'foods',
        name: 'FoodTable',
        component: () => import('@/pages/Admin/pages/FoodTable.vue'),
        redirect: () => ({ name: 'FoodTypeFoods', params: { foodTypeId: 1 } }),
        async beforeEnter (to, from) {
          const foodStore = useFoodStore()
          await foodStore.fetchFoodTypes(1)
        },
        children: [
          {
            path: ':foodTypeId',
            name: 'FoodTypeFoods',
            component: () => import('@/pages/Admin/pages/FoodTypeFoods.vue'),
            async beforeEnter (to, from) {
              const { foodTypeId } = to.params
              if (isNaN(+foodTypeId)) {
                return { name: 'Login' }
              }
              const foodStore = useFoodStore()
              // await foodStore.fetchFoods(1, +foodTypeId)
            },
            children: [
              {
                path: ':type',
                name: 'FoodEdit',
                component: () => import('@/pages/Admin/pages/FoodEdit.vue'),
                async beforeEnter (to, from) {
                  const { query, params } = to
                  const { foodId } = query
                  const foodStore = useFoodStore()
                  if (params.type === 'update' && foodId) {
                    await foodStore.fetchFood(foodId)
                    return
                  }
                  if (params.type === 'create') {
                    foodStore.initFoodForEdited()
                    foodStore.foodForEdited.foodTypeId = params.foodTypeId
                  }
                }
              }
            ]
          }
        ]
      },
      {
        path: 'orders/:orderId',
        name: 'AdminOrderInfo',
        component: () => import('@/pages/OrderInfo.vue')
      },
      {
        path: 'orders/:orderId/edit',
        name: 'AdminOrderEdit',
        component: () => import('@/pages/OrderInfo.vue')
      },
      {
        path: 'order-type',
        name: 'OrderManager',
        component: () => import('@/pages/Admin/pages/OrderManager.vue'),
        redirect: () => ({ name: 'OrderTypes', params: { orderType: 'today' } }),
        children: [
          {
            path: ':orderType',
            name: 'OrderTypes',
            component: () => import('@/pages/Admin/pages/OrderTypes.vue')
          }
        ]
      }
    ]
  },
  {
    path: '/menuItem/:foodId',
    name: 'MenuItem',
    component: () => import('@/pages/MenuItem.vue'),
    beforeEnter: async (to) => {
      const { foodId } = to.params
      const food = await useMenuStore().fetchFood(+foodId)
      if (food?.foodType?.name === '主餐') {
        await useMenuStore().fetchAddItems()
      }
      return true
    }
  },
  {
    path: '/confirmOrder',
    name: 'ConfirmOrder',
    component: () => import('@/pages/ConfirmOrder/ConfirmOrder.vue')
  },
  {
    path: '/orderInfo/:orderId',
    name: 'OrderInfo',
    component: () => import('@/pages/OrderInfo.vue')
  },
  {
    path: '/historyOrder',
    name: 'HistoryOrder',
    component: () => import('@/pages/HistoryOrders/HistoryOrders.vue')
  }
]
const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from) => {
  const globalStore = useGlobalStore()
  if (to.path.includes('admin')) {
    if (globalStore.isAuth) return true
    return { name: 'Login' }
  }
  return true
})
export default router
