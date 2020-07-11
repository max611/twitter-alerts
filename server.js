const express = require('express');
const app = express();
const redis = require("redis");
const redisClient = require('redis').createClient(process.env.REDIS_URL);
const bodyParser = require('body-parser');
const router = express.Router();
const PORT = process.env.PORT || 3000;
const session = require('express-session');
const users = require("./app/controllers/users.controller.js");

app.set('port', PORT);
app.set('views', __dirname);
app.engine('ejs', require('ejs').renderFile);
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

app.use(session({
  secret: 'somerandonstuffs',
  resave: false,
  saveUninitialized: false
}));

var isLoggedIn = (req, res, next) => {
  if (req.session.user) {
    res.locals.user = user;
    next();
  } else {
    res.locals.user = undefined;
    next();
  }    
};

app.use(isLoggedIn)

// Routing
require("./app/routes/routes.js")(app);

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

app.get('/login', isLoggedIn, (req, res) => {
  res.render('views/login');
});

app.get('/register', isLoggedIn, (req, res) => {
  res.render('views/register');
});

app.get('/logout',(req,res) => {
  req.session.destroy((err) => {
    if(err) {
      return console.log(err);
    }
    res.redirect('/');
  });
});

app.post('/login', async function(req, res, next) { 
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

http.listen(PORT, () => {
  console.log(`Our app is running on port ${ PORT }`);
});

