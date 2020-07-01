<template>
    <div class="post">
        <message v-for="message in messages" :key="message.id" :message="message"/>
    </div>
</template>

<script>
//import { mapState } from 'vuex'
import Message from '../components/Message'

export default {


    name: 'Mur',
    components: {
        Message
    },
    mounted(){
       this.$store.dispatch('getAllMessages');
       
    },
    computed: {
     messages(){
         return this.$store.state.messages
     }
    },
    methods: {

    }

}
</script>
<style  scoped>
div.message {
    border: 1rem solid;
}
</style>