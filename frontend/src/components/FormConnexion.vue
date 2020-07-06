<template>
   <form class="connexion-form">
        <h2> CONNEXION </h2>
        <div class="form-group">
            <label for="email">Email</label>
            <input type="email" @focus="erreur = false" v-model="email" class="form-control" id="email" formControlName="email">
        </div>
        <div class="form-group">
            <label for="password">Password</label>
            <input type="password" @focus="erreur = false" v-model="password" class="form-control" id="password" formControlName="password">
        </div>
        <p v-if="erreur"> Mot de passe ou email incorrect </p>
        <button class="ConnexionForm.invalid" @click.prevent="postConnexion()">Connexion</button>    
    </form> 
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
                        
                    })
                    .catch( error => { error, this.erreur = true })
            }
        }
}
</script>
<style scoped>
    form {
            margin: 2em auto;
            max-width: 750px;
        }

</style>
