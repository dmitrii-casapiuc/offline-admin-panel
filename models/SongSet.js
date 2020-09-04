const Sequelize = require('sequelize')
const sequelize = require('../config/database')

const songSet = sequelize.define('SongSet', {
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
  songIds: {
    type: Sequelize.ARRAY(Sequelize.INTEGER),
    allowNull: false
  },
  status: {
    type: Sequelize.BOOLEAN,
    allowNull: false
  }
})

module.exports = songSet
