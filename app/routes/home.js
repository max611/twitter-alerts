const express = require("express");
const router = express.Router();

router.route("/").get((req, res) => {
  var hostname = process.env.HOSTNAME || 'localhost:3000';
  res.render('views/index', {hostname: hostname});
});

module.exports = router;