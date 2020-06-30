<template>
  <div class="connexion">
    <!-- <img alt="Groupomania logo" src="../assets/icon.png" width="100%"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <!-- <router-view/> -->
    <FormConnexion/>
    <FormInscription/>

  </div>
</template>

<script>
// @ is an alias to /src
//import HelloWorld from '@/components/HelloWorld.vue'
import FormConnexion from '../components/FormConnexion.vue'
import FormInscription from '../components/FormInscription.vue'

export default {
  name: 'Connexion',
  components: {
//    HelloWorld
    FormInscription,
    FormConnexion
  }
}
</script>
