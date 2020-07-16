<template>
    <div class="post-commentaire">
        <form id='form-comm'>
            <label for="texte">Ecrire un commentaire :</label>
            <b-form-textarea
                id="texte"
                v-model="texte"
                name='texte'
                placeholder="Votre commentaire"
                rows="3"
                max-rows="6"
                max-width= 60%;
            ></b-form-textarea>

            <label for="imageComm">Le lien de l'image :</label>
            <b-form-input type="url" name="imageComm"  id="image-comm" placeholder="Lien de l'image" v-model="imageComm"></b-form-input>

            <b-button id="envoi-comm"  @click.prevent="postCommentaire({messageid, texte, imageComm })" value="validation" class="bg-light btn-light border-primary" > envoyer </b-button>
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
<style lang="scss" scoped>
.post-commentaire{
    margin-bottom: 10px;
    label{
        margin-top: 10px;
    };
    
}
#envoi-comm{
    margin-top: 10px;
//    border-color: #D1515A;

}
    
</style>