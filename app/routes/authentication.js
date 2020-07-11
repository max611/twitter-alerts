const express = require("express");
const router = express.Router();
const users = require("../controllers/users.controller.js");

router.get('/login', (req, res) => {
  res.render('views/login');
});

router.get('/register', (req, res) => {
  res.render('views/register');
});

router.get('/logout',(req,res) => {
  req.session.destroy((err) => {
    if(err) {
      return console.log(err);
    }
    res.redirect('/');
  });
});

router.post('/login', async function(req, res, next) { 
  const { username, password } = req.body;
  if (username && password) {
    let user = await users.getUser(req, res);
    if (username === user.username && password === user.password) {
      console.log('logged in')
      req.session.user = user;
      res.redirect('/')
    } else {
      res.send(403).json({
        success: false,
        message: 'Incorrect username or password'
      });
    }
  } else {
    res.send(400).json({
      success: false,
      message: 'Authentication failed! Please check the request'
    });
  }
});

module.exports = router;