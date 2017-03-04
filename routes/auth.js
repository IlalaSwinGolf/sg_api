'use strict';

const express = require('express');
const authController = require('../controllers/auth');
const apiRoutes = express.Router();

apiRoutes.post('/signup' , authController.signup);
apiRoutes.post('/signin' , authController.signin);

module.exports = apiRoutes;