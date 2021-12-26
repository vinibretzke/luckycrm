const express = require('express');
const router = express.Router();
const multer = require('multer'); 
const login = require('../middleware/login')

const imagensController = require('../controllers/imagens-controller');


const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './uploads/');
    }, 
    filename: function(req, file, cb){
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0');
        var yyyy = today.getFullYear();
        
        today = dd + '-' + mm + '-' + yyyy;
        cb(null, today + ' ' + file.originalname); 
    }
})
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'jpg'){
        cb(null, true); 
    }else {
        cb(null, false);
    }
}
const upload = multer({
    storage: storage, 
    limits: {
        fileSize: 1024 * 1024 * 5
    }, 
    fileFilter: fileFilter
})
router.get('/', login.obrigatorio, imagensController.getImagens) 
router.get('/:cod_imagens', login.obrigatorio, imagensController.getUmaImagem);
router.post('/', login.obrigatorio, upload.single('imagem'), imagensController.postImagens);
router.patch('/', login.obrigatorio, imagensController.patchImagens);
router.delete('/', login.obrigatorio, imagensController.deleteImagens);


module.exports = router;