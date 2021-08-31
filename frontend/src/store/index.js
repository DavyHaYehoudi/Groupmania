//import { createStore } from 'vuex'

// export default createStore({
//   state: {
//   },
//   mutations: {
//   },
//   actions: {
//   },
//   modules: {
//   }
// })
// import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

// Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      pseudo: '',
      userId: '',
      email: '',
      Photo:'',
      token: null,
      isAdmin: false
    },
    editOption: ""
  },
  mutations: {
    saveUserInfos(state, [pseudo, userId, email,Photo, isAdmin]) {
          state.user.pseudo = pseudo,
          state.user.userId = userId,
          state.user.email = email,
          state.user.Photo = Photo,
          state.user.token = localStorage.getItem('token'),
          state.user.isAdmin = isAdmin
    },
    editStyle(state, value) {
      state.editOption = value
    }
  },
  actions: {
    getUserInfos(context) {
      axios
        .get("http://localhost:3000/api/user/profil", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token")
          }
        })
        //.get("http://localhost:3000/api/post",this.$store.state.headerParams)
        .then(response => {
          console.log('réponse API',response);
          context.commit('saveUserInfos',[response.data.pseudo, response.data.id, response.data.email, response.data.isAdmin])
        })
        .catch(error => {
          console.log(`Erreur d'authentification`, error); //N'affiche pas le message 'normalement' envoyé par le back
        });
    },
    changeEditStyle(context, value){
      context.commit('editStyle',value)
    }
  },
  modules: {
  }
})
