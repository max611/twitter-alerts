const express = require('express');
const app = express();
const redis = require("redis");
const redisClient = require('redis').createClient(process.env.REDIS_URL);
const bodyParser = require('body-parser');
const router = express.Router();
const PORT = process.env.PORT || 3000;
const session = require('express-session');
const auth = require("./app/controllers/auth.controller.js");
const morgan = require('morgan');

app.set('port', PORT);
app.set('views', __dirname);
app.engine('ejs', require('ejs').renderFile);
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(session({
  secret: 'somerandonstuffs',
  resave: false,
  saveUninitialized: false
}));
app.use(auth.isLoggedIn);

// Routing
require("./app/routes/routes.js")(app);

// route for handling 404 requests(unavailable routes)
app.use(function (req, res, next) {
  res.status(404).send("Sorry can't find that!")
});

redisClient.on("error", function(error) {
  console.error(error);
});

var http = require('http').createServer(app);
var io = require('socket.io')(http);

io.on('connection', (socket) => {

  socket.on('sendTweet', (data) => {
    io.emit(data.room, data.tweets);
  })

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

