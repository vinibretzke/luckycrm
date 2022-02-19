import React from "react";
import { useEffect, useState } from "react";
import * as S from "./styles";
import { Grid, } from 'gridjs-react';
import { h } from 'gridjs';
import "gridjs/dist/theme/mermaid.min.css";
import api from '../../../../api/api';
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as yup from 'yup';
import swal from 'sweetalert2'
import Sidebar from "../../../../Utils/Sidebar";
import { RowSelection } from "gridjs/plugins/selection";

export default function Setores() {


    const [origemCodigo, setOrigemCodigo] = useState('');
    const [categoriaCodigo, setCategoriaCodigo] = useState('');

    const [origemCodigoFiltro, setOrigemCodigoFiltro] = useState([]);
    const [categoriaCodigoFiltro, setCategoriaCodigoFiltro] = useState([]);
    const [origemNomeFiltro, setOrigemNomeFiltro] = useState([]);
    const [categoriaNomeFiltro, setCategoriaNomeFiltro] = useState([]);

    const [vinhoNome, setVinhoNome] = useState('');
    const [vinhoPreco, setVinhoPreco] = useState('');
    const [tempMin, setTempMin] = useState('');
    const [tempMax, setTempMax] = useState('');



    const handleSubmit = async () => {
        if (vinhoNome === '' || vinhoNome === null ||
            vinhoPreco === '' || vinhoPreco === null ||
            tempMin === '' || tempMin === null ||
            tempMax === '' || tempMax === null) {
            swal.fire({
                title: 'Oops...',
                text: 'Parece que você esqueceu de preencher algum campo!',
                icon: 'error',
                confirmButtonText: 'OK'
            })
        } else {
            {
                await api.post('/cadastro-vinhos/cadastrar', {
                    nome: vinhoNome, 
                    precoAtual: vinhoPreco,
                    tempMin: tempMin,
                    tempMax: tempMax,
                    vicaCod: categoriaCodigo,
                    viorCod: origemCodigo
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

    const listaCategoria = async () => {
        await api.get('/cadastro-vinhos/lista-categoria').then(response => {
            setCategoriaCodigoFiltro(response.data.categVinho.map(categoria => categoria.codCategoria));
            setCategoriaNomeFiltro(response.data.categVinho.map(categoria => categoria.nome));
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

    const handleSelectedCategoria = () => {
        let selectBox = document.getElementById("selectCategoria");
        setCategoriaCodigo(selectBox.value);
    }



    const listaOrigem = async () => {
        await api.get('/cadastro-vinhos/lista-origem',        
        ).then(response => {
            setOrigemCodigoFiltro(response.data.origem.map(origem => origem.codOrigem));
            setOrigemNomeFiltro(response.data.origem.map(origem => origem.nomePais));
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

    const handleSelectedOrigem = () => {
        let selectBox = document.getElementById("selectOrigem");
        setOrigemCodigo(selectBox.value);
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
                api.delete('/cadastro-vinhos/deletar', {
                    data: {
                        codVinho: id
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
        url: 'http://localhost:3003/cadastro-vinhos/lista-vinhos',
        then: data => data.vinhos.map(vinho => [vinho.codVinho, vinho.nome, vinho.precoAtual, vinho.tempMin, vinho.tempMax ]),
    }


    const columns = [
        {
            name: '',
            width: '6%',
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
        'Nome do Vinho',
        {
          name: 'Preço',
          formatter: (cells) => `${(cells).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}`  
        },
        {
            name: 'Temperatura Minima',
            formatter: (cells) => `${cells}°C`
        },
        {
            name: 'Temperatura Maxima',
            formatter: (cells) => `${cells}°C`

        }
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
                <h1>Cadastro de Vinhos</h1>
            </div>
            <S.FormContainer>
                <Formik
                    validateOnMount
                    initialValues={{}}>
                    <Form>
                        <Field name="nomeVinho" className="input-field" placeholder="Nome do Vinho" onChange={(e) => setVinhoNome(e.target.value)} />
                        <Field name="precoVinho" type="number" className="input-field" placeholder="Preço de Venda" onChange={(e) => setVinhoPreco(e.target.value)} />
                        <Field name="tempMin" type="number" className="input-field" placeholder="Temperatura Min (°C)" onChange={(e) => setTempMin(e.target.value)} />
                        <Field name="tempMax" type="number" className="input-field" placeholder="Temperatura Max (°C)" onChange={(e) => setTempMax(e.target.value)} />
                        <S.ContainerSelect>
                            <select id="selectCategoria" onClick={listaCategoria} onChange={handleSelectedCategoria}>
                                <option value="">Categoria do Vinho</option>
                                {categoriaCodigoFiltro.map((item, index) => {
                                    return (
                                        <option value={item}>{categoriaNomeFiltro[index]}</option>
                                    )

                                })}

                            </select>
                            <select id="selectOrigem" onClick={listaOrigem} onChange={handleSelectedOrigem}>
                                <option value="">Origem do Vinho</option>
                                {origemCodigoFiltro.map((item, index) => {
                                    return (
                                        <option value={item}>{origemNomeFiltro[index]}</option>
                                    )

                                })}

                            </select>
                        </S.ContainerSelect>
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
