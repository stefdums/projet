<template>
    <div class="card" style="width: 18rem;">
        <b-card :id="user.id">
            <h5 class="card-title">{{ user.nom }} {{ user.prenom }}</h5>
            <h6 class="card-subtitle mb-2 text-muted" v-if="user.isAdmin == 1">est administrateur</h6>

            <div id='div-photo-profil'>

                <b-card-img :src="user.photoProfil" id="photo-profil"/>
            </div>    
            <b-card-text id="email"> {{ user.email }}</b-card-text>
            <b-card-text id="date">date de création: {{ ((user.createdAt).split('T'))[0] }}</b-card-text>
            
  
            <b-button @click.prevent="deleteCompte(user)" class="btn border-danger bg-white"> &#10060; </b-button>
        </b-card>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
    name: "Compte",

    data(){
        return {

        }
    },
    beforeMount(){
        this.getOneCompte()        
    },
    computed:{
        ...mapState(['user'])
    },
    methods: {

        ...mapActions(['deleteCompte', 'getOneCompte']),      
    }    
}
</script>
<style lang="scss" scoped>
.mon-compte{
    display:flex;
    flex-direction: column;

}
#div-photo-profil{
display: flex;
overflow: hidden;
align-items: center;
flex-shrink: 0;
user-select: none;
border-radius: 50%;
justify-content: center;
width: 70px;
height: 70px;
margin-bottom: 10px;
}
#photo-profil{
    width: 100%;
    height: 100%;
    object-fit: cover;
    text-align: center;
}
</style>