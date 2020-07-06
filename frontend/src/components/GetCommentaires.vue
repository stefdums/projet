<template>
    <div class="commentaires" >
        <div class='commentaire' v-for="commentaire in commentaires" :key="commentaire.id" :userId="commentaire.userId"> 
           <img :src="commentaire.User.photoProfil" :alt="commentaire.User.nom" id="photo-profil">
           <p id="nom-prenom"> {{ commentaire.User.nom }} {{ commentaire.User.prenom }} </p> 
           <p id="date"> {{ commentaire.createdAt }} </p>
           <p id="texte"> {{ commentaire.texte }}</p>
           <div class="imageComm" v-if="commentaire.imageComm !== null">
               <img :src='commentaire.imageComm' :alt="'image de : '+  commentaire.User.nom">
           </div>
            <button @click.prevent="deleteCommentaire({commentaire, messageid})"> &#10060; </button> <p> {{ commentaire.id }} </p>
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
  
 
        }
    },
    beforeMount() {
        this.getAllComms()
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
        ...mapActions(['deleteCommentaire'])
    },
    comptuted:{
 
    }
        
}
</script>
<style>
.commentaire{
    border: black solid 10px;
}
</style>