import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from "../views/Home.vue"
//import Connexion from '../views/Connexion.vue'
import Mur from '../views/Mur.vue'

//import Message from '../components/Message.vue'

Vue.use(VueRouter)

  const routes = [
  // {
  //   path: '/',
  //   name: 'Connexion',
  //   component: Connexion
  // },
  {
    path: '/',
    name: "Home",
    component: Home
  },
//   {
//     path: '/mur',
//     name: 'Mur',
//     component: Mur
// //    component: require('./views/Messages.vue')
//   },
  {
    path: '/message/:id',
    name: 'Mur',
    component: Mur,
    props: true
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
