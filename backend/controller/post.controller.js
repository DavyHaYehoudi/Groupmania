
const modele = require('../models');
const Post = modele.post;
const fs = require('fs');


//Création d'un message
exports.createPost = async (req, res)=> {
    try {
        let postData = req.file ? 
        {
            ...JSON.parse(req.body.post),
            UserId: res.locals.userId,
            picture: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        }: {
            ...req.body,
            UserId: res.locals.userId
        };

        console.log(postData);
        let post = await Post.create(postData);
        
        if(!post) { throw "La création du post s'est déroulée avec succès !"}
        res.status(201).json(post);
    } catch (error) {
        res.status(500).json({error: error || "La création du post n'a pas abouti."})
    }

}

//Lire tous les messages publiés
exports.readAllPost = async (req,res) => {

    Post.findAll({include: ["Commentaires", "User"] })
    .then(posts=> {
        res.status(200).json(posts);
    }) .catch(error=> {
        res.status(404).json({error: error || "Le post n'a pas été trouvé."})
    })
}


//Ne lire qu'un message en particulier
exports.readOnePost = async (req,res) => {
    Post.findByPk(req.params.id, {include: ["Commentaires", "User"] })
    .then(post=> {
        if(!post){throw "Le post n'a pas été trouvé."}
        res.status(200).json(post);
    }) .catch(error=> {
        res.status(404).json({error: error || "Le post n'a pas été trouvé."})
    })
}


//Ne supprimer qu'un message en particulier 
//2 cas : avec/sans fichier associé
exports.deleteOnePost = async (req,res) => {
    Post.findByPk(req.params.id)
    .then(post=> {
        //SANS FICHIER
        if(!post){throw "Le post n'a pas été trouvé."}
        else if(!post.picture) {
            Post.destroy({where: {id:req.params.id} })
            .then(num=> {
                if(num[0] === 0) {throw "Le post n'a pas pu être supprimé."}
                res.status(200).json({message: "Le post a été supprimé !"})
            })
            .catch(error => {
                res.status(500).json({error :error || "Le post n'a pas été trouvé."})
            })
        } else {
            //AVEC FICHIER
            let filename = post.picture.split("/images/")[1];
            fs.unlink(`images/${filename}`, err=> {
                try {
                    if(err) {throw err}
                } catch (error) {
                    res.json({error: error})
                }
                Post.destroy({where: {id:req.params.id} })
                .then(num=> {
                    if(num[0] === 0) {throw "Le post n'a pas pu être supprimé."}
                    res.status(200).json({message: "Le post a été supprimé !"})
                })
                .catch(error => {
                    res.status(500).json({error :error || "Le post n'a pas été trouvé."})
                })
            })
              
        }
    }) .catch(error=> {
        res.status(404).json({error: error || "Le post n'a pas été trouvé."})
    })
}


  //Modification d'un post
exports.update = (req, res) => {
    let userId= res.locals.userId;
    let postDta = req.file ? {
        ...req.body.post,
        UserId: userId,
        picture: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`

    } : {
        ...req.body,
        UserId: userId
    }
    
    Post.update(postDta,{where: {id: req.params.id}})
    .then(num => {
        if(num == 1){ res.status(200).json({message: "La mise à jour du post a bien été effectuée !"})}
        throw "La mise à jour a échoué"
    }).catch(error=> res.status(500).json({error: error}))
}