const express = require('express');
const app = express();
const redis = require("redis");
const redisClient = require('redis').createClient(process.env.REDIS_URL);
const bodyParser = require('body-parser');
const router = express.Router();
const PORT = process.env.PORT || 3000;
const jwt = require('jsonwebtoken');
const passport = require('passport');
const passportJWT = require('passport-jwt');
let ExtractJwt = passportJWT.ExtractJwt;
let JwtStrategy = passportJWT.Strategy;
let jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = 'wowwow';
const users = require("./app/controllers/users.controller.js");
var cookieParser = require('cookie-parser');
var session = require('express-session');
var morgan = require('morgan');
app.use(session({
    key: 'user_sid',
    secret: 'somerandonstuffs',
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 600000
    }
}));

let strategy = new JwtStrategy(jwtOptions, function(jwt_payload, next) {
  console.log('payload received', jwt_payload);
  let user = users.getUser({ id: jwt_payload.id });
  if (user) {
    next(null, user);
  } else {
    next(null, false);
  }
});
// use the strategy
passport.use(strategy);
app.use(passport.initialize());
app.use(morgan('dev'));
app.use(cookieParser());

app.set('port', PORT);
app.set('views', __dirname);
app.engine('ejs', require('ejs').renderFile);
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

// Routing
require("./app/routes/routes.js")(app);

app.use((req, res, next) => {
    if (req.cookies.user_sid && !req.session.user) {
        res.clearCookie('user_sid');        
    }
    next();
});

var sessionChecker = (req, res, next) => {
  if (req.session.user && req.cookies.user_sid) {
      res.redirect('/tweets');
  } else {
      next();
  }    
};

app.get('/login', sessionChecker, (req, res) => {
  res.render('views/login');
});

app.get('/register', sessionChecker, (req, res) => {
  res.render('views/register');
});

app.get('/potato', sessionChecker, (req, res) => {
    res.redirect('views/login');
});

redisClient.on("error", function(error) {
  console.error(error);
});

var http = require('http').createServer(app);
var io = require('socket.io')(http);

io.on('connection', (socket) => {
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });

  socket.on('tweet', (msg) => {
    io.emit('tweet', msg);
  });

  socket.on('tweet_url', (msg) => {
    io.emit('tweet_url', msg);
  });
});

http.listen(PORT, () => {
  console.log(`Our app is running on port ${ PORT }`);
});

