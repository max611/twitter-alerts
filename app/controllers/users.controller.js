const { User } = require('../config/sequelize.js')

exports.create = (req, res) => {
  User.create(req.body).then(user => res.json(user))
};

exports.findAll = (req, res) => {
  User.findAll().then(users => res.json(users))
};