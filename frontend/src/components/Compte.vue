<template>
    <div class="comptes" >
        <article>
            <div class="compte">
                <h2>  Compte  {{ user.id }} </h2>
                <p> {{ user.nom }}</p>
                <p> {{ user.prenom }}</p>
                <p> {{ user.email }}</p>
                <p> {{ user.createdAt }}</p>
                <button @click="deleteCompte(user)"> &#10060; </button>
            </div>  
        </article>
    </div>
</template>
<script>
//v-for="user in users" :key="user.id"
import axios from 'axios'
import { mapActions } from 'vuex'

export default {
    name: "Compte",
 //   props: [ 'user' ],
    data(){
        return {
            user: this.user,
        }
    },
    beforeMount(){
        this.getOneCompte()        
    },
    methods:{
        getOneCompte(){
   //         console.log(localStorage.getItem('UserId'))
            axios
                .get(`http://localhost:3000/groupomania/auth/inscription/${localStorage.getItem('UserId')}` , {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
            })
            .then (response => {  
                this.user = response.data 
                console.log(this.user.id)      
            })
            .catch ( error => { error })  
        },
        ...mapActions['deleteCompte']
        // deleteCompte(){
        //         if( localStorage.getItem('UserId') != this.user.id ){
        //             alert("vous ne pouvez pas faire ça")
        //         }
        //         else {
        //             if(window.confirm('Voulez-vous supprimer votre compte')){
        //             axios
        //                 .delete(`http://localhost:3000/groupomania/auth/inscription/${localStorage.getItem('UserId')}`, {
        //                     headers: {
        //                         Authorization: `Bearer ${localStorage.getItem('token')}`
        //                     }
        //                 })
        //                 .then(()=> {localStorage.clear()})
        //                 .then(()=>{ window.alert('compte supprimé')})
        //                 .then(()=> { this.$router.push('/Connexion') })
        //                 .catch(( error )=> { error })
        //             }      
        //         } 
        // }    
           
        
    }    
}
</script>