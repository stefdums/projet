<template>
    <div class="section">
        
     <b-card
            v-for="message in messages" 
            :key="message.id"
            :hearder= '"message.User.nom" + "message.User.prenom"'
            :title="message.titreImage"
            :img-src="message.imageUrl"
            :img-alt="message.titreImage"
            img-top
            tag="article"          
            class="md-2 card"
          
        >
            
            <b-cart-text>
                <p class= "user"> {{ message.User.nom }} {{ message.User.prenom }}</p>                        
            </b-cart-text>

            <router-link :to="{name: 'LeMessage', params: { id: message.id }}" tag="button" class="btn border border-info">Afficher </router-link>
                    
            
            <div>
                <!-- <router-link :to="{name:'ModifyMessage'}" v-if="userid == message.UserId"><b-button  class="border border-info bg-white">&#9998; </b-button></router-link> -->
                    
                <b-button  @click.prevent="deleteMessage(message)" v-if="userid == message.UserId  || isAdmin === 1" class="border border-danger bg-white"> &#10060; </b-button> 
            </div>

            <b-card-footer>
                <p class= "nbCommentaires">nombre de commentaires: {{ message.nbCommentaires}}</p>

                <div class="date">
                    <p id= "jour"> {{ ((message.createdAt).split('T'))[0] }}</p>
                    <p id= "heure"> {{ ((((message.createdAt).split('T'))[1]).split('.'))[0] }}</p>
                </div>
                
            </b-card-footer>

        </b-card>

    </div>    
</template>

<script>
//import Message from "../components/Message.vue"
import { mapActions, mapState } from 'vuex'
export default {
  //  props:["userid"],
    mounted(){
        console.log('test')
        this.getMessageByUser(this.$route.params.userid) 
    },
    data(){
        return{
            userid: this.$route.params.userid,
            message: this.message
        }
    },
    components: {
     //   Message,
    },
    computed:{
        ...mapState(['messages'])
    },
    methods: {
        ...mapActions(['getMessageByUser', 'deleteMessage'])
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
        padding-left: 1.25rem;
        padding-right: 1.25rem;
        margin-top:10px;
        p{
           margin-bottom: 0; 
        }
        
    };
</style>