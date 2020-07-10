<template>
        <b-card
            :hearder= '"message.User.nom" + "message.User.prenom"'
            :title="message.titreImage"
            :img-src="message.imageUrl"
            img-alt="message.titreImage"
            img-top
            tag="article"          
            class="md-2 card"
            :to="{name: 'Mur', params: { id: message.id }}"  
        >
            
            <b-cart-text>
                <p class= "user"> {{ message.User.nom }} {{ message.User.prenom }}</p>
                                    
            </b-cart-text>

            <b-link :to="{name: 'Mur', params: { id: message.id }}" tag="button" class="btn">
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
       
    }
    .card-body{
        padding-bottom: 14px;
        .card-title{
   
            margin-bottom: 0px;
            font-weight: bold !important;  
            padding-bottom: 1rem;
            background-size: 0 100%;
            background: linear-gradient(to top, #D1515A 0%, #D1515A 4px, transparent 6px) no-repeat;
           
        };
        b-cart-text{
                display: flex;
                justify-content: space-around;
                margin-top: 10px;
                .date{
                    color: red;
                    font-size: 0.9rem;
                }
            };
        .btn{
                font-weight: bold;
                color: #091F43;
                background-color: #D1515A
            };
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




    


