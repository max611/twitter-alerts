require('mysql2/node_modules/iconv-lite').encodingExists('foo');
const { User } = require('../app/config/sequelize.js')

beforeEach(() => {
  User.create({
  	username: 'test-user',
  	password: 'testpassword'
  })
});

test('fix iconv bug', async () => {
	expect(1).toEqual(1)
});