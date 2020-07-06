<template>
    <div class="post-commentaire">
        <form id='form-comm'>
            <label> Ecrire un commentaire : </label><br>
            <textarea v-model="texte" id="texte" name="texte"></textarea>
            <br>
            <label for="image-comm"> Mettre le lien de l'image </label>
            <input type="url" name="image"  id="image-comm" data-valid = "false" >
            <img style="max-height: 100px;display:block;margin-top:10px"> 
            
            <button id="envoi-comm" @click.prevent="postCommentaire({messageid, texte })" value="validation"> envoyer </button>
        </form>
        

    </div>
</template>
<script>
import { mapActions } from 'vuex'
export default {
    name: 'PostCommentaire',
    data(){
        return {
            messageid: this.$route.params.id
        }
    },
    methods: {        
        ...mapActions(['postCommentaire'])
    }
} 

</script>