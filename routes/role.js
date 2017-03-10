'use strict';

const Express = require('express');
const RoleController = require('../controllers/role');
const ApiRoutes = Express.Router();

ApiRoutes.get('/', RoleController.fetchAll);
ApiRoutes.get('/:id/users', RoleController.fetchUsers);

module.exports = ApiRoutes;