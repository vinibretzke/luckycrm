const mysql = require('../mysql');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dashboard = require('../SQL/dashboard1')


exports.Dashboard1 = async (req, res, next) => {

    try {
        let query = dashboard.dashboard1;

        const results = await mysql.execute(query, [req.body.dataInicial, req.body.dataFinal]);
       
        const response = {
            message: 'Consulta Executada',
            consulta: {
                VendaGrupo1: results[0].vd_grupo1 ,
                VendaGrupo2: results[0].vd_grupo2,
                VendaGrupo3: results[0].vd_grupo3,                
                VendaGrupo4: results[0].vd_grupo4,
                VendaGrupo5: results[0].vd_grupo5,
                VendaTotal: results[0].vd_total,
                CuponsGrupo1: results[0].cp_grupo1,
                CuponsGrupo2: results[0].cp_grupo2,
                CuponsGrupo3: results[0].cp_grupo3,
                CuponsGrupo4: results[0].cp_grupo4,
                CuponsGrupo5: results[0].cp_grupo5,
                CuponsTotal: results[0].cp_total
            }
        }

        console.log(response);
        return res.status(201).send(response);

    } catch (error) {
        return res.status(500).send({ error: error });
    }
};


