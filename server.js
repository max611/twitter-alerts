const express = require('express');
const app = express();
const redis = require("redis");
const redisClient = require('redis').createClient(process.env.REDIS_URL);
const bodyParser = require('body-parser');

redisClient.on("error", function(error) {
  console.error(error);
});

const PORT = process.env.PORT || 3000;
app.set('port', PORT);
app.set('views', __dirname);
app.engine('ejs', require('ejs').renderFile);
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/public'));
require("./app/routes/routes.js")(app);

app.get('/', (req, res) => {
  var hostname = process.env.HOSTNAME || 'localhost:3000';
  res.render('views/index', {hostname: hostname});
});

app.get('/tweets/add', (req, res) => {
  res.render('views/add_tweet');
});

app.post('/tweets/add', (req, res) => {
  // if already exist, dont add it
  redisClient.rpush('tweets', req.body.tweet);
  res.redirect('/tweets')
});

app.post('/tweets_url/add', (req, res) => {
  // if already exist, dont add it
  redisClient.rpush('tweets_url', req.body.tweet_url);
  res.redirect('/tweets_url')
});

app.get('/tweets_url', async (req, res) => {
  tweets = []
  redisClient.lrange('tweets_url', 0, -1, function(error, result) {
    if (error) {
        console.error(error);
    } else {
      tweets = result.filter((x, i, a) => a.indexOf(x) == i)
      res.render('views/tweets_url', {tweets: tweets, libs: ['tweets_url']});
    }
  });
});

app.get('/browser_source_url', (req, res) => {
  res.render('views/browser_source_url');
});

app.post('/tweets_url/delete', (req, res) => {
  const tweets = req.body.tweets;
  tweets.forEach(async function(tweet) {
    redisClient.lrem('tweets_url', -1, tweet);
  })

  res.sendStatus(200)
});

app.post('/tweets/delete', (req, res) => {
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
      tweets = result.filter((x, i, a) => a.indexOf(x) == i)
      res.render('views/tweets', {tweets: tweets, libs: ['tweets']});
    }
  });
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

