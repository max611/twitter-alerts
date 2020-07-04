const { User } = require('../config/sequelize.js')

exports.create = (req, res) => {
  User.create(req.body).then(user => res.json(user))
};

exports.findAll = (req, res) => {
  User.findAll().then(users => res.json(users))
};

exports.getUser = async (req, res) => {
	console.log('get user')
	user = await User.findOne({
    where: {
      username: req.body.username
    }
  })
  console.log(`user = ${user}`)
  return user;
};