const { response } = require('express');
const mysql = require('../../mysql');



exports.getFilial = async (req, res, next) => {
    try {
        const result = await mysql.execute('SELECT unid_cod, unid_nome, unid_cnpj, unid_cidade, unid_ender, unid_tel_ddd, unid_telefone FROM unidade');
        const response = {
            quantidade: result.length,
            empresas: result.map(unid => {
                return {
                    codFilial: unid.unid_cod,
                    nomeFilial: unid.unid_nome,
                    cnpj: unid.unid_cnpj,
                    cidade: unid.unid_cidade,
                    ender: unid.unid_ender,
                    telDdd: unid.unid_tel_ddd,
                    telefone: unid.unid_telefone
                }
               
            })
            
        } 
        console.log(response);
        return res.status(200).send(response)
    } catch (error) {
        return res.status(500).send({ error: error });
    }
};

exports.getFilialFiltro = async (req, res, next) => {
    try {
        const result = await mysql.execute('SELECT unid_cod, unid_nome FROM unidade where empr_cod = ?', [req.body.codEmpresa]);
        const response = {
            quantidade: result.length,
            empresas: result.map(unid => {
                return {
                    codFilial: unid.unid_cod,
                    nomeFilial: unid.unid_nome
                }
               
            })
            
        } 
        console.log(response);
        return res.status(200).send(response)
    } catch (error) {
        return res.status(500).send({ error: error });
    }
};

exports.postFilial = async (req, res, next) => {
    try {
        const query = `insert
                        into
                        unidade (empr_cod,
                        unid_nome,
                        unid_razao_social,
                        unid_cnpj,                         
                        unid_ie,                       
                        unid_cidade,
                        unid_ender,
                        unid_ender_num,
                        unid_ender_cpl,
                        unid_bairro,
                        unid_cep,
                        unid_tel_ddd,
                        unid_telefone)
                    values
                         (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        const result = await mysql.execute(query, [
            req.body.emprCod,
            req.body.nomeFilial,
            req.body.razaoSocial,
            req.body.cnpj,
            req.body.ie,            
            req.body.cidade,
            req.body.ender,
            req.body.enderNum,
            req.body.enderCpl,
            req.body.bairro,
            req.body.cep,
            req.body.telDdd,
            req.body.telefone
        ]);
        const response = {
            mensagem: 'Cadastro inserido com sucesso',
            filialCriada: { 
                codFilial: result.insertId,
                codEmpresa: req.body.emprCod,
                nomeFilial: req.body.nomeFilial,
                razaoSocial: req.body.razaoSocial,
                cnpj: req.body.cnpj,
                ie: req.body.ie,
                ender: req.body.ender,
                enderNum: req.body.enderNum,
                enderCpl: req.body.enderCpl,
                bairro: req.body.bairro,
                cep: req.body.cep,
                telDdd: req.body.telDdd,
                telefone: req.body.telefone,
            }
        }
        return res.status(201).send(response);
        
    } catch (error) {
        console.log(error);
        return res.status(500).send({ error: error });
    }
}

exports.deleteFilial = async(req, res, next) => {
    try {
        const query = 'DELETE FROM unidade where unid_cod = ?';
        await mysql.execute(query, [
            req.body.codUnidade
        ])
        const response = {
            mensagem: 'Cadastro removido com sucesso',
            }
        return res.status(202).send(response);
    } catch (error) {
        return res.status(500).send({ error: error })
    }
}