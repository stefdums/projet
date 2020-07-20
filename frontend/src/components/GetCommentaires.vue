<template>
    <div class="commentaires" >
        <div class='commentaire' v-for="commentaire in commentaires" :key="commentaire.id" :userId="commentaire.userId"> 
            <b-card 
                :title='commentaire.User.nom + " " + commentaire.User.prenom'
                :img-src="commentaire.imageComm"
                :img-alt="commentaire.texte" >
                <b-card-text>
                    <div id="text">{{ commentaire.texte }}</div>
                    
                        <p id= "date"> {{ ((commentaire.createdAt).split('T'))[0] }} / {{ ((((commentaire.createdAt).split('T'))[1]).split('.'))[0] }}</p>
                        
                    
                </b-card-text>
                <b-card-footer>               
                    <router-link :to="{ name:`ModifyComm`, params: { commid: commentaire.id, messageid: commentaire.MessageId}}" v-if="userid == commentaire.UserId" > 
                        <b-button  class="btn-light border border-info bg-white" @click=" modify = true"> &#9998; {{ commentaire.id }}</b-button>
                    </router-link>


                    <b-button @click.prevent="deleteCommentaire({commentaire, messageid})" class="border border-danger bg-white" v-if="isAdmin == 1 || userid == commentaire.UserId"> &#10060; </b-button>
    
                </b-card-footer>
            <router-view class="ModifyComm" v-if="$router.currentRoute.params.commid == commentaire.id"/>     
            <!-- <ModifyComm v-show="modify"/> -->
            
            </b-card>          
            
            
        </div>
             
    </div>
</template>
<script>

//import axios from 'axios'
import { mapActions, mapState } from 'vuex'
//import ModifyComm from '../components/ModifyComm.vue'
export default {
    name: 'GetCommentaires',
    props:['id'],
    data() {
        return {
        //    UserId: this.commentaire.UserId,
            messageid: this.$route.params.id,
        //    commid: this.$data.commentaire.id,
            userid: localStorage.getItem('UserId'),
            isAdmin: localStorage.getItem('isAdmin'),
            modify: false,
  
 
        }
    },
    beforeMount() {
        this.getAllComms(this.$route.params.id)
    },
    created(){
        console.log(this)
    },
    computed:{
        ...mapState(['commentaires', 'commentaire'])
    },
    methods: {
        
        ...mapActions(['getAllComms', 'deleteCommentaire', 'modifyComm', 'getCommById'])
    },
    components:{
//        ModifyComm,
    }
        
}
</script>
<style lang="scss" scoped>
.commentaire{
    margin-bottom: 10px; 

};
.card-title{
    font-size: 1rem
}
.card-footer{
    display: flex;
    justify-content: space-around;
    padding-bottom: 0px;

}
button{
    font-size: bold;
}
</style>



