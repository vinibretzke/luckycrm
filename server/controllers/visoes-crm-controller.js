const mysql = require('../mysql');
const cardsIdade = require('../SQL/Visões CRM/cards-idade');
const chartsIdade = require('../SQL/Visões CRM/charts-idade');
const cardsGenero = require('../SQL/Visões CRM/cards-genero');
const chartsGenero = require('../SQL/Visões CRM/charts-genero');
const pesquisas = require('../SQL/Visões CRM/pesquisas');




exports.cardsIdade = async (req, res, next) => {
    try {
        let query = cardsIdade.cardsIdade;

        const results = await mysql.execute(query);

        const response = {
            message: 'Consulta Executada',
            consulta: {
                // venda: [cards.vd_grupo1, cards.vd_grupo2, cards.vd_grupo3, cards.vd_grupo4, cards.vd_grupo5,cards.vd_total],        
                // cupons: [cards.cp_grupo1, cards.cp_grupo2, cards.cp_grupo3, cards.cp_grupo4, cards.cp_grupo5,cards.cp_total],
                vd_grupo1: results[0].vd_grupo1,
                vd_grupo2: results[0].vd_grupo2,
                vd_grupo3: results[0].vd_grupo3,
                vd_grupo4: results[0].vd_grupo4,
                vd_grupo5: results[0].vd_grupo5,
                vd_total: results[0].vd_total,
                cp_grupo1: results[0].cp_grupo1,
                cp_grupo2: results[0].cp_grupo2,
                cp_grupo3: results[0].cp_grupo3,
                cp_grupo4: results[0].cp_grupo4,
                cp_grupo5: results[0].cp_grupo5,
                cp_total: results[0].cp_total
            }

        }


        return res.status(201).send(response);
    } catch (error) {
        return res.status(500).send({ error: error });
    }
};

exports.idadeUnidade = async (req, res, next) => {

    try {
        let query = chartsIdade.idadeUnidade;

        const results = await mysql.execute(query);

        const response = {
            message: 'Consulta Executada',
            consulta: results.map(unid => {
                return {
                    unidade: unid.label,
                    vd_grupo1: unid.vd_grupo1,
                    vd_grupo2: unid.vd_grupo2,
                    vd_grupo3: unid.vd_grupo3,
                    vd_grupo4: unid.vd_grupo4,
                    vd_grupo5: unid.vd_grupo5
                }
            })
        }

        return res.status(201).send(response);
    } catch (error) {
        return res.status(500).send({ error: error });
    }
};




exports.idadeDiaSemana = async (req, res, next) => {

    try {
        let query = chartsIdade.idadeDiaSemana;

        const results = await mysql.execute(query);

        const response = {
            message: 'Consulta Executada',
            consulta: results.map(sem => {
                return {
                    dia: sem.label,
                    vd_grupo1: sem.vd_grupo1,
                    vd_grupo2: sem.vd_grupo2,
                    vd_grupo3: sem.vd_grupo3,
                    vd_grupo4: sem.vd_grupo4,
                    vd_grupo5: sem.vd_grupo5,
                }
            })
        }

        return res.status(201).send(response);
    } catch (error) {
        return res.status(500).send({ error: error });
    }
};


exports.partipacaoIdade = async (req, res, next) => {

    try {
        let query = chartsIdade.partipacaoIdade;

        const results = await mysql.execute(query);

        const response = {
            message: 'Consulta Executada',
            consulta: results.map(part => {
                return {
                    mes: part.label,
                    vd_grupo1: part.vd_grupo1,
                    vd_grupo2: part.vd_grupo2,
                    vd_grupo3: part.vd_grupo3,
                    vd_grupo4: part.vd_grupo4,
                    vd_grupo5: part.vd_grupo5,
                    vd_total: part.vd_total,
                }
            })
        }

        return res.status(201).send(response);
    } catch (error) {
        return res.status(500).send({ error: error });
    }
};

exports.cardsGenero = async (req, res, next) => {
    try {
        let query = cardsGenero.cardsGenero;

        const results = await mysql.execute(query);

        const response = {
            message: 'Consulta Executada',
            consulta: {
                vendaHomem: results[0].venda_homem,
                cuponsHomem: results[0].cupons_homem,
                vendaMulher: results[0].venda_mulher,
                cuponsMulher: results[0].cupons_mulher,
                vendaOutros: results[0].venda_outros,
                cuponsOutros: results[0].cupons_outros,
                venda_total: results[0].venda_total,
                cupons_total: results[0].cupons_total
            }

        }


        return res.status(201).send(response);
    } catch (error) {
        return res.status(500).send({ error: error });
    }
}

exports.generoUnidade = async (req, res, next) => {
    try {
        let query = chartsGenero.generoUnidade;

        const results = await mysql.execute(query);

        const response = {
            message: 'Consulta Executada',
            consulta: results.map(unid => {
                return {
                    unidade: unid.label,
                    venda_homem: unid.venda_homem,
                    venda_mulher: unid.venda_mulher,
                    venda_outros: unid.venda_outros
                }
            })
        }

        return res.status(201).send(response);
    } catch (error) {
        return res.status(500).send({ error: error });
    }
};

exports.generoDiaSemana = async (req, res, next) => {
    try {
        let query = chartsGenero.generoSemana;

        const results = await mysql.execute(query);

        const response = {
            message: 'Consulta Executada',
            consulta: results.map(sem => {
                return {
                    dia: sem.label,
                    venda_homem: sem.venda_homem,
                    venda_mulher: sem.venda_mulher,
                    venda_outros: sem.venda_outros
                }
            })
        }

        return res.status(201).send(response);
    } catch (error) {
        return res.status(500).send({ error: error });
    }
};

exports.partipacaoGenero = async (req, res, next) => {

    try {
        let query = chartsGenero.generoPartipacao;

        const results = await mysql.execute(query);

        const response = {
            message: 'Consulta Executada',
            consulta: results.map(part => {
                return {
                    mes: part.label,
                    venda_homem: part.per_homem,
                    venda_mulher: part.per_mulher
                }
            })
        }

        return res.status(201).send(response);
    } catch (error) {
        return res.status(500).send({ error: error });
    }
};

exports.generoTimes = async (req, res, next) => {

    try {
        let query = chartsGenero.generoTime;

        const results = await mysql.execute(query);

        const response = {
            message: 'Consulta Executada',
            consulta: results.map(tim => {
                return {
                    time: tim.label,
                    qtd_homens: tim.QTD_HOMENS,
                    qtd_mulheres: tim.QTD_MULHERES,
                    qtd_outros: tim.QTD_GERAL,
                    qtd_total: tim.TOTAL
                }
            })
        }

        return res.status(201).send(response);
    } catch (error) {
        return res.status(500).send({ error: error });
    }
};

exports.pesquisaIdade = async (req, res, next) => {
    try {
        let query = pesquisas.pesquisaIdade;
        const results = await mysql.execute(query, [req.body.pesq_codigo]);

        const response = {
            message: 'Consulta Executada',
            consulta: results.map(pesq => {
                return {
                    mes: pesq.label,
                    grupo1: pesq.qtd_grupo1,
                    grupo2: pesq.qtd_grupo2,
                    grupo3: pesq.qtd_grupo3,
                    grupo4: pesq.qtd_grupo4,
                    grupo5: pesq.qtd_grupo5
                }
            })
        }

        return res.status(201).send(response);
    } catch (error) {
        return res.status(500).send({ error: error });
    }
};

exports.pesquisaGenero = async (req, res, next) => {
    try {
        let query = pesquisas.pesquisaGenero;
        const results = await mysql.execute(query, [req.body.pesq_codigo]);

        const response = {
            message: 'Consulta Executada',
            consulta: results.map(pesq => {
                return {
                    mes: pesq.label,
                    qtd_mulheres: pesq.qtd_f,
                    qtd_homens: pesq.qtd_m,
                    qtd_outros: pesq.qtd_o,
                }
            })
        }

        return res.status(201).send(response);
    } catch (error) {
        return res.status(500).send({ error: error });
    }
};

exports.pesquisaTotal = async (req, res, next) => {
    try {
        let query = pesquisas.pesquisaTotal;
        const results = await mysql.execute(query, [req.body.pesq_codigo]);

        const response = {
            message: 'Consulta Executada',
            consulta: results.map(pesq => {
                return {
                    mes: pesq.label,
                    qtd_total: pesq.value,
                }
            })
        }

        return res.status(201).send(response);
    } catch (error) {
        return res.status(500).send({ error: error });
    }
};