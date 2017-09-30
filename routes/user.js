'use strict';

const express = require('express');
const userController = require('../controllers/user');
const apiRoutes = express.Router();
const Authenticate = require('../middlewares/authentication');


apiRoutes.get('/', userController.findAll);
apiRoutes.get('/:id', userController.findOne);
apiRoutes.put('/:id', Authenticate, userController.update);

module.exports = apiRoutes;