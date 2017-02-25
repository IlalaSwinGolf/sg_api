'use strict';

const express = require('express');
const roleController = require('../controllers/role');
const apiRoutes = express.Router();

apiRoutes.get('/', roleController.fetchAll);
apiRoutes.all('*', roleController.forbidden);

module.exports = apiRoutes;