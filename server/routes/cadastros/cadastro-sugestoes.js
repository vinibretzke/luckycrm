const express = require('express');
const router = express.Router();
const login = require('../../middleware/login')
const sugestoesController = require ('../../controllers/cadastros/sugestao-cadastro-controller');

router.get('/lista-locais', sugestoesController.listaUnidEmprSetor);
router.get('/lista-motivos',sugestoesController.getMotivoSugestao);
router.post('/cadastrar-sugestao', sugestoesController.postMotivo);
router.delete('/deletar', sugestoesController.deleteMotivo);

module.exports = router;