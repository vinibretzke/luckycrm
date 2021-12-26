const express = require('express');
const router = express.Router();
const dashboardsController = require('../controllers/initial-dashboard-controller');

router.get('/dashboard',  dashboardsController.Dashboard1);

module.exports = router;