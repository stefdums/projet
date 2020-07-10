<template>
  <div id="app">
    <div id="nav">
      <router-link to="/connexion">Connexion</router-link> | 
      <router-link to="/">Home</router-link> |
      <router-link to="/poster">Poster</router-link> |
      <router-link to="/moncompte">Mon compte</router-link> |
      <!-- <router-link to="/moncompte" v-show="isAdmin ==0 " >Mon compte</router-link>
      <router-link to="/compteadmin" v-show="isAdmin ==1 "> Admin </router-link> | -->
      <router-link to="/connexion" @click.native="deconnection()">Se déconnecter </router-link>
       <p> {{ this.UserId }}</p>

    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  data(){
    return{
       UserId: localStorage.getItem('UserId'),

    }
  },
  methods: {
    deconnection(){
      console.log('test')
      if(window.confirm('Voulez-vous vous déconnecter?')){
        localStorage.clear()
        location.reload()
      }
      else{
        
        this.$router.push('/Home')
        
      }
    }  
  }
}
</script>

<style lang="scss">
body{
  
  background:  #ffd7d7 !important;
}
#app {
  font-family: Typold Book, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #091F43;
  background-color: #ffd7d7;
  display: flex;
  flex-direction: column;
  align-items: center;
  
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #091F43;

    &.router-link-exact-active {
      color: #D1515A;
    }
  }
}

</style>

#D1515A rouge
#091F43 bleu (police)
#ffd7d7 rouge clair
#a8a6a6 gris