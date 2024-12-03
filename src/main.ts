import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config';
import Ripple from 'primevue/ripple';

import App from './App.vue'
import router from './router'
// import "primevue/resources/themes/lara-light-green/theme.css"
import 'primevue/resources/themes/aura-light-green/theme.css'
import 'primeicons/primeicons.css'
const app = createApp(App)
app.use(PrimeVue, { ripple: true });
app.use(createPinia())
app.use(router)

app.directive('ripple', Ripple);
app.mount('#app')
