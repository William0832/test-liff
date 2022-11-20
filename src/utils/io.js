import io from 'socket.io-client'
export const useSocket = () => {
  const socket = io(import.meta.env.VITE_SOCKET_IO_URL)
  return { socket }
}
