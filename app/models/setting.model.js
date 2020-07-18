module.exports = (sequelize, type) => {
  return sequelize.define('setting', {
      id: {
        type: type.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      fade_in: type.INTEGER,
      fade_out: type.INTEGER,
      delay: type.INTEGER,
      css: type.TEXT
  })
}