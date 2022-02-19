const { response } = require('express');
const mysql = require('../../mysql');



exports.getPesquisas = async (req, res, next) => {
    try {
        const result = await mysql.execute('select pesq_cod, pesq_nome, pesq_data_inicial, pesq_data_final, pesq_flg_tipo from pesquisa p ');
        const response = {
            quantidade: result.length,
            pesquisas: result.map(emp => {
                return {
                    codigoPesquisa: emp.pesq_cod,
                    nomePesquisa: emp.pesq_nome,
                    dataInicial: emp.pesq_data_inicial,
                    dataFinal: emp.pesq_data_final,
                    tipoPesquisa: emp.pesq_flg_tipo
                }

            })

        }
        console.log(response);
        return res.status(200).send(response)
    } catch (error) {
        return res.status(500).send({ error: error });
    }
};

exports.postPesquisa = async (req, res, next) => {
    try {
        const query = 'INSERT INTO pesquisa (pesq_nome, pesq_data_inicial, pesq_data_final, pesq_flg_tipo) values (?, ?, ?, ?)';
        const result = await mysql.execute(query, [
            req.body.nomePesquisa,
            req.body.dataInicial,
            req.body.dataFinal,
            req.body.tipoPesquisa
        ]);
        const response = {
            mensagem: 'Cadastro inserido com sucesso'
        }
        return res.status(201).send(response);

    } catch (error) {
        console.log(error);
        return res.status(500).send({ error: error });
    }
}

exports.deletePesquisa = async (req, res, next) => {
    try {
        const query = 'DELETE FROM pesquisa where pesq_cod = ?';
        await mysql.execute(query, [
            req.body.codPesquisa
        ])
        const response = {
            mensagem: 'Cadastro removido com sucesso',
        }
        return res.status(202).send(response);
    } catch (error) {
        return res.status(500).send({ error: error })
    }
}
exports.getPerguntas = async (req, res, next) => {
    try {
        let query = 'select pepe_cod, pepe_pergunta, pepe_tipo_pergunta  from pesquisa_pergunta where pesq_cod = ?';

        const results = await mysql.execute(query, [req.body.codPesquisa]);

        const response = {
            message: 'Consulta Executada',

            quantidade: results.length,
            perguntas: results.map(emp => {
                return {
                    codigoPergunta: emp.pepe_cod,
                    pergunta: emp.pepe_pergunta,
                    tipoPergunta: emp.pepe_tipo_pergunta
                }
            })


        }


        return res.status(201).send(response);
    } catch (error) {
        return res.status(500).send({ error: error });
    }
};

exports.postPerguntas = async (req, res, next) => {
    try {
        const query = 'INSERT INTO pesquisa_pergunta (pesq_cod, pepe_pergunta, pepe_tipo_pergunta) values (?, ?, ?)';
        const result = await mysql.execute(query, [
            req.body.codPesquisa,
            req.body.pergunta,
            req.body.tipoPergunta
        ]);
        const response = {
            mensagem: 'Cadastro inserido com sucesso'
        }
        return res.status(201).send(response);

    } catch (error) {
        console.log(error);
        return res.status(500).send({ error: error });
    }
}

exports.deletePerguntas = async (req, res, next) => {
    try {
        const query = 'DELETE FROM pesquisa_pergunta where pepe_cod = ?';
        await mysql.execute(query, [
            req.body.codPergunta
        ])
        const response = {
            mensagem: 'Cadastro removido com sucesso',
        }
        return res.status(202).send(response);
    } catch (error) {
        return res.status(500).send({ error: error })
    }
}