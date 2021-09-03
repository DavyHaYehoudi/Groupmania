  <template>
    <main class="container">
         <!-- un seul bloc pour la creation de commentaire -->
        <section class="row card bg-light m-5 p-3">
            <form enctype="multipart/form-data">
                <div class="header">
                    <h1  class="btn btn-dark" style="cursor:default">
                        Vous commentez la publication numéro <span class="badge font-weight-bold badge-light"> {{ callNumber() }}</span>
                    </h1>
                </div>
                <div class="row">
                    <div class="col-12 justify-content-center form-group">
                        <textarea v-on:keydown="isInvalid = false"  class="form-control" v-model="newComment" id="newComment" name="comment" rows="8" placeholder=" Saisissez votre commentaire ici. (1500 caractères max) "></textarea>
                    </div>
                </div>
                <div class="footer col-10 mx-auto align-content-center">
                    <div><button type="submit" @click.prevent="send()" class="btn btn-dark font=weight-bold btn-block m-2 p-2">Valider</button></div>
                    <router-link to="/forum"> <div> <a class="btn btn-danger btn-block m-2 p-2">Annuler/Retour</a></div></router-link> 
                </div>
                <div v-show="isInvalid" class="invalidBox m-2" key="invalid">
                    <p> Vous devez renseigner la case " Saisissez votre commentaire ici en respectant les instructions (1500 caractères maximum) "</p>
                </div>  
            </form>
        </section>
    </main>
</template>

<script>
import axios from "axios";
import router from "../router";


export default {
    name: "CreateComment",
     data() {
        return {
            isAdmin: false,
            currentUserId: "", 
            newComment: "",
            comments: [],
            isInvalid: false
        }
    },
    methods: {
        callNumber() {
            return localStorage.getItem('MessageId')
        },
        send() {

            if (!this.newComment || !localStorage.getItem("userId") || !localStorage.getItem("MessageId" || this.newComment.length > 1500)) {
                this.isInvalid = true;
            } else {

                let UserId      = localStorage.getItem("userId");
                let comment     = this.newComment.toString();
                let MessageId   = localStorage.getItem("MessageId");

                let commentaire = {
                    commentaire: comment,
                    UserId: UserId,
                    PostId: MessageId
                }

                axios.post("http://localhost:3000/api/comment/createComment/", commentaire, { headers: { "Authorization":"Bearer " + localStorage.getItem("token")}})
                .then(()=> {
                    this.UserId = ""
                    this.newMessage = ""
            
                    alert('Commentaire Posté!')
                    router.push({path : 'Comment'})
                    
                })
                .catch((error)=>{
                    console.log(error);
                })
            }
        }
    }
}
</script>

<style scoped>
.logout {
    background-color: rgb(128, 165, 42);
    font-weight: bold;
    border-radius: 1rem;
    transform: scale(1);
    transition: 400ms;
}

.logout:hover {
    transform: scale(1.15);
    color: white;
}
</style>