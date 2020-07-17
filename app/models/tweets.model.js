module.exports = (sequelize, type) => {
  return sequelize.define('tweet', {
      id: {
        type: type.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      url: {
      	type: type.STRING,
      	allowNull: false,
      	notEmpty: true
      },
      twitter_id: {
        type: type.BIGINT,
        allowNull: false,
        notEmpty: true
      },
      content: type.STRING,
      author: type.STRING,
      at: type.STRING,
      image_url: type.STRING
  },
  {
    indexes: [
      {
        unique: true,
        fields: ['userId', 'url']
      }
    ]
  }
)}