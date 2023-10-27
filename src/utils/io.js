import { io } from 'socket.io-client'
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

socket.on('disconnect', () => {
  console.log('disconnect')
})
