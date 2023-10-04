import{createRouter,createWebHistory} from 'vue-router'
import login from "../components/MyLogin.vue"
import home from "../components/MyHome.vue"
import signup from "../components/MySignup.vue"

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
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
