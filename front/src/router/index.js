import{createRouter,createWebHistory} from 'vue-router'
import login from "../components/MyLogin.vue"
import home from "../components/admin/MyHome.vue"
import signup from "../components/MySignup.vue"
import navbar from "../components/admin/MyNavbar.vue"
import addeventpage from "../components/admin/AddEventPage.vue"
// import key from 'core-js/library/fn/symbol/key-for'
import formlink from "../components/admin/FormLink"

import changerole from "../components/admin/ChangeRole.vue"

import EventForm from "../components/admin/EventForm"
import editevent from "../components/admin/EditForm.vue"
import tryin from "../components/ImTryin.vue"
import printerhome from "../components/printer/PrinterHome.vue"
import bookticket from "../components/printer/BookTicket.vue"
import thankyou from "../components/printer/ThankYou.vue"
import qrcode from "../components/printer/MyQr.vue"
import fail from "../components/printer/PrinterFail.vue"
import profile from "../components/printer/PrinterProfile.vue"
import uprofile from "../components/user/UserProfile.vue"
import ubook from "../components/user/userBookTicket.vue"
import ufail from "../components/user/userFail.vue"
import uhome from "../components/user/UserHome.vue"
import unavbar from "../components/user/UserNavbar.vue"
import uthankyou from "../components/user/userThankYou.vue"
import mymiddler from "../components/myMiddler.vue"
import forgot from "../components/ForGOt.vue"

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

    path: '/changerole',
    name: 'changerole',
    component: changerole},
{
    path:'/addevent',
    name:'/addevent',
    component:EventForm

  },
  {
    path: '/tryin',
    name: 'tryin',
    component: tryin
  },
  {
    path: '/editevent/:id',
    name: 'editevent',
    component: editevent
  },
  {
    path: '/printerhome',
    name: 'printerhome',
    component: printerhome
  },{
    path: '/bookticket/:id',
    name: 'bookticket',
    component: bookticket
  },
  {
    path: '/thankyou/:id',
    name: 'thankyou',
    component: thankyou
  },
  {
    path: '/qrcode',
    name: 'qrcode',
    component: qrcode
  },
  {
    path: '/fail',
    name: 'fail',
    component: fail
  },
  {
    path: '/profile',
    name: 'profile',
    component: profile
  },

  //user routes
  {
    path: '/uprofile',
    name: 'uprofile',
    component: uprofile
  },
  {
    path: '/ubook/:id',
    name: 'ubook',
    component: ubook
  },
  {
    path: '/ufail',
    name: 'ufail',
    component: ufail
  },
  {
    path: '/uhome',
    name: 'uhome',
    component: uhome
  },
  {
    path: '/unavbar',
    name: 'unavbar',
    component: unavbar
  },
  {
    path: '/uthankyou',
    name: 'uthankyou',
    component: uthankyou
  },
  {
    path: '/mymiddler/:data',
    name: 'mymiddler',
    component: mymiddler
  },{
    path: '/forgot/:email',
    name: 'forgot',
    component: forgot
  }
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
