<template>
    <div> 
        <b-card>
            <b-form>
                <h4>Modifiez votre commentaire</h4>
                <label for="texte">Nouveau commentaire : </label>
                <b-form-input type="text" name="texte" id="texte" v-model="commentaire.texte" :placeholder="commentaire.texte"></b-form-input>
                
                <label for="imagecomm"> Mettre le nouveau lien de l'image </label>
                <b-form-input type="url" name="imagecomm" id="imagecomm" v-model="commentaire.imageComm" ></b-form-input>
                    
                <p>{{ commentaire.UserId }}</p>
                <b-card-footer>
                    <b-button variant="success" @click="modifyComm({ commentaire, messageid, commid })">
                                Modifiez
                    </b-button>
                    
                        
                <router-link :to="{name: 'Mur'}">        
                    <b-button @click="annuler()"> Annuler </b-button>
                </router-link>    

                </b-card-footer>
            </b-form>
        </b-card>     
    </div> 
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
   created(){
        console.log(this.$store.state.commentaire)
    },
    computed:{
        ...mapState(['commentaire'])
    },
    data(){
        return {
     //       userid: this.commentaire.UserId,
            messageid:  this.$route.params.id,
            commid: this.$route.params.commid,
 //           UserId: this.commentaire.UserId,
            commentaire: this.$store.state.commentaires
            
        //     {
        //         texte: this.$store.state.commentaire.texte,
        //         imageComm: this.$store.state.commentaire.image,
        //   //      UserId: this.$store.state.commentaires.UserId,
        //         id: this.$store.state.commentaire.id,
                 
        //     },

        }
    },
    methods: {
        annuler(){

            location.reload()
        },
        ...mapActions(['modifyComm'])
    
    } 
}
</script>