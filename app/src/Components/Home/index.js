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
import moment from "moment";

export default function LineChart() {
  const [result, setResult] = useState([]);
  const [dataInicial, setDataInicial] = useState(moment().subtract(1, 'days'));
  const [dataFinal, setDataFinal] = useState(moment());
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
  const [unidade1, setUnidade1] = useState([]);
  const [unidade2, setUnidade2] = useState([]);
  const [unidade3, setUnidade3] = useState([]);
  const [unidade4, setUnidade4] = useState([]);
  const [unidade5, setUnidade5] = useState([]);
  const [unidade6, setUnidade6] = useState([]);
  const [unidade7, setUnidade7] = useState([]);
  const [unidade8, setUnidade8] = useState([]);
  const [unidade9, setUnidade9] = useState([]);
  const [promo, setPromo] = useState([]);
  const [promo1, setPromo1] = useState([]);
  const [promo2, setPromo2] = useState([]);
  const [promo3, setPromo3] = useState([]);
  const [promo4, setPromo4] = useState([]);
  const [promo5, setPromo5] = useState([]);
  const [promo6, setPromo6] = useState([]);
  const [promo7, setPromo7] = useState([]);
  const [promo8, setPromo8] = useState([]);
  const [promo9, setPromo9] = useState([]);  
  const [foraPromo, setForaPromo] = useState([]);
  const [foraPromo1, setForaPromo1] = useState([]);
  const [foraPromo2, setForaPromo2] = useState([]);
  const [foraPromo3, setForaPromo3] = useState([]);
  const [foraPromo4, setForaPromo4] = useState([]);
  const [foraPromo5, setForaPromo5] = useState([]);
  const [foraPromo6, setForaPromo6] = useState([]);
  const [foraPromo7, setForaPromo7] = useState([]);
  const [foraPromo8, setForaPromo8] = useState([]);
  const [foraPromo9, setForaPromo9] = useState([]);
  const [dia, setDia] = useState([]);
  const [dia1, setDia1] = useState([]);
  const [dia2, setDia2] = useState([]);
  const [dia3, setDia3] = useState([]);
  const [dia4, setDia4] = useState([]);
  const [dia5, setDia5] = useState([]);
  const [dia6, setDia6] = useState([]);
  const [promoDia, setPromoDia] = useState([]);
  const [promoDia1, setPromoDia1] = useState([]);
  const [promoDia2, setPromoDia2] = useState([]);
  const [promoDia3, setPromoDia3] = useState([]);
  const [promoDia4, setPromoDia4] = useState([]);
  const [promoDia5, setPromoDia5] = useState([]);
  const [promoDia6, setPromoDia6] = useState([]);
  const [foraPromoDia, setForaPromoDia] = useState([]);
  const [foraPromoDia1, setForaPromoDia1] = useState([]);
  const [foraPromoDia2, setForaPromoDia2] = useState([]);
  const [foraPromoDia3, setForaPromoDia3] = useState([]);
  const [foraPromoDia4, setForaPromoDia4] = useState([]);
  const [foraPromoDia5, setForaPromoDia5] = useState([]);
  const [foraPromoDia6, setForaPromoDia6] = useState([]);




  let venda = vendaPromo.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  let ticketMedio = ticketMedioPromo.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  let medio = gastoMedio.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  let total = vendaTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  let mediaCuponsCliente = Math.round(qtdCupons / clientesAtivos);
  
window.onload = function () {
  callFunctions();
}

function callFunctions(){
  getCardsPromo();
  participacaoUnidade();
  getDiaSemana();
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
        text: 'Algo deu errado, tente novamente mais tarde!',
      })
    }
    )
  }
  
  async function participacaoUnidade() {
    api.get('/home/participacao-unidade', {
    }).then(response => {
      setUnidade(response.data.consulta.unidade);
      setPromo(response.data.consulta.promo);
      setForaPromo(response.data.consulta.foraPromo);
      setUnidade1(response.data.consulta.unidade1);
      setPromo1(response.data.consulta.promo1);
      setForaPromo1(response.data.consulta.foraPromo1);
      setUnidade2(response.data.consulta.unidade2);
      setPromo2(response.data.consulta.promo2);
      setForaPromo2(response.data.consulta.foraPromo2);
      setUnidade3(response.data.consulta.unidade3);
      setPromo3(response.data.consulta.promo3);
      setForaPromo3(response.data.consulta.foraPromo3);
      setUnidade4(response.data.consulta.unidade4);
      setPromo4(response.data.consulta.promo4);
      setForaPromo4(response.data.consulta.foraPromo4);
      setUnidade5(response.data.consulta.unidade5);
      setPromo5(response.data.consulta.promo5);
      setForaPromo5(response.data.consulta.foraPromo5);
      setUnidade6(response.data.consulta.unidade6);
      setPromo6(response.data.consulta.promo6);
      setForaPromo6(response.data.consulta.foraPromo6);
      setUnidade7(response.data.consulta.unidade7);
      setPromo7(response.data.consulta.promo7);
      setForaPromo7(response.data.consulta.foraPromo7);
      setUnidade8(response.data.consulta.unidade8);
      setPromo8(response.data.consulta.promo8);
      setForaPromo8(response.data.consulta.foraPromo8);
      setUnidade9(response.data.consulta.unidade9);
      setPromo9(response.data.consulta.promo9);
      setForaPromo9(response.data.consulta.foraPromo9);


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

  
  async function getDiaSemana(){
    api.get('/home/participacao-semana', {
    }).then(response => {
  
        setDia(response.data.consulta.dia);
        setPromoDia(response.data.consulta.promo);
        setForaPromoDia(response.data.consulta.foraPromo);
        setDia1(response.data.consulta.dia1);
        setPromoDia1(response.data.consulta.promo1);
        setForaPromoDia1(response.data.consulta.foraPromo1);
        setDia2(response.data.consulta.dia2);
        setPromoDia2(response.data.consulta.promo2);
        setForaPromoDia2(response.data.consulta.foraPromo2);
        setDia3(response.data.consulta.dia3);
        setPromoDia3(response.data.consulta.promo3);
        setForaPromoDia3(response.data.consulta.foraPromo3);
        setDia4(response.data.consulta.dia4);
        setPromoDia4(response.data.consulta.promo4);
        setForaPromoDia4(response.data.consulta.foraPromo4);
        setDia5(response.data.consulta.dia5);
        setPromoDia5(response.data.consulta.promo5);
        setForaPromoDia5(response.data.consulta.foraPromo5);
        setDia6(response.data.consulta.dia6);
        setPromoDia6(response.data.consulta.promo6);
        setForaPromoDia6(response.data.consulta.foraPromo6);

    })
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
    labels: [unidade, unidade1, unidade2, unidade3, unidade4, unidade5, unidade6, unidade7, unidade8, unidade9], 
    datasets: [
      {
        label: 'Participação durante a promoção',
        data: [promo, promo1, promo2, promo3, promo4, promo5, promo6, promo7, promo8, promo9],
        backgroundColor: [
          'rgba(54, 162, 235, 0.2)',
        ],
        borderColor: [
          'rgba(54, 162, 235, 1)',
        ],
        borderWidth: 1
      },
      {
        label: 'Participação fora da promoção',
        data: [foraPromo, foraPromo1, foraPromo2, foraPromo3, foraPromo4, foraPromo5, foraPromo6, foraPromo7, foraPromo8, foraPromo9],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
        ],
        borderWidth: 1

      }
    ]
  };

  const dataDias = {
    labels: [dia, dia1, dia2, dia3, dia4, dia5, dia6],
    datasets: [
      {
        label: 'Participação durante a promoção',
        data: [promoDia, promoDia1, promoDia2, promoDia3, promoDia4, promoDia5, promoDia6],
        backgroundColor: [
          'rgba(54, 162, 235, 0.2)',
        ],
        borderColor: [
          'rgba(54, 162, 235, 1)',
        ],
        borderWidth: 1
      },
      {
        label: 'Participação fora da promoção',
        data: [foraPromoDia, foraPromoDia1, foraPromoDia2, foraPromoDia3, foraPromoDia4, foraPromoDia5, foraPromoDia6],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
        ],
        borderWidth: 1

      }
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
        text: 'Vendas na Promoção por Unidade',
      },
    },
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
        text: 'Venda na Promoção por Dia da Semana',
      },
    },
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true
      }
    }
  };
  



  return (

    <S.Container>
      <S.DateTimePickerContainer>
        <DateTimePicker
          onChange={(date) => setDataInicial(date)}
          value={dataInicial}
          format="dd/MM/yyyy"
        />
        <DateTimePicker
          onChange={(date) => setDataFinal(date)}
          value={dataFinal}
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
            <h5>{venda}</h5>
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
            <h4>Clientes Perdidos</h4>
            <h5>{clientesPerdidos}</h5>
          </div>
        </S.CardContainer>
        <S.ChartContainer>
          <div>
            <Chart type="bar" options={options1} data={dataUnidades} />
          </div>
          <div>
            <Chart type="bar" options={options2} data={dataDias} />
          </div>
          <div>
            <Chart type="line" options={options1} data={dataDias} />
          </div>
        </S.ChartContainer>
      </S.DataContainer>

    </S.Container>

  );
}

