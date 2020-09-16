module.exports = (sequelize, DataTypes) => {
  const SongSet = sequelize.define('SongSet', {
    id: {
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      type: DataTypes.INTEGER
    },
    songId: {
      type: DataTypes.INTEGER
    },
    setId: {
      type: DataTypes.INTEGER
    }
  })

  return SongSet
}
