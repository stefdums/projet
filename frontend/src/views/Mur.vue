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
                <div class="user">
                    <p class= "user"> {{ message.User.nom }} {{ message.User.prenom }}</p>
                    <img :src="message.User.photoProfil" class="image">
                </div> 
                <router-link :to="{name:'ModifyMessage'}" v-if="userid == message.UserId" ><b-button  class="border border-info bg-white">&#9998; </b-button></router-link>
                
                <b-button  @click.prevent="deleteMessage(message)" v-if="userid == message.UserId  || isAdmin == 1" class="border border-danger bg-white"> &#10060; </b-button> 
                
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
        <router-view v-if="this.$route.params.commid == null"></router-view>
        <PostCommentaire/>    
        <all-commentaires class="all-commentaires"/>
    </div>
</template>
<script>
import AllCommentaires from "../components/AllCommentaires.vue"
import PostCommentaire from "../components/PostCommentaire.vue"
import { mapActions } from "vuex"
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
        align-items: center;
            
        .btn{
                font-weight: bold;
                color: #091F43;
                background-color: #D1515A
            }
    }        
};
.image{
        border-radius: 50px;
        width: 65px;
        margin-bottom: 10px;

        
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

