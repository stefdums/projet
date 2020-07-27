<template>
    <div class="post-message">
        <form method="" id="form" name="form" target="_self">
        
            <b-form-group class="form-group"
                id="input-group-titre"
                label="titre: "
                label-for="titre"
            >    
                <b-form-input type="text" v-model="titreImage" name="titre" id="titre" :state="validationTitre"></b-form-input>

                <b-form-valid-feedback :state="validationTitre">
                    titre ok
                </b-form-valid-feedback>

                <b-form-invalid-feedback :state="validationTitre">
                    titre obligatoire
                </b-form-invalid-feedback>
                
            </b-form-group>

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
                <b-form-input type="url" v-model="imageUrl" name="imageurl" id="image" ></b-form-input>
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
                label="image à upload"
                label-for="imageUrl"           
            >

                <b-form-file 
                    type="file" 
                    placeholder = "placez votre image " 
                    ref='file' 
                    name="imageurl"
                    v-model='imageUrl'
                    @change="handleFileUpload"
                    :state="validationImage"
                ></b-form-file>

                <b-form-valid-feedback :state="validationImage">
                    image ok
                </b-form-valid-feedback>

                <b-form-invalid-feedback :state="validationImage">
                    image obligatoire
                </b-form-invalid-feedback>
            
            </b-form-group>

            

           

            <b-button id="bouton-valid" @click.prevent="postMessage({ imageUrl, titreImage })" value ="validation" class="btn btn-light bg-light">
            Envoyer </b-button>

        </form>   
    </div>
</template>
<script>

import { mapActions } from 'vuex'

export default {
    data (){
        return {
            selected: null,
            imageUrl: " ",
            titreImage: " ",
        }
    },

    methods: {
        handleFileUpload(){
            this.imageUrl = this.$refs.file.$refs.input.files[0]            
        },
        ...mapActions(['postMessage']),  
    },
    computed: {
        validationTitre(){
            return this.titreImage.length > 2
        },
        validationImageUrl(){
            let regexUrl = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/
            return  regexUrl.test(this.imageUrl)
            
        },
        validationImage(){
            return this.imageUrl != " "
        },
    }
}
</script>
<style lang="scss" scoped>
.post-message{
    width:60%;
};
button{
  border-color: #D1515A
}

</style>