import React, { Component } from "react";
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


class visoesCRM extends Component {
    render(){
        return(
            <div>
                Teste de visão CRM
            </div>
        )
    }
}
