const { User } = require('../config/sequelize.js')

exports.create = (req, res) => {
  User.create(req.body).then(user => res.redirect('/login'))
};

exports.findAll = (req, res) => {
  User.findAll().then(users => res.json(users))
};

exports.getUser = async (req, res) => {
	user = await User.findOne({
    where: {
      username: req.body.username
    }
  })

  return user;
};