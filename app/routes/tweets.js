const express = require("express");
const router = express.Router();
const redisClient = require('redis').createClient(process.env.REDIS_URL);
const auth = require("../controllers/auth.controller.js");

router.get('/tweets/add', (req, res) => {
  res.render('views/add_tweet');
});

router.post('/tweets/add', (req, res) => {
  // if already exist, dont add it
  tweet_id = req.body.tweet.split('/').pop()
  redisClient.rpush('tweets', tweet_id);
  res.redirect('/tweets')
});

router.post('/tweets_url/add', (req, res) => {
  // if already exist, dont add it
  redisClient.rpush('tweets_url', req.body.tweet_url);
  res.redirect('/tweets_url')
});

router.get('/tweets_url', auth.hasTweetAccess, async (req, res) => {
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

router.post('/tweets_url/delete', (req, res) => {
  const tweets = req.body.tweets;
  tweets.forEach(async function(tweet) {
    redisClient.lrem('tweets_url', -1, tweet);
  })

  res.sendStatus(200)
});

router.post('/tweets/delete', (req, res) => {
  const tweets = req.body.tweets;
  tweets.forEach(async function(tweet) {
    redisClient.lrem('tweets', -1, tweet);
  })

  res.sendStatus(200)
});

router.get('/tweets', auth.hasTweetAccess, async (req, res) => {
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

module.exports = router;