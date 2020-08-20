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
  songsIds: {
    type: Array,
  },
  status: {
    type: Boolean,
  }
})

module.exports = model('SongSet', songSetSchema)
