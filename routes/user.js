'use strict';

const express = require('express');
const userController = require('../controllers/user');
const apiRoutes = express.Router();

apiRoutes.get('/'   , userController.findAll);
apiRoutes.get('/:id', userController.findOne);
apiRoutes.put('/:id', userController.update);

module.exports = apiRoutes;