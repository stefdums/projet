<template>
    <div>
        <article>
            <div class="compte"  v-for="user in users" :key="user.id" :id="user.id">
                <h2>  Compte  </h2>
                <p> {{ user.nom }}</p>
                <p> {{ user.prenom }}</p>
                <p> {{ user.email }}</p>
                <p> {{ user.createdAt }}</p>
                <p> {{ user.isAdmin }} </p>
                <p> {{ user.id }} </p>

                <button @click.prevent="deleteCompte(user)"> &#10060; </button>
            </div>    
        </article>
    </div>
</template>
<script>
//import axios from 'axios'
import { mapState ,mapActions } from 'vuex'
export default {


    props: ["user.id"],
    data(){
        return {
  //          users: [],
            // isAdmin: localStorage.getItem('isAdmin'),
            // id: this.user.id
   //         id: this.user.id,
            
        }
    },
    beforeMount(){
        
        this.getAllComptes() 
        console.log(this.$store.state.users)      
    },

//test
    computed:{
        ...mapState(['users', 'user'])
    },
    methods: {

        ...mapActions(['getAllComptes','deleteCompte']),
    
            
    
    }  
}
</script>