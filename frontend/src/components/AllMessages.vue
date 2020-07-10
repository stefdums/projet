<template>
    <div class="all-messages">
    <main class="post">
        <message v-for="message in messages" :key="message.id" :message="message"/>
    </main>
    </div>
</template>

<script>

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
<style scoped>




</style>