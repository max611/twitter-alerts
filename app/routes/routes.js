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

  app.post('/login', async function(req, res, next) { 
    const { username, password } = req.body;
    if (username && password) {
      let user = await users.getUser(req, res);
      if (!user) {
        res.status(401).json({ msg: 'No such user found', user });
      }
     if (user.password === password) {
        // from now on we'll identify the user by the id and the id is
        // the only personalized value that goes into our token
        let payload = { id: user.id };
        let token = jwt.sign(payload, jwtOptions.secretOrKey);
        res.json({ msg: 'ok', token: token });
      } else {
        res.status(401).json({ msg: 'Password is incorrect' });
      }
    }
  });
};