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
                required
                :state="validationTexte"
            >
                
            
            </b-form-textarea>

            <b-form-valid-feedback :state="validationTexte">
                texte ok
            </b-form-valid-feedback>

            <b-form-invalid-feedback blur:state="validationTexte">
                texte obligatoire
            </b-form-invalid-feedback>

            <b-form-group label="type d'envoi">
                <b-form-radio v-model="selected" id="url" name="image-upload" value="url">Lien de l'image</b-form-radio>
                <b-form-radio v-model="selected" id="upload" name="image-upload" value="upload">image à upload</b-form-radio>
            </b-form-group>

            <b-form-group class="form-group"
                id="input-group-url"
                label="lien de l'image: "
                label-for="imageurl"
                v-show="selected === 'url'"               
            >
                <b-form-input 
                    type="url" 
                    v-model="imageComm" 
                    name="imageurl" 
                    id="image" 
                    :state="validationImageUrl"
                >
                </b-form-input>
                <b-form-valid-feedback :state="validationImageUrl">
                    lien ok
                </b-form-valid-feedback>

                <b-form-invalid-feedback :state="validationImageUrl">
                    Le lien n'est pas conforme
                </b-form-invalid-feedback>
            </b-form-group>

            <b-form-group class="form-group"
                v-show="selected === 'upload'"
                id="input-group-file"
                label= "image à upload"
                label-for="imageComm"
                
            >

                <b-form-file 
                    type="file" 
                    placeholder= "placez votre image " 
                    ref='file' 
                    name="imageurl"
                    v-model='imageComm'
                    @change="handleFileUpload"
                    :state="validationImage"
                >
                </b-form-file>
                <b-form-valid-feedback :state="validationImage">
                    image ok
                </b-form-valid-feedback>

                <b-form-invalid-feedback :state="validationImage">
                    image non valide
                </b-form-invalid-feedback>
                
            </b-form-group>

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
            messageid: this.$route.params.id,
            selected: null,
            texte: " ",
            imageComm: " ",
        
        }
    },

    methods: { 
        handleFileUpload(){
            this.imageComm = this.$refs.file.$refs.input.files[0]
        },   
        ...mapActions(['postCommentaire'])
    },
    computed:{
        validationTexte(){
            
            return this.texte.length > 2
        },
        validationImageUrl(){
            let regexUrl = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/
            return  regexUrl.test(this.imageComm)
            
        },
        validationImage(){
            let regexUpload = /\.(jpe?g|png|gif|webp)$/i
            return regexUpload.test(this.imageComm.name) 
        },
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
.form-group{
    border: white 5px solid;
    border-radius: 25px;
};
#envoi-comm{
    margin-top: 10px;

}
    
</style>