<template>
    <main class="container">    
        <div class="col-12">
            <div class="col-12 ">
                <h1 v-if= 'this.messages.length !== 0' class="col-12 my-2 btn  btn-block font-weight-bold">Dernières Publications</h1>   
                <h1  v-else class='col-12 my-2 btn  btn-block btn-danger font-weight-bold' style="cursor:default"> Aucune publication pour l'instant, soyez le premier à en créer une ! </h1>
            </div>
            <section id="filPrincipal" class="row">
                 <!-- bloc utilisateur -->
                <article class="col-12 col-md-4">
                    <div class="card bg-light my-3 class=center-block" style="float:none;">
                        <div class="card-header">
                            <div class="row justify-content-around">
                                <p class="m-1"> Bonjour {{ name }} ! </p>
                                <button type="button" @click="localClear" class="logout">Se déconnecter</button>
                            </div>
                        </div>
                        <div class="card-body">
                            <div id="compteButton" class="text-center">
                                <button v-if="isAdmin" type="button" class=" btn btn-danger mx-auto rounded p-2 buttonsPanel">ADMINISTRATEUR</button>
                            </div>
                        </div>
                        <div id="publicationButton" class=" card-body text-center">
                            <router-link to='/Create' ><button type="button" class="btn btn-dark mx-auto p-2 rounded buttonsPanel">Créer un message</button></router-link>
                        </div>
                    </div>                  
                </article>
                 <!-- bloc avec tous le(s) message(s) -->
                <sub class="col-12 col-md-8">
                    <div v-for="message in messages" :key="message.id" class="card bg-light my-3">
                        <div id="intitulePost" class="card-header bg-light d-flex align-items-center justify-content-between m-0 p-1">
                            <h6 class=" text-dark text-bold  p-1" >
                                Posté par {{ message.User.pseudo}}
                                le {{ message.createdAt.slice(0,10).split('-').reverse().join('.') + ' à ' + message.createdAt.slice(11,16) }}
                            </h6>
                            <h5>{{message.title}}</h5>
                        </div>
                        <div class="btn " @click="commentPage(message.id)">
                            <img :src="message.picture" v-if="message.picture !== '' " class="border messImage" id ="picture" alt="image utilisateur" />
                        </div>
                        <div id="contentMessage" class="p-3"> 
                            <p id="contentParagraphe" v-if="isAdmin || message.UserId == id" class="ml-2">   {{ message.message }} </p> 
                        </div>
                        <div class="row card-footer justify-content-around">
                            <button @click="commentPage(message.id)" class="border-0"></button>
                            <div v-if="isAdmin || message.UserId == id">
                                <button @click="deleteMessage(message.id, message.UserId, id)" class="border-0"></button>
                            </div>
                        </div>                             
                    </div>                        
                </sub>
            </section>
        </div>
    </main>
</template>

<script>

import axios from "axios";
import router from "../router";

export default {
    name: "Forum",
    data() {
        return {
            isAdmin: false,
            messages: [],
            id: "",                 
            name: "",               
            creation: ""           
        }
    },

    created: function() {        
        axios.get("http://localhost:3000/api/post",  { headers: {"Authorization": "Bearer " + localStorage.getItem("token")} })
        .then((res) => {
            if (res) {
                const rep = res.data;
                this.messages = rep; 
                localStorage.setItem("MessageId", rep[0].id);
                console.log(this.messages)
            } else {
                console.log("aucun message")
            }
        })
        .catch((error)=>{
            console.log(error)
        })   
        let self = this;
        axios.get("http://localhost:3000/api/user/profil/", { headers: {"Authorization": "Bearer " + localStorage.getItem("token")} })
        .then(res => {  
            console.log(res)
            self.id                 = res.data.id;
            self.name               = res.data.pseudo
            self.isAdmin            = res.data.isAdmin;

        })
        .catch((error)=> { console.log(error) 
        });    
    },
    methods: {
        commentPage(m) {
            console.log(m);
            localStorage.setItem('MessageId', m);
            router.push({ path : "/comment" });
        },
        deleteMessage(a, b, c) {
            console.log(
                typeof a,
                typeof b,
                typeof c
            )
            let confirmMessageDeletion = confirm("Voulez-vous vraiment supprimer cette image, tous les commentaires associés seront également supprimés ?");
            if (confirmMessageDeletion == true) {
                axios.delete("http://localhost:3000/api/comment/deleteComment/", {
                    headers: { 
                        "Authorization": "Bearer " + localStorage.getItem("token") 
                    },
                    params: {
                        messageId:  a,
                        messageUid: b,
                        uid:        c
                    }
                    })
                .then((res)=> console.log(res))
                .catch((error) => { 
                    location.reload();
                    console.log("ligne 133 " + error)})
            } else {
                return
            }
        },
        localClear() {
            localStorage.clear();
            router.push({ path : "/connexion" });
        }
    }
}
</script>

<style  >

#picture { 
    width: 100%;
    max-height: 400px;
    object-fit: cover;
}

.logout {
    background-color: rgb(0, 119, 255);
    font-weight: bold;
    border-radius: 1rem;
    transform: scale(1);
    transition: 400ms;
}

.logout:hover {
    transform: scale(1.15);
    color: white;

}

.btn-block {
    color: white;
    background-color: black;
}
.btn-block:hover {
    color: white;
    background-color: black;
}

.btn-dark {
    transform: scale(1);
    transition: 400ms;
}
.btn-dark:hover {
background-color: rgb(0, 119, 255);
transform: scale(1.15);
}

#contentMessage {
    line-height: 1rem;
}
    
</style>

