import { io } from 'socket.io-client'
import { useAdminOrderStore } from '../stores/adminOrder'

const URL = import.meta.env.VITE_SOCKET_IO_URL
export const socket = io(URL, {
  transportOptions: {
    websocket: {
      path: URL
    }
  }
})

socket.on('connect', () => {
  console.log('connected')
})

socket.on('MSG', (payload) => {
  const adminStore = useAdminOrderStore()
  adminStore.addSocketAlert(payload)
})

socket.on('disconnect', () => {
  console.log('disconnect')
})
