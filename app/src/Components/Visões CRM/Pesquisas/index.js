import React from "react";
import * as S from './styles'
import Navbar from '../../../Utils/Sidebar'
import Select from 'react-select'
import api from "../../../api/api";
import { useEffect, useState } from "react";
import 'chart.js/auto';
import { Chart } from 'react-chartjs-2';
import swal from "sweetalert2";

export default function VisoesPesquisa() {
  const [pesquisaCod, setPesquisaCod] = useState([]);
  const [pesquisaNome, setPesquisaNome] = useState([]);
  const [inputValue, setValue] = useState('');
  const [pesq_codigo, setPesq_Codigo] = useState(null);
  const [mesIdade, setMesIdade] = useState([]);
  const [grupo1, setGrupo1] = useState([]);
  const [grupo2, setGrupo2] = useState([]);
  const [grupo3, setGrupo3] = useState([]);
  const [grupo4, setGrupo4] = useState([]);
  const [grupo5, setGrupo5] = useState([]);




  function handleSelected() {
    let selectBox = document.getElementById("selectBox");
    setPesq_Codigo(selectBox.options[selectBox.selectedIndex].value);

  }

  async function loadSelectOptions() {
    api.get('/home/lista-pesquisas', {
    }).then(response => {
      setPesquisaCod(response.data.consulta.map(item => item.pesquisa_cod));
      setPesquisaNome(response.data.consulta.map(item => item.pesquisa_nome));

      console.log(response.data.consulta);

    }).catch(error => {
      swal.fire({
        type: 'error',
        title: 'Oops...',
        text: 'Algo deu errado, tente novamente mais tarde!',
      })
    })
  }

  async function loadPesquisa() {
    alert(pesq_codigo);
    api.post('/visoes-crm/pesquisa-idade', {
        pesq_codigo
    }).then(response => {
      setMesIdade(response.data.consulta.map(item => item.mes));
      setGrupo1(response.data.consulta.map(item => item.grupo1));
      setGrupo2(response.data.consulta.map(item => item.grupo2));
      setGrupo3(response.data.consulta.map(item => item.grupo3));
      setGrupo4(response.data.consulta.map(item => item.grupo4));
      setGrupo5(response.data.consulta.map(item => item.grupo5));

      console.log(response.data);
    }).catch(error => {
        swal.fire({
          type: 'error',
          title: 'Oops...',
          text: 'Algo deu errado ao carregar o gráfico de idade, tente novamente mais tarde!',
        })
    })
  }


  const dataPartIdade = {
    labels: mesIdade,
    datasets: [
        {
            label: '18 a 25',
            data: grupo1,
            backgroundColor: [
                'rgba(54, 162, 235, 0.2)',
            ],
            borderColor: [
                'rgba(54, 162, 235, 1)',
            ],
            borderWidth: 1,
            
        },
        {
            label: '26 a 35',
            data: grupo2,
            backgroundColor: [
                'rgba(255, 206, 86, 0.2)',
            ],
            borderColor: [
                'rgba(255, 206, 86, 1)',
            ],
            borderWidth: 1,
        },
        {
            label: '36 a 45',
            data: grupo3,
            backgroundColor: [
                'rgba(75, 192, 192, 0.2)',
            ],
            borderColor: [
                'rgba(75, 192, 192, 1)',
            ],
            borderWidth: 1,
            
        },
        {
            label: '46 a 60',
            data: grupo4,
            backgroundColor: [
                'rgba(153, 102, 255, 0.2)',
            ],
            borderColor: [
                'rgba(153, 102, 255, 1)',
            ],
            borderWidth: 1,
        },
        {
            label: 'Maior que 60',
            data: grupo5,
            backgroundColor: [
                'rgba(255, 159, 64, 0.1)',
            ],
            borderColor: [
                'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
        },
    ],
};


const optionsIdade = {
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
      <S.Title>Análise de Pesquisa</S.Title>
      <S.ContainerSelect>
        <select id="selectBox" onChange={handleSelected} onClick={loadSelectOptions}>
          {pesquisaCod.map((item, index) => {
            return (
              <option value={item}>{pesquisaNome[index]}</option>
            )
          })}

        </select>
        <button onClick={loadPesquisa} >Filtrar</button>
      </S.ContainerSelect>
      <S.ChartContainer>
                <div className="chart3">
                    <Chart type="bar" data={dataPartIdade} options={optionsIdade} />
                </div>

        </S.ChartContainer>

    </S.Container>
  )
}
