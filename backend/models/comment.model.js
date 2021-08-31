
module.exports = (sequelize, Sequelize) => {
    const Commentaire = sequelize.define("Commentaire", {
    
      commentaire: {
        type: Sequelize.STRING,
        allowNull: false
      },
      
    });
  
    return Commentaire;
  };