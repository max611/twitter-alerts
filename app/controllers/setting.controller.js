const { Setting } = require('../config/sequelize.js')

exports.findAll = (req, res) => {
  Setting.findAll().then(settings => res.json(settings))
};

exports.create = (req, res) => {
  Setting.create(req.body).then(setting => res.json(setting))
};