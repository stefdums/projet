import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from "../views/Home.vue"
//import Connexion from '../views/Connexion.vue'
import Mur from '../views/Mur.vue'
import GetCommentaires from '../components/GetCommentaires.vue'
import Poster from '../views/Poster.vue'

Vue.use(VueRouter)

  const routes = [

  {
    path: '/',
    name: "Home",
    component: Home
  },

  {
    path: '/message/:id',
    name: 'Mur',
    component: Mur,
    props: true,
    children: [{
      path:'comm',
      component: GetCommentaires,
      name: 'get-commentaires'
    }]
  },
  {
    path: '/poster',
    name: 'poster',
    component: Poster
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
