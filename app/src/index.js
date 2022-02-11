import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Sidebar from './Utils/Sidebar';


//Rota Login
import Login from './Components/Login'
//Rota Visão Inicial
import Dashboard1 from './Components/Home/'
//Rota Cadastros
import Empresas from './Components/Cadastros/Empresas/'
import Filiais from './Components/Cadastros/Filiais/'
import Setores from './Components/Cadastros/Setores/'
import Sugestoes from './Components/Cadastros/Sugestoes/'
import Trofeus from './Components/Cadastros/Trofeus/'
import Vinhos from './Components/Cadastros/Vinhos/'
import Pesquisas from './Components/Cadastros/Pesquisas/'
//Rota Visões CRM
import VisoesIdade from './Components/Visões CRM/Idade'
import VisoesGenero from './Components/Visões CRM/Genero'
import VisoesPesquisa from './Components/Visões CRM/Pesquisas';
import VisoesSugestoes from './Components/Visões CRM/Sugestões';
//Rota Configurações
import MudarSenha from './Components/Configurações/Mudar Senha';
import CriarUsuarios from './Components/Configurações/Criar Usuários';
import ParametrosSistema from './Components/Configurações/Parâmetros do Sistema';


function App () {
  return(
    <Router>      
      <Switch>
        <Route exact path='/' component={Login}/>
        <Route exact path='/home/dashboard' component={Dashboard1}/>
        <Route exact path='/cadastros/empresas' component={Empresas}/>
        <Route exact path='/cadastros/filiais' component={Filiais}/>
        <Route exact path='/cadastros/setores' component={Setores}/>
        <Route exact path='/cadastros/sugestoes' component={Sugestoes}/>
        <Route exact path='/cadastros/trofeus' component={Trofeus}/>
        <Route exact path='/cadastros/vinhos' component={Vinhos}/>    
        <Route exact path='/cadastros/pesquisas' component={Pesquisas}/>    
        <Route exact path='/visoes/venda-por-idade' component={VisoesIdade}/>
        <Route exact path='/visoes/venda-por-genero' component={VisoesGenero}/>
        <Route exact path='/visoes/analise-pesquisa' component={VisoesPesquisa}/>
        <Route exact path='/visoes/analise-sugestoes' component={VisoesSugestoes}/>
        <Route exact path='/configuracoes/mudar-senha' component={MudarSenha}/>
        <Route exact path='/configuracoes/criar-usuarios' component={CriarUsuarios}/>
        <Route exact path='/configuracoes/parametros-sistema' component={ParametrosSistema}/>
      </Switch>
    </Router>    
  )
}
ReactDOM.render(
  <Router>
    <App/>
  </Router>,

  document.getElementById('root')
);