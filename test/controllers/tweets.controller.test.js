const TweetController = require('../../app/controllers/tweets.controller.js')
const { Tweet } = require('../../app/config/sequelize.js')

const mockRequest = (sessionData, bodyData) => ({
  session: sessionData,
  body: bodyData
});

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  res.redirect = jest.fn();
  return res;
};

describe('TweetController', () => {
  test('findAll', async () => {
    const find = jest
        .spyOn(Tweet, "findAll")
        .mockResolvedValue(Promise.resolve([]));
    const req = mockRequest({ user: { id: 1 } });
    const res = mockResponse();
    tweets = await TweetController.findAll(req, res);

    expect(find).toBeCalled();
    expect(tweets).toEqual([]);
  });

  test('getTweet', async () => {
    const findOne = jest
        .spyOn(Tweet, "findOne")
        .mockResolvedValue(Promise.resolve({username: 'test'}));
    const req = mockRequest({}, { id: 1 });
    const res = mockResponse();
    tweet = await TweetController.getTweet(req, res);

    expect(findOne).toBeCalled();
    expect(tweet).toEqual({username: 'test'});
  });

  test('create', async () => {
    const create = jest
        .spyOn(Tweet, "create")
        .mockResolvedValue(Promise.resolve({ tweet_url: 'test' }));
    const req = mockRequest({ user: { id: 1 } }, { tweet_url: 'test' });
    const res = mockResponse();
    tweet = await TweetController.create(req, res);

    expect(create).toBeCalled();
    expect(tweet).toEqual({ tweet_url: 'test' });
  });

  test('destroy', async () => {
    const destroy = jest
        .spyOn(Tweet, "destroy")
        .mockResolvedValue(Promise.resolve({}));
    tweet = await TweetController.destroy([1, 2], 1);

    expect(destroy).toBeCalled();
    expect(tweet).toEqual({});
  });
});