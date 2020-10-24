const { User } = require('../config/sequelize.js')

exports.create = (req, res) => {
  User.create(req.body).then(user => res.redirect('/login'))
};

exports.findAll = async (req, res) => {
	users = await User.findAll();
  return users;
};

exports.getUser = async (req, res) => {
	user = await User.findOne({
    where: {
      username: req.body.username
    }
  })

  return user;
};