import React from 'react';
import { Link } from 'react-router-dom';
import jwt from 'jwt-decode';
import backIcon from '../../assets/images/icons/back.svg';
import Navbar from '../../components/Navbar';
import './styles.css';

function PainelRecrutador() {
	let token = localStorage.getItem('token');
	let user = jwt(token);

	if (user.type.includes('candidato')) {
		alert('Acesso não autorizado!');
		return (
			<div id='panel' className='container'>
				<Navbar title='CV Analytics' description='Painel do Recrutador' />
				<main></main>
			</div>
		);
	} else {
		return (
			<div id='panel' className='container'>
				<Navbar title='CV Analytics' description='Painel do Recrutador' />
				<main>
					<legend></legend>
					<div className='painel'>
						<Link to='/resultados' className='modules'>
							Visualização dos Resultados
						</Link>

						<Link to='/usuarios' className='modules'>
							Gerenciar Usuários
						</Link>

						<Link to='/vagas' className='modules'>
							Gerenciar Vagas
						</Link>
					</div>
				</main>
			</div>
		);
	}
}

export default PainelRecrutador;
