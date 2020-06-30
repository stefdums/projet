<template>
    <section>
        <h1>THE WALL</h1>
        <article class="message" v-for="message in messages" :key="message.id">
      
            <header> 
                <p class= "photo-profil"> {{ message.photoProfil }}</p>
                <p class= "user"> {{ message.User.nom }} {{ message.User.prenom }}</p>
                <p class= "date"> {{ message.createdAt }}</p>
            </header>

            <main>
                <a class="link-message"  :href='"mur/"+ message.id' :id='message.id'>
                    <h1 class="titre" > {{ message.titreImage }}</h1>
                    <img class= "url" v-bind:src="message.imageUrl" :alt= 'message.titreImage' >
                </a>
            </main>

            <p class= "nbCommentaire">nombre de commentaires: {{ message.nbCommentaires}}</p>  
            <button><a :href='"mur.html?id="+ message.id'>&#128172;</a></button> 
            <button> &#10060; </button> 

        </article>
    </section>
</template>

<script>
import { mapState } from 'vuex'

export default {
    name: 'Mur',
    mounted(){
       this.$store.dispatch('getAllMessages')
       
    },
    computed: {
    ...mapState ([ 
        'messages'
       ])
    },
    methods: {
        getMessage(){
            this.$store.dispatch('getMessage')
        }    
    }

}
</script>
<style  scoped>
div.message {
    border: 1rem solid;
}
</style>