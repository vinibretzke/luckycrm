import React from "react";
import * as S from './styles'
import Navbar from '../../../Utils/Sidebar'
import 'chart.js/auto';
import { Chart } from 'react-chartjs-2';
import swal from "sweetalert2";
import api from '../../../api/api'
import { useEffect, useState } from "react";

export default function VisoesGenero() {


   

    const [vendaHomem, setVendaHomem] = useState(0);
    const [vendaMulher, setVendaMulher] = useState(0);
    const [vendaOutros, setVendaOutros] = useState(0);
    const [vendaTotalGen, setVendaTotalGen] = useState(0);
    const [cuponsHomem, setCuponsHomem] = useState(0);
    const [cuponsMulher, setCuponsMulher] = useState(0);
    const [cuponsOutros, setCuponsOutros] = useState(0);
    const [cuponsTotal, setCuponsTotal] = useState(0);
    const [unidade, setUnidades] = useState();
    const [vendaUnidHomem, setVendaUnidHomem] = useState(0);
    const [vendaUnidMulher, setVendaUnidMulher] = useState(0);
    const [vendaUnidOutros, setVendaUnidOutros] = useState(0);
    const [diaSemana, setDiaSemana] = useState();
    const [vendaDiaHomem, setVendaDiaHomem] = useState(0);
    const [vendaDiaMulher, setVendaDiaMulher] = useState(0);
    const [vendaDiaOutros, setVendaDiaOutros] = useState(0);



    let ticketMedioH = parseFloat(vendaHomem / cuponsHomem).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    let ticketMedioM = parseFloat(vendaMulher / cuponsMulher).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    let ticketMedioO = parseFloat(vendaOutros / cuponsOutros).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    let ticketMedioTotalGen = parseFloat(vendaTotalGen / cuponsTotal).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    let vendaH = parseFloat(vendaHomem).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    let vendaM = parseFloat(vendaMulher).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    let vendaO = parseFloat(vendaOutros).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    let vendaTotal = parseFloat(vendaTotalGen).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });


    useEffect(() => {
        callFunctions();
    }, []);

    function callFunctions() {
        loadCards();
        loadChartUnidades();
        loadChartDiaSemana();
        loadChartIdadeParticipacao();
        loadGeneroTimes();
    }
    //cards idade
    async function loadCards() {
        api.get('/visoes-crm/cards-genero', {
        }).then(response => {
            setVendaHomem(response.data.consulta.vendaHomem);
            setCuponsHomem(response.data.consulta.cuponsHomem);
            setVendaMulher(response.data.consulta.vendaMulher);
            setCuponsMulher(response.data.consulta.cuponsMulher);
            setVendaOutros(response.data.consulta.vendaOutros);
            setCuponsOutros(response.data.consulta.cuponsOutros);
            setVendaTotalGen(response.data.consulta.venda_total);
            setCuponsTotal(response.data.consulta.cupons_total);
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
        api.get('/visoes-crm/genero-unidade', {
        }).then(response => {
            setUnidades(response.data.consulta.map(unidade => unidade.unidade));
            setVendaUnidHomem(response.data.consulta.map(unidade => unidade.venda_homem));
            setVendaUnidMulher(response.data.consulta.map(unidade => unidade.venda_mulher));
            setVendaUnidOutros(response.data.consulta.map(unidade => unidade.venda_outros));
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
                label: 'Homems',
                data: vendaUnidHomem,
                backgroundColor: [
                    'rgba(54, 162, 235, 0.2)',
                ],
                borderColor: [
                    'rgba(54, 162, 235, 1)',
                ],
                borderWidth: 1
            },
            {
                label: 'Mulheres',
                data: vendaUnidMulher,
                backgroundColor: [
                    'rgba(244, 67, 54, 0.2)',
                ],
                borderColor: [
                    'rgba(244, 67, 54, 1)',
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
                text: 'Venda na Unidade por Gênero',
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
        api.get('/visoes-crm/genero-semana', {
        }).then(response => {
            setDiaSemana(response.data.consulta.map(dia => dia.dia));
            setVendaDiaHomem(response.data.consulta.map(dia => dia.venda_homem));
            setVendaDiaMulher(response.data.consulta.map(dia => dia.venda_mulher));
            setVendaDiaOutros(response.data.consulta.map(dia => dia.venda_outros));

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
                label: 'Venda Homem',
                data: vendaDiaHomem,
                backgroundColor: [
                    'rgba(54, 162, 235, 0.2)',
                ],
                borderColor: [
                    'rgba(54, 162, 235, 1)',
                ],
                borderWidth: 1
            },
            {
                label: 'Venda Mulher',
                data: vendaDiaMulher,
                backgroundColor: [
                    'rgba(244, 67, 54, 0.2)',
                ],
                borderColor: [
                    'rgba(244, 67, 54, 1)',
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
                text: 'Venda por dia da Semana por Gênero',
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

    const [partGeneroMes, setPartGeneroMes] = useState([]);
    const [partHomem, setPartHomem] = useState([]);
    const [partMulher, setPartMulher] = useState([]);
    //chart participação
    async function loadChartIdadeParticipacao() {
        api.get('/visoes-crm/genero-participacao', {
        }).then(response => {
            setPartGeneroMes(response.data.consulta.map(mes => mes.mes));
            setPartHomem(response.data.consulta.map(mes => mes.venda_homem));
            setPartMulher(response.data.consulta.map(mes => mes.venda_mulher));
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
        labels: partGeneroMes ,
        datasets: [
            {
                label: 'Homens',
                data: partHomem,
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
                label: 'Mulheres',
                data: partMulher,
                backgroundColor: [
                    'rgba(244, 67, 54, 0.2)',
                ],
                borderColor: [
                    'rgba(244, 67, 54, 1)',
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
                text: 'Participação por Gênero',
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
                        return Math.round(value * 100);
                    }
                }
            }
        }



    };


    const [geneTime, setGeneTime] = useState([]);
    const [geneTimeHomem, setGeneTimeHomem] = useState([]);
    const [geneTimeMulher, setGeneTimeMulher] = useState([]);
    const [geneTimeTotal, setGeneTimeTotal] = useState([]);
    //chart times
    async function loadGeneroTimes() {
        api.get('/visoes-crm/genero-times', {
        }).then(response => {
            setGeneTime(response.data.consulta.map(time => time.time));
            setGeneTimeHomem(response.data.consulta.map(time => time.qtd_homens));
            setGeneTimeMulher(response.data.consulta.map(time => time.qtd_mulheres));
            setGeneTimeTotal(response.data.consulta.map(time => time.qtd_total));
        }).catch(error => {
            swal.fire({
                type: 'error',
                title: 'Oops...',
                text: 'Algo deu errado, tente novamente mais tarde!',
            })
        })
    }
    const dataTimes = {
        labels: geneTime,
        datasets: [
            {
                label: 'Homens',
                data: geneTimeHomem,
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
                label: 'Mulheres',
                data: geneTimeMulher,
                backgroundColor: [
                    'rgba(244, 67, 54, 0.2)',
                ],
                borderColor: [
                    'rgba(244, 67, 54, 1)',
                ],
                borderWidth: 1,
                tension: 0.5,
            },
            {
                label: 'Total',
                data: geneTimeTotal,
                backgroundColor: [
                    'rgba(76, 175, 80, 0.2)',
                ],
                borderColor: [
                    'rgba(76, 175, 80, 1)',
                ],
                borderWidth: 1,
                tension: 0.5,
            },
        ],
    };
    const options4 = {
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
                text: 'Torcedores por Clube',
            },
          
        },
        



    };


    return (
        <S.Container>
            <Navbar />
            <S.CardsContainer>
                <div className="card-main">
                    <h4 className="card-title">Ticket Médio Homens:</h4>
                    <h4 className="ticket-medio">{ticketMedioH}</h4>
                    <div className="minor-card homem">
                        <h5>Venda: {vendaH}</h5>
                        <h5>Cupons: {cuponsHomem}</h5>
                    </div>
                </div>
                <div className="card-main">
                    <h4 className="card-title">Ticket Médio Mulheres:</h4>
                    <h4 className="ticket-medio">{ticketMedioM}</h4>
                    <div className="minor-card mulher">
                        <h5>Venda: {vendaM}</h5>
                        <h5>Cupons:  {cuponsMulher}</h5>
                    </div>
                </div>
                <div className="card-main">
                    <h4 className="card-title">Ticket Médio outros:</h4>
                    <h4 className="ticket-medio">{ticketMedioO}</h4>
                    <div className="minor-card outros">
                        <h5>Venda: {vendaO}</h5>
                        <h5>Cupons:  {cuponsOutros}</h5>
                    </div>
                </div>
                <div className="card-main">
                    <h4 className="card-title">Ticket Médio Geral:</h4>
                    <h4 className="ticket-medio">{ticketMedioTotalGen}</h4>
                    <div className="minor-card total">
                        <h5>Venda: {vendaTotal}</h5>
                        <h5>Cupons:  {cuponsTotal}</h5>
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
                 <div className="chart3">
                    <Chart type="bar" data={dataTimes} options={options4} />
                </div>

            </S.ChartContainer>
        </S.Container>
    )

}
