<template>
    <div class="commentaires" >
        <div class='commentaire' v-for="commentaire in commentaires" :key="commentaire.id" :userId="commentaire.userId"> 
            <b-card 
                :title='commentaire.User.nom + " " + commentaire.User.prenom'
                :img-src="commentaire.imageComm"
                :img-alt="commentaire.texte" >
                <b-card-text>
                    <div id="text">{{ commentaire.texte }}</div>
                    
                        <p id= "date"> {{ ((commentaire.createdAt).split('T'))[0] }} / {{ ((((commentaire.createdAt).split('T'))[1]).split('.'))[0] }}</p>
                        
                    
                </b-card-text>
                <b-card-footer>               
                    <router-link :to="{ name:`ModifyComm`, params: { commid: commentaire.id, messageid: commentaire.MessageId}}" v-if="userid == commentaire.UserId" > 
                        <b-button  class="btn-light border border-info bg-white" @click=" modify = true" name="bouton valider"> &#9998;</b-button>
                    </router-link>


                    <b-button @click.prevent="deleteCommentaire({commentaire, messageid})" class="border border-danger bg-white" v-if="isAdmin == 1 || userid == commentaire.UserId" name="bouton annuler"> &#10060; </b-button>
    
                </b-card-footer>
                <router-view class="ModifyComm" v-if="$router.currentRoute.params.commid == commentaire.id"/>     
            <!-- <ModifyComm v-show="modify"/> -->
            
            </b-card>          
            
            
        </div>
             
    </div>
</template>
<script>

import { mapActions, mapState } from 'vuex'

export default {
    name: 'GetCommentaires',
    props:['id'],
    data() {
        return {
            messageid: this.$route.params.id,
            userid: localStorage.getItem('UserId'),
            isAdmin: localStorage.getItem('isAdmin'),
            modify: false,
  
 
        }
    },
    beforeMount() {
        this.getAllComms(this.$route.params.id)
    },
    created(){
        console.log()
    },
    computed:{
        ...mapState(['commentaires', 'commentaire']),

    },
    methods: {
       
        ...mapActions(['getAllComms', 'deleteCommentaire', 'modifyComm', 'getCommById'])
    },

        
}
</script>
<style lang="scss" scoped>
.commentaire{
    margin-bottom: 10px; 

};
.card-title{
    font-size: 1rem
}
.card-footer{
    display: flex;
    justify-content: space-around;
    padding-bottom: 0px;

}
button{
    font-size: bold;
}
</style>



