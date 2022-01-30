const mysql = require('../mysql');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.newParameters = async (req, res, next) => {

    try {

        query = `INSERT INTO parametros_totem (empr_cod, 
                                               unid_cod, 
                                               param_flg_descontos, 
                                               param_flg_sugestoes, 
                                               param_flg_raspadinha, 
                                               param_flg_nivel, 
                                               param_nivel_xp,
                                               param_email, 
                                               param_flg_adega,
                                               param_flg_pesquisa,
                                               ) VALUES (?,?,?,?,?,?,?,?,?,?,?)`;
        const results = await mysql.execute(query, [req.body.empr_cod, 
                                                    req.body.unid_cod, 
                                                    req.body.param_flg_descontos,
                                                    req.body.param_flg_sugestoes, 
                                                    req.body.param_flg_raspadinha, 
                                                    req.body.param_flg_nivel, 
                                                    req.body.param_nivel_xp, 
                                                    req.body.param_email, 
                                                    req.body.param_flg_adega, 
                                                    req.body.param_flg_pesquisa]);
       

        const response = {
            message: 'Parametro criado com sucesso',
            createdParameter: {
                empr_cod: req.body.empr_cod,
                unid_cod: req.body.unid_cod,
            }
        }
        return res.status(201).send(response);

    } catch (error) {
        return res.status(500).send({ error: error });
    }
};

exports.updateParameteres = async(req, res, next) =>{
    try {

        const hash = await bcrypt.hashSync(req.body.uc_password, 10);

        const query = `UPDATE parametros_totem SET
                                empr_cod = ?,
                                unid_cod = ?,
                                param_flg_descontos = ?,
                                param_flg_sugestoes = ?,
                                param_flg_raspadinha = ?,
                                param_flg_nivel = ?,
                                param_nivel_xp = ?,
                                param_email = ?,
                                param_flg_adega = ?,
                                param_flg_pesquisa = ?
                        WHERE param_cod = ?`;
                                                
       
        await mysql.execute(query, [
            req.body.empr_cod,
            req.body.unid_cod,
            req.body.param_flg_descontos,
            req.body.param_flg_sugestoes,
            req.body.param_flg_raspadinha,
            req.body.param_flg_nivel,
            req.body.param_nivel_xp,
            req.body.param_email,
            req.body.param_flg_adega,
            req.body.param_flg_pesquisa,
            req.body.param_cod
        ]);
        ])
        const response = {
            mensagem: 'Parametro alterado com sucesso', 
            parametroAtualizado: {
                empr_cod: req.body.empr_cod,
                unid_cod: req.body.unid_cod
            }
        }
        return res.status(201).send(response);
    } catch (error) {
        console.log(error);
        return res.status(500).send({ error: error });
    }
}

exports.deleteParameter = async(req, res, next) => {
    try {
        const query = 'DELETE FROM parametros_totem where param_cod = ?';
        await mysql.execute(query, [
            req.body.param_cod
        ])
        const response = {
            mensagem: 'Parametro removido com sucesso',
            request: {
                tipo: "POST",
                body: {
                    param_cod: req.body.param_cod
                }

            }
        }
        return res.status(202).send(response);
    } catch (error) {
        return res.status(500).send({ error: error })
    }
}