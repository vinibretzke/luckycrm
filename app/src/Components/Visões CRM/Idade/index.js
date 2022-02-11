import React from "react";
import * as S from './styles'
import Navbar from '../../../Utils/Sidebar'
import 'chart.js/auto';
import { Chart } from 'react-chartjs-2';
import swal from "sweetalert2";
import api from '../../../api/api'
import { useEffect, useState } from "react";



export default function VisoesIdade() {

    const [vdGrupo1, setVdGrupo1] = useState();
    const [vdGrupo2, setVdGrupo2] = useState();
    const [vdGrupo3, setVdGrupo3] = useState();
    const [vdGrupo4, setVdGrupo4] = useState();
    const [vdGrupo5, setVdGrupo5] = useState();
    const [vdTotal, setVdTotal] = useState();
    const [cpGrupo1, setCpGrupo1] = useState();
    const [cpGrupo2, setCpGrupo2] = useState();
    const [cpGrupo3, setCpGrupo3] = useState();
    const [cpGrupo4, setCpGrupo4] = useState();
    const [cpGrupo5, setCpGrupo5] = useState();
    const [cpTotal, setCpTotal] = useState();
    const [unidade, setUnidades] = useState();
    const [vdUnidGr1, setVdUnidGr1] = useState();
    const [vdUnidGr2, setVdUnidGr2] = useState();
    const [vdUnidGr3, setVdUnidGr3] = useState();
    const [vdUnidGr4, setVdUnidGr4] = useState();
    const [vdUnidGr5, setVdUnidGr5] = useState();
    const [diaSemana, setDiaSemana] = useState();
    const [vdGr1Dia, setVdGr1Dia] = useState();
    const [vdGr2Dia, setVdGr2Dia] = useState();
    const [vdGr3Dia, setVdGr3Dia] = useState();
    const [vdGr4Dia, setVdGr4Dia] = useState();
    const [vdGr5Dia, setVdGr5Dia] = useState();



    let ticketMedioGrupo1 = parseFloat(vdGrupo1 / cpGrupo1).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    let ticketMedioGrupo2 = parseFloat(vdGrupo2 / cpGrupo2).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    let ticketMedioGrupo3 = parseFloat(vdGrupo3 / cpGrupo3).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    let ticketMedioGrupo4 = parseFloat(vdGrupo4 / cpGrupo4).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    let ticketMedioGrupo5 = parseFloat(vdGrupo5 / cpGrupo5).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    let ticketMedioTotal = parseFloat(vdTotal / cpTotal).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

    let venda1 = parseFloat(vdGrupo1).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    let venda2 = parseFloat(vdGrupo2).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    let venda3 = parseFloat(vdGrupo3).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    let venda4 = parseFloat(vdGrupo4).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    let venda5 = parseFloat(vdGrupo5).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    let vendaTotal = parseFloat(vdTotal).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });


    useEffect(() => {
        callFunctions();
    }, []);

    function callFunctions() {
        loadCards();
        loadChartUnidades();
        loadChartDiaSemana();
        loadChartIdadeParticipacao();
    }
    //cards idade
    async function loadCards() {
        api.get('/visoes-crm/cards-idade', {
        }).then(response => {
            setVdGrupo1(response.data.consulta.vd_grupo1);
            setVdGrupo2(response.data.consulta.vd_grupo2);
            setVdGrupo3(response.data.consulta.vd_grupo3);
            setVdGrupo4(response.data.consulta.vd_grupo4);
            setVdGrupo5(response.data.consulta.vd_grupo5);
            setVdTotal(response.data.consulta.vd_total);
            setCpGrupo1(response.data.consulta.cp_grupo1);
            setCpGrupo2(response.data.consulta.cp_grupo2);
            setCpGrupo3(response.data.consulta.cp_grupo3);
            setCpGrupo4(response.data.consulta.cp_grupo4);
            setCpGrupo5(response.data.consulta.cp_grupo5);
            setCpTotal(response.data.consulta.cp_total);
        }
        ).catch(error => {
            swal.fire({
                title: 'Erro!',
                text: 'Não foi possível carregar os dados!',
                confirmButtonText: 'OK'
            })
        })
    }

    //chart unidade idade
    async function loadChartUnidades() {
        api.get('/visoes-crm/idade-unidade', {
        }).then(response => {
            setUnidades(response.data.consulta.map(unidade => unidade.unidade));
            setVdUnidGr1(response.data.consulta.map(unidade => unidade.vd_grupo1));
            setVdUnidGr2(response.data.consulta.map(unidade => unidade.vd_grupo2));
            setVdUnidGr3(response.data.consulta.map(unidade => unidade.vd_grupo3));
            setVdUnidGr4(response.data.consulta.map(unidade => unidade.vd_grupo4));
            setVdUnidGr5(response.data.consulta.map(unidade => unidade.vd_grupo5));
        }).catch(error => {
            swal.fire({
                type: 'error',
                title: 'Oops...',
                text: 'Algo deu errado, tente novamente mais tarde!',
            })

            console.log(error);
        })
    }

    const dataUnidades = {
        labels: unidade,
        datasets: [
            {
                label: '18 a 25',
                data: vdUnidGr1,
                backgroundColor: [
                    'rgba(54, 162, 235, 0.2)',
                ],
                borderColor: [
                    'rgba(54, 162, 235, 1)',
                ],
                borderWidth: 1
            },
            {
                label: '26 a 35',
                data: vdUnidGr2,
                backgroundColor: [
                    'rgba(255, 206, 86, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 206, 86, 1)',
                ],
                borderWidth: 1
            },
            {
                label: '36 a 45',
                data: vdUnidGr3,
                backgroundColor: [
                    'rgba(75, 192, 192, 0.2)',
                ],
                borderColor: [
                    'rgba(75, 192, 192, 1)',
                ],
                borderWidth: 1
            },
            {
                label: '46 a 60',
                data: vdUnidGr4,
                backgroundColor: [
                    'rgba(153, 102, 255, 0.2)',
                ],
                borderColor: [
                    'rgba(153, 102, 255, 1)',
                ],
                borderWidth: 1
            },
            {
                label: 'Maior que 60',
                data: vdUnidGr5,
                backgroundColor: [
                    'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1
            },
        ]
    };


    const options1 = {
        indexAxis: 'x',
        elements: {
            bar: {
                borderWidth: 2,
            },
        },
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Venda por Unidade por idade',
                fontSize: 30,
            },
            tooltip: {
                callbacks: {
                    label: function (context) {
                        let label = context.dataset.label || '';

                        if (label) {
                            label += ': ';
                        }
                        if (context.parsed.y !== null) {
                            label += new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(context.parsed.y);
                        }
                        return label;
                    }
                }
            }

        },

    };


    //char idade dia semana

    async function loadChartDiaSemana() {
        api.get('/visoes-crm/idade-semana', {
        }).then(response => {
            setDiaSemana(response.data.consulta.map(dia => dia.dia));
            setVdGr1Dia(response.data.consulta.map(dia => dia.vd_grupo1));
            setVdGr2Dia(response.data.consulta.map(dia => dia.vd_grupo2));
            setVdGr3Dia(response.data.consulta.map(dia => dia.vd_grupo3));
            setVdGr4Dia(response.data.consulta.map(dia => dia.vd_grupo4));
            setVdGr5Dia(response.data.consulta.map(dia => dia.vd_grupo5));


        }).catch(error => {
            swal.fire({
                type: 'error',
                title: 'Oops...',
                text: 'Algo deu errado, tente novamente mais tarde!',
            })
        })
    }


    const dataDaiSemana = {
        labels: diaSemana,
        datasets: [
            {
                label: '18 a 25',
                data: vdGr1Dia,
                backgroundColor: [
                    'rgba(54, 162, 235, 0.2)',
                ],
                borderColor: [
                    'rgba(54, 162, 235, 1)',
                ],
                borderWidth: 1,
                plugins: {
                    datalabels: {
                        color: 'white',
                        anchor: 'end',
                        align: 'end',
                    },
                }
            },
            {
                label: '26 a 35',
                data: vdGr2Dia,
                backgroundColor: [
                    'rgba(255, 206, 86, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 206, 86, 1)',
                ],
                borderWidth: 1
            },
            {
                label: '36 a 45',
                data: vdGr3Dia,
                backgroundColor: [
                    'rgba(75, 192, 192, 0.2)',
                ],
                borderColor: [
                    'rgba(75, 192, 192, 1)',
                ],
                borderWidth: 1
            },
            {
                label: '46 a 60',
                data: vdGr4Dia,
                backgroundColor: [
                    'rgba(153, 102, 255, 0.2)',
                ],
                borderColor: [
                    'rgba(153, 102, 255, 1)',
                ],
                borderWidth: 1
            },
            {
                label: 'Maior que 60',
                data: vdGr5Dia,
                backgroundColor: [
                    'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1
            },
        ]
    };


    const options2 = {
        indexAxis: 'x',
        elements: {
            bar: {
                borderWidth: 2,
            },
        },
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Venda por dia da Semana por idade',
            },
            tooltip: {
                callbacks: {
                    label: function (context) {
                        let label = context.dataset.label || '';

                        if (label) {
                            label += ': ';
                        }
                        if (context.parsed.y !== null) {
                            label += new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(context.parsed.y);
                        }
                        return label;
                    }
                }
            }

        },
        

    };


    //char idade dia semana

    const [partMes, setPartMes] = useState([]);
    const [vdGr1Mes, setVdGr1Mes] = useState([]);
    const [vdGr2Mes, setVdGr2Mes] = useState([]);
    const [vdGr3Mes, setVdGr3Mes] = useState([]);
    const [vdGr4Mes, setVdGr4Mes] = useState([]);
    const [vdGr5Mes, setVdGr5Mes] = useState([]);

    async function loadChartIdadeParticipacao() {
        api.get('/visoes-crm/idade-participacao', {
        }).then(response => {
            setPartMes(response.data.consulta.map(mes => mes.mes));
            setVdGr1Mes(response.data.consulta.map(mes => mes.vd_grupo1));
            setVdGr2Mes(response.data.consulta.map(mes => mes.vd_grupo2));
            setVdGr3Mes(response.data.consulta.map(mes => mes.vd_grupo3));
            setVdGr4Mes(response.data.consulta.map(mes => mes.vd_grupo4));
            setVdGr5Mes(response.data.consulta.map(mes => mes.vd_grupo5));

            console.log(response.data.consulta);
        }).catch(error => {
            swal.fire({
                type: 'error',
                title: 'Oops...',
                text: 'Algo deu errado, tente novamente mais tarde!',
            })
        })
    }


    const dataParticipacao = {
        labels: partMes,
        datasets: [
            {
                label: '18 a 25',
                data: vdGr1Mes,
                backgroundColor: [
                    'rgba(54, 162, 235, 0.2)',
                ],
                borderColor: [
                    'rgba(54, 162, 235, 1)',
                ],
                borderWidth: 1,
                
                tension: 0.5,
            },
            {
                label: '26 a 35',
                data: vdGr2Mes,
                backgroundColor: [
                    'rgba(255, 206, 86, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 206, 86, 1)',
                ],
                borderWidth: 1,
                
                tension: 0.5,
            },
            {
                label: '36 a 45',
                data: vdGr3Mes,
                backgroundColor: [
                    'rgba(75, 192, 192, 0.2)',
                ],
                borderColor: [
                    'rgba(75, 192, 192, 1)',
                ],
                borderWidth: 1,
                
                tension: 0.5,
            },
            {
                label: '46 a 60',
                data: vdGr4Mes,
                backgroundColor: [
                    'rgba(153, 102, 255, 0.2)',
                ],
                borderColor: [
                    'rgba(153, 102, 255, 1)',
                ],
                borderWidth: 1,
                
                tension: 0.5,
            },
            {
                label: 'Maior que 60',
                data: vdGr5Mes,
                backgroundColor: [
                    'rgba(255, 159, 64, 0.1)',
                ],
                borderColor: [
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
                
                tension: 0.5,
            },
        ],
    };


    const options3 = {
        indexAxis: 'x',
        elements: {
            bar: {
                borderWidth: 2,
            },
        },
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Participação por Idade',
            },
            tooltip: {
                callbacks: {
                    label: function (value) {
                        let label = value.dataset.label || '';

                        if (label) {
                            label += ': ';
                        }
                        if (value.parsed.y !== null) {
                            label += new Intl.NumberFormat('pt-BR', { style: 'percent', currency: 'BRL' }).format(value.parsed.y);
                        }
                        return label;
                    }
                }
            }
        },
        scales: {
            y: {
                ticks: {
                    callback: function (value, index, ticks) {
                        return value * 100;
                    }
                }
            }
        }



    };

    return (
        <S.Container>
            <Navbar />
            <S.CardsContainer>
                <div className="card-main">
                    <h4 className="card-title">Ticket Médio 18 a 25 anos:</h4>
                    <h4 className="ticket-medio">{ticketMedioGrupo1}</h4>
                    <div className="minor-card gr1">
                        <h5>Venda: {venda1}</h5>
                        <h5>Cupons: {cpGrupo1}</h5>
                    </div>
                </div>
                <div className="card-main">
                    <h4 className="card-title">Ticket Médio 26 a 35 anos:</h4>
                    <h4 className="ticket-medio">{ticketMedioGrupo2}</h4>
                    <div className="minor-card gr2">
                        <h5>Venda: {venda2}</h5>
                        <h5>Cupons:  {cpGrupo2}</h5>
                    </div>
                </div>
                <div className="card-main">
                    <h4 className="card-title">Ticket Médio 36 a 45 anos:</h4>
                    <h4 className="ticket-medio">{ticketMedioGrupo3}</h4>
                    <div className="minor-card gr3">
                        <h5>Venda: {venda3}</h5>
                        <h5>Cupons:  {cpGrupo3}</h5>
                    </div>
                </div>
                <div className="card-main">
                    <h4 className="card-title">Ticket Médio 46 a 60 anos:</h4>
                    <h4 className="ticket-medio">{ticketMedioGrupo4}</h4>
                    <div className="minor-card gr4">
                        <h5>Venda: {venda4}</h5>
                        <h5>Cupons:  {cpGrupo4}</h5>
                    </div>
                </div>
                <div className="card-main">
                    <h4 className="card-title">Ticket Médio 60 anos ou mais:</h4>
                    <h4 className="ticket-medio">{ticketMedioGrupo5}</h4>
                    <div className="minor-card gr5">
                        <h5>Venda: {venda5}</h5>
                        <h5>Cupons:  {cpGrupo5}</h5>
                    </div>
                </div>
                <div className="card-main">
                    <h4 className="card-title">Ticket Médio Geral:</h4>
                    <h4 className="ticket-medio">{ticketMedioTotal}</h4>
                    <div className="minor-card grt">
                        <h5>Venda: {vendaTotal}</h5>
                        <h5>Cupons:  {cpTotal}</h5>
                    </div>
                </div>
            </S.CardsContainer>
            <S.ChartContainer>
                <div>
                    <Chart type="bar" data={dataUnidades} options={options1} />
                </div>
                <div>
                    <Chart type="bar" data={dataDaiSemana} options={options2} />
                </div>
                <div className="chart3">
                    <Chart type="line" data={dataParticipacao} options={options3} />
                </div>

            </S.ChartContainer>
        </S.Container>
    )
}
