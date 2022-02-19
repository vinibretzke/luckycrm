const { response } = require('express');
const mysql = require('../../mysql');




exports.listaUnidEmprSetor = async (req, res, next) => {
    try {
        const result = await mysql.execute(`select st.setr_codigo, CONCAT(st.empr_codigo, ' - ', st.unid_codigo, ' - ', st.setr_nome) as setores  from setor_totem st where st.setr_flg_sugestao = "S"`);
        const response = {
            quantidade: result.length,
            locais: result.map(set => {
                return {
                    codSetor: set.setr_codigo,
                    nome: set.setores
                }
            })
        }
        return res.status(200).send(response);
    } catch (error) {
        return res.status(500).send({ error: error });
    }
};
exports.getMotivoSugestao = async (req, res, next) => {
    try {
        const result = await mysql.execute(`select
                                                m.motv_cod,
                                                CONCAT(e.empr_cod, ' - ', u.unid_cod, ' - ', st.setr_nome) as locais,
                                                m.motv_desc
                                            from
                                                motivos m
                                            inner join setor_totem st on
                                                m.setr_cod = st.setr_codigo
                                            inner join unidade u on
                                                st.unid_codigo = u.unid_cod
                                            inner join empresa e on
                                                u.empr_cod = u.empr_cod`);
        const response = {
            quantidade: result.length,
            empresas: result.map(loc => {
                return {
                    motivoCod: loc.motv_cod,
                    locais: loc.locais, 
                    motivo: loc.motv_desc
                }

            })

        }
        console.log(response);
        return res.status(200).send(response)
    } catch (error) {
        return res.status(500).send({ error: error });
    }
};

exports.postMotivo = async (req, res, next) => {
    try {
        const query = 'insert into motivos (setr_cod, motv_desc) values (?, ?);';
        const result = await mysql.execute(query, [
            req.body.codSetor,
            req.body.motivo
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

exports.deleteMotivo = async (req, res, next) => {
    try {
        const query = 'delete from motivos where motv_cod = ?';
        await mysql.execute(query, [
            req.body.codMotivo
        ])
        const response = {
            mensagem: 'Cadastro removido com sucesso',
        }
        return res.status(202).send(response);
    } catch (error) {
        return res.status(500).send({ error: error })
    }
}