import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Landing from './pages/landing';
import TeacherList from './pages/login';
import CadastroUser from './pages/cadastro';
import GerenciarVagas from './pages/gerenciar_vagas';
import GerenciarUsuarios from './pages/gerenciar_usuarios';
import PainelRecrutador from './pages/painel_recrutador';
import PainelCandidato from './pages/prova';
import Perfil from './pages/perfil';
import EditarVaga from './pages/editar_vaga';
import Resultados from './pages/resultados';
import Resultado from './pages/ver_resultado';
import EditarUsuario from './pages/editar_usuario';
import PreQuestionairo from './pages/pre_questionario';

function Routes() {
	return (
		<BrowserRouter>
			<Route path='/' exact component={Landing} />
			<Route path='/login' component={TeacherList} />
			<Route path='/cadastro/:tipo' component={CadastroUser} />
			<Route path='/preQuestionario' component={PreQuestionairo} />
			<Route path='/vagas' component={GerenciarVagas} />
			<Route path='/usuarios' component={GerenciarUsuarios} />
			<Route path='/perfil' component={Perfil} />
			<Route path='/editarVaga/:id' component={EditarVaga} />
			<Route path='/editarUsuario/:id' component={EditarUsuario} />
			<Route path='/painelRecrutador' component={PainelRecrutador} />
			<Route path='/resultados' component={Resultados} />
			<Route path='/verResultado' component={Resultado} />
			<Route path='/prova' component={PainelCandidato} />
			<Route path='/gerenciarUsuario' component={GerenciarUsuarios} />
		</BrowserRouter>
	);
}

export default Routes;
