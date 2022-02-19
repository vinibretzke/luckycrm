const express = require('express');
const router = express.Router();
const login = require('../../middleware/login')
const pesquisasController = require ('../../controllers/cadastros/pesquisa-cadastro-controller');

router.get('/lista-pesquisas', pesquisasController.getPesquisas);
router.post('/cadastro', pesquisasController.postPesquisa);
router.delete('/deletar', pesquisasController.deletePesquisa);
router.post('/lista-perguntas', pesquisasController.getPerguntas);
module.exports = router;