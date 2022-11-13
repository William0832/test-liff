import axios from 'axios'
import { useGlobalStore } from '@/stores/global'
import { debug, ok } from './swal'
const api = axios.create({ baseURL: import.meta.env.VITE_API_URL })
api.interceptors.request.use(
  config => {
    const globalStore = useGlobalStore()
    globalStore.isLoading = true
    return config
  },
  (err) => {
    const globalStore = useGlobalStore()
    globalStore.isLoading = false
    debug(err)
    return Promise.reject(err)
  }
)

api.interceptors.response.use(
  async (res) => {
    const globalStore = useGlobalStore()
    globalStore.isLoading = false
    if (res.status === 200) {
      return res.data.data
    }
    const errMsg = res?.data?.data?.message || res?.data?.message || 'api res error'
    debug(errMsg)
    throw new Error(errMsg)
  },
  (err) => {
    const globalStore = useGlobalStore()
    globalStore.isLoading = false
    const { status } = err?.response
    debug(err)
    return Promise.reject(err)
  }
)
export default api
