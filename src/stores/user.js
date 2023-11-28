import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import liff from '@line/liff'
import { debug, ng } from '../utils/swal'
import { useRouter, useRoute } from 'vue-router'
export const useUserStore = defineStore('user', () => {
  const isAlreadyLogin = ref(false)
  const isLineLogin = ref(false)
  const userData = ref({
    id: '',
    name: '',
    imgUrl: '',
    orderIds: {
      // unConfirm, confirmed, unPay, Payed, preparing, done
    }
  })
  const isInClient = computed(() => liff.isInClient())
  const getLineUserData = async () => {
    try {
      const router = useRouter()
      const route = useRoute()
      await liff.init({
        liffId: import.meta.env.VITE_LIFF_ID
      })
      if (isInClient.value) {
        isLineLogin.value = liff.isLoggedIn()
        const { userId: id, displayName: name, pictureUrl: imgUrl } = await liff.getProfile()
        userData.value = { id, name, imgUrl }
        if (route.name !== 'ConfirmOrder') router.push({ name: 'Home' })
        return
      }
      isLineLogin.value = liff.isLoggedIn()
      if (!isLineLogin.value) {
        liff.login()
        return
      }
      const { userId: id, displayName: name, pictureUrl: imgUrl } = await liff.getProfile()
      userData.value = { id, name, imgUrl }
      isAlreadyLogin.value = true
    } catch (err) {
      debug(err)
    }
  }
  const sendMsg = async (msg) => {
    try {
      await liff.sendMessages([msg])
    } catch (err) {
      ng(JSON.stringify(err))
      console.warn(err)
    }
  }
  return {
    isAlreadyLogin, isLineLogin, userData, getLineUserData, isInClient, sendMsg
  }
})
