import React from "react";
import * as S from "./styles";
import { useHistory } from "react-router-dom";
import 'chart.js/auto';
import { Chart } from 'react-chartjs-2';
import swal from "sweetalert2";

const data = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  datasets: [
    {
      label: "First dataset",
      data: [33, 53, 85, 41, 44, 65],
      fill: true,
      backgroundColor: "rgba(75,192,192,0.2)",
      borderColor: "rgba(75,192,192,1)",
      borderWidth: 1
    },
    {
      label: "Second dataset",
      data: [33, 25, 35, 51, 54, 76],
      fill: true,
      borderColor: "#742774",
      borderWidth: 1
    }
  ]
};

export default function LineChart() {
    const history = useHistory();

    const token = localStorage.getItem('token');
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

    const logOut = () => {
        localStorage.clear();
        history.push('/');
    }
  return (
    
    <S.Container>      
        <S.ChartContainer> 
            <Chart type="bar" data={data} />   
            <Chart type="line" data={data} />   
            <Chart type="line" data={data} />   
            <button onClick={logOut}>SAIR</button>
        </S.ChartContainer>
    </S.Container>
    
  );
}
