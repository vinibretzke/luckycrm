const express = require('express');
const router = express.Router();
const login = require('../../middleware/login')
const empresasController = require ('../../controllers/cadastros/empresa-cadastro-controller');

router.get('/lista-empresas', login.opcional,empresasController.getEmpresas);
router.post('/cadastrar',empresasController.postEmpresa);
router.delete('/deletar', empresasController.deleteEmpresa);

module.exports = router;