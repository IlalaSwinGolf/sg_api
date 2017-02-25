const express = require('express');
const roleController = require('./controllers/role');
const roleRoutes = require ('./routes/role');
const userController = require('./controllers/user');
const userRoutes = require ('./routes/user');
const APIVersion =  require ('./api_version')();

module.exports = function(app) {
    const apiRoutes = express.Router();

    //routes will go here
    apiRoutes.use('/roles', roleRoutes);
    apiRoutes.use('/users', userRoutes);
    apiRoutes.all('*', (req, res) => res.status(200).send({
        error: false,
        message: 'Welcome to swin-golf scorecard application.',
    }));

    app.use('/api/' + APIVersion, apiRoutes);
}