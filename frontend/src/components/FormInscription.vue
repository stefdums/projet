<template>
     <form method="" id="form" name="form" target="_self">
        <h2> INSCRIPTION </h2>
        <label for="nom"> Nom </label>
        <input type="text" name="nom" id="nom" v-model="nom" class="only-letters" data-valid = "false">
        <span id="nom_m"></span><br>

        <label for="prenom"> Prenom </label>
        <input type="text" name="prenom" id="prenom" v-model="prenom" class="only-letters" data-valid = "false">
        <span id="prenom_m"></span><br>
        
        <label for="photo-profil"> photo Profil </label>
        <input type="file" name="photo-profil" accept="image/*" id="photo-profil" data-valid = "false" >
        <img style="max-height: 100px;display:block;margin-top:10px"> 
        <span id="image_m"></span><br>


        <label for="email">Email </label>
        <input type="email" name="email" id="email" v-model="email" data-valid = "false">
        <span id="email_m"></span><br>

        <label for="password"> Password </label>
        <input type="password" name="password" id="password" v-model="password" data-valid = "false">
        <span id="password_m"></span><br>

        <button id="bouton-valid" value ="validation" data-valid = "true"  @click.prevent="postInscription()">
        Validez l'incription</button>
    </form>
</template>

<script>
import axios from 'axios'
export default {
    name: 'FormInscription',
    data(){
        return {
            nom: this.nom,
            prenom: this.prenom,
            photoProfil: this.photoProfil,
            email: this.email,
            password: this.password,
        }
    },
    methods: {
        postInscription(){
            axios
                .post('http://localhost:3000/groupomania/auth/inscription', {
                    nom: this.nom,
                    prenom: this.prenom,
                    photoProfil: this.photoProfil,
                    email: this.email,
                    password: this.password
                })
                .then(()=> {
                    
                    this.postConnexion()
                })
                .catch( error => { error })
        },
        postConnexion (){
                axios
                    .post('http://localhost:3000/groupomania/auth/connexion', {
                        email: this.email,
                        password: this.password,
                    })
                    .then((response)=> {   
                        if (response.status === 200){
                            let results = response.data
                            localStorage.setItem('token', results.token)
                            localStorage.setItem('UserId', results.UserId)
                            localStorage.setItem('isAdmin', results.isAdmin)
                            this.$router.push('/')
                        }
                    })
                    .catch( error => { error, this.erreur = true })
            }



    }

} 
   
/**
 * 
 * validation inputs du formulaire [^0-9]
 *  
*/
// regex commence par a-z ou en maj, puis que des lettres et avec accents, plus que 2 lettres puis ajout hypothetique du prenom composé
// let regexText = /^[a-zA-Zéèçîï][a-zA-Zéèêçîï]+([a-zA-Zéèêçîï\-'\s]+)$/; 
// let regexMail = /.+@.+\..+/

// let form = document.getElementById("form")
// let inputs = document.forms["form"]
// let champsText = document.querySelectorAll(".only-letters")
// let champMail = inputs.querySelector("[type=email]")
 
// /**
//  * fonction pour valider le champ
//  * @param {string} champ 
//  */
// let styleInputValid =(champ)=>{ 
//     champ.nextElementSibling.innerHTML = "&#10004"
//     champ.nextElementSibling.style.color = "green"
//     champ.dataset.valid = "true"   
// }
// /**
//  * fonction pour erreur champ vide
//  * @param {string} champ 
//  */
// let erreurVide = (champ)=>{ 
//     champ.nextElementSibling.innerHTML = champ.previousElementSibling.innerHTML + " est vide"
//     champ.nextElementSibling.style.color = "red"
//     champ.dataset.valid = "false"
    
// }
// /**
//  * fonction pour erreur champ non conforme
//  * @param {string} champ 
//  */
// let erreurConformite = (champ)=>{ 
//     champ.nextElementSibling.innerHTML = champ.previousElementSibling.innerHTML + " n'est pas conforme"
//     champ.nextElementSibling.style.color = "orange"
//     champ.dataset.valid = "false"
    
// }
//traitement pour validation inputs avec du text
// for (let i=0; i< champsText.length; i++){
//     champsText[i].addEventListener("blur", function(e){
    
//         if(!champsText[i].value){
//             e.preventDefault()
//             erreurVide(champsText[i])
//         }else if(!regexText.test(champsText[i].value)) {
//             e.preventDefault()
//             erreurConformite(champsText[i])

//         }else{
//             styleInputValid(champsText[i])
//         }
//     })
// }
// //validation des inputs avec un mail
// champMail.addEventListener("blur", function(e){
    
//     if(!champMail.value){
//         e.preventDefault()
//         erreurVide(champMail)
        
//     }else if(!regexMail.test(champMail.value)){
//         e.preventDefault()
//         erreurConformite(champMail)
//     }else{
//         styleInputValid(champMail)
        
//     }
// })

  


</script>