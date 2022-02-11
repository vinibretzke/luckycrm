const mysql = require('../mysql');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const participacaoPromo = require('../SQL/Dashboard Inicial/participacao-promocao');
const clientesPromocao = require('../SQL/Dashboard Inicial/table-promocao');
const cardsPromo = require('../SQL/Dashboard Inicial/cards-promo');
const participacaoSemana = require('../SQL/Dashboard Inicial/participacao-semana');
const participacaoUnidade = require('../SQL/Dashboard Inicial/participacao-unidade');





exports.participacaoPromo = async (req, res, next) => {

    try {
        let query = participacaoPromo.participacaoPromo;

        const results = await mysql.execute(query);

        const response = {
            message: 'Consulta Executada',
            consulta: results.map(part => {
                return {
                   data: part.label, 
                   vendaPromo: part.venda_promo,
                   venda: part.venda_total,
                   partPromo: part.part_promo,
                }
            })            
        }

        return res.status(201).send(response);
    } catch (error) {
        return res.status(500).send({ error: error });
    }
};


exports.clientesPromocao = async (req, res, next) => {
    try {
        let query = clientesPromocao.clientesPromocao;

        const results = await mysql.execute(query);

        const response = {
            message: 'Consulta Executada',
            consulta: results.map(cli => {
                return {
                    nome: cli.cli_nome, 
                    ender: cli.ender,
                    bairro: cli.bairro,
                    telefone: cli.telefone,
                    celular: cli.celular,
                    cupons: cli.cupons,
                    valor: cli.valor            
                }
            })
        }


        return res.status(201).send(response);
    } catch (error) {
        return res.status(500).send({ error: error });
    }
};


exports.participacaoSemana = async (req, res, next) => {

    try {
        let query = participacaoSemana.participacaoSemana;

        const results = await mysql.execute(query);

        const response = {
            message: 'Consulta Executada',
            consulta: results.map(partsem => {
                return {
                dia: partsem.label,
                vendaPromo: partsem.venda_promo,
                venda: partsem.venda,
                promo: partsem.promo,
                foraPromo: partsem.geral
            }
        })
        }

        return res.status(201).send(response);
    } catch (error) {
        return res.status(500).send({ error: error });
    }
};


exports.participacaoUnidade = async (req, res, next) => {

    try {
        let query = participacaoUnidade.participacaoUnidade;

        const results = await mysql.execute(query);

        const response = {
            message: 'Consulta Executada',
            consulta: results.map(part => {
                return {
                    unidade: part.label,
                    vendaPromo: part.venda_promo,
                    venda: part.venda,
                    promo: part.promo,
                }
            })
        }

        return res.status(201).send(response);
    } catch (error) {
        return res.status(500).send({ error: error });
    }
};


exports.cardsPromo = async (req, res, next) => {
    
    try {
        let query = cardsPromo.cardsPromo;

        const results = await mysql.execute(query);
    
        const response = {
            message: 'Consulta Executada',
            consulta: {
                novosClientes: results[0].novos_clientes,
                clientesAtivos: results[0].clientes_ativos,
                vendaTotal: results[0].venda_total,
                vendaPromo: results[0].venda_promo,
                ticketMedioPromo: results[0].tk_medio_promo,
                gastoMedioPromo: results[0].gasto_medio,
                qtdCupons: results[0].qtd_cupons,
                cuponsClientes: results[0].cupons_cliente,
                clientesPerdidos: results[0].clientes_perdidos
            }
        }

        console.log(response);
        return res.status(201).send(response);
    } catch (error) {
        return res.status(500).send({ error: error });
    }
};

