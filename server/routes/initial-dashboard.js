const express = require('express');
const router = express.Router();
const login = require('../middleware/login')
const dashboardsController = require('../controllers/initial-dashboard-controller');

router.get('/dashboard', login.obrigatorio, dashboardsController.Dashboard1);

module.exports = router;