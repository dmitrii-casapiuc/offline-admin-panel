const {Router} = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const keys = require('../config/keys')
const errorHandler = require('../utils/errorHandler')
const User = require('../models/User')
const router = Router()

router.post('/login', async (req, res) => {
  try {
    const {email, password} = req.body

    const user = await User.findOne({ where: { email } })

    if (!user) {
      return res.status(400).json({ message: 'USER_NO_FOUND' })
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
      return res.status(400).json({ message: 'USER_WRONG_PASSWORD' })
    }

    const token = jwt.sign(
      { userId: user.id },
      keys.jwt,
      { expiresIn: '1d' }
    )

    res.json({ token, userId: user.id })
  } catch (error) {
    errorHandler(res, error, 'TRY_AGAIN')
  }
})

router.post('/register', async (req, res) => {
  try {
    const {
      email,
      password,
      name
    } = req.body

    const candidate = await User.findOne({ where: { email } })

    if (candidate) {
      return res.status(400).json({ message: 'USER_HAS' })
    }

    const hashedPassword = await bcrypt.hash(password, 12)

    await User.create({
      name,
      email,
      password: hashedPassword
    })

    res.status(201).json({ message: 'USER_CREATE' })
  } catch (error) {
    errorHandler(res, error, 'TRY_AGAIN')
  }
})

module.exports = router
