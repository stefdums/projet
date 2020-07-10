<template>
    <div class="commentaires" >

        <div class='commentaire' v-for="commentaire in commentaires" :key="commentaire.id" :userId="commentaire.userId"> 
            <b-card 
                :title='commentaire.User.nom + " " + commentaire.User.prenom'
                :img-src="commentaire.imageComm"
                :img-alt="commentaire.texte" >
                <b-card-text>
                    <div id="text">{{ commentaire.texte }}</div>
                    
                        <p id= "date"> {{ ((commentaire.createdAt).split('T'))[0] }}  {{ ((((commentaire.createdAt).split('T'))[1]).split('.'))[0] }}</p>
                        
                    
                </b-card-text>
                <b-card-footer>               
                    <router-link :to="{name: 'ModifyComm', params: { UserId: commentaire.UserId}}" v-if="userid == commentaire.UserId"> 
                        <b-button  class="btn-light border border-info bg-white" > &#9998; </b-button>
                    </router-link>
                    <b-button @click.prevent="deleteCommentaire({commentaire, messageid})" class="border border-danger bg-white" v-if="isAdmin == 1 || userid == commentaire.UserId"> &#10060; </b-button>
    
                </b-card-footer>     
            </b-card>          
         
        </div>
             
    </div>
</template>
<script>

import axios from 'axios'
import { mapActions } from 'vuex'
export default {
    name: 'GetCommentaires',
    data() {
        return {
            messageid: this.$route.params.id,
            commentaires: [],
            commentaireid: this.id,
            userid: localStorage.getItem('UserId'),
            isAdmin: localStorage.getItem('isAdmin'),
  
 
        }
    },
    beforeMount() {
        this.getAllComms()
    },
    created(){
        console.log(this.$store)
    },
    methods: {
        getAllComms (){
            axios
            .get(`http://localhost:3000/groupomania/messages/${this.messageid}/comm` , {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then (response => { (console.log(this.commentaires));
                    this.commentaires = response.data
            })
            .catch ( error => { error })
        },
        ...mapActions(['deleteCommentaire', 'modifyComm'])
    },
    comptuted:{
 
    }
        
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



