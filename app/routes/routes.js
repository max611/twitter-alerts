module.exports = app => {
  const settings = require("../controllers/setting.controller.js");
  const users = require("../controllers/users.controller.js");
  const jwt = require('jsonwebtoken');
  const passport = require('passport');
  const passportJWT = require('passport-jwt');
  let ExtractJwt = passportJWT.ExtractJwt;
  let JwtStrategy = passportJWT.Strategy;
  let jwtOptions = {};
  jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
  jwtOptions.secretOrKey = 'wowwow';

  app.use("/", require("./home"));
  app.use("/", require("./tweets"));
  app.use("/", require("./browser_source"));

  app.post("/settings", settings.create);
  app.get("/settings", settings.findAll);

	app.post('/users', users.create)
	app.get('/users', users.findAll)
	app.get('/user', users.getUser)


  var sessionChecker = (req, res, next) => {
    if (req.session.user && req.cookies.user_sid) {
        res.redirect('/tweets');
    } else {
        next();
    }    
  };

  app.post('/login', async function(req, res, next) { 
    const { username, password } = req.body;
    if (username && password) {
      let user = await users.getUser(req, res);
      console.log(`username = ${user.username}`)
      if (username === user.username && password === user.password) {
        console.log('logged in')
        let token = jwt.sign({username: username},
          'secret',
          {
            expiresIn: '24h' // expires in 24 hours
          }
        );
        res.cookie('jwt',token, { httpOnly: false, secure: false, maxAge: 3600000 })
        // return the JWT token for the future API calls
        res.json({
          success: true,
          message: 'Authentication successful!',
          token: token
        });
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
};