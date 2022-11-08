import swal from 'sweetalert2'
const defaultToast = {
  timer: 3000,
  toast: true,
  position: 'top-end',
  showConfirmButton: false
}
export const ok = (msg, options) => swal.fire({
  icon: 'success',
  title: msg || 'success',
  ...defaultToast,
  ...options
})

export const ng = (msg, options) => swal.fire({
  icon: 'error',
  title: msg || 'error msg',
  ...defaultToast,
  ...options
})

export const debug = (msg, options) => swal.fire({
  icon: 'error',
  title: typeof msg === 'string' ? msg : JSON.stringify(msg),
  ...defaultToast,
  position: 'top',
  showConfirmButton: true,
  ...options
})
