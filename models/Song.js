const {Schema, model} = require('mongoose')

const songSchema = new Schema({
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
