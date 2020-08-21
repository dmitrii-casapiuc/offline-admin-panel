const {Router} = require('express')

const SongSet = require('../models/SongSet')
const auth = require('../middleware/auth.middleware')
const errorHandler = require('../utils/errorHandler')

const router = Router()

router.get('/', auth, async (req, res) => {
  try {
    const songSet = await SongSet.find({})

    res.status(200).json(songSet)
  } catch (error) {
    errorHandler(res, error, 'tryAgain')
  }
})

router.post('/', auth, async (req, res) => {
  try {
    const songSet = new SongSet({
      title: req.body.title,
      songIds: req.body.songIds,
      status: req.body.status,
      date: req.body.date,
    })

    await songSet.save()
    res.status(201).json()
  } catch (error) {
    errorHandler(res, error, 'tryAgain')
  }
})

router.patch('', auth, async (req, res) => {
  const updated = {
    title: req.body.title,
    songIds: req.body.songIds,
    status: req.body.status,
    date: req.body.date,
  }

  try {
    const songSet = await SongSet.findOneAndUpdate(
      {_id: req.body._id},
      {$set: updated},
      {new: true}
    )

    res.status(200).json(songSet)
  } catch(error) {
    errorHandler(res, error, 'tryAgain')
  }
}) 

router.delete('/:id', auth, async (req, res) => {
  try {
    await SongSet.deleteOne({_id: req.params.id})
    
    res.status(200).json()
  } catch (error) {
    errorHandler(res, error, 'tryAgain')
  }
})

module.exports = router
