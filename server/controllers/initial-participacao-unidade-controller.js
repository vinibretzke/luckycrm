const mysql = require('../mysql');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const participacaoUnidade = require('../SQL/participacao-unidade');

exports.participacaoUnidade = async (req, res, next) => {

    try {
        let query = participacaoUnidade.participacaoUnidade;

        const results = await mysql.execute(query);

        const response = {
            message: 'Consulta Executada',
            consulta: {
                unidade: results[0].label,
                promo: results[0].promo,
                foraPromo: results[0].geral,
                unidade1: results[1].label,
                promo1: results[1].promo,
                foraPromo1: results[1].geral,
                unidade2: results[2].label,
                promo2: results[2].promo,
                foraPromo2: results[2].geral,
                unidade3: results[3].label,
                promo3: results[3].promo,
                foraPromo3: results[3].geral,
                unidade4: results[4].label,
                promo4: results[4].promo,
                foraPromo4: results[4].geral,
                unidade5: results[5].label,
                promo5: results[5].promo,
                foraPromo5: results[5].geral,
                unidade6: results[6].label,
                promo6: results[6].promo,
                foraPromo6: results[6].geral,
                unidade7: results[7].label,
                promo7: results[7].promo,
                foraPromo7: results[7].geral,
                unidade8: results[8].label,
                promo8: results[8].promo,
                foraPromo8: results[8].geral,
                unidade9: results[9].label,
                promo9: results[9].promo,
                foraPromo9: results[9].geral


            }
        }

        console.log(response);
        return res.status(201).send(response);
    } catch (error) {
        return res.status(500).send({ error: error });
    }
};
