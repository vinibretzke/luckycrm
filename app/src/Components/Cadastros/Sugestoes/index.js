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

export default function Setores() {

    const [localCodigoFiltro, setLocalCodigoFiltro] = useState([]);
    const [localNomeFiltro, setLocalNomeFiltro] = useState([]);

    const [setorCodigo, setSetorCodigo] = useState([]);
    const [motivoNome, setMotivoNome] = useState([]);


    const handleSubmit = async () => {
                await api.post('/cadastro-sugestoes/cadastrar-sugestao', {
                    codSetor: setorCodigo,
                    motivo: motivoNome,
                }).then(response => {
                    swal.fire({
                        title: 'Sucesso',
                        text: 'Setor cadastrado com sucesso',
                        icon: 'success',
                        confirmButtonText: 'OK'
                    })
                    window.location.reload();
                }).catch(error => {
                    swal.fire({
                        title: 'Erro',
                        text: 'Erro ao cadastrar setor, verifique se os campos estão corretos e tente novamente',
                        icon: 'error',
                        confirmButtonText: 'OK'
                    })
                })
            }
        
    

    const listaLocais = async () => {
        await api.get('/cadastro-sugestoes/lista-locais').then(response => {
            setLocalCodigoFiltro(response.data.locais.map(local => local.codSetor));
            setLocalNomeFiltro(response.data.locais.map(local => local.nome));
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

    const handleSelectedLocais = () => {
        let selectBox = document.getElementById("selectEmpresa");
        setSetorCodigo(selectBox.value);
    }



    function deleteItem(id) {
        swal.fire({
            title: 'Você tem certeza que deseja excluir o setor?',
            text: "Você não poderá reverter essa ação!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sim, quero apagar!',
            cancelButtonText: 'Não, cancelar!'
        }).then((result) => {
            if (result.value) {
                api.delete('/cadastro-sugestoes/deletar', {
                    data: {
                        codMotivo: id
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
        url: 'http://localhost:3003/cadastro-sugestoes/lista-motivos',
        then: data => data.empresas.map(loc => [loc.motivoCod, loc.locais, loc.motivo]),
    }

    const columns = [
        {
            name: '',
            width: '4%',
            formatter: (cell, row) => {
                return h('button', {
                    className: 'buttonExcluir',
                    onClick: () => {
                        deleteItem(row.cells[0].data)
                    }
                }, 'Excluir');

            },
            sort: false,
        },
        {
            name: 'Empresa - Unidade - Setor',
            width: '15%',
        }
        ,
        
        'Motivo'
    ]
    const style = {
        container: {
            
        },
        header: {
            'height': '20px',
        },
        table: {
            'font-size': '15px',
            'font-family': 'Roboto, sans-serif',
            'line-height': '20px',
            'width': '100%',
        },
        th:{ 'text-align': 'center', 'font-size':'12px','padding':'0'},
        td:{ 'font-size':'12px','padding':'5px'},
   footer: {'font-size':'12px'}
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
                <h1>Cadastro de Sugestões</h1>
            </div>
            <S.FormContainer>
                <Formik
                    validateOnMount
                    initialValues={{}}>
                    <Form>
                        <S.ContainerSelect>
                            <select id="selectEmpresa" onClick={listaLocais} onChange={handleSelectedLocais}>
                                <option value="">Empresa - Unidade - Setor</option>
                                {localCodigoFiltro.map((item, index) => {
                                    return (
                                        <option value={item}>{localNomeFiltro[index]}</option>
                                    )

                                })}

                            </select>
                        </S.ContainerSelect>
                        <Field name="localSugestao" className="input-field" placeholder="Descrição da Sugestão" onChange={(e) => setMotivoNome(e.target.value)} />
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
                    width = "55%"
                />
            </S.GridContainer>
        </S.Container>

    )
}
