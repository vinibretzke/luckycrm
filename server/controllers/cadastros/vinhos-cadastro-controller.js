const { response } = require('express');
const mysql = require('../../mysql');



exports.getVinhos = async (req, res, next) => {
    try {
        const result = await mysql.execute('select vinh_cod, vinh_nome, vinh_descricao, vinh_preco_atual, vinh_temp_min, vinh_temp_max from vinho ')
        const response = {
            quantidade: result.length,
            vinhos: result.map(vin => {
                return {
                    codVinho: vin.vinh_cod,
                    nome: vin.vinh_nome,
                    descricao: vin.vinh_descricao,
                    precoAtual: vin.vinh_preco_atual,
                    tempMin: vin.vinh_temp_min,
                    tempMax: vin.vinh_temp_max,
                    imagem: vin.vinh_imagem_path

                }
            })
        }
        return res.status(200).send(response)
    } catch (error) {
        return res.status(500).send({ error: error });
    }
};

exports.postVinhos = async (req, res, next) => {
    try {
        const query = 'insert into vinho(vinh_nome, vinh_preco_atual, vinh_temp_min, vinh_temp_max, vica_cod, vior_cod, vinh_ref_cod, vinh_imagem) values (?,?,?,?,?,?,8, (select v.vinh_imagem from vinho v where v.vinh_cod = 52))';
        const result = await mysql.execute(query, [
            req.body.nome,
            req.body.precoAtual,
            req.body.tempMin,
            req.body.tempMax,
            req.body.vicaCod,
            req.body.viorCod
        ]);
        const response = {
            mensagem: 'Vinho Cadastrado',
            vinhoCadastrado: {
                nome: req.body.nome,
                precoAtual: req.body.precoAtual
            }
            
        }
        return res.status(201).send(response);
       

    } catch (error) {
        console.log(error)
        return res.status(500).send({ error: error });
    }
}

exports.deleteVinhos = async(req, res, next) => {
    try {
        const query = 'DELETE FROM vinho where vinh_cod = ?';
        await mysql.execute(query, [
            req.body.codVinho
        ])
        const response = {
            mensagem: 'Cadastro removido com sucesso',            
        }
        return res.status(202).send(response);
    } catch (error) {
        return res.status(500).send({ error: error })
    }
}

exports.getCategoriaVinhos = async (req, res, next) => {
    try {
        const result = await mysql.execute('select vica_cod, vica_nome, vica_descricao from vinho_categoria ');
        const response = {
            quantidade: result.length,
            categVinho: result.map(cat => {
                return {
                    codCategoria: cat.vica_cod,
                    nome: cat.vica_nome,
                    descricao: cat.vica_descricao
                }
               
            })
            
        } 
        console.log(response);
        return res.status(200).send(response)
    } catch (error) {
        return res.status(500).send({ error: error });
    }
};

exports.postCategoriaVinhos = async (req, res, next) => {
    try {
        const query = 'insert into vinho_categoria (vica_nome, vica_descricao) values (?, ?)';
        const result = await mysql.execute(query, [
            req.body.nome,
            req.body.descricao
        ]);
        const response = {
            mensagem: 'Cadastro inserido com sucesso',
            categoriaCadastrada: {
                nome: req.body.nome,
                descricao: req.body.descricao
            }
        }
        return res.status(201).send(response);
        
    } catch (error) {
        console.log(error);
        return res.status(500).send({ error: error });
    }
}

exports.deleteCategoriaVinhos = async(req, res, next) => {
    try {
        const query = 'DELETE FROM vinho_categoria where vica_cod = ?';
        await mysql.execute(query, [
            req.body.codCategoria
        ])
        const response = {
            mensagem: 'Cadastro removido com sucesso',
            }
        return res.status(202).send(response);
    } catch (error) {
        return res.status(500).send({ error: error })
    }
}

exports.getOrigemVinhos = async (req, res, next) => {
    try {
        const result = await mysql.execute('select vior_cod, vior_nome_pais  from vinho_origem');
        const response = {
            quantidade: result.length,
            origem: result.map(emp => {
                return {
                    codOrigem: emp.vior_cod,
                    nomePais: emp.vior_nome_pais
                }
               
            })
            
        } 
        console.log(response);
        return res.status(200).send(response)
    } catch (error) {
        return res.status(500).send({ error: error });
    }
};

exports.postOrigemVinhos = async (req, res, next) => {
    try {
        const query = 'insert into vinho_origem (vior_nome_pais) values (?)';
        const result = await mysql.execute(query, [
            req.body.nomePais
        ]);
        const response = {
            mensagem: 'Cadastro inserido com sucesso',
            origemCadastrada: {
                nomePais: req.body.nomePais
            }
        }
        return res.status(201).send(response);
        
    } catch (error) {
        console.log(error);
        return res.status(500).send({ error: error });
    }
}

exports.deleteOrigemVinhos = async(req, res, next) => {
    try {
        const query = 'DELETE FROM vinho_origem where vior_cod = ?';
        await mysql.execute(query, [
            req.body.origemCodigo
        ])
        const response = {
            mensagem: 'Cadastro removido com sucesso',
            }
        return res.status(202).send(response);
    } catch (error) {
        return res.status(500).send({ error: error })
    }
}