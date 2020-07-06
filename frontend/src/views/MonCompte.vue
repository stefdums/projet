<template>
    <div>
        <CompteAdmin v-if='isAdmin == 1'/>
        <Compte v-else />
    </div>    
</template>
<script>
import Compte from '../components/Compte.vue'
import CompteAdmin from '../components/CompteAdmin.vue'

//import axios from 'axios'

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