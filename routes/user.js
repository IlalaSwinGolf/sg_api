'use strict';

const express = require('express');
const userController = require('../controllers/user');
const apiRoutes = express.Router();

apiRoutes.get('/'   , userController.fetchAll);
apiRoutes.get('/:id', userController.fetch);

module.exports = apiRoutes;