import{createRouter,createWebHistory} from 'vue-router'
import login from "../components/MyLogin.vue"
import home from "../components/MyHome.vue"
import signup from "../components/MySignup.vue"
import navbar from "../components/MyNavbar.vue"
import addeventpage from "../components/AddEventPage.vue"
// import key from 'core-js/library/fn/symbol/key-for'
import formlink from "../components/FormLink"
import EventForm from "../components/EventForm"

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
    path: '/addeventpage',
    name: 'addeventpage',
    component: addeventpage
  },
  {
    path: '/navbar',
    name: 'navbar',
    component: navbar
  },
  {
    path: '/formlink',
    name: 'formlink',
    component: formlink
  },
  {
    path:'/addevent',
    name:'/addevent',
    component:EventForm
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
