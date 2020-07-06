<template>
    <div>
        <p>TEST</p>
        <form method="" id="form" name="form" target="_self">
        
            <label for="titre">Titre : </label>
            <input type="text" v-model="titreImage" name="titre" id="titre" class="only-letters" data-valid = "false" required="required">
            <span id="titre_m"></span><br>

            <label for="image"> Mettre le lien de l'image </label>
            <input type="url" v-model="imageUrl" name="imageurl" id="image" data-valid = "false" >
            <img style="max-height: 200px;display:block;margin-top:10px"> 
            <span id="image_m"></span><br>

            <button id="bouton-valid" @click.prevent="postMessage()" value ="validation" data-valid ="true">
            Envoyer </button>

        </form>   
    </div>
</template>
<script>
import axios from 'axios'

export default {

    methods: {
        postMessage (){
            console.log('test')
            axios
                .post('http://localhost:3000/groupomania/messages', {
                    titreImage: this.titreImage,
                    imageUrl: this.imageUrl},
                    {
                        headers:{
                            Authorization: `Bearer ${localStorage.getItem('token')}`
                        }
                    }  
                )
                .then(()=> {
                    console.log('test2')
                    this.$router.push('/')               
                })
                .catch( error => { error })
        }
  
    }
}
</script>