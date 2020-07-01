<template>
    <div>

        
        
         <p>{{ message }}       
                
        <p class= "date"> {{ message.createdAt }}</p>
        

        <div>
            <h2 class="link-message">
                
                <p class='titre-image'>{{ message.titreImage }}</p>
                <img class= "url-image" :src="message.imageUrl" :alt= 'message.titreImage'>
                
            </h2>
        </div>

            <p class= "nbCommentaire">nombre de commentaires: {{ message.nbCommentaires}}</p>  
            
            <button> &#10060; </button> 

    </div>
</template>
<script>
//import Message from "../components/Message.vue"

export default {
    props: ["id"],
    mounted (){
        this.$store.dispatch('getMessage', this.id)
    },
    components: {
 //       Message
    },
    computed: {
        message(){
            return this.$store.state.message;
        }
    }
}
</script>

