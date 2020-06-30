import Vue from 'vue'
import VueRouter from 'vue-router'
import Connexion from '../views/Connexion.vue'
import Mur from '../views/Mur.vue'
//import Message from '../views/Message.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Connexion',
    component: Connexion
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
 {
    path: '/mur',
    name: 'Mur',
    component: Mur
//    component: require('./views/Messages.vue')
  },
  // {
  //   path: '/mur/:id',
  //   name: 'Message',
  //   component: Message
  // }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
