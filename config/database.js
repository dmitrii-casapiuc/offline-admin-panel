const Sequelize = require('sequelize')
const keys = require('./keys')

const sequelize = new Sequelize(keys.db, {
  dialect :"postgres",
  ssl: true,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
    keepAlive: true
  }
})

module.exports = sequelize
