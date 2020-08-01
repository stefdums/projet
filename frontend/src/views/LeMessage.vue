<template>
    <div class="section">
           <b-card
            
            :title="message.titreImage"
            :img-src="message.imageUrl"
            :img-alt="message.titreImage"
            img-top
            tag="article"          
            class="md-2"            
            >
            <b-card-text class="cart-text">
                <div class="user">
                    <p> {{ message.User.nom }} {{ message.User.prenom }}</p>
                    <div id='div-photo-profil'> 
                        <img :src="message.User.photoProfil" :alt="message.User.nom" id="photo-profil">
                    </div>
                </div> 
                <router-link :to="{name:'ModifyMessage'}" v-show="userid == message.UserId" ><b-button  class="border border-info bg-white">&#9998;</b-button></router-link>
                
                <b-button  @click.prevent="deleteMessage(message)" v-show="userid == message.UserId  || isAdmin == 1" class="border border-danger bg-white"> &#10060; </b-button> 
                
            </b-card-text>
            <b-card-footer>

                <p class= "nbCommentaires">nombre de commentaires: {{ message.nbCommentaires}}</p>
                <div class="date">
                    <p id= "jour"> {{ ((message.createdAt).split('T'))[0] }}</p>
                    <p id= "heure"> {{ ((((message.createdAt).split('T'))[1]).split('.'))[0] }}</p>
                </div>

            </b-card-footer>

            </b-card> 
     <!-- lien pour modifier le message -->       
        <router-view v-if="this.$route.params.commid == null"></router-view>
        <PostCommentaire/>    

        <GetCommentaires/>
    </div>
</template>
<script>

import PostCommentaire from "../components/PostCommentaire.vue"
import GetCommentaires from "../components/GetCommentaires.vue"
import { mapActions } from "vuex"
export default {
    name: 'LeMessage',
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

        PostCommentaire,
        GetCommentaires,

    },
    computed: {
        message(){
            return this.$store.state.message;
        }
    },
    methods:{
        ...mapActions([ 'deleteMessage' ]),  
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
    overflow: hidden;
        
}
.card-body{
    padding-bottom: 14px;
    padding-left: 0 !important;
    padding-right: 0 !important;
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
        align-items: center;
            
        .btn{
                font-weight: bold;
                color: #091F43;
                background-color: #D1515A
            }
    }        
};
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
    }
    #photo-profil{
        width: 100%;
        height: 100%;
        object-fit: cover;
        text-align: center;
    }

    .card-footer{
       
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-left: 1.25rem;
        padding-right: 1.25rem;
        margin-top:10px;
        p{
           margin-bottom: 0; 
        }
        
    };
 
</style>

