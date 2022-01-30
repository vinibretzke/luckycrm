const express = require('express');
const router = express.Router();
const login = require('../middleware/login')
const dashboardsController = require('../controllers/initial-dashboard-controller');
const cardsController = require('../controllers/initial-cards-controller');
const participacaoUnidade = require('../controllers/initial-participacao-unidade-controller');
const participacaoSemana = require('../controllers/initial-participacao-semana-controller');

router.get('/dashboard', dashboardsController.Dashboard1);
router.get('/cards-promo', cardsController.cardsPromo1); 
router.get('/participacao-unidade', participacaoUnidade.participacaoUnidade);
router.get('/participacao-semana', participacaoSemana.participacaoSemana);

module.exports = router;