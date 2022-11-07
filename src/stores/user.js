import { defineStore } from 'pinia'
import { ref } from 'vue'
import liff from '@line/liff'

export const useUserStore = defineStore('user', () => {
  const isLineLogin = ref(false)
  const userData = ref({
    id: '',
    name: '',
    imgUrl: ''
  })
  const getLineUserData = async () => {
    try {
      await liff.init({
        liffId: import.meta.env.VITE_LIFF_ID
      })
      isLineLogin.value = liff.isLoggedIn()
      if (!isLineLogin.value) liff.login()
      const { userId: id, displayName: name, pictureUrl: imgUrl } = await liff.getProfile()
      userData.value = { id, name, imgUrl }
    } catch (err) {
      console.warn(err)
    }
  }
  return {
    isLineLogin, userData, getLineUserData
  }
})
