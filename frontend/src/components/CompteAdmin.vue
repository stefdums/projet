<template>
    <div class="card" style="width: 18rem;">
        <b-card v-for="user in users" :key="user.id" :id="user.id">
            <router-link :to="{ name: 'MessUser', params:{ userid: user.id }}"> <h5 class="card-title">{{ user.nom }} {{ user.prenom }}</h5> </router-link>
            
            <h6 class="card-subtitle mb-2 text-muted" v-if="user.isAdmin == 1">est administrateur</h6>
            
            <div class='div-photo-profil'>
                <img :src="user.photoProfil" class="photo-profil">
            </div>
            <b-card-text id="email"> {{ user.email }}</b-card-text>
            <b-card-text id="date">date de création: {{ ((user.createdAt).split('T'))[0] }}</b-card-text>
            <b-card-text id="id">id:  {{ user.id }}</b-card-text>     
               
                
                
            <b-button @click.prevent="deleteCompteAdmin(user)" class="btn border-danger bg-white"> &#10060; </b-button>
        </b-card>
    </div>
</template>
<script>
//import axios from 'axios'
import { mapState ,mapActions } from 'vuex'
export default {


    props: ["user.id"],
    data(){
        return {
      //      isAdmin: user.isAdmin
        }
    },
    beforeMount(){
        
        this.getAllComptes()    
    },


    computed:{
        ...mapState(['users', 'user'])
    },
    methods: {

        ...mapActions(['getAllComptes','deleteCompteAdmin']),
    
            
    
    }  
}
</script>
<style lang="scss" scoped>
.card-boby{
    display: flex;
    align-items: center;
    
}
.div-photo-profil{
    margin-bottom: 10px;
    display: flex;
    overflow: hidden;
    align-items: center !important;
    justify-content: center !important;
    flex-shrink: 0;
    user-select: none;
    border-radius: 50%;
    width: 80px;
    height: 80px;
    margin-left: auto;
    margin-right: auto;
    
}
.photo-profil{
    width: 100%;
    height: 100%;
    object-fit: cover;
    text-align: center;
}
</style>