const express = require('express');
const router = express.Router();
const login = require('../../middleware/login')
const filialController = require ('../../controllers/cadastros/filial-cadastro-controller ');

router.get('/lista-filiais', filialController.getFilial);
router.post('/lista-filiais-por-empresa', filialController.getFilialFiltro);
router.post('/cadastrar',filialController.postFilial);
router.delete('/deletar', filialController.deleteFilial);

module.exports = router;