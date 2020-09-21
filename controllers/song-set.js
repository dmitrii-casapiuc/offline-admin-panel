const errorHandler = require('../utils/errorHandler')
const db = require('../models')
const Set = db.set
const Song = db.song
const SongSet = db.songSet

module.exports.getAll = async (req, res) => {
  try {
    const set = await Set.findAll({
      include: [{
        model: Song,
        as: 'sets',
        attributes: ['id', 'title'],
        through: {
          // This block of code allows you to retrieve the properties of the join table
          attributes: []
        }
      }],
    })

    res.status(200).json(set)
  } catch (error) {
    errorHandler(res, error, 'tryAgain')
  }
}

module.exports.create = async (req, res) => {
  try {
    const set = await Set.create({
      title: req.body.title,
      status: req.body.status,
    })

    req.body.songIds.forEach(async (item) => {

      // Create a dictionary with which to create the ProductOrder
      const songSet = {
        songId: item,
        setId: set.id
      }

      // Create and save a productOrder
      const savedSongSet = await SongSet.create(songSet)
    })

    // If everything goes well, respond with the order
    return res.status(201).json(set)
  } catch (error) {
    errorHandler(res, error, 'tryAgain')
  }
}

module.exports.update = async (req, res) => {
  try {
    const set = await Set.findByPk(req.params.id)

    // Find and remove all associations 
    const songs = await set.getSets()
    await set.removeSets(songs)

    req.body.songIds.forEach(async (item) => {
      // Create a dictionary with which to create the savedSongSet
      const songSet = {
        songId: item,
        setId: set.id
      }

      // Create and save a savedSongSet
      const savedSongSet = await SongSet.create(songSet)
    })

    // Update the location Property
    const updatedSet = await Set.update({
      title: req.body.title,
      status: req.body.status,
    }, { where: { id: req.params.id } });

    res.status(200).json(updatedSet)
  } catch(error) {
    errorHandler(res, error, 'tryAgain')
  }
}

module.exports.delete = async (req, res) => {
  try {
    await Set.destroy({
      where: {
        id: req.params.id,
      },
    })

    res.status(204).json({})
  } catch (error) {
    errorHandler(res, error, 'tryAgain')
  }
}
