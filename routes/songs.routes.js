const {Router} = require('express')

const Song = require('../models/Song')
const auth = require('../middleware/auth.middleware')
const errorHandler = require('../utils/errorHandler')

const router = Router()

router.get('/', auth, async (req, res) => {
  try {
    const songs = await Song.findAll()

    res.status(200).json(songs)
  } catch (error) {
    errorHandler(res, error, 'tryAgain')
  }
})

router.post('/', auth, async (req, res) => {
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
})

router.get('/:id', auth, async (req, res) => {
  try {
    const song = await Song.findByPk(req.params.id)
    res.status(200).json(song)
  } catch(error) {
    errorHandler(res, error, 'tryAgain')
  }
})

router.patch('', auth, async (req, res) => {
  try {
    const song = await Song.findByPk(req.body.id)

    song.title = req.body.title
    song.tonality = req.body.tonality
    song.lyrics = req.body.lyrics

    await song.save()
    res.status(200).json(song)
  } catch(error) {
    console.log(error)
    errorHandler(res, error, 'tryAgain')
  }
})

router.delete('/:id', auth, async (req, res) => {
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
})

module.exports = router
