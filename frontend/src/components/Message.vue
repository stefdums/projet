<template>
        <b-card
            :hearder= '"message.User.nom" + "message.User.prenom"'
            :title="message.titreImage"
            :img-src="message.imageUrl"
            :img-alt="message.titreImage"
            img-top
            tag="article"          
            class="md-2 card"
            :to="{name: 'LeMessage', params: { id: message.id }}"  
        >
            
            <b-card-text class= "user">
                <div id='div-photo-profil'>
                    <img :src="message.User.photoProfil" id="photo-profil">
                </div>    
                {{ message.User.nom }} {{ message.User.prenom }}                        
            </b-card-text>
            

            <b-link :to="{name: 'LeMessage', params: { id: message.id }}" tag="button" class="btn">
                    Afficher 
            </b-link>
        

            <b-card-footer>
                <p class= "nbCommentaires">nombre de commentaires: {{ message.nbCommentaires}}</p>

                <div class="date">
                    <p id= "jour"> {{ ((message.createdAt).split('T'))[0] }}</p>
                    <p id= "heure"> {{ ((((message.createdAt).split('T'))[1]).split('.'))[0] }}</p>
                </div>
            </b-card-footer>

        </b-card>
</template>
<script>


export default {
    name: 'Message',
    props: ["message"], 

    // methods:{
    //     dateFormat(){
    //         let date = this.message.createdAt
    //         let dateF = date.split('T')
    //         console.log(dateF)
    //         let jour = dataF[0];
    //         console.log(jour)
    //         let heureZ = dataF[1].split('.')
    //         let heure = heureZ[0]
    //         return date + heure
    //     }
    // },
    

}

</script>
<style lang="scss" scoped>

    section {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        
    }
    article{
        border-radius: 40px;
        color: #091F43; 
        margin-bottom: 10px;
       
    }
    .card-body{
        padding-bottom: 14px;
    };   
    .card-title{

        margin-bottom: 0px;
        font-weight: bold !important;  
        padding-bottom: 1rem;
        background-size: 0 100%;
        background: linear-gradient(to top, #D1515A 0%, #D1515A 4px, transparent 6px) no-repeat;
        
    };
    .user{
        margin-top: 10px;
        justify-content: space-evenly;
        display: flex;
        align-items: center;
            
    };
    #div-photo-profil{
    display: flex;
    overflow: hidden;
    align-items: center;
    flex-shrink: 0;
    user-select: none;
    border-radius: 50%;
    justify-content: center;
    width: 70px;
    height: 70px;
    }
    #photo-profil{
        width: 100%;
        height: 100%;
        object-fit: cover;
        text-align: center;
    }
    .btn{
            font-weight: bold;
            color: #091F43;
            background-color: #ffd7d7;
    };
    
    .card-footer{
       
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-left: 0;
        padding-right: 0;
        margin-top:10px;
        p{
           margin-bottom: 0; 
        }
        
    };
    

    
    

   
    
</style>




    


