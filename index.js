
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const path = require('path')

const keys = require('./config/keys')
const authRoutes = require('./routes/auth.routes')
const songsRoutes = require('./routes/songs.routes')
const songSetRoutes = require('./routes/song-set.routes')

const app = express()

mongoose.set('useFindAndModify', false)

app.use(express.json({ extended: true }))
app.use('/uploads', express.static('uploads'))
app.use(cors())

// register routes
app.use('/api/auth', authRoutes)
app.use('/api/songs', songsRoutes)
app.use('/api/song-set', songSetRoutes)

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/dist/offline-admin-panel')))

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/dist/offline-admin-panel/index.html'))
  })
}

const PORT = process.env.PORT || 5000

async function start() {
  try {
    await mongoose.connect(keys.mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    })
    app.listen(PORT, () => console.log(`App has been started on port ${PORT}...`))
  } catch (error) {
    console.log('Server Error', error.message)
    process.exit(1)
  }
}

start()
