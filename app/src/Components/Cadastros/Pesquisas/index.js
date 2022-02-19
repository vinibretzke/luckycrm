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
import moment from 'moment'
import Draggable from 'react-draggable';

import { RowSelection } from "gridjs/plugins/selection";
import axios from "axios";
import { render } from "preact";
import Sidebar from "../../../Utils/Sidebar";

export default function Setores() {

    const [nomeEmpresa, setNomeEmpresa] = useState('');
    const [cnpj, setCnpj] = useState('');
    const [razaoSocial, setRazaoSocial] = useState('');

    const [codPesquisa, setCodPesquisa] = useState('');
    const [nomePesquisa, setNomePesquisa] = useState('');
    const [pergunta1, setPergunta1] = useState('');
    const [tipoPergunta1, setTipoPergunta1] = useState('');
    const [pergunta2, setPergunta2] = useState('');
    const [tipoPergunta2, setTipoPergunta2] = useState('');
    const [pergunta3, setPergunta3] = useState('');
    const [tipoPergunta3, setTipoPergunta3] = useState('');
    const [pergunta4, setPergunta4] = useState('');
    const [tipoPergunta4, setTipoPergunta4] = useState('');
    const [pergunta5, setPergunta5] = useState('');
    const [tipoPergunta5, setTipoPergunta5] = useState('');
    const [pergunta6, setPergunta6] = useState('');
    const [tipoPergunta6, setTipoPergunta6] = useState('');
    const [pergunta7, setPergunta7] = useState('');
    const [tipoPergunta7, setTipoPergunta7] = useState('');




    async function handleSubmit() {
        if (nomeEmpresa === '' || cnpj === '' || razaoSocial === '') {
            swal.fire({
                title: 'Erro',
                text: 'Preencha todos os campos',
                icon: 'error',
                confirmButtonText: 'OK'
            })
        } else {
            api.post('/cadastro-empresa/cadastrar', {
                nomeEmpresa,
                razaoSocial,
                cnpj
            }).then(response => {
                swal.fire({
                    title: 'Sucesso',
                    text: 'Empresa cadastrada com sucesso!',
                    icon: 'success',
                    confirmButtonText: 'OK'
                })
                window.location.reload();
            }).catch(error => {
                swal.fire({
                    title: 'Oops...',
                    text: 'Erro ao cadastrar empresa!',
                    icon: 'error',
                    confirmButtonText: 'OK'
                })
                console.log(error)
            });
        }
    }

    // const listaPerguntas = async () => {
    //     const pesqCod = codPesquisa;
    //     api.post('/cadastro-pesquisas/lista-perguntas', {
    //             codPesquisa: pesqCod
    //     }).then(response => {
    //         setPergunta1(response.data.perguntas[0]);

    //         console.log(pergunta1)


    //     }).catch(error => {
    //         console.log(error)
    //     })
    // }



    async function handleSubmitPergunta() {

        alert(pergunta1 + ' ' + tipoPergunta1);
    }

    const [inputList, setInputList] = useState([]);

    const onAddBtnClick = event => {

    };


    let [data, setData] = useState([]);

    const server = {
        url: 'http://localhost:3003/cadastro-pesquisas/lista-pesquisas',
        then: data => data.pesquisas.map(pesq => [pesq.codigoPesquisa, pesq.nomePesquisa, pesq.dataInicial, pesq.dataFinal]),


    }

    const style = {
        table: {
            border: '1px solid #ccc',
            'font-size': '15px',
            'font-family': 'Roboto, sans-serif',
            'line-height': '20px',
            'width': '100%',
        },
        th: { 'text-align': 'center', 'font-size': '12px', 'padding': '0' },
        td: { 'font-size': '12px', 'padding': '5px' },
        footer: { 'font-size': '12px' }
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

    const validationLogin = yup.object().shape({
        nomeEmpresa: yup
            .string()
            .required("Campo obrigatório."),
        razaoSocial: yup
            .string()
            .required("Campo obrigatório."),
        cnpj: yup
            .number()
            .min(14, "CNPJ inválido.")
            .max(14, "CNPJ inválido.")
            .required("Campo obrigatório."),

    })

    function deleteItem(id) {
        swal.fire({
            title: 'Você tem certeza que deseja excluir a empresa?',
            text: "Você não poderá reverter essa ação!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sim, quero apagar!',
            cancelButtonText: 'Não, cancelar!'
        }).then((result) => {
            if (result.value) {
                api.delete('/cadastro-empresa/deletar', {
                    data: {
                        codEmpresa: id
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


    async function showComponent(pesqCod, pesqNome) {
        setCodPesquisa(pesqCod);
        setNomePesquisa(pesqNome);
        document.getElementById('dragable').style.display = "flex";
    }

    function hideComponent() {
        document.getElementById('dragable').style.display = "none";
        // swal.fire({
        //     title: 'Você tem certeza que deseja cancelar?',
        //     text: "A pergunta não será salva!",
        //     icon: 'warning',
        //     showCancelButton: true,
        //     confirmButtonColor: '#3085d6',
        //     cancelButtonColor: '#d33',
        //     confirmButtonText: 'Sim, quero cancelar!',
        //     cancelButtonText: 'Não, cancelar!'
        // }).then((result) => {
        //     if (result.value) {
        //         document.getElementById('dragable').style.display = "none";
        //     }
        // }).catch(error => {
        //     console.log(error)
        // }
        // )
    }

    function cadastrarPergunta(id) {
        alert(id)
    }
    const columns = [
        {
            name: '',
            width: '6%',
            formatter: (cell, row) => {
                return h('button', {
                    className: 'buttonExcluir',
                    onClick: () => { deleteItem(row.cells[0].data) }
                }, 'Excluir');
            },
            sort: false,
        },
        {
            name: 'Nome da Pesquisa',
        },
        {
            name: 'Data Inicial',
            formatter: (cell) => moment(cell).format('DD/MM/YYYY'),

        },
        {
            name: 'Data Final',
            formatter: (cell) => moment(cell).format('DD/MM/YYYY'),
        },
        {
            name: '',
            formatter: (cell, row) => {
                return h('button', {
                    className: 'buttonCadastrarPergunta',
                    onClick: async () => {
                        showComponent(row.cells[0].data, row.cells[1].data);
                    }
                }, 'Cadastrar Pergunta')
            },
            width: '9%',
            sort: false,
        }

    ]
    return (
        <S.Container>
            <Sidebar />
            <div className="header">
                <h1>Cadastro de Sugestões</h1>
            </div>
            <S.FormContainer>
                <Formik
                    validateOnMount
                    initialValues={{}}>
                    <Form>
                        <S.ContainerSelect>
                            {/* <select id="selectEmpresa">
                                <option value="">Empresa - Unidade - Setor</option>
                                {localCodigoFiltro.map((item, index) => {
                                    return (
                                        <option value={item}>{localNomeFiltro[index]}</option>
                                    )

                                })}

                            </select> */}
                        </S.ContainerSelect>
                        <Field name="localSugestao" className="input-field" placeholder="Descrição da Sugestão" onChange={(e) => setNomeEmpresa(e.target.value)} />
                        <button className="button" type="submit" onClick={handleSubmit}>Cadastrar</button>

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
                    width='60%'
                    resizable={true}
                />
            </S.GridContainer>
            <S.FormContainerPerguntas id="dragable">

                <i className="fas fa-times" onClick={hideComponent}></i>
                <h1>Cadastro de Perguntas - {nomePesquisa}</h1>
                <Formik
                    validateOnMount
                    initialValues={{}}>
                    <Form>

                        <Field name="pergunta" className="input-field" placeholder="Pergunta 1" onChange={(e) => setPergunta1(e.target.value)} />
                        <select id="selectTipoPergunta" onChange={(e) => setTipoPergunta1(e.target.value)}>
                            <option value="">Tipo de Pergunta</option>
                            <option value="U">Multipla Escolha</option>
                            <option value="V">Multiplas Escolhas</option>
                            <option value="N">Nota</option>
                            <option value="M">Sim ou Não</option>
                        </select>
                        <Field name="pergunta" className="input-field" placeholder="Pergunta 2" onChange={(e) => setPergunta2(e.target.value)} />
                        <select id="selectTipoPergunta" onChange={(e) => setTipoPergunta2(e.target.value)}>
                            <option value="">Tipo de Pergunta</option>
                            <option value="U">Multipla Escolha</option>
                            <option value="V">Multiplas Escolhas</option>
                            <option value="N">Nota</option>
                            <option value="M">Sim ou Não</option>
                        </select>
                        <Field name="pergunta" className="input-field" placeholder="Pergunta 3" onChange={(e) => setPergunta3(e.target.value)} />
                        <select id="selectTipoPergunta" onChange={(e) => setTipoPergunta3(e.target.value)}>
                            <option value="">Tipo de Pergunta</option>
                            <option value="U">Multipla Escolha</option>
                            <option value="V">Multiplas Escolhas</option>
                            <option value="N">Nota</option>
                            <option value="M">Sim ou Não</option>
                        </select>
                        <Field name="pergunta" className="input-field" placeholder="Pergunta 4" onChange={(e) => setPergunta4(e.target.value)} />
                        <select id="selectTipoPergunta" onChange={(e) => setTipoPergunta4(e.target.value)}>
                            <option value="">Tipo de Pergunta</option>
                            <option value="U">Multipla Escolha</option>
                            <option value="V">Multiplas Escolhas</option>
                            <option value="N">Nota</option>
                            <option value="M">Sim ou Não</option>
                        </select>
                        <Field name="pergunta" className="input-field" placeholder="Pergunta 5" onChange={(e) => setPergunta5(e.target.value)} />
                        <select id="selectTipoPergunta" onChange={(e) => setTipoPergunta5(e.target.value)}>
                            <option value="">Tipo de Pergunta</option>
                            <option value="U">Multipla Escolha</option>
                            <option value="V">Multiplas Escolhas</option>
                            <option value="N">Nota</option>
                            <option value="M">Sim ou Não</option>
                        </select>
                        <Field name="pergunta" className="input-field" placeholder="Pergunta 6" onChange={(e) => setPergunta6(e.target.value)} />
                        <select id="selectTipoPergunta" onChange={(e) => setTipoPergunta6(e.target.value)}>
                            <option value="">Tipo de Pergunta</option>
                            <option value="U">Multipla Escolha</option>
                            <option value="V">Multiplas Escolhas</option>
                            <option value="N">Nota</option>
                            <option value="M">Sim ou Não</option>
                        </select>
                        <Field name="pergunta" className="input-field" placeholder="Pergunta 7" onChange={(e) => setPergunta7(e.target.value)} />
                        <select id="selectTipoPergunta" onChange={(e) => setTipoPergunta7(e.target.value)}>
                            <option value="">Tipo de Pergunta</option>
                            <option value="U">Multipla Escolha</option>
                            <option value="V">Multiplas Escolhas</option>
                            <option value="N">Nota</option>
                            <option value="M">Sim ou Não</option>
                        </select>
                        <button className="button" type="submit" onClick={handleSubmitPergunta}>Salvar</button>

                    </Form>
                </Formik>
            </S.FormContainerPerguntas>
        </S.Container>

    )
}
