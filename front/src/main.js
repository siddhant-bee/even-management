import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import { VueGeolocation } from 'vue-browser-geolocation'


const app = createApp(App)


app.use(router)
app.use(VueGeolocation)


app.mount('#app')
