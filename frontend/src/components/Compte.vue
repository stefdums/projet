<template>
    <div class="card" style="width: 18rem;">
        <b-card :id="user.id">
            <h5 class="card-title">{{ user.nom }} {{ user.prenom }}</h5>
            <h6 class="card-subtitle mb-2 text-muted" v-if="user.isAdmin == 1">est administrateur</h6>
            
            <b-card-text id="email"> {{ user.email }}</b-card-text>
            <b-card-text id="date">date de création: {{ ((user.createdAt).split('T'))[0] }}</b-card-text>
            <p>{{ user.photoProfil }}</p>
   
               
                
                
            <b-button @click.prevent="deleteCompte(user)" class="btn border-danger bg-white"> &#10060; </b-button>
        </b-card>
    </div>
</template>
<script>

import axios from 'axios'
import { mapActions } from 'vuex'

export default {
    name: "Compte",

    data(){
        return {
            user: this.user,
        }
    },
    beforeMount(){
        this.getOneCompte()        
    },
    methods: {

        ...mapActions(['deleteCompte']),
        getOneCompte(){

            axios
                .get(`http://localhost:3000/groupomania/auth/inscription/${localStorage.getItem('UserId')}` , {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
            })
            .then (response => {  
                this.user = response.data     
            })
            .catch ( error => { 
                error;
                this.$router.push({name: 'Connexion'}) })  
        },
        
          
    }    
}
</script>