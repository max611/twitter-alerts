var express = require('express');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
const redis = require("redis");
const client = require('redis').createClient(process.env.REDIS_URL);

var bodyParser = require('body-parser');

client.on("error", function(error) {
  console.error(error);
});

const PORT = process.env.PORT || 3000;
app.set('port', PORT);
app.set('views', __dirname);
app.engine('ejs', require('ejs').renderFile);
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true })); 

app.get('/', (req, res) => {
  res.render('views/index');
});

app.get('/add_tweet', (req, res) => {
  res.render('views/add_tweet');
});

app.get('/browser_source', (req, res) => {
  res.render('views/browser_source');
});

app.post('/add_tweet', (req, res) => {
	client.rpush('tweets', req.body.url_field);
	res.redirect('/logs')
});

app.get('/logs', async (req, res) => {
	tweets = []
	client.lrange('tweets', 0, -1, function(error, result) {
	  if (error) {
	      console.error(error);
	  } else {
	  	tweets = result
	    res.render('views/logs', {tweets: tweets});
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

