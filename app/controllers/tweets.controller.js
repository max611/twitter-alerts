const { Tweet } = require('../config/sequelize.js')

exports.create = async (req, res) => {
  tweet = await Tweet.create({
  	url: req.body.tweet_url,
  	twitter_id: req.body.tweet_url.split('/').pop(),
  	userId: req.session.user.id
  }).catch(function (err) {
	  console.log(err)
	});

  return tweet;
};

exports.findAll = async (req, res) => {
  tweets = await Tweet.findAll({
  	where: {
	    userId: req.session.user.id
	  }
	}).catch(function (err) {
	  console.log(err)
	});

	return tweets;
};

exports.getTweet = async (req, res) => {
	user = await Tweet.findOne({
    where: {
      id: req.body.id
    }
  })

  return user;
};

exports.destroy = async (tweet_ids, user_id) => {
	tweet = await Tweet.destroy({
    where: {
      twitter_id: tweet_ids,
      userId: user_id
    }
  })

  return tweet;
};
