const { expect } = require('chai')
 
const {
  sequelize,
  dataTypes,
  checkModelName,
  checkUniqueIndex,
  checkPropertyExists 
} = require('sequelize-test-helpers')
 
const UserModel = require('../../app/models/users.model.js')
 
describe('app/models/User', () => {
  const User = UserModel(sequelize, dataTypes)
  const user = new User()
 
  checkModelName(User)('user')
 
  context('properties', () => {
    ;['id', 'username', 'password'].forEach(checkPropertyExists(user))
  })
})