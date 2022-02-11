const mysql = require('../mysql');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.createUser = async (req, res, next) => {

    try {
        var query = `SELECT * FROM usuarios WHERE uc_login = ?`;
        var result = await mysql.execute(query, [req.body.uc_login]);

        if (result.length > 0) {
            return res.status(409).send({ message: 'Usuário já cadastrado' })
        }

        const hash = await bcrypt.hashSync(req.body.uc_password, 10);

        query = 'INSERT INTO usuarios (uc_nome, uc_login, uc_password) VALUES (?,?,?)';
        const results = await mysql.execute(query, [req.body.uc_nome, req.body.uc_login, hash]);
       

        const response = {
            message: 'Usuário criado com sucesso',
            createdUser: {
                uc_cod: results.insertId,
                uc_login: req.body.uc_login,
                uc_nome: req.body.uc_nome
            }
        }
        return res.status(201).send(response);

    } catch (error) {
        return res.status(500).send({ error: error });
    }
};

exports.updateUsuario = async(req, res, next) =>{
    try {

        const hash = await bcrypt.hashSync(req.body.uc_password, 10);

        const query = `UPDATE usuarios
                        set uc_nome    = ?,
                        uc_password       = ?
                        where uc_cod = ? `
       
        await mysql.execute(query, [
            req.body.uc_nome, 
            hash,
            req.body.uc_cod
        ])
        const response = {
            mensagem: 'Usuário alterado com sucesso', 
            cadastroAtualizado: {
                nome: req.body.uc_nome,
                cod_usuario: req.body.uc_cod
            }
        }
        return res.status(201).send(response);
    } catch (error) {
        console.log(error);
        return res.status(500).send({ error: error });
    }
}

exports.Login = async (req, res, next) => {

    try {
        const query = `SELECT * FROM usuarios WHERE uc_login = ?`;
        var results = await mysql.execute(query, [req.body.uc_login]);

        if (results.length < 1) {
            return res.status(401).send({ message: 'Usuário não cadastrado' })
        }

        if (await bcrypt.compareSync(req.body.uc_password, results[0].uc_password)) {
            const token = jwt.sign({
                    uc_cod: results[0].uc_cod,
                    uc_login: results[0].uc_login
                },
                process.env.JWT_KEY,
                {
                    expiresIn: '1h' 
                });
                return res.status(200).send({
                    message: 'Autenticado com sucesso',
                    token: token, 
                    user: {
                        uc_cod: results[0].uc_cod,
                        uc_login: results[0].uc_login
                    }
                });
            } else {
        return res.status(401).send({ message: 'Senha Errada' })
        }

    } catch (error) {
        console.log(error)
        return res.status(500).send({ message: 'Falha na autenticação' });
    }
};