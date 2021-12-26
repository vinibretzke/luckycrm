const { response } = require('express');
const mysql = require('../mysql');



exports.getImagens = async (req, res, next) => {
    try {
        const result = await mysql.execute('SELECT * FROM productImages;')
        const response = {
            quantidade: result.length,
            imagens: result.map(imag => {
                return {
                    cod_imagens: imag.cod_imagens,
                    url_imagem: imag.url_imagem,
                    cod_cliente: imag.cod_cliente,
                    imagem: imag.imagem,
                    request: {
                        tipo: 'GET',
                        descricao: 'Retorna todas as imagens',
                        url: process.env.URL_API + 'imagens/' + imag.cod_imagens
                    }
                }
            })
        }
        return res.status(200).send(response)
    } catch (error) {
        return res.status(500).send({ error: error });
    }
};

exports.postImagens = async (req, res, next) => {
    try {
        const query = 'INSERT INTO productImages (cod_cliente, url_imagem, imagem) values (?, ?, ?)';
        const result = await mysql.execute(query, [
            req.body.cliente,
            req.body.url,
            req.file.path
        ]);
        const response = {
            mensagem: 'URL Cadastrada',
            imagemCadastrada: {
                cod_imagens: result.cod_imagens,
                cliente: req.body.cliente,
                url: req.body.url,
                imagem: req.file.path,
                request: {
                    tipo: 'GET',
                    descricao: 'Retorna todos os cadastros',
                    url: process.env.URL_API + 'imagens'
                }
            }
        }
        return res.status(201).send(response);

    } catch (error) {
        return res.status(500).send({ error: error });
    }
}


exports.getUmaImagem = async (req, res, next) => {
    try {
        const query = 'SELECT * FROM productImages where cod_imagens = ?;';
        const result = await mysql.execute(query, [req.params.cod_imagens]);
        if (result.length == 0) {
            return res.status(404).send({
                mensagem: 'Não foi encontrado cadastro com esse código'
            })
        }
        const response = {
            imagens: {
                cod_imagens: result[0].cod_imagens,
                cliente: result[0].cod_cliente,
                url: result[0].url_imagem,
                imagem: result[0].imagem,
                request: {
                    tipo: 'GET',
                    descricao: 'Retorna todos os cadastros',
                    url: process.env.URL_API + 'imagens'
                }
            }
        }
        return res.status(200).send(response)
    } catch (error) {
        return res.status(500).send({ error: error });
    }
}

exports.patchImagens = async (req, res, next) => {
    try {
        const query = `UPDATE productImages
                     set cod_cliente  = ?, 
                     url_imagem       = ?
                   where cod_imagens  = ?;`
        await mysql.execute(query, [
            req.body.cliente,
            req.body.url,
            req.body.cod_imagens
        ])
        const response = {
            mensagem: 'Cadastro alterado com sucesso', 
            cadastroAtualizado: {
                cod_imagens: req.body.cod_imagens,
                cod_cliente: req.body.cod_cliente, 
                url_imagem: req.body.url_imagem, 
                request: {
                    tipo: 'GET', 
                    descricao: 'Retorna os detalhes de um produto específico', 
                    url: process.env.URL_API + 'imagens/' + req.body.cod_imagens
                }
            }
        }
        return res.status(200).send(response)
    } catch (error) {
        return res.status(500).send({ error: error });
    }

}

exports.deleteImagens = async(req, res, next) => {
    try {
        const query = 'DELETE FROM productImages where cod_imagens = ?';
        await mysql.execute(query, [
            req.body.cod_imagens
        ])
        const response = {
            mensagem: 'Cadastro removido com sucesso',
            request: {
                tipo: "POST",
                descricao: "Insere um cadastro",
                url: process.env.URL_API + 'imagens',
                body: {
                    cod_imagens: req.body.cod_imagens
                }

            }
        }
        return res.status(202).send(response);
    } catch (error) {
        return res.status(500).send({ error: error })
    }
}