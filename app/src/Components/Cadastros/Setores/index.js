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

   
    const [emprCod, setEmprCod] = useState();
    const [filialCod, setFilialCod] = useState();
    const [empresaCodigoFiltro, setEmpresaCodigoFiltro] = useState([]);
    const [empresaNomeFiltro, setEmpresaNomeFiltro] = useState([]);    
    const [filialCodigoFiltro, setFilialCodigoFiltro] = useState([]);
    const [filialNomeFiltro, setFilialNomeFiltro] = useState([]);

    const [nomeSetor, setNomeSetor] = useState('');
    const [aceitaSugestao, setAceitaSugestao] = useState('');
    const [checked, setChecked] = useState(false);
  
    const handleClick = () => {
        
        setChecked(!checked)
        setTimeout(() => {
            alert(!checked)
        }, 1000);

        
        
      
        if (!checked === true) {
            setAceitaSugestao('S')
        } else {
            setAceitaSugestao('N')
        }
    }



    
    const handleSubmit = async () => {        
        if (nomeSetor === '' || nomeSetor === null ||
        emprCod === '' || emprCod === null ||
        filialCod === '' || filialCod === null) {
            swal.fire({
                title: 'Oops...',
                text: 'Parece que você esqueceu de preencher algum campo!',
                icon: 'error',
                confirmButtonText: 'OK'
            })
        } else if (aceitaSugestao === '' || aceitaSugestao === null) {
            setAceitaSugestao('N')
        } else {
            {
                await api.post('/cadastro-setor/cadastrar', {
                    emprCod: emprCod,
                    unidCod: filialCod,
                    setorNome: nomeSetor,
                    setorSugestao: aceitaSugestao
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
        }
    }

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

    const handleSelectedEmpresa = () => {
        let selectBox = document.getElementById("selectEmpresa");
        setEmprCod(selectBox.value);
    }



    const listaFiliais = async () => {
        await api.post('/cadastro-filial/lista-filiais-por-empresa', 
            {
                codEmpresa: emprCod
            }
            ).then(response => {
            setFilialCodigoFiltro(response.data.empresas.map(unid => unid.codFilial));
            setFilialNomeFiltro(response.data.empresas.map(unid => unid.nomeFilial));
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

    const handleSelectedFilial = () => {
        let selectBox = document.getElementById("selectFilial");
        setFilialCod(selectBox.value);
        console.log(filialCod)
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
                api.delete('/cadastro-setor/deletar', {
                    data: {
                        codSetor: id
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
            url: 'http://localhost:3003/cadastro-setor/lista-setores',
            then: data => data.empresas.map(set => [set.codSetor, set.nomeSetor]),
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
            'Nome do Setor',
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
                <h1>Cadastro de Setores</h1>
            </div>
            <S.FormContainer>
                <Formik
                    validateOnMount
                    initialValues={{}}>
                    <Form>
                        <Field name="nomeSetor" className="input-field" placeholder="Nome do Setor" onChange={(e) => setNomeSetor(e.target.value)} />                      
                        <S.ContainerSelect>
                            <select id="selectEmpresa" onClick={listaEmpresas} onChange={handleSelectedEmpresa}>
                                <option value="">Selecione uma empresa</option>
                                {empresaCodigoFiltro.map((item, index) => {
                                    return (
                                        <option value={item}>{empresaNomeFiltro[index]}</option>
                                    )

                                })}

                            </select>
                            <select id="selectFilial" onClick={listaFiliais} onChange={handleSelectedFilial}>
                                <option value="">Selecione uma filial</option>
                                {filialCodigoFiltro.map((item, index) => {
                                    return (
                                        <option value={item}>{filialNomeFiltro[index]}</option>
                                    )

                                })}

                            </select>
                            <label for="aceitaSugestao" >Aceita Sugestão?</label>
                            <Field type="checkbox" name="aceitaSugestao" id="checked" onClick={handleClick} checked={checked} className="input-field checkbox"/>
                            <button className="button" type="submit" onClick={handleSubmit}>Cadastrar</button>
                        </S.ContainerSelect>
                       
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
