import React, { useEffect } from "react";
import perfil from '../../Assets/perfil.png';
import * as S from "./styles";
import Logo from '../../Assets/Logo2.png';
import { Link } from "react-router-dom";

export default function Sidebar() {
    function logOut() {
        localStorage.clear();
        window.location.href = "/";
    }

    function Home() {
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
                    <li  >
                        <Link to="/home/dashboard">
                            <i class="bx bx-grid-alt"></i>
                            <span class="link_name" >Visão Geral</span>
                        </Link>
                    </li>
                    <li  >
                        <div class="icon-link">
                            <a href='#'>
                                <i class='bx bx-collection'></i>
                                <span class="link_name" >Cadastros</span>
                            </a>
                            <i class='bx bxs-chevron-down'></i>
                        </div>
                        <ul class="sub-menu">
                            <li  ><Link to='/cadastros/empresas'>Empresas</Link></li>
                            <li  ><Link to='/cadastros/filiais'>Filiais</Link></li>
                            <li  ><Link to='/cadastros/setores'>Setores</Link></li>
                            <ul class="sub-menu-2"  ><b>Adega</b>
                                <li> <Link to='/cadastros/vinhos'>Vinhos</Link></li>
                                <li> <Link to='/cadastros/vinhos-categoria'>Categoria de Vinhos</Link></li>
                                <li> <Link to='/cadastros/vinhos-origem'>Origem do Vinho</Link></li>
                            </ul>
                            <li  ><Link to='/cadastros/sugestoes'>Motivos de Sugestão</Link></li>
                            <li  ><Link to='/cadastros/pesquisas'>Pesquisas</Link></li>
                        </ul>
                    </li>
                    <li  >
                        <div class="icon-link">
                            <a href="#">
                                <i class='bx bxs-pie-chart-alt-2'></i>
                                <span class="link_name" >Visões CRM</span>
                            </a>
                            <i class='bx bxs-chevron-down'></i>
                        </div>
                        <ul class="sub-menu">
                            <li><Link to='/visoes/venda-por-idade'>Idade</Link></li>
                            <li><Link to='/visoes/venda-por-genero'>Gênero</Link></li>
                            <li><Link to='/visoes/analise-pesquisa'>Pesquisas</Link></li>
                            <li><Link to='/visoes/analise-sugestoes'>Sugestões</Link></li>
                        </ul>
                    </li>
                    <li >
                        <div class="icon-link">
                            <a href="#">
                                <i class='bx bxs-cog'></i>
                                <span class="link_name" >Configurações</span>
                            </a>
                            <i class='bx bxs-chevron-down'></i>
                        </div>
                        <ul class="sub-menu">
                            <li><Link to='/configuracoes/mudar-senha'>Mudar Minha Senha</Link></li>
                            <li><Link to='/configuracoes/criar-usuarios'>Usuários</Link></li>
                            <li><Link to='/configuracoes/parametros-sistema'>Parâmetros do Sistema</Link></li>
                        </ul>

                    </li>
                </ul>

            </S.LeftSide>

        </S.Container>

    )
}