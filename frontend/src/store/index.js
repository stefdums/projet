import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex, axios)

export default new Vuex.Store({
  state: {
    users:[], 
    user: { },
    messages: [],
    message: null,
    commentaires: [],
    commentaire: {}
   

  },
  getters:{

  },

  mutations: {
    SET_GET_ALL (state, messages){
      state.messages = messages
    },
    SET_GET (state, message){
      state.message = message
    },
    SET_ALL_CO (state, users){
      state.users = users
    },
    DEL_US (state, users){
      state.users = users
    },
    POST_MESS (state, messages){
      state.messages = messages
    },
    DEL_COMM (state, commentaires){
      state.commentaires = commentaires
    },
    POST_COMM (state, commentaires){
      state.commentaires = commentaires
    },
    MODIF_MESS (state, message){
      state.message = message
    },
    MODIF_COMM (state, commentaire){
      state.commentaire = commentaire
    }

  },
  actions: {
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
        .catch( error => { error })
 
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
          .catch ( error => { error })  
    },
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
                .then(()=> { this.$router.push('/Connexion') })
               
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
    /**
     * 
     * @param {*} param0 
     * @param {*} data 
     * DELETE son commentaire 
     */
    deleteCommentaire( {commit} , data){

      if(localStorage.getItem('isAdmin') != 1 && ( localStorage.getItem('UserId') != data.commentaire.UserId )){
          
              alert("vous ne pouvez pas faire ça")
          }else {

              if(window.confirm('Voulez-vous supprimer votre commentaire')){
              axios
                  .delete(`http://localhost:3000/groupomania/messages/${data.messageid}/comm/${data.commentaire.id}`, {
                      headers: {
                          Authorization: `Bearer ${localStorage.getItem('token')}`
                      }
                  })
                  .then(()=>{ window.alert('commentaire supprimé')})
                  .then(()=> { commit ('DEL_COMM')})
                  .then(()=>{location.reload(true) })
                  .catch(( error )=> { error })
              }      
          } 
    },
    /**
     * 
     * @param {*} param0 
     * @param {*} form 
     * POST un commentaire
     */
    postCommentaire ({ commit }, form){
        axios
            .post(`http://localhost:3000/groupomania/messages/${form.messageid}/comm`, {
                texte: form.texte,
                imageComm: form.imageComm},
                {
                    headers:{
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                }  
            )
            .then(()=> { commit('POST_COMM') })
            .then(()=>{ location.reload(true) })
            .catch( error => { error })
    },
    /**
     * 
     * @param {*} param0 
     * @param {*} message 
     * PUT son message
     */
    modifyMessage({ commit }, data){

      console.log(data)
      console.log(this.$route)
      if(localStorage.getItem('UserId') != data.UserId ){
          
        alert("vous ne pouvez pas faire ça")

      }else {
       
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
        .then(()=> { this.$router.push('/Connexion') })
        .then(()=>  this.$router.push({ name: 'Home'}))
        .then(()=> console.log('test' ))
        .then(()=> console.log('coucouazzre'))
        .catch( error => { error })
      }
    },
    /**
     * 
     * @param {*} param0 
     * @param {*} data 
     * PUT son commentaire
     */
    modifyComm( {commit}, data){
      console.log(data)
      if(localStorage.getItem('UserId') != data.commentaire.UserId ){
          
        alert("vous ne pouvez pas faire ça")

      }else {
       
      axios
        .put(`http://localhost:3000/groupomania/messages/${data.messageid}/comm/${data.commentaire.id}`, {
          texte: data.commentaire.texte,
          imageComm: data.commentaire.imageComm},
          {
            headers:{
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          }  
        )
        .then(()=>{
          commit('MODIF_COMM')
          console.log(data.commentaire)
        })
        .catch( error => { error })
      }
    }
  },
  modules: {
  }
})
