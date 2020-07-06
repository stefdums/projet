<template>
    <div>
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
            <button class="button" @click="showModal = true">&#9998; </button>  
            <button  @click.prevent="deleteMessage()"> &#10060; </button> 
        <PostCommentaire/>    
        <all-commentaires/>
    </div>
</template>
<script>
import AllCommentaires from "../components/AllCommentaires.vue"
import PostCommentaire from "../components/PostCommentaire.vue"
import axios from 'axios';
export default {
    data(){
        return {
            messageid: this.$route.params.id,
            showModal: true
        }
    },
    props: ["id"],
    mounted (){
        this.$store.dispatch('getMessage', this.id)
        console.log(this.message)
    },
    components: {
        AllCommentaires,
        PostCommentaire
    },
    computed: {
        message(){
            return this.$store.state.message;
        }
    },
    methods:{
        launch(){
            this.$emit
        },
        deleteMessage(){

            if( localStorage.getItem('isAdmin') != 1 ){
                
                if( localStorage.getItem('UserId') != this.message.UserId ){
                    alert("vous ne pouvez pas faire ça")
                }
                else {

                    if(window.confirm('Voulez-vous supprimer votre message')){
                    axios
                        .delete(`http://localhost:3000/groupomania/messages/${this.messageid}`, {
                            headers: {
                                Authorization: `Bearer ${localStorage.getItem('token')}`
                            }
                        })
                        .then(()=>{ window.alert('message supprimé')})
                        .then(()=> { this.$router.push('/') })
                        .catch(( error )=> { error })
                    }      
                } 
            }    
            else {
                if(window.confirm('Voulez-vous supprimer votre message')){
                    axios
                        .delete(`http://localhost:3000/groupomania/messages/${this.messageid}`, {
                            headers: {
                                Authorization: `Bearer ${localStorage.getItem('token')}`
                            }
                        })
                        .then(()=>{ window.alert('message supprimé')})
                        .then(()=> { this.$router.push('/') })
                        .catch(( error )=> { error })

                }        
            }
        }
    }
}
</script>

