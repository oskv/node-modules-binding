module.exports = (serviceLocator) => {
  const authService = serviceLocator.get('authService');
  const authController = {};
  authController.login = (req, res, next) => {
//...то же, что в предыдущей версии
  };
  authController.checkToken = (req, res, next) => {
//...то же, что в предыдущей версии
  };
  return authController;
}