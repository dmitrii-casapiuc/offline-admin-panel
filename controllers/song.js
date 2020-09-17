const errorHandler = require('../utils/errorHandler')
const db = require('../models')
const Song = db.song

module.exports.getAll = async (req, res) => {
  try {
    const songs = await Song.findAll()

    res.status(200).json(songs)
  } catch (error) {
    errorHandler(res, error, 'tryAgain')
  }
}

module.exports.create = async (req, res) => {
  try {
    const song = await Song.create({
      title: req.body.title,
      tonality: req.body.tonality,
      lyrics: req.body.lyrics
    })

    res.status(201).json(song)
  } catch (error) {
    errorHandler(res, error, 'tryAgain')
  }
}

module.exports.getById = async (req, res) => {
  try {
    const song = await Song.findByPk(req.params.id)
    res.status(200).json(song)
  } catch(error) {
    errorHandler(res, error, 'tryAgain')
  }
}

module.exports.update = async (req, res) => {
  try {
    const song = await Song.findByPk(req.body.id)

    song.title = req.body.title
    song.tonality = req.body.tonality
    song.lyrics = req.body.lyrics

    await song.save()
    res.status(200).json(song)
  } catch(error) {
    errorHandler(res, error, 'tryAgain')
  }
}

module.exports.delete = async (req, res) => {
  try {
    const songs = await Song.findAll({
      where: {
        id: req.params.id
      }
    })
  
    const song = songs[0]
    await song.destroy()
    res.status(204).json({})
  } catch (error) {
    errorHandler(res, error, 'tryAgain')
  }
}
