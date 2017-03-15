'use strict';

const Express = require('express');
const Logger = require('morgan');
const BodyParser = require('body-parser');
const Router = require('./router');
const Passport = require('passport');
const ConfigurePassport = require('./config/passport-jwt-config');
const ErrorHandler = require('./middlewares/error-handler');

const App = Express();

App.use(Logger(process.env.LOG_LEVEL || 'dev'));
App.use(Passport.initialize());
ConfigurePassport();
App.use(BodyParser.json());
App.use(BodyParser.urlencoded({
    extended: false
}));

Router(App, Passport);

App.use(ErrorHandler);

module.exports = App;