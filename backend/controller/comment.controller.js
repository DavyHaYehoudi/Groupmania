const modele = require('../models');
const Comment = modele.commentaire;
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