const express = require("express");
const router = express.Router();
const settingsCtrl = require("../controllers/setting.controller.js");

router.get('/browser_source_custom', async (req, res) => {
  const user_id = req.query.room
	settings = await settingsCtrl.getSettings(user_id);
  res.render('views/browser_source_custom', {settings: settings});
});

router.get('/browser_source', async (req, res) => {
  const user_id = req.query.room
	settings = await settingsCtrl.getSettings(user_id);
  res.render('views/browser_source', {settings: settings});
});

module.exports = router;