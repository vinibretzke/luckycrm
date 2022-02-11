const mysql = require('../mysql');




exports.listaPesquisas = async (req, res, next) => {
    try {
        let query = `SELECT * FROM pesquisa`;

        const results = await mysql.execute(query);

        const response = {
            message: 'Consulta Executada',
            consulta: results.map(pesquisa => {
                    return {
                        pesquisa_cod: pesquisa.pesq_cod,
                        pesquisa_nome: pesquisa.pesq_nome,
                    }
            })
        }
        return res.status(201).send(response);
    } catch (error) {
        return res.status(500).send({ error: error });
    }
};