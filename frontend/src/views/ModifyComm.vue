<template>
    <div> 
        <b-card>
            <b-form>
                <h4>Modifiez votre commentaire</h4>

                <label for="texte">Nouveau commentaire : </label>
                <b-form-input 
                    type="text" 
                    name="texte" 
                    id="texte" 
                    v-model="commentaire.texte" 
                    :placeholder="commentaire.texte"
                    >
                </b-form-input>
                
                <b-card-footer>
                    <b-button variant="success" @click="modifyComm(commentaire)">
                                Modifiez
                    </b-button>
                    
                        
                <router-link :to="{name: 'LeMessage'}">        
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

    beforeMount(){
        let commid = this.$route.params.commid;
        let messageid = this.$route.params.id

        this.getCommById( { commid, messageid })
        console.log(this.$route.params.id)
    },
    computed:{
       ...mapState(['commentaire'])
    },
    data(){
        return {
            messageId: this.$route.params.id,
            commId: this.$route.params.commid,
            commentaire: this.commentaire,
            commentaireTexte: this.commentaire.texte   

        }
    },
    methods: {
        
        ...mapActions(['modifyComm', 'getCommById']),
        annuler(){
            
            location.reload()
        },
    
    } 
}
</script>