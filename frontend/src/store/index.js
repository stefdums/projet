import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from '../router'

Vue.use(Vuex, axios)

export default new Vuex.Store({
  state: {
    users:[], 
    user: { },
    messages: [],
    message: null,
    commentaires: [],
    commentaire: { }
   

  },
  getters:{

  },

  mutations: {

    // GET 

    SET_GET_ALL (state, messages){
      state.messages = messages
    },
    SET_GET (state, message){
      state.message = message
    },
    GET_BY_USER (state, messages){
      state.messages = messages
    },
    SET_ALL_CO (state, users){
      state.users = users
    },
    GET_US_ID ( state, user){
      state.user = user
    },
    GET_COMMS (state, commentaires){
      state.commentaires = commentaires
    },
    GET_COMM_ID (state, commentaire){
      state.commentaire = commentaire
    },

    // POST 

    POST_MESS (state, messages){
      state.messages = messages
    },
    POST_COMM (state, commentaires){
      state.commentaires = commentaires
    },

    // PUT

    MODIF_MESS (state, message){
      state.message = message
    },
    MODIF_COMM (state, commentaire){
      state.commentaire = commentaire
    },

    // DELETE 

    DEL_US (state, users){
      state.users = users
    },
    DEL_MESS (state, message){
      state.message = message
    },
    DEL_COMM (state, commentaires){
      state.commentaires = commentaires
    },
    

  },
  actions: {

    // GET 

    /**
     * 
     * @param {*} commit 
     * GET pour avoir TOUS les messages
     */
    getAllMessages ({ commit }) {
      axios
        .get('http://localhost:3000/groupomania/messages', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
        .then( response => {
        let messages = response.data  
        commit('SET_GET_ALL', messages)
        })
        .catch( error => { 
          error;
          router.push({name: 'Connexion'})
        })
 
    },
    /**
     * 
     * @param {*} commit 
     * @param {*} messageId 
     * GET pour avoir UN message 
     */
    getMessage ({ commit }, messageId){
      axios
        .get(`http://localhost:3000/groupomania/messages/${messageId}` , {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
        .then( response => { 
          let message = response.data         
          commit('SET_GET', message)
        })
        .catch( error => { error })
      
    },
    /***
     * GET ALL messages par User
     */
    getMessageByUser({commit}, user){
      console.log(user)
      if( localStorage.getItem('isAdmin') != 1 ){
        alert("vous ne pouvez pas faire ça")
        router.push('/Connexion')

      }
      else{
        axios
          .get(`http://localhost:3000/groupomania/auth/inscription/${user}/messages` , {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          })
          .then(response => {
            let messages = response.data 
            commit('GET_BY_USER', messages)

          })
          .catch ( error => { error })

      }
    },  
    /**
     * 
     * @param {*} context 
     * GET pour avoir TOUS les comptes
     */
    getAllComptes( context ){
      axios
          .get(`http://localhost:3000/groupomania/auth/inscription` , {
              headers: {
                  Authorization: `Bearer ${localStorage.getItem('token')}`
              }
          })
          .then (response => {  
              let users = response.data 
              context.commit('SET_ALL_CO', users)    
          })
          .catch ( error => { 
            error; 
            router.push({name: 'Connexion'})
          })  
    },
    getOneCompte( {commit} ){
      axios
          .get(`http://localhost:3000/groupomania/auth/inscription/${localStorage.getItem('UserId')}`,{
              headers: {
                  Authorization: `Bearer ${localStorage.getItem('token')}`
              }
      })
      .then (response => { 
          let user = response.data 
          commit('GET_US_ID', user)    
      })
      .catch ( error => { 
          error;
          this.$router.push({name: 'Connexion'}) })  
    },
     /***
     * GET All Commentaires
     */
    getAllComms ( {commit}, messageid){
      axios
      .get(`http://localhost:3000/groupomania/messages/${messageid}/comm` , {
          headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
          }
      })

      .then (response => {
        let commentaires = response.data;
        commit('GET_COMMS',commentaires)
      })
      .catch ( error => { error })
    },
    /**
     * 
     * @param {*} param0 
     * @param {*} data 
     * GET commentaire By Id
     */
    getCommById ({ commit }, data){
      console.log(data)
      axios
        .get(`http://localhost:3000/groupomania/messages/${data.messageid}/comm/${data.commid}` , {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
        .then( response => { 
          let commentaire = response.data         
          commit('GET_COMM_ID', commentaire)
          console.log(response)
        })
        .catch( error => { error })
      
    },

    // POST //

    /**
     * 
     * @param {*} param0 
     * @param {*} form 
     * POST un message
     */
    postMessage ({ commit }, data){
                  
      let formData = new FormData();
      formData.append('titreImage', data.titreImage)
      formData.append('image', data.imageUrl) 

      axios
          .post('http://localhost:3000/groupomania/messages', 

              formData,
              {
                  headers:{
                      'Content-Type' : 'multipart/form-data',
                      'Authorization': `Bearer ${localStorage.getItem('token')}`,    
                  }
              }  
          )
          .then(()=> {
            commit ('POST_MESS')
            router.push('/')               
          })
          .catch( error => { error })
    },
    /**
     * 
     * @param {*} param0 
     * @param {*} form 
     * POST un commentaire
     */
    postCommentaire ({ commit }, form){

        let formData = new FormData();
        formData.append('texte', form.texte)
        formData.append('image', form.imageComm)

        axios
            .post(`http://localhost:3000/groupomania/messages/${form.messageid}/comm`, 
              // {
              //   texte: form.texte,
              //   imageComm: form.imageComm
              // },
              formData,
              {
                  headers:{
                      Authorization: `Bearer ${localStorage.getItem('token')}`
                  }
              }  
            )
            .then(()=> { 
              commit('POST_COMM') 
              router.push({ name: 'LeMessage'});
              location.reload(true);

            })
            .catch( error => {  error})
    },
   
    // PUT //

    /**
     * 
     * @param {*} param0 
     * @param {*} data 
     * PUT son message
     */
    modifyMessage({ commit }, data){

      if(localStorage.getItem('UserId') != data.UserId ){
          
        alert("vous ne pouvez pas faire ça")

      }else {
        console.log(data.message)

        axios
          .put(`http://localhost:3000/groupomania/messages/${data.messageid}`, {
            titreImage: data.message.titreImage,
            imageUrl: data.message.imageUrl},
            {
              headers:{
                  Authorization: `Bearer ${localStorage.getItem('token')}`
              }
            }  
          )
          .then(()=>{
            commit('MODIF_MESS')
          }) 
          .then(()=>  router.push({ name: 'Home'}))
          .catch( error => { error })
      }
        
    },
    /**
     * 
     * @param {*} param0 
     * @param {*} data 
     * PUT son commentaire
     */
    modifyComm( {commit}, commentaire){

      if(localStorage.getItem('UserId') != commentaire.UserId ){
          
        alert("vous ne pouvez pas faire ça")

      }else {
       
      axios
        .put(`http://localhost:3000/groupomania/messages/${commentaire.MessageId}/comm/${commentaire.id}`, {
          texte: commentaire.texte,
          imageComm: commentaire.imageComm},
          {
            headers:{
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          }  
        )
        .then(()=>{
          commit('MODIF_COMM')
          console.log(commentaire)

        })
        .then(()=> { 
          router.push({ name: 'LeMessage' })
          location.reload(true)
        })
        .catch( error => { error })
      }
    },

    // DELETE //

    /**
    * 
    * @param {*} context 
    * @param {*} userid 
    * DELETE pour supprimer UN compte par un Admin
    */
    deleteCompteAdmin ({ commit }, user){
      console.log(user)      
      if( localStorage.getItem('isAdmin') != 1 ){
          alert("vous ne pouvez pas faire ça")
        }
        else {
            if(window.confirm('Voulez-vous supprimer le compte')){
            axios
                .delete(`http://localhost:3000/groupomania/auth/inscription/${user.id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                }) 
                .then(() => { commit('DEL_US')})
                .then(()=> {
                  if(localStorage.getItem('isAdmin') != 1){
                  {localStorage.clear()}
                  }
                  else{
                   location.reload()
                  }
                })
                .then(()=>{ window.alert('compte supprimé')})
                .then(()=> { this.router.push('/Connexion') })
               
                .catch(( error )=> { error })
            }      
        } 
    },
    /**
    * 
    * @param {*} param0 
    * @param {*} user 
    * DELETE son compte
    */
    deleteCompte ({ commit }, user){   
      if( localStorage.getItem('UserId') != user.id ){
          alert("vous ne pouvez pas faire ça")
        }
        else {
            if(window.confirm('Voulez-vous supprimer le compte')){
            axios
                .delete(`http://localhost:3000/groupomania/auth/inscription/${user.id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                }) 
                .then(() => { commit('DEL_US')})
                .then(()=> {
                  if(localStorage.getItem('isAdmin') != 1){
                  {localStorage.clear()}
                  }
                  else{
                   location.reload()
                  }
                })
                .then(()=>{ window.alert('compte supprimé')})
                .then(()=> { this.$router.push('/Connexion') })
               
                .catch(( error )=> { error })
            }      
        } 
    },
    /***
    * DELETE un Message
    */
    deleteMessage( { commit }, message){
      console.log(message)
          
          if( localStorage.getItem('UserId') != message.UserId && localStorage.getItem('isAdmin') != 1){
              alert("vous ne pouvez pas faire ça")
          }
          else {

              if(window.confirm('Voulez-vous supprimer votre message')){
              axios
                  .delete(`http://localhost:3000/groupomania/messages/${message.id}`, {
                      headers: {
                          Authorization: `Bearer ${localStorage.getItem('token')}`
                      }
                  })
                  .then(()=>{ 
                    commit('DEL_MESS')
                    window.alert('message supprimé')
                    router.push('/')
                  })
                  .catch(( error )=> { error })
              }      
          } 
      } ,   
    /**
     * 
     * @param {*} param0 
     * @param {*} data 
     * DELETE son commentaire 
     */
    deleteCommentaire( { commit } , data){

      if(localStorage.getItem('isAdmin') != 1 && ( localStorage.getItem('UserId') != data.commentaire.UserId )){
          
              alert("vous ne pouvez pas faire ça")
          }else {

              if(window.confirm('Voulez-vous supprimer le commentaire')){
              axios
                  .delete(`http://localhost:3000/groupomania/messages/${data.messageid}/comm/${data.commentaire.id}`, {
                      headers: {
                          Authorization: `Bearer ${localStorage.getItem('token')}`
                      }
                  })
                  .then(()=>{ window.alert('commentaire supprimé')})
                  .then(()=> { 
                    console.log('pb avec DEL_COMM')
                    commit ('DEL_COMM');
                    router.push({ name: 'LeMessage'}) 
                    location.reload(true);
                    
                })
                .catch(( error )=> { error })
              }      
          } 
    },
   
  },
  modules: {
  }
})
