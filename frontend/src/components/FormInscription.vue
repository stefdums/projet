<template>
    
    <b-form method="" class="">
        <h2> INSCRIPTION </h2>

        <b-form-group class="form-group" 
            id="input-group-nom"
            label="Nom"
            label-for="nom">

            <b-form-input type="text" name="nom" id="nom" v-model="nom"  :state="validationNom"></b-form-input>

            <b-form-invalid-feedback :state="validationNom">
                Nom non conforme
            </b-form-invalid-feedback>

            <b-form-valid-feedback :state="validationNom">
                Nom valide
            </b-form-valid-feedback>

        </b-form-group >

        <b-form-group class="form-group" 
                id="input-group-prenom"
                label="Prenom"
                label-for="prenom">

            <b-form-input type="text" name="prenom" id="prenom" v-model="prenom" fromcontrolname="prenom" :state="validationPrenom"></b-form-input>

            <b-form-invalid-feedback :state="validationPrenom">
                    Prenom non conforme
            </b-form-invalid-feedback>

            <b-form-valid-feedback :state="validationPrenom">
                    Prenom valide
            </b-form-valid-feedback>
        </b-form-group>

        <b-form-group class="form-group"
            id="input-group-prenom"
            label="photo-profil"
            label-for="photo-profil">

            <b-form-input type="text" name="photo-profil" id="photo-profil" ></b-form-input>
            
        </b-form-group>

        <b-form-group class="form-group"
            id="input-group-email"
            label="Email"
            label-for="email">

            <b-form-input type="email" name="email" id="email" v-model="email"></b-form-input>
            
        </b-form-group>

        <b-form-group class="form-group"
            id="input-group-password"
            label="Mot de passe"
            label-for="password">

            <b-form-input type="password" name="password" id="password" v-model="password" :state="validationPassword"></b-form-input>
            <b-form-invalid-feedback :state="validationPassword">
                    Mot de passe valide non conforme
            </b-form-invalid-feedback>

            <b-form-valid-feedback :state="validationPassword">
                    Mot de passe non valide
            </b-form-valid-feedback>

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
            form: {
                nom: null
            },
            nom: "",
            prenom: "",
            photoProfil: "",
            email: "",
            password: "",
            
        }
    },
    methods: {
        postInscription(){
            axios
                .post('http://localhost:3000/groupomania/auth/inscription', {
                    nom: this.nom,
                    prenom: this.prenom,
                    photoProfil: this.photoProfil,
                    email: this.email,
                    password: this.password
                })
                .then(()=> {
                    
                    this.postConnexion()
                })
                .catch( error => { error })
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
                        }
                    })
                    .catch( error => { error, this.erreur = true })
        }

    },
    computed:{
        validationNom(){
            let regexText = /^[a-zA-Zéèçîï][a-zA-Zéèêçîï]+([a-zA-Zéèêçîï\-'\s]+)$/; 
            return regexText.test(this.nom)
        },    
        validationPrenom(){
            let regexText = /^[a-zA-Zéèçîï][a-zA-Zéèêçîï]+([a-zA-Zéèêçîï\-'\s]+)$/; 
            return regexText.test(this.prenom)
        }
        // validationPassword(){
        //     let regexPwd = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{10,})/;
        //     return regexPwd.test(this.password)
        // }
    }

} 
</script>
<style lang="scss" scoped>
button{
   border-color: #D1515A;   
}
  
</style>