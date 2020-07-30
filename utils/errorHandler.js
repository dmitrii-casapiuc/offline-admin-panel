module.exports = (res, error, type) => {
  res.status(500).json({
    type,
    message: error.message ? error.message : error
  })
}
