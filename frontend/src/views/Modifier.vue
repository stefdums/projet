<template>
    <div class="modal">
        <header> 
                <p class= "photo-profil"> {{ message.photoProfil }}</p>
                <p class= "user"> {{ message.User.nom }} {{ message.User.prenom }}</p>
                <p class= "date"> {{ message.createdAt }}</p>
        </header>
        <main class="link-message"> 
                <h2 class='titre-image'>{{ message.titreImage }}</h2>
                <img class="url-image" :src="message.imageUrl" :alt='message.titreImage'>
        </main>
            <p class= "nbCommentaire">nombre de commentaires: {{ message.nbCommentaires}}</p>
            <router-link to="/connexion" @click.native="modifyMessage({id, titreImage, imageUrl})">&#9998; </router-link>  
            <button  @click.prevent="deleteMessage()"> &#10060; </button> 
        <PostCommentaire/>    
        <all-commentaires/>
    </div>
</template>
<script>
export default {
    mounted(){
        this.$store.dispatch('getMessage', this.id)
        console.log(this.id)
    }
}
</script>