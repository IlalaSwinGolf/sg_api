const Express = require('express');
const RoleRoutes = require ('./routes/role');
const UserRoutes = require ('./routes/user');
const AuthRoutes = require ('./routes/auth');
const APIVersion =  require ('./api_version')();
const CustomErrors = require('./helpers/custom-errors');

module.exports = function(app) {
    const apiRoutes = Express.Router();

    apiRoutes.use('/roles', RoleRoutes);
    apiRoutes.use('/users', UserRoutes);
    apiRoutes.use('/auth' , AuthRoutes);
    apiRoutes.all('*', (req, res, next) => next(new CustomErrors.routeError(405, req.url + " url route with "  + req.method + " method has not been found ")));

    app.use('/api/' + APIVersion, apiRoutes);
}