<template>
    <div>
        <h1>Test</h1>  
    <b-card>
        <b-form>
            <h4>Modifiez votre commentaire</h4>
            <label for="texte">Nouveau commentaire : </label>
            <b-form-input type="text" name="texte" id="texte" v-model="commentaire.texte" ></b-form-input>
            
            <label for="imagecomm"> Mettre le nouveau lien de l'image </label>
            <b-form-input type="url" name="imagecomm" id="imagecomm" v-model="commentaire.imageComm" ></b-form-input>
                
            <p>{{ commentaire.UserId }}</p>
        <b-card-footer>
            <b-button variant="success" @click="modifyComm({ commentaire, messageid, UserId })">
                        Modifiez
            </b-button>
            <router-link :to="{name: 'Mur'}">
              <b-button > Annuler </b-button>
            </router-link>

        </b-card-footer>
        </b-form>
    </b-card>
    <router-view></router-view>  
  </div> 
</template>
<script>
import { mapActions } from 'vuex'
export default {
   created(){
        console.log(this.commentaire.UserId)
    }, 
    data(){
        return {
            messageid:  this.$route.params.id,
            UserId: this.$store.state.commentaire.UserId,
            commentaire:{
                texte: this.$store.state.commentaire.texte,
                image: this.$store.state.commentaire.texte,
            }
        }
    },
    methods: {
        ...mapActions(['modifyComm'])
    
    } 
}
</script>