import React from "react";
import * as S from "./styles";
import { useHistory } from "react-router-dom";
import 'chart.js/auto';
import { Chart } from 'react-chartjs-2';
import swal from "sweetalert2";
import Navbar from '../../Utils/Sidebar'
import api from "../../api/api";
import { useEffect, useState } from "react";
import DateTimePicker from "react-datetime-picker";
import { Grid } from 'gridjs-react';
import "gridjs/dist/theme/mermaid.min.css";

export default function LineChart() {
  const [dataInicial, setDataInicial] = useState('');
  const [dataFinal, setDataFinal] = useState('');
  const history = useHistory();
  const token = localStorage.getItem('token');
  const [novosClientes, setNovosClientes] = useState([]);
  const [clientesAtivos, setClientesAtivos] = useState([]);
  const [vendaPromo, setVendaPromo] = useState([]);
  const [ticketMedioPromo, setTicketMedioPromo] = useState([]);
  const [qtdCupons, setQtdCupons] = useState([]);
  const [gastoMedio, setGastoMedio] = useState([]);
  const [vendaTotal, setVendaTotal] = useState([]);
  const [clientesPerdidos, setClientesPerdidos] = useState([]);
  const [unidade, setUnidade] = useState([]);
  const [promo, setPromo] = useState([]);
  const [vendaUnidade, setVendaUnidade] = useState([]);
  const [vendaUnidaPromo, setVendaUnidaPromo] = useState([]);
  const [dia, setDia] = useState([]);
  const [vendaDiaPromo, setVendaDiaPromo] = useState([]);
  const [vendaDiaSemana, setVendaDiaSemana] = useState([]);
  const [promoDia, setPromoDia] = useState([]);
  const [dataPart, setDataPart] = useState([]);
  const [vendaMes, setVendaMes] = useState([]);
  const [vendaMesPromo, setVendaMesPromo] = useState([]);  
  const [promoMesPart, setPromoMesPart] = useState([]);





  let vendaPart = (vendaPromo / vendaTotal).toLocaleString('pt-BR', { style: 'percent', currency: 'BRL', minimumFractionDigits: 2 });
  let vendaPromoFormatado = vendaPromo.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  // let vendaTotalFormat = vendaTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  // let vendaPart = venda / vendaTotalFormat;
  let ticketMedio = ticketMedioPromo.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  let medio = gastoMedio.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  let mediaCuponsCliente = Math.round(qtdCupons / clientesAtivos);



  useEffect(() => {
    callFunctions();
  }, []);

  function callFunctions() {
    getCardsPromo();
    participacaoUnidade();
    getDiaSemana();
    partPromocao();

  }

  async function getCardsPromo() {
    api.get('/home/cards-promo', {
    }).then(response => {
      setNovosClientes(response.data.consulta.novosClientes);
      setClientesAtivos(response.data.consulta.clientesAtivos);
      setVendaPromo(response.data.consulta.vendaPromo);
      setTicketMedioPromo(response.data.consulta.ticketMedioPromo);
      setQtdCupons(response.data.consulta.qtdCupons);
      setGastoMedio(response.data.consulta.gastoMedioPromo);
      setVendaTotal(response.data.consulta.vendaTotal);
      setClientesPerdidos(response.data.consulta.clientesPerdidos);
    }
    ).catch(error => {
      swal.fire({
        type: 'error',
        title: 'Oops...',
        text: ['Algo deu errado, tente novamente mais tarde!',]
      })
    }
    )
  }

  async function participacaoUnidade() {
    api.get('/home/participacao-unidade', {
    }).then(response => {
      setUnidade(response.data.consulta.map(unidade => unidade.unidade));
      setVendaUnidaPromo(response.data.consulta.map(vendaUnidaPromo => vendaUnidaPromo.vendaPromo));
      setVendaUnidade(response.data.consulta.map(vendaUnidade => vendaUnidade.venda));
      setPromo(response.data.consulta.map(promo => promo.promo));
    }
    ).catch(error => {
      swal.fire({
        type: 'error',
        title: 'Oops...',
        text: 'Algo deu errado, tente novamente mais tarde!',
      })

      console.log(error);
    }
    )
  }




  async function getDiaSemana() {
    api.get('/home/participacao-semana', {
    }).then(response => {

      setDia(response.data.consulta.map(dia => dia.dia));
      setVendaDiaPromo(response.data.consulta.map(vendaDiaPromo => vendaDiaPromo.vendaPromo));
      setVendaDiaSemana(response.data.consulta.map(vendaDiaSemana => vendaDiaSemana.venda));
      setPromoDia(response.data.consulta.map(promo => promo.promo));

    }).catch(error => {
      swal.fire({
        type: 'error',
        title: 'Oops...',
        text: 'Algo deu errado, tente novamente mais tarde!',
      })

      console.log(error);
    }
    )
  }

  async function partPromocao() {
    api.get('/home/participacao-promo', {
    }).then(response => {
      setDataPart(response.data.consulta.map(data => data.data));
      setVendaMes(response.data.consulta.map(vendaMes => vendaMes.venda));
      setVendaMesPromo(response.data.consulta.map(vendaMesPromo => vendaMesPromo.vendaPromo));
      setPromoMesPart(response.data.consulta.map(promo => promo.partPromo));

      console.log(response.data.consulta[0].vendaPromo);
    }

    ).catch(error => {
      swal.fire({
        type: 'error',
        title: 'Oops...',
        text: 'Algo deu errado, tente novamente mais tarde!',
      })

      console.log(error);
    }
    )
  }
  if (token === null || token === undefined || token === '') {
    localStorage.clear();
    swal.fire({
      title: 'Oops...',
      text: 'Login expirado, faça login novamente!',
      icon: 'error',
      confirmButtonText: 'Ok'
    })
    history.push('/');
  }


  const dataUnidades = {
    labels: unidade,
    datasets: [
      {
        label: 'Venda Promoção',
        data: vendaUnidaPromo,
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',

      },
      {
        label: 'Venda Fora',
        data: vendaUnidade,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',

        stack: 'combined'
      },
      {
        label: 'Participação Unidade',
        data: promo,
        backgroundColor: 'rgba(255, 206, 86, 0.2)',
        borderColor: 'rgba(255, 206, 86, 1)',
        type: 'line',
        stack: 'combined',
        tension: 0.2,
      },
    ]
  };


  const dataDias = {
    labels: dia,
    datasets: [
      {
        label: 'Venda Promoção',
        data: vendaDiaPromo,
        borderColor: 'rgba(54, 162, 235, 1)',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        type: 'bar',

      },
      {
        label: 'Venda Geral',
        data: vendaDiaSemana,
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        stack: 'combined',
        type: 'bar'
      },
      {
        label: 'Participação Promoção',
        data: promoDia,
        borderColor: 'rgba(255, 206, 86, 1)',
        backgroundColor: 'rgba(255, 206, 86, 0.2)',
        stack: 'combined'
      }
    ]
  };


  const dataParticipacao = {
    labels: dataPart,
    datasets: [
      {
        label: 'Venda promoção',
        data: vendaMesPromo,
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor:'rgba(54, 162, 235, 1)',
        
      },
      {
        label: 'Venda fora promoção',
        data: vendaMes,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        stack: 'combined'
      },
      {
        label: 'Participação promoção',
        data: promoMesPart,
        backgroundColor: 'rgba(255, 206, 86, 0.2)',
        borderColor:  'rgba(255, 206, 86, 1)',
        type: 'line',
        tension: 0.2,
        stack: 'combined'
      }
    ]
  }

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
        text: 'Vendas na Promoção por Unidade',
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            let label = context.dataset.label || '';
            let index = context.datasetIndex;
            if (index === 2) {
              label += ': ' + new Intl.NumberFormat('pt-BR', { style: 'percent', currency: 'BRL' }).format(context.parsed.y);
            } else if (context.parsed.y !== null) {
              label += ': ' + new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(context.parsed.y);
            }
            return label;
          }
        }
      }
    },
    scales: {
      y: {
        stacked: true
      },
    }
  };

  const options2 = {
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Venda e Participação por dia da semana'
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            let label = context.dataset.label || '';
            let index = context.datasetIndex;
            if (index === 2) {
              label += ': ' + context.parsed.y + '%';
            } else if (context.parsed.y !== null) {
              label += ': ' + new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(context.parsed.y);
            }
            return label;
          }
        }
      }
    },
    scales: {
      y: {
        stacked: true
      },
    }
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
        text: 'Participação no faturamento identificado',
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            let label = context.dataset.label || '';
            let index = context.datasetIndex;
            if (index === 2) {
              label += ': ' + context.parsed.y + '%';
            } else if (context.parsed.y !== null) {
              label += ': ' + new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(context.parsed.y);
            }
            return label;
          }
        }
      }
    },
    scales: {
      y: {
        stacked: true,
        ticks: {
          beginAtZero: true,
        }
      }
    }
  };
  let [data, setData] = useState([]);

  const server = {
    url: 'http://localhost:3003/home/clientes-promo',
    then: data => data.consulta.map(cli => [cli.nome, cli.ender, cli.bairro, cli.telefone, cli.celular, cli.cupons, cli.valor]),
  }

  const style = {
    table: {
      'table-layout': 'fixed',
      border: '1px solid #ccc',
      'border-radius': '255px',
      'font-size': '15px',
      'font-family': 'Roboto, sans-serif',
      'line-height': '20px',
    },
    th: {
      'rowspan': '1',
      'background-color': '#f5f5f5',
      'color': '#333',
      'border-bottom': '1px solid black',
      'text-align': 'left',
      'font-size': '15px',
    },
    td: {
      'text-align': 'left',
      'font-size': '12px',
      'line-height': '5px',
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

      <Navbar />
      <S.DateTimePickerContainer>
        <DateTimePicker
          value='2020-10-02'
          format="dd/MM/yyyy"
        />
        <DateTimePicker
          value='2020-10-31'
          format="dd/MM/yyyy"
        />
        <i onClick={callFunctions} class='bx bx-refresh'></i>
      </S.DateTimePickerContainer>
      <S.DataContainer>
        <S.CardContainer>
          <div className="card">
            <h4>Novos Clientes</h4>
            <h5>{novosClientes}</h5>
          </div>
          <div className="card">
            <h4>Clientes Ativos</h4>
            <h5>{clientesAtivos}</h5>
          </div>
          <div className="card">
            <h4>Participação na Promoção</h4>
            <h5>{vendaPart}</h5>
          </div>
          <div className="card">
            <h4>Ticket Médio Promoção</h4>
            <h5>{ticketMedio}</h5>
          </div>
          <div className="card">
            <h4>Quant. Cupons</h4>
            <h5>{qtdCupons}</h5>
          </div>
          <div className="card">
            <h4>Gasto Médio Por Cliente</h4>
            <h5>{medio}</h5>
          </div>
          <div className="card">
            <h4>Média de Cupons por Cliente</h4>
            <h5>{mediaCuponsCliente}</h5>
          </div>
          <div className="card">
            <h4>Venda total Promoção</h4>
            <h5>{vendaPromoFormatado}</h5>
          </div>
        </S.CardContainer>
        <S.ChartContainer>
          <div>
            <Chart type="bar" options={options1} data={dataUnidades} />
          </div>
          <div>
            <Chart type="line" options={options2} data={dataDias} />
          </div>
          <div>
            <Chart type="bar" options={options3} data={dataParticipacao} />
          </div>
        </S.ChartContainer>
        <S.GridContainer>
          <Grid server={server}
            columns={
              ["Nome",
                "Endereço",
                "Bairro",
                "Telefone",
                "Celular",
                "Cupons",
                {
                  name: "Valor",
                  formatter: (cells) => `${(cells).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}`
                }
              ]}
            data={data}
            sort={true}
            search={true}
            language={language}
            style={style}
            pagination={true} />
        </S.GridContainer>
      </S.DataContainer>
    </S.Container>

  );
}

