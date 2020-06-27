var express = require('express');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
const redis = require("redis");
const redisClient = require('redis').createClient(process.env.REDIS_URL);

var bodyParser = require('body-parser');

redisClient.on("error", function(error) {
  console.error(error);
});

const PORT = process.env.PORT || 3000;
app.set('port', PORT);
app.set('views', __dirname);
app.engine('ejs', require('ejs').renderFile);
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  var hostname = process.env.HOSTNAME || 'localhost:3000';
  res.render('views/index', {hostname: hostname});
});

app.get('/tweets/add', (req, res) => {
  res.render('views/add_tweet');
});

app.post('/tweets/add', (req, res) => {
  redisClient.rpush('tweets', req.body.url_field);
  res.redirect('/tweets/add')
});

app.get('/admin', (req, res) => {
  tweets = []
  redisClient.lrange('tweets', 0, -1, function(error, result) {
    if (error) {
        console.error(error);
    } else {
      tweets = result
      res.render('views/admin', {tweets: tweets, libs: ['admin']});
    }
  });
});

app.post('/tweets/delete', (req, res) => {
  console.log('tweets delete route')
  const tweets = req.body.tweets;
  tweets.forEach(async function(tweet) {
    redisClient.lrem('tweets', -1, tweet);
  })

  res.sendStatus(200)
});

app.get('/browser_source', (req, res) => {
  res.render('views/browser_source');
});

app.get('/tweets', async (req, res) => {
	tweets = []
	redisClient.lrange('tweets', 0, -1, function(error, result) {
	  if (error) {
	      console.error(error);
	  } else {
	  	tweets = result
	    res.render('views/tweets', {tweets: tweets});
	  }
	});
});

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });

  socket.on('tweet', (msg) => {
    io.emit('tweet', msg);
  });
});

http.listen(PORT, () => {
  console.log(`Our app is running on port ${ PORT }`);
});

