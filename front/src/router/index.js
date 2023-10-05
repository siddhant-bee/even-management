import{createRouter,createWebHistory} from 'vue-router'
import login from "../components/MyLogin.vue"
import home from "../components/MyHome.vue"
import signup from "../components/MySignup.vue"
import navbar from "../components/MyNavbar.vue"
import addevent from "../components/AddEventPage.vue"

const routes = [
  {
    path: '/',
    name: 'login',
    component: login
  },{
    path: '/home',
    name: 'home',
    component: home
  },
  {
    path: '/signup',
    name: 'signup',
    component: signup
  },{
    path: '/addevent',
    name: 'addevent',
    component: addevent
  },
  {
    path: '/navbar',
    name: 'navbar',
    component: navbar
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
