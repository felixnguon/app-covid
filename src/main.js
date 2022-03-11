import { createApp } from 'vue'
import App from './App.vue'
import FontAwesomeIcon from './plugins/fontawesome-icons'
import Toast from './plugins/toastification'

import store from './store'
import router from './router'

import './styles/tailwind.css'

const app = createApp(App)
app.component('font-awesome-icon', FontAwesomeIcon)
app.use(Toast)
app.use(store)
app.use(router)
app.mount('#app')
