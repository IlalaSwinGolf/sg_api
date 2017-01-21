const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');

const app = express();

app.use(logger(process.env.LOG_LEVEL || 'dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('*', (req, res) => res.status(200).send({
  message: 'Welcome to swin-golf scorecard application.',
}));

module.exports = app;