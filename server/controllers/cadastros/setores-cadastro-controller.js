const { response } = require('express');
const mysql = require('../../mysql');



exports.getSetores = async (req, res, next) => {
    try {
        const result = await mysql.execute('select setr_codigo, empr_codigo, unid_codigo, setr_nome, setr_flg_sugestao  from setor_totem st');
        const response = {
            quantidade: result.length,
            empresas: result.map(set => {
                return {
                    codSetor: set.setr_codigo,
                    codEmpresa: set.empr_codigo,
                    codUnidade: set.unid_codigo,
                    nomeSetor: set.setr_nome,
                    sugestao: set.setr_flg_sugestao                    
                }
               
            })
            
        } 
        console.log(response);
        return res.status(200).send(response)
    } catch (error) {
        return res.status(500).send({ error: error });
    }
};

exports.postSetores = async (req, res, next) => {
    try {
        const query = 'insert into setor_totem (empr_codigo, unid_codigo, setr_nome, setr_flg_sugestao, setr_resp_codigo) values (?, ?, ?, ?, ?)';
        const result = await mysql.execute(query, [
            req.body.emprCod,
            req.body.unidCod,
            req.body.setorNome,
            req.body.setorSugestao, 
            8
        ]);
        const response = {
            mensagem: 'Cadastro inserido com sucesso',
            setorCriado: {
                codSetor: result.insertId,
                nomeSetor: req.body.setorNome,
            }
        }
        return res.status(201).send(response);
        
    } catch (error) {
        console.log(error);
        return res.status(500).send({ error: error });
    }
}

exports.deleteSetores = async(req, res, next) => {
    try {
        const query = 'DELETE FROM setor_totem where setr_codigo = ?';
        await mysql.execute(query, [
            req.body.codSetor
        ])
        const response = {
            mensagem: 'Cadastro removido com sucesso',
            }
        return res.status(202).send(response);
    } catch (error) {
        return res.status(500).send({ error: error })
    }
}