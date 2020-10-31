const SettingController = require('../../app/controllers/setting.controller.js')
const { Setting } = require('../../app/config/sequelize.js')

const mockRequest = (sessionData, bodyData) => ({
  session: sessionData,
  body: bodyData,
});

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  res.render = jest.fn();
  return res;
};

describe('SettingController', () => {
  test('FindAll', async () => {
    const find = jest
        .spyOn(Setting, "findAll")
        .mockResolvedValue(Promise.resolve([]));
    const req = mockRequest();
    const res = mockResponse();
    settings = await SettingController.findAll(req, res);

    expect(find).toBeCalled();
    expect(settings).toEqual([]);
  });

  test('getSettings', async () => {
    const findOne = jest
        .spyOn(Setting, "findOne")
        .mockResolvedValue(Promise.resolve({fade_in: '1', fade_out: '2'}));
    const req = mockRequest({ user_id: 1 });
    const res = mockResponse();
    settings = await SettingController.getSettings(req, res);

    expect(findOne).toBeCalled();
    expect(settings).toEqual({fade_in: '1', fade_out: '2'});
  });

  test('createOrUpdate create a new record', async () => {
    const findOne = jest
        .spyOn(Setting, "findOne")
        .mockResolvedValue(Promise.resolve(undefined));

    const create = jest
        .spyOn(Setting, "create")
        .mockResolvedValue(Promise.resolve({fade_in: '1', fade_out: '2'}));

    const req = mockRequest({ user: { id: 1 } },  { fade_in: '1', fade_out: '2' });
    const res = mockResponse();

    await SettingController.createOrUpdate(req, res);

    expect(findOne).toBeCalled();
    expect(create).toBeCalled();
    expect(res.render).toBeCalled();
  });
});