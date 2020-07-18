const express = require("express");
const router = express.Router();
const auth = require("../controllers/auth.controller.js");
const settingsCtrl = require("../controllers/setting.controller.js");

router.get('/settings', auth.hasTweetAccess, async (req, res) => {
	settings = await settingsCtrl.getSettings(req.session.user.id)  || {};
  res.render('views/settings', {settings: settings});
});

module.exports = router;