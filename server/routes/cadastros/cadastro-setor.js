const express = require('express');
const router = express.Router();
const login = require('../../middleware/login')
const setorController = require ('../../controllers/cadastros/setores-cadastro-controller');

router.get('/lista-setores', setorController.getSetores);
router.post('/cadastrar',setorController.postSetores);
router.delete('/deletar', setorController.deleteSetores);

module.exports = router;