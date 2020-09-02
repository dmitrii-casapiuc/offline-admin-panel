const Sequelize = require('sequelize')
const sequelize = require('../config/database')

const song = sequelize.define('Song', {
  id: {
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: Sequelize.INTEGER
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  tonality: {
    type: Sequelize.STRING,
    allowNull: false
  },
  lyrics: {
    type: Sequelize.TEXT,
    allowNull: false
  }
})

module.exports = song
