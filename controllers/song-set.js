const errorHandler = require('../utils/errorHandler')
const db = require('../models')
const Set = db.set
const Song = db.song

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
    const songSet = await SongSet.findByPk(req.body.id)

    songSet.title = req.body.title
    songSet.songIds= req.body.songIds
    songSet.status = req.body.status

    await songSet.save()
    res.status(200).json(songSet)
  } catch(error) {
    errorHandler(res, error, 'tryAgain')
  }
}

module.exports.delete = async (req, res) => {
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
}
