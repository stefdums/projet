<template>
    
    <b-form method="" class="">
        <h2> INSCRIPTION </h2>

        <b-form-group class="form-group" 
            id="input-group-nom"
            label="Nom"
            label-for="nom">

            <b-form-input type="text" name="nom" id="nom" v-model="nom"  :state="validationNom"></b-form-input>

            <b-form-invalid-feedback class="input-info" :state="validationNom">
                Nom non conforme
            </b-form-invalid-feedback>

            <b-form-valid-feedback class="input-info" :state="validationNom">
                Nom valide
            </b-form-valid-feedback>

        </b-form-group >

        <b-form-group class="form-group" 
                id="input-group-prenom"
                label="Prenom"
                label-for="prenom">

            <b-form-input type="text" name="prenom" id="prenom" v-model="prenom" fromcontrolname="prenom" :state="validationPrenom"></b-form-input>

            <b-form-invalid-feedback class="input-info" :state="validationPrenom">
                    Prenom non conforme
            </b-form-invalid-feedback>

            <b-form-valid-feedback class="input-info" :state="validationPrenom">
                    Prenom valide
            </b-form-valid-feedback>
        </b-form-group>

        <b-form-group class="form-group"
            id="input-group-file"
            label="photo de profil"
            label-for="photoProfil"           
            >

            <b-form-file 
                type="file" 
                placeholder = "placez votre photo de profil" 
                ref='file'
                v-model='photoProfil'
                @change="handleFileUpload">
            </b-form-file>
            
        </b-form-group>

        <b-form-group class="form-group"
            id="input-group-email"
            label="Email"
            label-for="email"
            prepend="@">

            <b-form-input  type="email" name="email" id="email" v-model="email"></b-form-input>
            
        </b-form-group>

        <b-form-group class="form-group"
            id="input-group-password"
            label="Mot de passe"
            label-for="password">

            <b-form-input type="password" name="password" id="password" v-model="password" :state="validationPassword"></b-form-input>
            <b-form-invalid-feedback class="input-info"
            >
                Mot de passe valide non conforme
            </b-form-invalid-feedback>

            <b-form-valid-feedback class="input-info"          
            >
                Mot de passe valide
            </b-form-valid-feedback>

            <b-form-text id="password-help-block">
                Votre mot de passe doit contenir: 1 minuscule, 1 majuscule, 1 caractere numerique, et contenir au minimum 10 caracteres 
            </b-form-text>
        </b-form-group>

        <b-button id="bouton-valid" value="validation" @click.prevent="postInscription()" class="btn-light bg-light">
            Validez l'incription
        </b-button>
    </b-form>
    
</template>

<script>
import axios from 'axios'
export default {

    name: 'FormInscription',
    data(){
        return {
            
            nom: "",
            prenom: "",
            photoProfil: null,
            email: "",
            password: "",    
        }
    },
    methods: {
        handleFileUpload(){
            this.photoProfil = this.$refs.file.$refs.input.files[0]
           
        },
        postConnexion (){
            axios
                .post('http://localhost:3000/groupomania/auth/connexion', {
                    email: this.email,
                    password: this.password,
                })
                .then((response)=> {   
                    if (response.status === 200){
                        let results = response.data
                        localStorage.setItem('token', results.token)
                        localStorage.setItem('UserId', results.UserId)
                        localStorage.setItem('isAdmin', results.isAdmin)
                        this.$router.push('/')
                        location.reload()
                    }
                })
                .catch( error => { error, this.erreur = true })
        },
        postInscription(){
      
            let formData = new FormData();
            formData.append('nom', this.nom)
            formData.append('prenom', this.prenom)
            formData.append('image', this.photoProfil)
            formData.append('email', this.email)
            formData.append('password', this.password)

            axios
                .post('http://localhost:3000/groupomania/auth/inscription', 

                    formData,

                     {
                         headers: {'Content-Type': 
                         'multipart/form-data',
                        }
                    }                
                )
                .then(()=> {  
                    this.postConnexion()    
                })
                .catch( error => { error })       
        },
    },
    computed:{
        validationNom(){
            let regexText = /^[a-zA-Zéèçîï][a-zA-Zéèêçîï]+([a-zA-Zéèêçîï\-'\s]+)$/; 
            return regexText.test(this.nom)
        },    
        validationPrenom(){
            let regexText = /^[a-zA-Zéèçîï][a-zA-Zéèêçîï]+([a-zA-Zéèêçîï\-'\s]+)$/; 
            return regexText.test(this.prenom)
        },
        validationPassword(){
            
            let regexPwd = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{10,})/; 
            return regexPwd.test(this.password)
        },
    }
} 
</script>
<style lang="scss" scoped>
button{
   border-color: #D1515A;   
}
.input-info{

    font-size: 1.25em;
    background-size: auto ;
    background-color: white;
    border-radius: 25px;
}
  
</style>