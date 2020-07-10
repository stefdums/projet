<template>
  <div>
    <b-card>
        <b-form>
            <h4>Modifiez votre message</h4>
            <label for="titre">Nouveau titre : </label>
            <b-form-input type="text" name="titre" id="titre" v-model="message.titreImage" ></b-form-input>
            
            <label for="image"> Mettre le nouveau lien de l'image </label>
            <b-form-input type="url" name="imageurl" id="image" v-model="message.imageUrl" ></b-form-input>
                
            
        <b-card-footer>
            <b-button variant="success" @click="modifyMessage({ message, messageid, UserId })">
                        Modifiez
            </b-button>
            <router-link :to="{name: 'Mur'}">
              <b-button > Annuler </b-button>
            </router-link>
        </b-card-footer>
        </b-form>
    </b-card>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
  export default {
    props: ["id"],
    created(){
        console.log(this.$store.state.message.UserId)
    },  
    data() {
      return {
        messageid: this.$route.params.id,
        userid: localStorage.getItem('UserId'),
        isAdmin: localStorage.getItem("isAdmin"),
        UserId: this.$store.state.message.UserId,

        message: {
          titreImage: this.$store.state.message.titreImage,
          imageUrl: this.$store.state.message.imageUrl,
        },
      }
    },
    methods: {
        ...mapActions(['modifyMessage']),
        close(){
          return 
        }

    
    }
  }
</script>