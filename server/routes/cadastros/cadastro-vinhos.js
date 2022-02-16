const express = require('express');
const router = express.Router();
const login = require('../../middleware/login')
const vinhosController = require ('../../controllers/cadastros/vinhos-cadastro-controller');

router.get('/lista-vinhos', vinhosController.getVinhos);
router.post('/cadastrar',vinhosController.postVinhos);
router.delete('/deletar', vinhosController.deleteVinhos);
router.get('/lista-categoria', vinhosController.getCategoriaVinhos);
router.post('/cadastrar-categoria',vinhosController.postCategoriaVinhos);
router.delete('/deletar-categoria', vinhosController.deleteCategoriaVinhos);
router.get('/lista-origem', vinhosController.getOrigemVinhos);
router.post('/cadastrar-origem',vinhosController.postOrigemVinhos);
router.delete('/deletar-origem', vinhosController.deleteOrigemVinhos);


module.exports = router;