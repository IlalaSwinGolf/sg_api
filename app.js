'use strict';

const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const router = require('./router');

const app = express();

app.use(logger(process.env.LOG_LEVEL || 'dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

router(app);
module.exports = app;