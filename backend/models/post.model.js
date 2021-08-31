
module.exports = (sequelize, Sequelize) => {
    const Post = sequelize.define("Posts", {
      title: {
        type: Sequelize.STRING,
        allowNull: false
      },
      message: {
        type: Sequelize.STRING,
        allowNull: false
      },
      picture: {
        type: Sequelize.STRING
      },
    });
  
    return Post;
  };