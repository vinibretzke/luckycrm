const express = require('express');
const router = express.Router();
const login = require('../middleware/login')
const dashboardsController = require('../controllers/initial-dashboard-controller');


router.get('/cards-promo', dashboardsController.cardsPromo); 
router.get('/participacao-unidade', dashboardsController.participacaoUnidade);
router.get('/participacao-semana', dashboardsController.participacaoSemana);
router.get('/participacao-promo', dashboardsController.participacaoPromo);
router.get('/clientes-promo', dashboardsController.clientesPromocao);

module.exports = router;