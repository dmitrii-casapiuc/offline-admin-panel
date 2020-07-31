const {Router} = require('express')
const Song = require('../models/Song')
const auth = require('../middleware/auth.middleware')
const errorHandler = require('../utils/errorHandler')
const router = Router()

router.post('/', auth, async (req, res) => {
  try {
    const song = new Song({
      userId: req.user.userId,
      title: req.body.title,
      description: req.body.description,
      color: req.body.color,
    })

    await song.save()
    res.status(201).json(note)
  } catch (error) {
    errorHandler(res, error, 'tryAgain')
  }
})
