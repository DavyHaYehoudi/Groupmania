<template>
    <main class="container">
         <!-- une seule section contenant le module de connexion -->
        <section class="col-12 col-md-8 mt-5 mx-auto p-3 bg-light rounded">  
            <form @submit.prevent="handleSubmit">
                <p class="text-center"></p>
                <h1 class="text-center font-weight-bold" style="font-size:4vw;">CONNEXION</h1>
                <div class="form-group mt-3">
                    <label for="inputEmail">Email:</label>
                    <input v-on:keydown="isInvalid = false" v-model="inputEmail" type="email" class="form-control" id="inputEmail" aria-describedby="emailHelp" placeholder="Votre email">    
                </div>
                <div class="form-group mt-3">
                    <label for="inputPassword">Mot de passe:</label>
                    <input v-on:keydown="isInvalid = false" v-model="inputPassword" type="password" class="form-control" id="inputPassword" aria-describedby="passwordHelp" placeholder="Votre mot de passe">                        
                </div>
                <button type="submit" class="btn btn-primary mt-5 w-100 shadow contrastBoutonVert font-weight-bold">SE CONNECTER</button>
            </form>
        </section>
        <div v-show="isInvalid" class="invalidBox m-3" key="invalid">
            Veuillez vérifier vos informations de connexion.
        </div>  
        <div class=' col-8 mx-auto mt-3'>
            <router-link to="/inscription"><button  class=' text-white p-2 w-100 border-0 rounded shadow contrastBoutonInscription font-weight-bold'>Créer un compte</button></router-link>
        </div>
    </main>
</template>

<script>
import axios from "axios";
import router from "../router";


export default {
    name: "Accueil",
    data() {
        return {
            inputEmail: "",
            inputPassword: "",
            isInvalid: false
        }
    },
    methods: {
        handleSubmit() {

            if ( !this.inputEmail || !this.inputPassword ) {
                    return this.isInvalid = true;
                }

            axios.post("http://localhost:3000/api/user/login", { 
                email :     this.inputEmail,
                password:   this.inputPassword
             })
            .then(function (res) {
                localStorage.setItem("token",   res.data.token)
                localStorage.setItem("userId",  res.data.userId)
                localStorage.setItem("userName",res.data.userName)
                window.alert('Connexion établie, vous êtes dirigé vers le fil d\'actualité');
                router.push({ path : 'forum'});
            })
            .catch((error) => {
                this.isInvalid = true;
                console.log(error);
            })         
        }
    }
}    
</script>

<style scoped>
.contrastBoutonInscription{
  background-color: rgb(0, 119, 255);
}

.contrastBoutonVert{
    background-color: black;
}

</style>