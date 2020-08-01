<template>
    <div class="mon-compte">
        <CompteAdmin v-if='isAdmin == 1' class="compte-admin"/>
        <Compte v-else class="compte"/>
    </div>    
</template>
<script>
import Compte from '../components/Compte.vue'
import CompteAdmin from '../components/CompteAdmin.vue'

export default {
    name: 'MonCompte',
    data(){
        return {
            isAdmin: localStorage.getItem('isAdmin')
        }
    },
    components: {
        Compte,
        CompteAdmin
    }
       
}
</script>
<style lang="scss" scoped>

.mon-compte{
    display: flex;
    justify-content: center;
    width:100%;    
}
.compte-admin{
    width: 60%;

}

</style>