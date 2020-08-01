<template>
   <b-form class="">
       
        <h2> CONNEXION </h2>

        <b-form-group>
            <label for="email">Email</label>
            <b-form-input type="email" @focus="erreur = false" v-model="email" class="form-control" id="email" formControlName="email"></b-form-input>
        </b-form-group>

        <div class="form-group">
            <label for="password">Password</label>
            <b-form-input type="password" @focus="erreur = false" v-model="password" class="form-control" id="password" formControlName="password"></b-form-input>
        </div>

        <p v-if="erreur"> Mot de passe ou email incorrect </p>

        <b-button class="ConnexionForm.invalid btn-light bg-light" @click.prevent="postConnexion()" >Connexion</b-button>

    </b-form> 
</template>
<script>
import axios from 'axios'
export default {
        data(){
            return {
                email: this.email,
                password: this.password,
                erreur: false,
            }
        },
        methods: {
            postConnexion (){
                axios
                    .post('http://localhost:3000/groupomania/auth/connexion', {
                        email: this.email,
                        password: this.password,
                    })
                    .then((response)=> {   
                        
                            let results = response.data
                            localStorage.setItem('token', results.token)
                            localStorage.setItem('UserId', results.UserId)
                            localStorage.setItem('isAdmin', results.isAdmin)
                            this.$router.push('/')
                            location.reload()
                        
                    })
                    .catch( error => { error, this.erreur = true })
            }
        }
}
</script>
<style lang="scss" scoped>
button{
  border-color: #D1515A
}
  

</style>
