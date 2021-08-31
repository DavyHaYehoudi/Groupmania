module.exports = {
    HOST: "192.168.64.2",
    USER: "davy",
    PASSWORD: "davy",
    DB: "groupmania",
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };