const Sequelize = require('sequelize')
const UserModel = require('./../models/users.model.js')
const SettingModel = require('./../models/setting.model.js')
const TweetModel = require('./../models/tweets.model.js')
const dbConfig = require("./db.config.js");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: 'mysql',
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
})

const User = UserModel(sequelize, Sequelize)
const Setting = SettingModel(sequelize, Sequelize)
const Tweet = TweetModel(sequelize, Sequelize)

Setting.belongsTo(User);
User.hasOne(Setting, {as: 'settings'});

Tweet.belongsTo(User);
User.hasMany(Tweet, {as: 'tweets'});

sequelize.sync({ force: false })
  .then(() => {
    console.log(`Database & tables created!`)
  })

module.exports = {
  User,
  Setting,
  Tweet
}
