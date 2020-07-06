<template>
    <article class="message">
            <header> 
                <p class= "photo-profil"> {{ message.photoProfil }}</p>
                <p class= "user"> {{ message.User.nom }} {{ message.User.prenom }}</p>
                <p class= "date"> {{ message.createdAt }}</p>
            </header>

            <main>
                <h2 class="link-message">
                    <router-link :to="{name: 'Mur', params: { id: message.id }}">
                        <p class='titre-image'>{{ message.titreImage }}</p>
                        <img class="url-image" v-bind:src="message.imageUrl" :alt='message.titreImage' >
                    </router-link>
                </h2>
            </main>

            <p class= "nbCommentaires">nombre de commentaires: {{ message.nbCommentaires}}</p>  
            <router-link :to="{name: 'Mur', params: { id: message.id }}" tag="button"> &#128172;</router-link>
                 
        </article>

</template>
<script>


export default {
    name: 'Message',
    props: ["message"],
      
}
</script>
<style>
.message {  border: rgb(19, 46, 167) solid 10px; }
    
</style>

