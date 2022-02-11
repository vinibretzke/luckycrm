const express = require('express');
const router = express.Router();
const login = require('../middleware/login')
const visoesCrmController = require('../controllers/visoes-crm-controller');


router.get('/cards-idade', visoesCrmController.cardsIdade); 
router.get('/idade-unidade', visoesCrmController.idadeUnidade);
router.get('/idade-semana', visoesCrmController.idadeDiaSemana);
router.get('/idade-participacao', visoesCrmController.partipacaoIdade);
router.get('/cards-genero', visoesCrmController.cardsGenero);
router.get('/genero-unidade', visoesCrmController.generoUnidade);
router.get('/genero-semana', visoesCrmController.generoDiaSemana);
router.get('/genero-participacao', visoesCrmController.partipacaoGenero);
router.get('/genero-times', visoesCrmController.generoTimes);
router.post('/pesquisa-idade', visoesCrmController.pesquisaIdade);

module.exports = router;