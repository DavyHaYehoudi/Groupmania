const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.post = require("./post.model.js")(sequelize, Sequelize);
db.commentaire = require("./comment.model.js")(sequelize, Sequelize);
db.users = require("./user.model.js")(sequelize, Sequelize);

// Relation entre l'utilisateur et son post

db.post.belongsTo(db.users, {
  allowNull: false,
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
});

db.users.hasMany(db.post, {
allowNull: false,
});

// Relation entre l'utilisateur et son commentaire
db.users.hasMany(db.commentaire, {
  onDelete: "CASCADE",
});

db.commentaire.belongsTo(db.users);

// Relation entre le post et son commentaire
db.post.hasMany(db.commentaire, {
  allowNull: false,
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
});

db.commentaire.belongsTo(db.post);

module.exports = db;