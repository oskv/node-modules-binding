module.exports = (serviceLocator) => {
  const db = serviceLocator.get('db');
  const tokenSecret = serviceLocator.get('tokenSecret');
  const users = db.sublevel('users');
  const authService = {};
  authService.login = (username, password, callback) => {
//...то же, что в предыдущей версии
  }
  authService.checkToken = (token, callback) => {
//...то же, что в предыдущей версии
  }
  return authService;
};