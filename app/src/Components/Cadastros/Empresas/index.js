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
export default function Empresas() {


    
    

    const [nomeEmpresa, setNomeEmpresa] = useState('');
    const [cnpj, setCnpj] = useState('');
    const [razaoSocial, setRazaoSocial] = useState('');
   

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

    let [data, setData] = useState([]);

    const server = {
        url: 'http://localhost:3003/cadastro-empresa/lista-empresas',
        then: data => data.empresas.map(emp => [emp.codEmpresa, emp.nome, emp.razaoSocial, emp.cnpj]),
    }

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
        const columns = [
            { 
                name: '',
                width: '6%',
                formatter: (cell, row) => {
                  return h('button', {
                    className: 'buttonExcluir',
                    onClick: () => {deleteItem(row.cells[0].data)}
                  }, 'Excluir');
                  
                },
                sort: false,                
              },            
        'Nome da Empresa',
        'Razão Social',
        'CNPJ',
    ] 
    return (
        <S.Container>
            <div className="header">
                <h1>Cadastro de Empresas</h1>
            </div>
            <Navbar />
            <S.FormContainer id="form">
                <Formik
                    initialValues={{}}
                    onSubmit={handleSubmit}
                    validationSchema={validationLogin}>
                    <Form>
                        <Field
                            name="nomeEmpresa"
                            className="input-field"
                            placeholder="Nome da Empresa"
                            onChange={(e) => setNomeEmpresa(e.target.value)}
                            value={nomeEmpresa}
                        />
                        <Field
                            name="razaoSocial"
                            className="input-field"
                            placeholder="Razão Social"
                            onChange={(e) => setRazaoSocial(e.target.value)}
                            value={razaoSocial}
                        />
                        <Field
                            name="cnpj"
                            id="cnpj"
                            className="input-field"
                            placeholder="CNPJ"
                            onChange={(e) => setCnpj(e.target.value)}
                            value={cnpj}
                            type="number"

                        />
                        <button className="cadastrar" type="submit" onClick={handleSubmit}>Cadastrar</button>
                    </Form>
                </Formik>

            </S.FormContainer>
            <S.GridContainer>
            <Grid server={server}
                    columns={columns}
                    data={data}
                    sort={true}
                    search={true}
                    language={language}
                    style={style}
                    pagination={true}                     
                    />
            </S.GridContainer>
        </S.Container>
    )
}
