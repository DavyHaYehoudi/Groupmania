  <template>
    <main class="container"> 
        <!-- Un seul bloc pour le contenu creation message -->
        <section class="row card bg-light m-5 p-3">
            <form enctype="multipart/form-data">
                <div class="header p-1">
                    <h1  class="btn btn-dark" style="cursor:default">
                        Créez un nouveau message !   
                    </h1>
                </div>
                <div class="row">
                    <div class="col-12 justify-content-center form-group">
                        <label for="title">Titre De votre publication.</label>
                        <input type="text" v-on:keydown="isInvalid = false" class="form-control" v-model="title" id="title" name="title" rows="8" placeholder="Saisissez votre Title. (100 caractères max)"/>
                    </div>
                    <div class="col-12 justify-content-center form-group">
                        <label for="newMessage">Description</label>
                        <textarea v-on:keydown="isInvalid = false" class="form-control" v-model="newMessage" id="newMessage" name="message" rows="8" placeholder="Saisissez votre message. (1500 caractères max)"></textarea>
                    </div>
                    <div class="col-12 justify-content-center text-center">
                        <img :src="newImage" class="w-50 rounded">
                        <p class="text-center">Formats acceptés: jpg, jpeg, png et gif.</p>
                    </div>
                    <div class="col-12 justify-content-center">
                        <div class="form-group justify-content-center">
                            <label for="File">Choisir une nouvelle photo</label>
                            <input @change="selectFile()" type="file" ref="file" name="image" class="form-control-file" id="File" accept=".jpg, .jpeg, .gif, .png">
                        </div>
                    </div>
                </div>
                <div class="footer col-10 mx-auto align-content-center">
                    <div><button type="submit" @click.prevent="send()" class="btn btn-dark btn-block m-2 p-2">Valider</button></div>
                    <router-link to="/forum"> <div> <a class="btn btn-danger btn-block m-2 p-2">Annuler</a></div></router-link> 
                </div>
                 <div v-show="isInvalid" class="invalidBox m-2" key="invalid">
                    <p>Vous ne pouvez pas envoyer de message vide. Il doit contenir aussi moins de 1500 caractères.</p>        
                </div>  
            </form>
        </section>
    </main>
</template>

<script>
import axios from "axios"
import router from "../router";

export default {
    name: "Create",
     data() {
        return {
            isAdmin: false,
            newImage: "",
            currentUserId: "", 
            newMessage: "",
            title: "",
            file: null,
            messages: [],
            isInvalid: false
        }
    },
    methods: {
       
        selectFile() {
            this.file = this.$refs.file.files[0];
            this.newImage = URL.createObjectURL(this.file)
        },
        send() {
            if (!this.title || !this.newMessage || this.newMessage > 1500 ) {
                    this.isInvalid = true;

                    console.log("ligne 69" + this.file)
            }
            if(this.file){
                let postData = {
                    title: this.title,
                    message: this.newMessage
                }
                const formData = new FormData()
                formData.append("image", this.file);
                formData.append("post", JSON.stringify(postData));
                axios.post("http://localhost:3000/api/post/", formData, 
                { headers: { 
                    "Authorization":"Bearer " + localStorage.getItem("token"),
                    "Content-Type": "multipart/form-data"
                    }})
                .then((response)=> {
                    console.log(response);
                    this.UserId = "";
                    this.newMessage = "";
                    this.newImage = null;
                    this.title = "";
                    
                    router.push({path : '/forum'});
                })
                .catch((error)=>{
                    console.log(error);
                })
            } else {
                let postData = {
                    title: this.title,
                    message: this.newMessage
                }
                axios.post("http://localhost:3000/api/post/", postData,
                {
                    headers: {
                        "Authorization": "Bearer " + localStorage.getItem("token"),
                        "content-Type": "Application/json"
                    }
                })
                .then(response=> {
                    console.log(response);
                    router.push({path : '/forum'});
                })
                .catch(error=>{console.log(error)})
            }
        }
    }
}
</script>