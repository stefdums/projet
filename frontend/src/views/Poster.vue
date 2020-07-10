<template>
    <div class="post-message">
        <form method="" id="form" name="form" target="_self">
        
            <b-form-group class="form-group"
                id="input-group-titre"
                label="titre: "
                label-for="titre"
            >    
                <b-form-input type="text" v-model="titreImage" name="titre" id="titre" required="required"></b-form-input>
            </b-form-group>

            <b-form-group class="form-group"
                id="input-group-url"
                label="lien de l'image: "
                label-for="imageurl"
            >
                <b-form-input type="url" v-model="imageUrl" name="imageurl" id="image" ></b-form-input>
            </b-form-group>

            <b-button id="bouton-valid" @click.prevent="postMessage()" value ="validation" class="btn btn-light bg-light">
            Envoyer </b-button>

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
<style lang="scss" scoped>
.post-message{
    width:60%;
};
button{
  border-color: #D1515A
}

</style>