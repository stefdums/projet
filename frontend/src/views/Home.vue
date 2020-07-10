<template>
    <div class="home">
        <all-messages/>
    </div>
</template>
<script>
import AllMessages from "../components/AllMessages.vue"
export default {
   components: {
       AllMessages
   } 
}
</script>
<style lang="scss" scoped>
.home{
    width: 60%;
    display: flex;
    flex-direction: column;
    align-items: center;      
}

@media (max-width: 576px) {
    .home {
        width: 100%
    }    
}
</style>