import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex, axios)

export default new Vuex.Store({
  state: {
    users:[],
    messages: [],
    message: null,
    commentaires: []

    
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
    SET_GET_COMMS (state, commentaires){
      state.commentaires = commentaires
    }
  },
  actions: {
    getAllMessages ({ commit }) {
      axios
        .get('http://localhost:3000/groupomania/messages')
        .then( response => {
        let messages = response.data  
        commit('SET_GET_ALL', messages)
        })
        .catch( error => { error })
 
    },
    getMessage ({ commit }, messageId){
      axios
        .get(`http://localhost:3000/groupomania/messages/${messageId}`)
        .then( response => { 
          let message = response.data         
          commit('SET_GET', message)
        })
        .catch( error => { error })
      
    },
    // getAllComms ({ commit }, messageId){
    //   axios
    //     .get(`http://localhost:3000/groupomania/messages/${messageId}/comm`)
    //     .then (response => {
    //       let commentaires = response.data
    //       commit('SET_GET_COMMS', commentaires)
    //     })
    //     .catch ( error => { error })
    // }


  },
  modules: {
  }
})
