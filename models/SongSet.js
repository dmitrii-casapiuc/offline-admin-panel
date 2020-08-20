const {Schema, model} = require('mongoose')
const shortid = require('shortid')

const songSetSchema = new Schema({
  _id: {
    type: String,
    default: shortid.generate
  },
  title: {
    type: String,
  },
  songs: {
    type: String,
  },
  status: {
    type: String,
  }
})

module.exports = model('SongSet', songSetSchema)
