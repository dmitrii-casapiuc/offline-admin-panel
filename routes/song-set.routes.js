const {Router} = require('express')

const SongSet = require('../models/SongSet')
const auth = require('../middleware/auth.middleware')
const errorHandler = require('../utils/errorHandler')

const router = Router()

router.get('/', auth, async (req, res) => {
  try {
    const songSet = await SongSet.findAll()

    res.status(200).json(songSet)
  } catch (error) {
    errorHandler(res, error, 'tryAgain')
  }
})

 router.post('/', auth, async (req, res) => {
  try {
    const songSet = await SongSet.create({
      title: req.body.title,
      songIds: req.body.songIds,
      status: req.body.status,
    })

    res.status(201).json(songSet)
  } catch (error) {
    errorHandler(res, error, 'tryAgain')
  }
})

router.patch('', auth, async (req, res) => {
  try {
    const songSet = await SongSet.findByPk(req.body.id)

    console.log(songSet)
    console.log(req.body)

    songSet.title = req.body.title
    songSet.songIds= req.body.songIds
    songSet.status = req.body.status

    await songSet.save()
    res.status(200).json(songSet)
  } catch(error) {
    errorHandler(res, error, 'tryAgain')
  }
}) 

router.delete('/:id', auth, async (req, res) => {
  try {
    const songSet = await SongSet.findAll({
      where: {
        id: req.params.id
      }
    })
  
    const set = songSet[0]
    await set.destroy()
    res.status(204).json({})
  } catch (error) {
    errorHandler(res, error, 'tryAgain')
  }
})

module.exports = router
