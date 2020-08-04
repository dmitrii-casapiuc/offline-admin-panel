const {Router} = require('express')

const Song = require('../models/Song')
const auth = require('../middleware/auth.middleware')
const errorHandler = require('../utils/errorHandler')

const router = Router()

router.get('/', auth, async (req, res) => {
  try {
    const songs = await Song.find({}).select('title').exec()

    res.status(200).json(songs)
  } catch (error) {
    errorHandler(res, error, 'tryAgain')
  }
})

router.post('/', auth, async (req, res) => {
  try {
    const song = new Song({
      title: req.body.title,
      tonality: req.body.tonality,
      lyrics: req.body.lyrics,
      date: req.body.date,
    })

    await song.save()
    res.status(201).json(song)
  } catch (error) {
    errorHandler(res, error, 'tryAgain')
  }
})

router.get('/:id', auth, async (req, res) => {
  try {
    const song = await Song.findById(req.params.id)
    res.status(200).json(song)
  } catch(error) {
    errorHandler(res, error, 'tryAgain')
  }
})

router.patch('/:id', auth, async (req, res) => {
  const updated = {
    title: req.body.title,
    tonality: req.body.tonality,
    lyrics: req.body.lyrics,
  }

  try {
    const song = await Song.findOneAndUpdate(
      {_id: req.body._id},
      {$set: updated},
      {new: true}
    )

    res.status(200).json(song)
  } catch(error) {
    errorHandler(res, error, 'tryAgain')
  }
})

router.delete('/:id', auth, async (req, res) => {
  try {
    await Song.deleteOne({_id: req.params.id})
    
    res.status(200).json()
  } catch (error) {
    errorHandler(res, error, 'tryAgain')
  }
})

module.exports = router
