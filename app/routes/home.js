const express = require("express");
const router = express.Router();
const auth = require("../controllers/auth.controller.js");

router.get('/', auth.hasTweetAccess, async (req, res) => {
  var hostname = process.env.HOSTNAME || 'localhost:3000';
  res.render('views/index', {hostname: hostname});
});

module.exports = router;