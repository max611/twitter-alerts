const Setting = require("../models/setting.model.js");

exports.findAll = (req, res) => {
  Setting.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving settings."
      });
    else res.send(data);
  });
};

exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
  	console.log(req.body)
    return res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Setting
  const setting = new Setting({
    user_id: req.body.user_id,
    delay: req.body.delay,
    fade_in: req.body.fade_in,
    fade_out: req.body.fade_out
  });

  // Save Setting in the database
  Setting.create(setting, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Setting."
      });
    else res.send(data);
  });
};