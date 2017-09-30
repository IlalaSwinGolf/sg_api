'use strict';

const Express = require('express');
const RoleController = require('../controllers/role');
const ApiRoutes = Express.Router();

ApiRoutes.get('/', RoleController.findAll);

module.exports = ApiRoutes;