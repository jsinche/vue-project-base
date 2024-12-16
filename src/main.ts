import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'
import Ripple from 'primevue/ripple'
import ToastService from 'primevue/toastservice'
import ConfirmationService from 'primevue/confirmationservice'
import App from './App.vue'
import router from './router'
import Toast from 'primevue/toast'
import ConfirmDialog from 'primevue/confirmdialog'
import 'primevue/resources/themes/aura-light-green/theme.css'
import 'primeicons/primeicons.css'
const app = createApp(App)
app.use(PrimeVue, { ripple: true })
app.use(ToastService)
app.use(ConfirmationService)
app.use(createPinia())
app.use(router)
app.component('Toast', Toast)
app.component('ConfirmDialog', ConfirmDialog)
app.directive('ripple', Ripple)
app.mount('#app')
