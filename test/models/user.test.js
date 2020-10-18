const { expect } = require('chai')
const { match, stub, resetHistory } = require('sinon')

const {
  sequelize,
  dataTypes,
  checkModelName,
  checkUniqueIndex,
  checkPropertyExists 
} = require('sequelize-test-helpers')
 
const UserModel = require('../../app/models/users.model.js')
 
describe('app/models/User', () => {
  let User;
  let user;

  beforeEach(async () => {
    User = await UserModel(sequelize, dataTypes);
    user = await new User();
  });
 
  it('test user model', async () => {
    checkModelName(User)('user')
   
    context('properties', () => {
      ;['id', 'username', 'password'].forEach(checkPropertyExists(user))
    })
  });
})
