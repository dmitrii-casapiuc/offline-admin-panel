const {Router} = require('express')

const SongSet = require('../models/SongSet')
const auth = require('../middleware/auth.middleware')
const errorHandler = require('../utils/errorHandler')

const router = Router()

router.post('/', auth, async (req, res) => {
  try {
    console.log(req.body)
    /* const song = new Song({
      title: req.body.title,
      tonality: req.body.tonality,
      lyrics: req.body.lyrics,
      date: req.body.date,
    })

    await song.save()
    res.status(201).json(song) */
  } catch (error) {
    errorHandler(res, error, 'tryAgain')
  }
})

module.exports = router
