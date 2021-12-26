const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuarios-controller');

router.post('/cadastro',  usuariosController.createUser);
router.post('/login', usuariosController.Login);
router.patch('/alterar-usuario', usuariosController.updateUsuario);

module.exports = router;