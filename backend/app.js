const express = require("express");
const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');
const commentRoutes = require('./routes/comment');
const path= require('path');
const cors = require('cors');

//import des USER-CREATED modules 
const db = require('./models');
const testConnexion = require('./models/db')

const app = express();
//testConnexion;
//{force:true}

//Synchronisation de sequilize avec l'app
db.sequelize.sync()
.then(()=> console.log("Connexion à mysql réussie !"))
.catch((error)=> console.error(error))
 

// Traitement des données en Json du frontend (parse requests of content-type - application/json)
app.use(express.json());

// Traitement des données en font-data du frontend (parse requests of content-type - application/x-www-form-urlencoded)
app.use(express.urlencoded({ extended: true }));


// Middleware Header pour contourner les erreurs en débloquant certains systèmes de sécurité CORS, afin que tout le monde puisse faire des requêtes depuis son navigateur. A noter qu'on ne précise pas d'adresse en 1er paramètre afin que ce middleware s'applique à toutes les routes.
app.use((req, res, next) => {
  //On indique que les ressources peuvent être partagées depuis n'importe quelle origine
  res.setHeader('Access-Control-Allow-Origin', '*');
  //On indique les entêtes qui seront utilisées après la pré-vérification cross-origin afin de donner l'autorisation
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  //On indique les méthodes autorisées pour les requêtes HTTP
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});
 
// app.use(cors(corsOptions));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "page du backend" });
});

app.use('/api/user', userRoutes);
app.use('/api/post', postRoutes);
app.use('/api/comment', commentRoutes);

app.use('/images', express.static(path.join(__dirname, 'images')));

module.exports = app;