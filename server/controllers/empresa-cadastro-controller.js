const { response } = require('express');
const mysql = require('../mysql');



exports.getEmpresas = async (req, res, next) => {
    try {
        const result = await mysql.execute('SELECT empr_cod, empr_nome, empr_razao_social, empr_cnpj  FROM empresa');
        const response = {
            quantidade: result.length,
            empresas: result.map(emp => {
                return {
                    codEmpresa: emp.empr_cod,
                    nome: emp.empr_nome,
                    razaoSocial: emp.empr_razao_social,
                    cnpj: emp.empr_cnpj,
                    request: {
                        tipo: 'GET',
                        descricao: 'Retorna todas as empresas',
                        url: process.env.URL_API + 'empresas/' + emp.empr_cod
                    }
                }
               
            })
            
        } 
        console.log(response);
        return res.status(200).send(response)
    } catch (error) {
        return res.status(500).send({ error: error });
    }
};

exports.postEmpresa = async (req, res, next) => {
    try {
        const query = 'INSERT INTO empresa (empr_nome, empr_razao_social, empr_cnpj) values (?, ?, ?)';
        const result = await mysql.execute(query, [
            req.body.nomeEmpresa,
            req.body.razaoSocial,
            req.body.cnpj
        ]);
        const response = {
            mensagem: 'Cadastro inserido com sucesso',
            empresaCriada: {
                codEmpresa: result.insertId,
                nomeEmpresa: req.body.nomeEmpresa,
                razaoSocial: req.body.razaoSocial,
                cnpj: req.body.cnpj,
            }
        }
        return res.status(201).send(response);
        
    } catch (error) {
        console.log(error);
        return res.status(500).send({ error: error });
    }
}

exports.deleteEmpresa = async(req, res, next) => {
    try {
        const query = 'DELETE FROM empresa where empr_cod = ?';
        await mysql.execute(query, [
            req.body.codEmpresa
        ])
        const response = {
            mensagem: 'Cadastro removido com sucesso',
            }
        return res.status(202).send(response);
    } catch (error) {
        return res.status(500).send({ error: error })
    }
}