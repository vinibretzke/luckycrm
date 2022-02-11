const express = require('express');
const router = express.Router();
const listaPesquisas = require('../controllers/lista-pesquisas-controller');
const login = require('../middleware/login');

router.get('/lista-pesquisas', listaPesquisas.listaPesquisas);

module.exports = router;