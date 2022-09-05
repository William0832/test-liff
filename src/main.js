import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
// import VueGapi from 'vue-gapi'
import App from './App.vue'
/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'
/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
/* import specific icons */
import { faPhone, faAngleUp, faPlus, faMinus, faXmark, faCalendarDay, faBell } from '@fortawesome/free-solid-svg-icons'
import { faClock as farClock, faMap as farMap } from '@fortawesome/free-regular-svg-icons'

const pinia = createPinia()
const app = createApp(App)
// /* add icons to the library */
library.add(
  farMap, faPhone, farClock,
  faAngleUp, faPlus, faMinus,
  faXmark, faCalendarDay,
  faBell
)

app.component('Icon', FontAwesomeIcon)
app.use(router)
app.use(pinia)
app.mount('#app')
