<template>
  <div id="app">
    <b-navbar id="nav" toggleable="sm" type="light" variant="faded" sticky >
      <router-link to="/connexion" v-show="UserId === null">Connexion</router-link>  
      <div v-show="UserId !== null" id="nav-flex">
        <div class="test">

          <b-navbar-brand><router-link to="/">
          <img src="../src/assets/icon.png" >
            Home  </router-link></b-navbar-brand>

          <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
        </div>
        <b-collapse id="nav-collapse" is-nav>
          
            <b-nav-item><router-link to="/poster">Poster</router-link></b-nav-item>

            <b-nav-item><router-link to="/moncompte">Mon compte</router-link></b-nav-item>

            <!-- <b-nav-item><router-link :to="{ name: 'MessUser'}"> User </router-link></b-nav-item> -->

            <!-- <router-link to="/moncompte" v-show="isAdmin ==0 " >Mon compte</router-link>
            <router-link to="/compteadmin" v-show="isAdmin ==1 "> Admin </router-link> | -->
            <b-nav-item><router-link to="/connexion" @click.native="deconnection()">Se déconnecter </router-link></b-nav-item>
            <p>{{ this.$store.state.user.photoProfil }}</p>
        </b-collapse> 
      </div>

    </b-navbar>
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
  created(){
    console.log(this)
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
  background-color: #ffd7d7;
  width: 100%;
  justify-content: center;
  
  #nav-flex{
    width: 100%;
    // display:flex;
    // justify-content: center;
  }
  .navbar-brand{
    flex-basis: min-width;
  }
  img{
    width:40px;
    border: 3px solid #D1515A;
    border-radius: 25px;
  }
  
  .test{
    width:100%;
    display: flex;
    justify-content: space-between;
  }
  #nav-collapse{
    flex-basis: 200% !important;
  }
  a {
    font-weight: bold;
    color: #091F43;

    &.router-link-exact-active {
      color: #D1515A;
    }
  }
  li{
    list-style: none;
  }
}
@media (min-width: 576px){
  #nav-flex{
    display: flex;
    flex-direction: row;
    justify-content: center;
  }
}

</style>

#D1515A rouge
#091F43 bleu (police)
#ffd7d7 rouge clair
#a8a6a6 gris