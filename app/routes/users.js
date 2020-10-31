const express = require("express");
const router = express.Router();
const usersCtrl = require("../controllers/users.controller.js");

router.post('/users', usersCtrl.create)

module.exports = router;