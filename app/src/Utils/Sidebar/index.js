import React from "react";
import perfil from '../../Assets/perfil.png';
import * as S from "./styles";
import Logo from '../../Assets/Logo.png';

export default function Sidebar() {
    function logOut() {
        localStorage.clear();
        window.location.href = "/";
    }

    function Home(){
        window.location.href = "/home/dashboard";
    }

    return (
        <S.Container>     
            <S.Header>
                <img onClick={Home} src={Logo} alt="Logo do Sistema"></img>

                <div className="right_logout">                    
                    <i onClick={logOut} class='bx bx-log-out'></i>
                    <span onClick={logOut} className="log-out">Sair</span>
                </div>
            </S.Header>       
            <S.LeftSide className="close">
                <ul class="nav-links">
                    <li>
                        <a href="/home/dashboard">
                            <i class="bx bx-grid-alt"></i>
                            <span class="link_name" >Visão Geral</span>
                        </a>
                    </li>
                    <li>
                        <div class="icon-link">
                            <a href='#'> 
                                <i class='bx bx-collection'></i>
                                <span class="link_name" >Cadastros</span>
                            </a>
                            <i class='bx bxs-chevron-down'></i>
                        </div>
                        <ul class="sub-menu">
                            <li><a href="#">Empresas</a></li>
                            <li><a href="#">Filiais</a></li>
                            <li><a href="#">Setores</a></li>
                            <li><a href="#">Vinhos</a></li>
                            <li><a href="#">Produtos</a></li>
                            <li><a href="#">Motivos de Sugestão</a></li>
                            <li><a href="#">Troféus</a></li>
                        </ul>
                    </li>
                    <li>
                        <div class="icon-link">
                            <a href="/home/visoes-crm">
                            <i class='bx bxs-pie-chart-alt-2'></i>
                            <span class="link_name" >Visões CRM</span>
                            </a>
                            <i class='bx bxs-chevron-down'></i>
                        </div>
                        <ul class="sub-menu">
                            <li><a href="#">Gráficos</a></li>
                        </ul>
                    </li>
                    <li>
                        <div class="icon-link">
                            <a href="/home/relatorios-crm">
                            <i class='bx bxs-report' ></i>
                            <span class="link_name" >Relatórios</span>
                            </a>
                            <i class='bx bxs-chevron-down'></i>
                        </div>
                        <ul class="sub-menu">
                            <li><a href="#">Relatorios</a></li>
                        </ul>
                    </li>
                    <li>
                        <div class="icon-link">
                            <a href="/home/configuracoes">
                            <i class='bx bxs-cog'></i>
                            <span class="link_name" >Configurações</span>
                            </a>
                            <i class='bx bxs-chevron-down'></i>
                        </div>
                        <ul class="sub-menu">
                            <li><a href="#">Mudar Minha Senha</a></li>
                            <li><a href="#">Usuários</a></li>
                            <li><a href="#">Parâmetros do Sistema</a></li>
                        </ul>
                        
                    </li>
                </ul>
                
            </S.LeftSide>
            
        </S.Container>

    )
}