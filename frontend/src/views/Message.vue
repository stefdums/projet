<template>
    <article class="message">
            <p>TEST</p>
            <header> 
                <p class= "photo-profil"> {{ message.photoProfil }}</p>
                <p class= "user"> {{ message.User.nom }} {{ message.User.prenom }}</p>
                <p class= "date"> {{ message.createdAt }}</p>
            </header>

            <main>
                <a class="link-message" :href='"mur"+ message.id' :id='message.id'  @click="getMessage()">
                    <h1 class="titre"> {{ message.titreImage }}</h1>
                    <img class= "url" v-bind:src="message.imageUrl" :alt= 'message.titreImage' >
                </a>
            </main>

            <p class= "nbCommentaire">nombre de commentaires: {{ message.nbCommentaires}}</p>  
            
            <button> &#10060; </button> 
                 
        </article>

</template>
<script>
//import {  mapState } from 'vuex'

export default {
    name: 'Message',
    props: ["id"],
    mounted(){
        this.$store.dispatch('getMessage', this.id)
    },
    computed:{
        message(){
            return this.$store.state.message
        }
    },
    // methods: {
    //     getMessage(){
    //         this.$store.dispatch('getMessage')
    //     }    
    // }
}
</script>

