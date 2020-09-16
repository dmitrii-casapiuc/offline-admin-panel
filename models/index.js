const Sequelize = require('sequelize')
const keys = require('../config/keys')

const sequelize = new Sequelize(keys.db, {
  dialect :'postgres',
  ssl: true,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
    keepAlive: true
  }
})

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

db.song = require('./Song.js')(sequelize, Sequelize)
db.set = require('./Set.js')(sequelize, Sequelize)
db.songSets = require('./SongSet.js')(sequelize, Sequelize)
db.user = require('./User.js')(sequelize, Sequelize)

db.set.belongsToMany(db.song, {
  through: 'SongSet',
  as: 'sets',
  foreignKey: 'setId',
})
db.song.belongsToMany(db.set, {
  through: 'SongSet',
  as: 'songs',
  foreignKey: 'songId',
})

module.exports = db
