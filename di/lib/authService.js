const jwt = require('jwt-simple');
const bcrypt = require('bcrypt');

module.exports = (db, tokenSecret) => {
  const users = db.sublevel('users');
  const authService = {};
  authService.login = (username, password, callback) => {
//...то же, что в предыдущей версии
  };
  authService.checkToken = (token, callback) => {
//...то же, что в предыдущей версии
  };
  return authService;
};