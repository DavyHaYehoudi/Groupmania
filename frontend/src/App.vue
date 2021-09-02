
<template>
  <main>
    <div id="nav">
      <router-link v-if="!UserId" to="/inscription" class="onglet">Inscription</router-link> 
      <router-link v-if="!UserId"  to="/connexion" class="onglet">Connexion</router-link> 
      <router-link v-if="UserId || isAdmin" to="/compte" class="onglet">Mon compte</router-link> 
      <router-link v-if="UserId || isAdmin"  to="/forum" class="onglet">Forum</router-link> 

      <p><img class="logoG" src="./assets/icon-left-font-monochrome-black.svg"/></p>
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
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.onglet {
  border:4px solid black;
  box-shadow: 5px 5px 5px black;
  border-radius: 1rem;
  padding: 5px;
  font-size: 1.5rem;
  font-weight: bold;
  max-height: 60px;
}

#nav {
margin-top: 50px;
margin-bottom: 50px;
display: flex;
justify-content: space-around;
flex-wrap: wrap;

}

.logoG {
  width: 100%;
}

@media screen and (max-width:736px){
  .logoG {
  margin-top:50px;
}
}
</style>