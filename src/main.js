import { createApp } from 'vue'
import { createPinia } from 'pinia'
// import VueGapi from 'vue-gapi'
import App from './App.vue'

const pinia = createPinia()
const app = createApp(App)
// app.use(VueGapi, {
//   apiKey: import.meta.env.VITE_GOOGLE_API_KEY,
//   clientId: import.meta.env.VITE_GOOGLE_CLIENT_KEY,
//   discoveryDocs: ['https://sheets.googleapis.com/1P0hSQR_c54d3xkpvWlePcQ2YnVNZSinC6JT4bmRrh6s/rest?version=v4'],
//   scope: 'https://www.googleapis.com/auth/spreadsheets',
// })
app.use(pinia)
app.mount('#app')
