import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from "../views/Home.vue"
import Connexion from '../views/Connexion.vue'
import Mur from '../views/Mur.vue'
import GetCommentaires from '../components/GetCommentaires.vue'
import Poster from '../views/Poster.vue'
import MonCompte from '../views/MonCompte.vue'
import CompteAdmin from '../components/CompteAdmin.vue'
import Modifier from '../views/Modifier.vue'
Vue.use(VueRouter)

  const routes = [

  {
   path:"/connexion",
   name: "Connexion",
   component: Connexion
  }, 
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
  },
  {
    path: '/modifier',
    name:'modifier',
    component: Modifier
  },
  {
    path: '/moncompte',
    name: 'MonCompte',
    component: MonCompte,
    // children: [{
    //   path:"/moncompte/localStorage.getItem('UserId')",
    //   component: Compte,
    //   name:'Compte'
    // }]
  },
  {
    path: '/compteadmin',
    name: 'CompteAdmin',
    component: CompteAdmin
  },
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
