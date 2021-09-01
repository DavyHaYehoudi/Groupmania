const modele = require('../models');
const Comment = modele.commentaire;
const Op = modele.Sequelize.Op;
const fs = require('fs');




//Création d'un message
exports.createComment = async (req, res)=> {
    try {
        let commentData = {
            ...req.body,
            UserId: res.locals.userId
        };

        console.log(commentData);
        let comment = await Comment.create(commentData);
        
        if(!comment) { throw "La création du commentaire s'est déroulée avec succès !"}
        res.status(201).json(comment);
    } catch (error) {
        res.status(500).json({error: error || "La création du commentaire n'a pas abouti."})
    }

}


exports.readOneComment = async (req,res) => {
    let id= req.body.PostId
    Comment.findByPk(req.params.id, {include: [ "User"] })
    .then(commentaire=> {
        if(!commentaire){throw "Le commentaire n'a pas été trouvé."}
        res.status(200).json(commentaire);
    }) .catch(error=> {
        res.status(404).json({error: error || "Le commentaire n'a pas été trouvé."})
    })
}


//Lire tous les messages publiés
exports.getAllCommentsForPostId = async (req,res) => {
    let id = req.params.id;
    Comment.findAll({where: {PostId: {[Op.like]: `%${id}%`} } ,include: ["User"] })
    .then(comment=> {
        console.log("REUSSI!!!")
        res.status(200).json(comment);
    }) .catch(error=> {
        res.status(404).json({error: error || "Le post n'a pas été trouvé."})
    })
}
//Lire tous les messages publiés
exports.readAllComments = async (req,res) => {

    Comment.findAll({include: ["User"] })
    .then(comment=> {
        res.status(200).json(comment);
    }) .catch(error=> {
        res.status(404).json({error: error || "Le post n'a pas été trouvé."})
    })
}

//Ne supprimer qu'un commentaire en particulier 
//2 cas : avec/sans fichier associé
exports.deleteOneComment = async (req,res) => {
    Comment.findByPk(req.params.id)
    .then(comment=> {
        //SANS FICHIER
        if(!comment){throw "Le commentaire n'a pas été trouvé."}
   
        Comment.destroy({where: {id:req.params.id} })
        .then(num=> {
            if(num[0] === 0) {throw "Le commentaire n'a pas pu être supprimé."}
            res.status(200).json({message: "Le commentaire a été supprimé !"})
        })
        .catch(error => {
            res.status(500).json({error :error || "Le commentaire n'a pas été trouvé."})
        })
    }) .catch(error=> {
        res.status(404).json({error: error || "Le commentaire n'a pas été trouvé."})
    })
}