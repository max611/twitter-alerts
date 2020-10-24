const UserController = require('../../app/controllers/users.controller.js')
const { User } = require('../../app/config/sequelize.js')

const mockRequest = (sessionData) => ({
  session: { data: sessionData }
});

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe('UserController', () => {
  test('FindAll', async () => {
    const find = jest
        .spyOn(User, "findAll") // You can spy on any method provided
        .mockResolvedValue(Promise.resolve([])); // mock return value
    const req = mockRequest();
    const res = mockResponse();
    users = await UserController.findAll(req, res);

    expect(find).toBeCalled();
    expect(users).toEqual([]);
  });
});