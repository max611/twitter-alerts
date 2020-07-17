module.exports = (sequelize, type) => {
  return sequelize.define('tweet', {
      id: {
        type: type.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      url: {
      	type: type.STRING,
      	unique: true,
      	allowNull: false
      },
      content: type.STRING,
      author: type.STRING,
      at: type.STRING,
      image_url: type.STRING
  })
}