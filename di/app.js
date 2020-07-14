const dbFactory = require('./lib/db'); //[1]
const authServiceFactory = require('./lib/authService');
const authControllerFactory = require('./lib/authController');
const db = dbFactory('example-db'); //[2]
const authService = authServiceFactory(db, 'SHHH!');
const authController = authControllerFactory(authService);
const express = require('express');
const bodyParser = require('body-parser');
const errorHandler = require('errorhandler');
const http = require('http');
const app = module.exports = express();
app.use(bodyParser.json());
app.post('/login', authController.login); //[3]
app.get('/checkToken', authController.checkToken);
app.use(errorHandler());
http.createServer(app).listen(3000, () => {
  console.log('Express server started');
});