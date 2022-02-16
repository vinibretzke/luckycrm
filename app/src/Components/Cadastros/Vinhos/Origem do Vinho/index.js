import React from "react";
import { useEffect, useState, useRef } from "react";
import * as S from "./styles";
import { Grid, } from 'gridjs-react';
import { h } from 'gridjs';
import "gridjs/dist/theme/mermaid.min.css";
import api from '../../../../api/api';
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as yup from 'yup';
import swal from 'sweetalert2'
import Sidebar from "../../../../Utils/Sidebar";

export default function Setores() { 
      
    const [nomePais, setNomePais] = useState('');

    const handleSubmit = async () => {        
        if (nomePais === '' || nomePais === null) {
            swal.fire({
                title: 'Oops...',
                text: 'Parece que você esqueceu de preencher algum campo!',
                icon: 'error',
                confirmButtonText: 'OK'
            })
        } else {
            {
                await api.post('/cadastro-vinhos/cadastrar-origem', {
                    nomePais: nomePais,
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
                api.delete('/cadastro-vinhos/deletar-origem', {
                    data: {
                        origemCodigo: id
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
            url: 'http://localhost:3003/cadastro-vinhos/lista-origem',
            then: data => data.origem.map(ori => [ori.codOrigem, ori.nomePais]),
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
            'Nome do País',
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
                <h1>Cadastro de Origem de Vinhos</h1>
            </div>
            <S.FormContainer>
                <Formik
                    validateOnMount
                    initialValues={{}}>
                    <Form>
                        <Field name="nomeSetor" className="input-field" placeholder="Nome do País" onChange={(e) => setNomePais(e.target.value)} />   
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
                />
            </S.GridContainer>
        </S.Container>

    )
}
