import axios from 'axios'
const api = axios.create({baseURL: import.meta.env.VITE_API_URL})

api.interceptors.request.use(
  config => config,
  (err) => Promise.reject(err)
)

api.interceptors.response.use(
  async (res) => {
    if(res.status === 200) return res.data.data
    console.log({res})
    throw new Error(
      res?.data?.data?.message || res?.data?.message || 'api res error'
    ) 
  },
  (err) => {
    const {status} = err?.response
    console.log(err)
    return Promise.reject(err)
  }
)
export default api