const express = require("express");
const router = express.Router();
const redisClient = require('redis').createClient(process.env.REDIS_URL);
const auth = require("../controllers/auth.controller.js");
const tweetsCtrl = require("../controllers/tweets.controller.js");

router.get('/tweets/add', (req, res) => {
  res.render('views/add_tweet');
});

router.post('/tweets/add', async (req, res) => {
  await tweetsCtrl.create(req, res);
  res.redirect('/tweets')
});

router.post('/tweets_url/add', async (req, res) => {
  await tweetsCtrl.create(req, res);
  res.redirect('/tweets_url')
});

router.get('/tweets_url', auth.hasTweetAccess, async (req, res) => {
  tweets = await tweetsCtrl.findAll(req, res);
  res.render('views/tweets_url', {tweets: tweets, libs: ['tweets_url']});
});

router.post('/tweets_url/delete', (req, res) => {
  const tweets = req.body.tweets;
  var tweet_ids = []
  tweets.forEach(async function(tweet) {
    tweet_ids.push(tweet.split('/').pop());
  })

  tweetsCtrl.destroy(tweet_ids.map(BigInt), req.session.user.id);
  res.sendStatus(200)
});

router.post('/tweets/delete', (req, res) => {
  const tweets = req.body.tweets.map(BigInt);
  tweetsCtrl.destroy(tweets, req.session.user.id);

  res.sendStatus(200)
});

router.get('/tweets', auth.hasTweetAccess, async (req, res) => {
	tweets = await tweetsCtrl.findAll(req, res);
  res.render('views/tweets', {tweets: tweets, libs: ['tweets']});
});

module.exports = router;