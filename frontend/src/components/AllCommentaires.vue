<template>
    <div>
        <get-commentaires/>
        <!-- <router-link :to="{name: 'ModifyComm'}" v-if="userid == commentaire.UserId">
        </router-link>-->
           
    </div>
</template>
<script>
import GetCommentaires from "../components/GetCommentaires"


export default {
    props: [],
    components: {
        GetCommentaires
    
    }
}
</script>