const express = require('express');
const app = express();
const morgan = require('morgan');


const rotaImagens = require('./routes/imagens');
const rotaUsuarios = require('./routes/usuarios');
const rotaInitialDashboard = require('./routes/initial-dashboard')
const rotaCadastroEmpresa = require('./routes/cadastros/cadastro-empresa');
const rotaCadastroFilial = require('./routes/cadastros/cadastro-filial');
const rotaCadastroSetor = require('./routes/cadastros/cadastro-setor');
const rotaCadastroVinho = require('./routes/cadastros/cadastro-vinhos');
const rotaCadastroSugestoes = require('./routes/cadastros/cadastro-sugestoes');
const rotaCadastroPesquisa = require('./routes/cadastros/cadastro-pesquisas');
const rotaVisoesCRM = require ('./routes/visoes-crm')
const rotaUtils = require('./routes/utils')

app.use(morgan('dev'));
app.use('/uploads', express.static('uploads'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());



app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).send({});
    }
    next();
});

app.use('/imagens', rotaImagens);
app.use('/usuarios', rotaUsuarios);
app.use('/home', rotaInitialDashboard, rotaUtils);
app.use('/cadastro-empresa', rotaCadastroEmpresa);
app.use('/cadastro-filial', rotaCadastroFilial)
app.use('/cadastro-setor', rotaCadastroSetor)
app.use('/cadastro-vinhos', rotaCadastroVinho)
app.use('/cadastro-sugestoes', rotaCadastroSugestoes)
app.use('/cadastro-pesquisas', rotaCadastroPesquisa)
app.use('/visoes-crm', rotaVisoesCRM);

app.use((req, res, next)=> {
    const erro = new Error('Ops, infelizmente ocorreu algum problema ao acessar essa rota');
    erro.status = 404;
    next(erro);
})

app.use((error, req, res, next)=> {
    res.status(error.status || 500);
    return res.send({
        erro: {
            mensagem: error.message
        }
    })
})

module.exports = app;