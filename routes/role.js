'use strict';

const Express = require('express');
const RoleController = require('../controllers/role');
const ApiRoutes = Express.Router();

ApiRoutes.get('/', RoleController.fetchAll);

module.exports = ApiRoutes;