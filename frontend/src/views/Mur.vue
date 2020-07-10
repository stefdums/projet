<template>
    <div class="section">
           <b-card
            :hearder= '"message.User.nom" + "message.User.prenom"'
            :title="message.titreImage"
            :img-src="message.imageUrl"
            :img-alt="message.titreImage"
            img-top
            tag="article"          
            class="md-2"            
            >
            <b-cart-text class="cart-text">

                <p class= "user"> {{ message.User.nom }} {{ message.User.prenom }}</p>
                <router-link :to="{name:'ModifyMessage'}" >&#9998;</router-link>
                <!-- <b-button v-if="userid == message.UserId" class="border border-info bg-white">&#9998; </b-button> -->
                <b-button  @click.prevent="deleteMessage()" v-if="userid == message.UserId  || isAdmin === 1" class="border border-danger bg-white"> &#10060; </b-button> 
                
            </b-cart-text>
            <b-card-footer>

                <p class= "nbCommentaires">nombre de commentaires: {{ message.nbCommentaires}}</p>
                <div class="date">
                    <p id= "jour"> {{ ((message.createdAt).split('T'))[0] }}</p>
                    <p id= "heure"> {{ ((((message.createdAt).split('T'))[1]).split('.'))[0] }}</p>
                </div>

            </b-card-footer>

            </b-card> 
     <!-- lien pour modifier le message -->       
        <router-view></router-view>
        <PostCommentaire/>    
        <all-commentaires class="all-commentaires"/>
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
            userid: localStorage.getItem('UserId'),
            isAdmin: localStorage.getItem("isAdmin"),
            
            

        }
    },
    props: ["id"],
    mounted (){
        this.$store.dispatch('getMessage', this.id)

    },
    components: {
        AllCommentaires,
        PostCommentaire,

    },
    computed: {
        message(){
            return this.$store.state.message;
        }
    },
    methods:{
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
        },
        
    }
}
</script>
<style lang="scss" scoped>

.section {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center; 
    width: 60% 
    
}
@media (max-width: 576px) {
    .section {
        width: 100%
    }    
}

article{
    
    justify-content: center;
    border-radius: 40px;
    color: #091F43;
        
}
.card-body{
    padding-bottom: 14px;
    
    .card-title{

        margin-bottom: 0px;
        font-weight: bold !important;  
        padding-bottom: 1rem;
        background-size: 0 100%;
        background: linear-gradient(to top, #D1515A 0%, #D1515A 4px, transparent 6px) no-repeat;
        
    };
    .cart-text{
        margin-top: 20px;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: baseline;
            
        .btn{
                font-weight: bold;
                color: #091F43;
                background-color: #D1515A
            }
    }        
};

    .card-footer{
       
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-left: 0;
        padding-right: 0;
        margin-top:10px;
        p{
           margin-bottom: 0; 
        }
        
    };
</style>

