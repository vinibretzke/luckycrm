const mysql = require('../mysql');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const participacaoSemana = require('../SQL/participacao-semana');

exports.participacaoSemana = async (req, res, next) => {

    try {
        let query = participacaoSemana.participacaoSemana;

        const results = await mysql.execute(query);

        const response = {
            message: 'Consulta Executada',
            consulta: {
                dia: results[0].label,
                promo: results[0].promo,
                foraPromo: results[0].geral,
                dia1: results[1].label,
                promo1: results[1].promo,
                foraPromo1: results[1].geral,
                dia2: results[2].label,
                promo2: results[2].promo,
                foraPromo2: results[2].geral,
                dia3: results[3].label,
                promo3: results[3].promo,
                foraPromo3: results[3].geral,
                dia4: results[4].label,
                promo4: results[4].promo,
                foraPromo4: results[4].geral,
                dia5: results[5].label,
                promo5: results[5].promo,
                foraPromo5: results[5].geral,
                dia6: results[6].label,
                promo6: results[6].promo,
                foraPromo6: results[6].geral


            }
        }

        console.log(response);
        return res.status(201).send(response);
    } catch (error) {
        return res.status(500).send({ error: error });
    }
};
