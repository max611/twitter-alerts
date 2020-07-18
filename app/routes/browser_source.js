const express = require("express");
const router = express.Router();
const settingsCtrl = require("../controllers/setting.controller.js");

router.get('/browser_source_url', async (req, res) => {
	settings = await settingsCtrl.getSettings(req.session.user.id);
  res.render('views/browser_source_url', {settings: settings});
});

router.get('/browser_source', async (req, res) => {
	settings = await settingsCtrl.getSettings(req.session.user.id);
  res.render('views/browser_source', {settings: settings});
});

module.exports = router;