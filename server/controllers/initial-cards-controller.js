const mysql = require('../mysql');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cardsPromo = require('../SQL/cards-promo');

exports.cardsPromo1 = async (req, res, next) => {
    
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
