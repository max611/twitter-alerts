const express = require("express");
const router = express.Router();

router.get('/browser_source_url', (req, res) => {
  res.render('views/browser_source_url');
});

router.get('/browser_source', (req, res) => {
  res.render('views/browser_source');
});

module.exports = router;