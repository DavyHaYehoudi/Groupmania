<!--  Page qui represente la vue sur une image en particulier, avec ses commentaires si il y a -->

<template>
    <main class="container">  
         <!-- titre -->
        <div class="row mb-4 rounded">
            <p class="col-12 my-2 btn  btn-block  badgeTopColor font-weight-bold" >Vous consultez les commentaires</p>  
           
        </div>
        <div class="row">
            <!-- bloc utilisateur -->
            <article id="panelComment" class="col-12 col-md-4" > 
                <div class="card mb-3">
                    <div class="card-header">
                        <div class="row justify-content-around">
                            <p class="text-center p-2"> Bonjour  {{ nameCurrentUser }} ! </p>
                            <button type="button" value="Se déconnecter" class="logout" @click="localClear">Se déconnecter</button>
                        </div>
                    </div>
                    <div class="card-body">
                        <div id="compteButton" class="text-center">
                            <button v-if="isAdmin" type="button" class=" btn btn-danger mx-auto rounded p-2 buttonsPanel">ADMINISTRATEUR</button> 
                        </div>
                    </div>
                    <div class="justify-content-center align-self-center">
                        <router-link to='/Create' ><button type="button" class="btn btn-dark  rounded m-2 p-2 font-weight-bold ">Créer un message</button></router-link>
                    </div>
                    <div class="justify-content-center align-self-center">
                        <router-link to='/CreateComment'><button type="button" class="btn btn-dark  m-2 p-2 rounded font-weight-bold" >Commenter</button></router-link>
                    </div>
                </div>
            </article>
            <!--Section message -->
            <section class="card col-12 col-md-8 bg-light mb-3">
                <div id="intituleComment" class="card-header bg-light d-flex align-items-center justify-content-between m-0 p-1">
                    <h6 class=" text-dark text-bold  p-1" > 
                        Posté par {{ messageUserName }}
                        le {{ creation }}
                    </h6>
                    <h5>{{title}}</h5>
                </div>
                <div>
                    <p class="text-center"> 
                        <router-link to='/Comment'><img :src="messageUrl" v-if="messageUrl !== '' " class="border messImage" id="picture" alt="image utilisateur"
                    ></router-link>
                    </p>                          
                </div> 
                <div class="row justify-content-between p-3">
                    <div> 
                        <div>   {{ message }} </div> 
                    </div> 
                    <div v-if="isAdmin || messageUserId == currentUserId">
                        <button @click="deleteMessage(messageId, messageUserId, currentUserId)" class="border-0">Supprimer<img class="poubelle" src="../assets/poubelle.svg"/></button>
                    </div>
                    <div v-if="isAdmin || messageUserId == currentUserId">
                        <button @click="modifMessage(messageId, messageUserId, currentUserId)" class="border-0">Modifier</button>
                    </div>
                </div>
            </section> 
        </div>
         <!-- section commentaire(s) -->
        <section class="row">
            <div v-for="comment in comments" :key="comment" class="card col-12 mt-3">
                <div class="card-header ">
                    <p class="btn btn-dark w-100" style="cursor:default">Commentaire rédigé le {{ comment.createdAt.slice(0,10).split('-').reverse().join('/') }}  par {{ comment.User.pseudo}}</p>
                </div>
                <div class="card-body border bg-dark text-white text-right rounded mx-2">
                    <p>  {{ comment.commentaire}} </p>
                </div>
                <div class="card-footer row justify-content-between">
                    <div v-if="isAdmin || comment.UserId == currentUserId">
                        <button @click="deleteComment(comment.id, comment.UserId, currentUserId)" class="border-0">Supprimer<img class="poubelle" src="../assets/poubelle.svg"/></button>
                    </div>
                </div>
            </div>
        </section>
    </main>
</template>

<script>
import axios from "axios";
import router from "../router";

export default {
    name: "Comment",
    components: {
      
    },
    data() {
        return {
            isAdmin: false,
            comments: [],
            creation: "",
            title: "",
            messageUserName: "",
            messageUserId: "",
            message: "",
            messageId: "",
            messageUrl: "",
            nameCurrentUser: "",
            currentUserId: "",
            creationUser: ""
        }
    },
    created: function() {        
        let MessageId   = localStorage.getItem('MessageId');
        let self        = this;
        axios.get("http://localhost:3000/api/post/" + MessageId,  { headers: {"Authorization": "Bearer " + localStorage.getItem("token")} })
        .then((res) => {
            console.log(res)
            self.creation           = res.data.createdAt.slice(0,10).split("-").reverse().join(".");
            self.title = res.data.title;
            self.messageUserName    = res.data.User.pseudo;
            self.messageUserId      = res.data.UserId;
            self.message            = res.data.message;
            self.messageId          = res.data.id; 
            self.messageUrl         = res.data.picture  
        })
        .catch((error)=>{
            alert(error)
        })
        
        axios.get("http://localhost:3000/api/user/profil", { headers: {"Authorization": "Bearer " + localStorage.getItem("token")} })
        .then(res => { 
            console.log("ICIIIII");
            console.log(res);
            self.isAdmin                = res.data.isAdmin;
            self.nameCurrentUser        = res.data.pseudo;
            self.creationUser           = res.data.createdAt.slice(0,10).split("-").reverse().join(".");
            self.currentUserId          = res.data.id
        })
        .catch((error)=> { console.log(error) 
        })  
        axios.get("http://localhost:3000/api/comment/post/" + MessageId,  { headers: {"Authorization": "Bearer " + localStorage.getItem("token")} })
        .then( function (res) {
            self.comments = res.data;  
            console.log(self.comments)
        })
        .catch((error) => {console.log(error)
        });
    },
    methods: {

        localClear() {
            localStorage.clear();
            router.push({ path : "/connexion" });
        },
        deleteMessage(messageId) {
            let confirmMessageDeletion = confirm("Veuillez confirmer la suppression.");
            if (confirmMessageDeletion == true) {
                axios.delete("http://localhost:3000/api/post/" + messageId, {
                    headers: { 
                        "Authorization": "Bearer " + localStorage.getItem("token") 
                    },
                    
                    })
                .then((res)=> console.log(res))
                .catch((error) => { 
                    console.log("ligne 133 " + error)})
                    alert("La suppression du message entraîne celle de ses commentaires.")
                    router.push({ path : "/forum" });
            } else {
                return
            }

        },
        deleteComment(commId) {

            let confirmCommentDeletion = confirm("Etes-vous sûr de vouloir suppimer votre commentaire ?");
            if (confirmCommentDeletion == true) {
                axios.delete("http://localhost:3000/api/comment/deleteComment/"+commId, {
                headers: { 
                        "Authorization": "Bearer " + localStorage.getItem("token") 
                    },
                })
                .then((res)=> {
                    console.log(res);
                    alert('Veuillez confirmer la suppression du commentaire.');
                    location.reload();
                })
                .catch((error) => { 
                    console.log(error)
                })
            } else {
                return 
            }
        },
        modifMessage() {
            router.push({ path : '/postedit'});
            
        }
    }
}
</script>

<style  >
#picture { 
    width:100%;
    object-fit: cover;
}
</style>

<style scoped>
.logout {
    background-color: rgb(0, 119, 255);
    border-radius: 1rem;
    transform: scale(1);
    transition: 400ms;
    font-weight: bold;
}

.logout:hover {
    transform: scale(1.15);
    color: white;
}

.btn-block {
    color: white;
    background-color: black;
}

.poubelle {
width: 1rem;
margin-left: 10px;
}

.border-0 {
    font-weight: bolder;
    border-radius: 1rem;
    padding: 5px 10px;
    background-color: rgb(197, 191, 191);
    transform: scale(1);
    transition: 400ms;
}

.border-0:hover {
    background-color: rgb(0, 119, 255);
    color: white;
    transform: scale(1.15);
}

</style>