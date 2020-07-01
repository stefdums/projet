<template>
    <div>
        <header> 
                <p class= "photo-profil"> {{ message.photoProfil }}</p>
                <p class= "user"> {{ message.User.nom }} {{ message.User.prenom }}</p>
                <p class= "date"> {{ message.createdAt }}</p>
        </header>
        <main class="link-message"> 
                <h2 class='titre-image'>{{ message.titreImage }}</h2>
                <img class= "url-image" :src="message.imageUrl" :alt= 'message.titreImage'>
        </main>
            <p class= "nbCommentaire">nombre de commentaires: {{ message.nbCommentaires}}</p>   
            <button> &#10060; </button> 
        <all-commentaires/>
    </div>
</template>
<script>
import AllCommentaires from "../components/AllCommentaires.vue"

export default {
    props: ["id"],
    mounted (){
        this.$store.dispatch('getMessage', this.id)
    },
    components: {
        AllCommentaires
    },
    computed: {
        message(){
            return this.$store.state.message;
        }

    }
}
</script>

