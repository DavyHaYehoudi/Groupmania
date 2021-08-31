const bcrypt = require('bcrypt');
const modele = require('../models');
const jwt = require('jsonwebtoken');
const User = modele.users;




exports.signUp = async (req, res) => {
    try {
        //Conditions validité du mot de passe
  if (!/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.{6,})/.test(req.body.password)) {  
    return res.status(401).json({ error: 'Le mot de passe doit contenir une lettre majuscule, une minuscule et au moins 1 chiffre (6 caractères minimum)' });
  } else {
        let hash = await bcrypt.hash(req.body.password, 10);
        let userData = {
            ...req.body,
            password: hash,
            isAdmin: req.body.isAdmin ? req.body .isAdmin : false ,
            picture: `${req.protocol}://${req.get('host')}/images/Davy.jpeg`
        }
        let user = await User.create(userData);
        console.log(user);
        if(!user) { throw "La création de votre profil n'a pas pu s'effectuer."}
        res.status(201).json(user);
    }
        } catch (error) {
            res.status(500).json({error: error || "Echec de création de profil."})
        }
}

exports.signIn = async (req, res) => {
    // Vérification des données
    try {
        let user = await User.findOne({where: {email: req.body.email}})
        console.log(user);
        if(!user) { throw "Utilisateur non trouvé."}
        let valid = await bcrypt.compare(req.body.password,user.password);
        if(!valid) { throw "Mot de passe incorrect."}

        res.status(200).json({
            userId: user.id,
            token: jwt.sign(
                {userId: user.id},
                "token",
                {expiresIn: '24h'}
            )
        });
    } catch (error) {
        res.status(500).json({error: error || "Echec de connexion à votre compte."})
    }
}


//Profil d'un user
exports.userProfil = (req, res) => {
    //récupération de l'id de l'user
    let id = res.locals.userId;
    console.log(id);
    User.findOne({
        attributes: ['id', 'email', 'pseudo','isAdmin'],
        where: { id: id},
    })
        .then(user => res.status(200).json(user))
        .catch(error => res.status(500).json(error))
}



//Suppression d'un compte
exports.deleteProfile = (req, res) => {
    //récupération de l'id de l'user
    let userId = res.locals.userId;
    //Recherche sécurité si user existe bien
    if (userId != null) {
        User.findOne({
            where: { id: userId }
        })
            .then(user => {
                if (user != null) {
                    //Suppression de tous les posts de l'user même s'il n'y en a pas
                    User
                        .destroy({
                            where: { id: user.id }
                        })
                        .then(() => res.status(200).json({message: "Utilisateur supprimé !"}))
                        .catch(err => console.log(err))
                    
                }
                else {
                    res.status(401).json({ error: 'Cet utilisateur n\'existe pas' })
                }
            })
    } else {
        res.status(500).json({ error: 'Impossible de supprimer ce compte, contactez un administrateur' })
    }
}


//Déconnection d'un utilisateur
module.exports.logout = (req, res) => {
    localStorage.removeItem("token")
    res.redirect('/login');
  }