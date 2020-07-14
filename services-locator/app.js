const express = require('express');
const bodyParser = require('body-parser');
const errorHandler = require('errorhandler');
const http = require('http');
const app = module.exports = express();

const svcLoc = require('./lib/serviceLocator')(); //[1]
svcLoc.register('dbName', 'example-db'); //[2]
svcLoc.register('tokenSecret', 'SHHH!');
svcLoc.factory('db', require('./lib/db'));
svcLoc.factory('authService', require('./lib/authService'));
svcLoc.factory('authController', require('./lib/authController'));
const authController = svcLoc.get('authController'); //[3]

app.use(bodyParser.json());

app.post('/login', authController.login);
app.all('/checkToken', authController.checkToken);
app.use(errorHandler());
http.createServer(app).listen(3000, () => {
  console.log('Express server started');
});