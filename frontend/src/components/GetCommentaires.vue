<template>
    <div class="commentaires" >
        <div class='commentaire' v-for="commentaire in commentaires" :key="commentaire.id" :commentaire="commentaire" :messageid= "$route.params.id"> 
           <img :src="commentaire.User.photoProfil" :alt="commentaire.User.nom">
           <p> {{ commentaire.User.nom }} {{ commentaire.User.prenom }} </p> 
           <p> {{ commentaire.updatedAt }} </p>
           <p> {{ commentaire.texte }}</p>
           <div class="imageComm" v-if="commentaire.imageComm !== null">
               <img :src='commentaire.imageComm' :alt="'image de'+ commentaire.User.nom">
           </div>

        </div>
        
    </div>
</template>
<script>

import axios from 'axios'

export default {
    name: 'GetCommentaires',
    data() {
        return {
            messageid: this.$route.params.id,
            commentaires: [],
        }
    },
    beforeMount() {
        this.getAllComms()
    },
    methods: {
        getAllComms (){
            axios
            .get(`http://localhost:3000/groupomania/messages/${this.messageid}/comm`)
            .then (response => { (console.log());
                    this.commentaires = response.data

            })
            .catch ( error => { error })
        }
    },  
}
</script>
<style>
.commentaire{
    border: black solid 10px;
}
</style>