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


    name: 'LeMessage',
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
<style lang="scss" scoped>
.all-messages{
    width: 60%;
}

@media (max-width: 576px) {
    .all-messages {
        width: 100%
    }
        
}


</style>