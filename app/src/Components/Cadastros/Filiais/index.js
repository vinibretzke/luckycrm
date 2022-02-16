import React from "react";
import { useEffect, useState, useRef } from "react";
import * as S from "./styles";
import { Link } from "react-router-dom";
import Navbar from '../../../Utils/Sidebar'
import { Grid, } from 'gridjs-react';
import { h } from 'gridjs';
import "gridjs/dist/theme/mermaid.min.css";
import api from '../../../api/api';
import MaskedInput from "../../../Utils/MaskedInput";
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as yup from 'yup';
import swal from 'sweetalert2'

import { RowSelection } from "gridjs/plugins/selection";
import axios from "axios";
import { render } from "preact";
import Sidebar from "../../../Utils/Sidebar";

export default function Filiais() {

    const [emprCod, setEmprCod] = useState();
    const [filialNome, setFilialNome] = useState();
    const [filialRazaoSocial, setFilialRazaoSocial] = useState();
    const [filialCnpj, setFilialCnpj] = useState();
    const [filialInscricaoEstadual, setFilialInscricaoEstadual] = useState();
    const [filialCidade, setFilialCidade] = useState();
    const [filialEndereco, setFilialEndereco] = useState();
    const [filialNumero, setFilialNumero] = useState();
    const [filialComplemento, setFilialComplemento] = useState();
    const [filialBairro, setFilialBairro] = useState();
    const [filialCep, setFilialCep] = useState();
    const [filialDdd, setFilialDdd] = useState();
    const [filialTelefone, setFilialTelefone] = useState();

    const validationLogin = yup.object().shape({
        empresa: yup.string().required('Selecione uma empresa'),
        nomeFilial: yup.string().required('Campo obrigatório'),
        cnpj: yup.string().required('Campo obrigatório').min(14, 'CNPJ inválido').max(14, 'CNPJ inválido'),
        razaoSocial: yup.string().required('Campo obrigatório'),
        cep: yup.string().required('Campo obrigatório'),
        logradouro: yup.string().required('Campo obrigatório'),
        numero: yup.string().required('Campo obrigatório'),
        bairro: yup.string().required('Campo obrigatório'),
        cidade: yup.string().required('Campo obrigatório'),
        estado: yup.string().required('Campo obrigatório'),
        telefone: yup.string().required('Campo obrigatório'),
    });

    const handleSubmit = async () => {
        if (filialNome === '' || filialNome === null ||
            filialCnpj === '' || filialCnpj === null ||
            filialRazaoSocial === '' || filialRazaoSocial === null) {
            swal.fire({
                title: 'Oops...',
                text: 'Parece que você esqueceu de preencher algum campo!',
                icon: 'error',
                confirmButtonText: 'OK'
            })
        } else {
            {
                await api.post('/cadastro-filial/cadastrar', {
                    emprCod: emprCod,
                    nomeFilial: filialNome,
                    razaoSocial: filialRazaoSocial,
                    cnpj: filialCnpj,
                    ie: filialInscricaoEstadual,
                    cidade: filialCidade,
                    ender: filialEndereco,
                    enderNum: filialNumero,
                    enderCpl: filialComplemento,
                    bairro: filialBairro,
                    cep: filialCep,
                    telDdd: filialDdd,
                    telefone: filialTelefone
                }).then(response => {
                    swal.fire({
                        title: 'Sucesso',
                        text: 'Filial cadastrada com sucesso',
                        icon: 'success',
                        confirmButtonText: 'OK'
                    })
                    window.location.reload();
                }).catch(error => {
                    swal.fire({
                        title: 'Erro',
                        text: 'Erro ao cadastrar filial, verifique se os campos estão corretos e tente novamente',
                        icon: 'error',
                        confirmButtonText: 'OK'
                    })
                })
            }
        }
    }

    const [empresaCodigoFiltro, setEmpresaCodigoFiltro] = useState([]);
    const [empresaNomeFiltro, setEmpresaNomeFiltro] = useState([]);

    const listaEmpresas = async () => {
        await api.get('cadastro-empresa/lista-empresas').then(response => {
            setEmpresaCodigoFiltro(response.data.empresas.map(empresa => empresa.codEmpresa));
            setEmpresaNomeFiltro(response.data.empresas.map(empresa => empresa.nome));
        }).catch(error => {
            swal.fire({
                title: 'Erro',
                text: 'Erro ao listar empresas',
                icon: 'error',
                confirmButtonText: 'OK'
            })
        }).catch(error => {
            swal.fire({
                title: 'Erro',
                text: 'Erro ao listar empresas',
                icon: 'error',
                confirmButtonText: 'OK'
            })
        })
    }

    const handleSelected = () => {
        let selectBox = document.getElementById("selectBox");
        setEmprCod(selectBox.value);
    }
    const onBlurCep = async (e) => {
        const cep = e.target.value;
        console.log(cep.length);
        if (cep.length === 8) {
            await axios.get(`https://viacep.com.br/ws/${cep}/json/`)
                .then(response => {
                    setFilialEndereco(response.data.logradouro);
                    setFilialBairro(response.data.bairro);
                    setFilialCidade(response.data.localidade);
                })
                .catch(error => {
                    swal.fire({
                        title: 'Erro',
                        text: 'Erro ao buscar CEP',
                        icon: 'error',
                        confirmButtonText: 'OK'
                    })
                })
        }else {
            swal.fire({
                title: 'Erro',
                text: 'CEP inválido',
                icon: 'error',
                confirmButtonText: 'OK'
            })
        }
    }


    function deleteItem(id) {
        swal.fire({
            title: 'Você tem certeza que deseja excluir a filial?',
            text: "Você não poderá reverter essa ação!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sim, quero apagar!',
            cancelButtonText: 'Não, cancelar!'
        }).then((result) => {
            if (result.value) {
                api.delete('/cadastro-filial/deletar', {
                    data: {
                        codUnidade: id
                    }

                }
                ).then(response => {
                    swal.fire(
                        'Apagado!',
                        'O registro foi apagado.',
                        'success'
                    )
                    window.location.reload();
                }).catch(error => {
                    swal.fire(
                        'Oops...',
                        'Erro ao apagar registro!',
                        'error'
                    )
                    console.log(error)
                });
            }
        })
    }
        
        let [data, setData] = [];
        const server = {
            url: 'http://localhost:3003/cadastro-filial/lista-filiais',
            then: data => data.empresas.map(fil => [fil.codFilial, fil.nomeFilial, fil.cnpj, fil.cidade, fil.ender, fil.telDdd, fil.telefone]),
        }

        const columns = [
            {
                name: '',
                width: '6%',
                formatter: (cell, row) => {
                    return h('button', {
                        className: 'buttonExcluir',
                        onClick: () => { 
                            deleteItem(row.cells[0].data)}
                    }, 'Excluir');

                },
                sort: false,
            },
            'Nome da Filial',
            'CNPJ da Filial',
            'Cidade',
            'Endereço',
            'DDD',
            'Telefone'
        ]
       const style = {
            table: {
                border: '1px solid #ccc',
                'font-size': '15px',
                'font-family': 'Roboto, sans-serif',
                'line-height': '20px',
                'width': '100%',
            },
            th: {

                'background-color': '#f5f5f5',
                'color': '#333',
                'border-bottom': '1px solid black',
                'text-align': 'center'
            },
            td: {
                'text-align': 'left'
            }
        }
       const language = {
            search: {
                placeholder: 'Procure por um registro.',
            },
            sort: {
                sortAsc: 'Ordenar coluna de forma ascendente',
                sortDesc: 'Ordenar coluna de forma descendente',
            },
            pagination: {
                previous: 'Anterior',
                next: 'Próximo',
                navigate: (page, pages) => `Página ${page} de ${pages}`,
                page: (page) => `Página ${page}`,
                showing: 'Mostrando',
                of: 'de',
                to: 'até',
                results: 'resultados',
            },
            loading: 'Carregando...',
            noRecordsFound: 'Não foram encontrados dados',
            error: 'Um erro ocorreu durante a busca de dados',
        }
    


    return (
        <S.Container>
            <Sidebar />
            <div className="header">
                <h1>Cadastro de Filiais</h1>
            </div>
            <S.FormContainer>
                <Formik
                    onSubmit={handleSubmit}
                    validateOnMount
                    initialValues={{}}
                    validationSchema={validationLogin}>
                    <Form>
                        <S.ContainerSelect>
                            <select id="selectBox" onClick={listaEmpresas} onChange={handleSelected}>
                                <option value="">Selecione uma empresa</option>
                                {empresaCodigoFiltro.map((item, index) => {
                                    return (
                                        <option value={item}>{empresaNomeFiltro[index]}</option>
                                    )

                                })}

                            </select>
                        </S.ContainerSelect>
                        <Field name="nomeFilial" className="input-field" placeholder="Nome da Filial" onChange={(e) => setFilialNome(e.target.value)} />
                        <Field name="razaoSocial" className="input-field" placeholder="Razão Social" onChange={(e) => setFilialRazaoSocial(e.target.value)} />
                        <Field name="cnpj" className="input-field" type="number" placeholder="CNPJ" onChange={(e) => setFilialCnpj(e.target.value)} />
                        <Field name="ie" className="input-field" placeholder="Inscrição Estadual" onChange={(e) => setFilialInscricaoEstadual(e.target.value)} />
                        <Field name="cep" className="input-field" placeholder="CEP" onBlur={onBlurCep} value={filialCep} onChange={(e) => setFilialCep(e.target.value)}/>
                        <Field name="endereco" className="input-field" placeholder="Logradouro" value={filialEndereco} />
                        <Field name="numero" className="input-field" placeholder="Número" onChange={(e) => setFilialNumero(e.target.value)} />
                        <Field name="complemento" className="input-field" placeholder="Complemento" onChange={(e) => setFilialComplemento(e.target.value)} />
                        <Field name="bairro" className="input-field" placeholder="Bairro" value={filialBairro} />
                        <Field name="cidade" className="input-field" placeholder="Cidade" value={filialCidade} />
                        <Field name="ddd" className="input-field" placeholder="DDD" onChange={(e) => setFilialDdd(e.target.value)} />
                        <Field name="telefone" className="input-field" placeholder="Telefone" onChange={(e) => setFilialTelefone(e.target.value)} />

                        <button type="submit" onClick={handleSubmit} className="btn-submit">Cadastrar</button>
                    </Form>
                </Formik>
            </S.FormContainer>
            <S.GridContainer>
                <Grid
                    server={server}
                    columns={columns}
                    style={style}
                    language={language}
                    data={data}
                    sort={true}
                    search={true}
                    pagination={true}
                />
            </S.GridContainer>
        </S.Container>

    )
}
