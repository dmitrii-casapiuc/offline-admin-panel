const {Schema, model} = require('mongoose')
const shortid = require('shortid')

const songSchema = new Schema({
  _id: {
    type: String,
    default: shortid.generate
  },
  title: {
    type: String,
  },
  tonality: {
    type: String,
  },
  lyrics: {
    type: String,
  },
  date: {
    type: String,
  }
})

module.exports = model('Song', songSchema)
