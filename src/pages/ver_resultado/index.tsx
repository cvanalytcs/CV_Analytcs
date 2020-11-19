import React from 'react';
import { Link } from 'react-router-dom';
import backIcon from '../../assets/images/icons/back.svg';
import jwt from 'jwt-decode';
import Navbar from '../../components/Navbar';
import './styles.css';
import Input from '../../components/Input';
import warningIcon from '../../assets/images/icons/warning.svg';

function Resultado() {
	let token = localStorage.getItem('token');
	let user = jwt(token);
	let provaFeita = true;

	if (provaFeita) {
		return (
			<div id='painel-form' className='container'>
				<Navbar
					title='CV Analytics'
					description='Resultados - Desenvolvedor .NET'
				/>
				<main>
					<legend></legend>
					<form>
						<fieldset>
							<legend>Compatibilidade dos candidatos</legend>
							<br></br>
							<hr></hr>
							<br></br>

							<h6>Nome: Victor Silva</h6>
							<h6>Anos de Experiência: 4</h6>
							<h6>Acertos: 16/24</h6>
							<h6>Média de Compatibilidade: 55%</h6>
							<button className='btn-page'>Ver prova</button>
							<button className='btn-page'>Ver perfil</button>

							<br></br>
							<hr></hr>
							<br></br>

							<h6>Nome: Victor Silva</h6>
							<h6>Anos de Experiência: 2</h6>
							<h6>Acertos: 12/18</h6>
							<h6>Média de Compatibilidade: 40%</h6>
							<button className='btn-page'>Ver prova</button>
							<button className='btn-page'>Ver perfil</button>
						</fieldset>
						<footer>
							<p>
								<img src={warningIcon} alt='Aviso importante' />
								Média de compatibilidade dos candidatos menor que o recomendável
								<br />
							</p>
						</footer>
					</form>
				</main>
			</div>
		);
	} else {
		return (
			<div id='painel-form' className='container'>
				<Navbar title='CV Analytics' description='Processo concluído!' />
				<main>
					<p>
						Obrigado pela sua participação, caso necessário, o setor de RH
						entrará em contato através do email cadastrado em breve!
					</p>
				</main>
			</div>
		);
	}
}

export default Resultado;
