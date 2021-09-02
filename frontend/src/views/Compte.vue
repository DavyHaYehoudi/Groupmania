<template>
    <main class="container">    
        <div class="row justify-content-center">
            <div class="col-10">
                 <!-- div contenant le titre -->
                <div class="col-12">
                    <h1 class="my-2 btn btn-block font-weight-bold" style="cursor:default">Vous consultez votre compte</h1>
                    
                </div>
                <section id="filPrincipal" class="row">
                    <div class="col-12">
                         <!-- bloc utilisateur -->
                        <div class="card bg-light my-3 class=center-block" style="float:none;">
                            <div class="card-header">
                                <div class="row justify-content-around">
                                    <p class="m-1"> Bonjour {{ nameCurrentUser }} ! </p>
                                    <button type="submit" value="Se déconnecter" class="logout" @click="localClear"> Se déconnecter</button>
                                </div>
                            </div>
                            <div class="card-body mx-auto">
                                <div class="btn-info rounded p-3" style="cursor:default"><button class="rounded p-2" style="cursor:default"><span class="m-3 font-weight-bold">Depuis cette page vous pouvez supprimer votre compte. La suppression de votre compte entrainera également la suppression de tous les commentaires et les images que vous avez postés.</span></button></div>
                            </div>
                            <div class="card-body mx-auto">
                                <div class="btn-danger rounded p-3" style="cursor:default"><button @click="deleteMyAccount(id)" class="rounded p-2"><span class="m-3 font-weight-bold">SUPPRIMER VOTRE COMPTE</span><img src="../assets/poubelle.svg"/></button></div>
                            </div>
                        </div> 
                    </div>  
                </section>
            </div>
        </div>
    </main>
</template>


<script>

import axios from "axios";
import router from "../router";


export default {
    name: "Compte",
    components: {
      
    },
    data() {
        return {
            isAdmin: false,
            nameCurrentUser: "",
            creation: "",
            id: ""
        }
    },
    created: function() {        
        let self        = this;
        axios.get("http://localhost:3000/api/user/profil/", { headers: {"Authorization": "Bearer " + localStorage.getItem("token")} })
        .then(res => {  
            self.isAdmin            = res.data.isAdmin;
            self.nameCurrentUser    = res.data.pseudo;
            self.id                 = res.data.id;     
        })
        .catch((error)=> { console.log(error) 
        });    
    },
    methods: {
        localClear() {
            localStorage.clear();
            router.push({ path : "/connexion" });
        },
        deleteMyAccount() {
            let confirmUserDeletion = confirm("Voulez-vous vraiment supprimer votre compte ?");
            if (confirmUserDeletion == true) {
                axios.delete("http://localhost:3000/api/user/delete/", {headers: { "Authorization": "Bearer " + localStorage.getItem("token") },})
                .then((res)=> {
                    console.log(res);
                    alert('Cliquez sur ok et l\'utilisateur sera supprimé');
                    router.replace("http://localhost:3000/api/user/connexion")
                })
                .catch((error) => { 
                    console.log(error)
                })
            } else {
                return 
            }
        },
    }
}
</script>

<style scoped>

.logout {
   background-color: rgb(0, 119, 255);
    border-radius: 1rem;
    font-weight: bold;
    transform: scale(1);
    transition: 400ms;
}

.logout:hover {
    transform: scale(1.15);
    color: white;
}

.btn-block, .btn-info {
    background-color: black;
    color: white;
}
</style>