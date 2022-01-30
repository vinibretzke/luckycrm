const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuarios-controller');

router.post('/parametros/criar', login.obrigatorio, usuariosController.createUser);
router.post('/parametros/atualizar', usuariosController.Login);
router.delete('/parametros/deletar', usuariosController.updateUsuario);

module.exports = router;