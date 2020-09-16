module.exports = (sequelize, DataTypes) => {
  const Song = sequelize.define('Song', {
    id: {
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      type: DataTypes.INTEGER
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    tonality: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lyrics: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  })

  return Song
}
