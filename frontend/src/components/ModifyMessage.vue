<template>
  <div id="div-modif">
    <b-card id="card-modif">
        <b-form>
            <h4>Modifiez votre message</h4>
            <label for="titre">Nouveau titre : </label>
            <b-form-input type="text" name="titre" id="titre" v-model="message.titreImage" >
            </b-form-input>
            
            <!-- <label for="imageurl"> Mettre le nouveau lien de l'image </label>
            <b-form-input type="url" name="imageurl" id="imageurl" v-model='message.imageUrl' >
            </b-form-input> -->
                            
            
        <b-card-footer id='modif'>
            <b-button id='btn-modif' class="border border-info bg-white" @click="modifyMessage({ message, messageid, UserId,  })">
                        Modifiez
            </b-button>
            <router-link :to="{name: 'LeMessage'}">
              <b-button > Annuler </b-button>
            </router-link>
        </b-card-footer>

      </b-form>
    </b-card>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
  export default {
    props: ["id"],
     
    data() {
      return {
        status: null,
        messageid: this.$route.params.id,
        userid: localStorage.getItem('UserId'),
        isAdmin: localStorage.getItem("isAdmin"),
        UserId: this.$store.state.message.UserId,

        message: {
          titreImage: this.$store.state.message.titreImage,
          imageUrl: this.$store.state.message.imageUrl,
        },
      }
    },
    methods: {
        ...mapActions(['modifyMessage']),

    }
  }
</script>
<style lang="scss" scoped>
#card-modif{
  width: 100%;
}
#div-modif {
  width: 100%;

}
#modif{
  display: flex;
  justify-content: space-around;
}
#btn-modif{
  color: #091F43
}
</style>