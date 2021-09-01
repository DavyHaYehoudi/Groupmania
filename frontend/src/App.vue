
<template>
  <main>
    <div id="nav">
      <router-link v-if="UserId || isAdmin"  to="/accueil">Accueil</router-link> |
      <router-link v-if="!UserId" to="/inscription">Inscription</router-link> |
      <router-link v-if="!UserId"  to="/connexion">Connexion</router-link> 
      <router-link v-if="UserId || isAdmin" to="/compte">Mon compte</router-link> |
      <router-link v-if="UserId || isAdmin"  to="/forum">Forum</router-link> 
      <router-link v-if="isAdmin"  to="/admin">Administrateur</router-link> 
    </div>
    <router-view/>
  </main>
</template>

<script>
  import axios from "axios";
export default {
  data() {
    return {
      UserId: "",
      isAdmin: false,
    }
  },
  created() {
       this.UserId = localStorage.getItem('userId') ? localStorage.getItem('userId') : "";

       if(localStorage.getItem("token")) {
         axios.get("http://localhost:3000/api/user/profil", { headers: {"Authorization": "Bearer " + localStorage.getItem("token")} })
          .then(res => { 
              this.isAdmin = res.data.isAdmin;
          })
          .catch((error)=> { console.log(error) 
          })

       }

  },

  methods: {
    
    },
  computed: {
    
  }

}

</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>