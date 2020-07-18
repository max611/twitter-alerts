const { Setting } = require('../config/sequelize.js')

exports.findAll = (req, res) => {
  Setting.findAll().then(settings => res.json(settings))
};

exports.getSettings = async (user_id) => {
	settings = await Setting.findOne({
    where: {
      userId: user_id
    }
  })

  return settings;
};

exports.createOrUpdate = async (req, res) => {
	settings_values = req.body
	settings_values.userId = req.session.user.id;

  Setting
    .findOne({ where: {userId: settings_values.userId} })
    .then(async function(obj) {
      if(obj){
        settings = await obj.update(settings_values)
      } else {
      	settings = await Setting.create(settings_values)
      }
    	res.render('views/settings', {settings: settings});
    })
};