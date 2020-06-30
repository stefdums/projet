import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex, axios)

export default new Vuex.Store({
  state: {
    messages: [],
    message: null,
    users:[]
  },
  getters:{

  },

  mutations: {
    SET_GET_ALL (state, messages){
      state.messages = messages
    },
    SET_GET (state, message){
      state.message = message
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
      //  recherche adresse de la page actuelle
      //let url = window.location.search;
      //let searchUrl = new URLSearchParams(url);
      // recuperation de la valeur associée à id
      //let id = searchUrl.get("id");
      //console.log(id)
      axios
        .get(`http://localhost:3000/groupomania/messages/${messageId}`)
        .then( response => {
        let message = response.data  
        
        commit('SET_GET', message)

        })
        .catch( error => { error })
      
    }


  },
  modules: {
  }
})
