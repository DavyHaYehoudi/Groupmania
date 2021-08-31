module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("User", {
        pseudo: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        email: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true
        },
        password: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        picture: {
          type: Sequelize.STRING
        },
        isAdmin: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
        }
    });
  
    return User;
  };
