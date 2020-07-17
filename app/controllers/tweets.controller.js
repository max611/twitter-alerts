const { Tweet } = require('../config/sequelize.js')

exports.create = async (req, res) => {
  tweet = await Tweet.create({
  	url: req.body.tweet_url,
  	userId: req.session.user.id
  })

  return tweet;
};

exports.findAll = async (req, res) => {
  tweets = await Tweet.findAll({
  	where: {
	    userId: req.session.user.id
	  }
	})

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