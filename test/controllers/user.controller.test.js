const UserController = require('../../app/controllers/users.controller.js')
const { User } = require('../../app/config/sequelize.js')

const mockRequest = (sessionData) => ({
  body: sessionData
});

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  res.redirect = jest.fn();
  return res;
};

describe('UserController', () => {
  test('findAll', async () => {
    const find = jest
        .spyOn(User, "findAll")
        .mockResolvedValue(Promise.resolve([]));
    const req = mockRequest();
    const res = mockResponse();
    users = await UserController.findAll(req, res);

    expect(find).toBeCalled();
    expect(users).toEqual([]);
  });

  test('getUser', async () => {
    const findOne = jest
        .spyOn(User, "findOne")
        .mockResolvedValue(Promise.resolve({username: 'test'}));
    const req = mockRequest({ username: 'test' });
    const res = mockResponse();
    user = await UserController.getUser(req, res);

    expect(findOne).toBeCalled();
    expect(user).toEqual({username: 'test'});
  });

  test('create', async () => {
    const create = jest
        .spyOn(User, "create")
        .mockResolvedValue(Promise.resolve({}));
    const req = mockRequest({ username: 'test', password: '!test1' });
    const res = mockResponse();
    await UserController.create(req, res);

    expect(create).toBeCalled();
    expect(res.redirect).toBeCalled();
  });
});