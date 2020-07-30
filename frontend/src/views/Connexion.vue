<template>
  <div class="connexion">
    <FormConnexion class="form-connexion"/>
    <FormInscription class="form-inscription"/>

  </div>
</template>

<script>
// @ is an alias to /src

import FormConnexion from '../components/FormConnexion.vue'
import FormInscription from '../components/FormInscription.vue'

export default {
  name: 'Connexion',
  components: {

    FormInscription,
    FormConnexion
  }
}
</script>
<style lang="scss" scoped>
.connexion{
  width:60%;
  display: flex;
  flex-direction: column;
 
}
form {
  margin-bottom: 40px;
}

   
@media (max-width: 576px) { 
  .connexion{
    width: 100%
}  
}

</style>