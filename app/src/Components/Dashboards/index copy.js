import * as S from './styles';
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const dataLineChart = [{
    name: '',
    uv: 400,
    pv: 2400,
    amt: 2400},
    {
        name: 'Page B',
        uv: 500,
        pv: 4567,
        amt: 2400},
    {
        name: 'Page C',
        uv: 600,
        pv: 1398,
        amt: 2400},
    {   
        name: 'Page D',
        uv: 700,
        pv: 9800,
        amt: 2400},
    {
        name: 'Page E',
        uv: 800,
        pv: 3908,
        amt: 2400},
    ];
  
export default function Dashboard () {
    return (
    <S.Container>
        <ResponsiveContainer width={"50%"} height="50%">
            <BarChart width={730} height={250} data={dataLineChart}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="pv" fill="" />
                <Bar dataKey="uv" fill="#82ca9d" />
             </BarChart> 
      </ResponsiveContainer>

    </S.Container>
    );
}