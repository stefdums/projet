<template>
    <div> 
        <b-card>
            <b-form>
                <h4>Modifiez votre commentaire</h4>
                <p>{{ this.commentaire.id }} test</p>
                <p>{{ this.$route.params.commid }} test1</p>
                <label for="texte">Nouveau commentaire : </label>
                <b-form-input type="text" name="texte" id="texte" v-model="commentaire.texte" :placeholder="commentaire.texte">{{this.commentaireTexte}}</b-form-input>
                
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
import axios from 'axios'
export default {
   
    beforeMounted(){

    //    this.getCommById()
       
    },
    beforeCreate(){
        console.log(this.$store.state)
        this.getCommById()
    },
    computed:{
       ...mapState(['commentaire'])
    },
    data(){
        return {
            messageid:  this.$route.params.id,
            commid: this.$route.params.commid,
        //    message_id: this.commentaire.MessageId,
        //    comm_id: this.commentaire.id,  
        //    message_id: this.$store.state.commentaire.MessageId,
        //    commentaire: this.commentaire
             commentaireTexte: this.commentaire.texte   
                
            //     texte: this.$store.state.commentaire.texte,
            //     imageComm: this.$store.state.commentaire.imageComm,
            // }
        }
    },
    methods: {
        
        ...mapActions(['modifyComm']),
        getCommById(){
            console.log('tete')
            axios
                .get(`http://localhost:3000/groupomania/messages/${this.$route.params.id}/comm/${this.$route.params.commid}` , {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
                })
                .then( response => { 
                console.log(response.data)
                let commentaire = response.data 
                let commentaireTexte = commentaire.texte
                       
              //  commit('GET_COMM_ID', commentaire)
                console.log(commentaire.texte)
                console.log(commentaireTexte)
                })
                .catch( error => { error })
            
        },
        annuler(){
            
            location.reload()
        },
    
    } 
}
</script>