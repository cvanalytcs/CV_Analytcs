import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jwt from 'jwt-decode';
import PageHeader from '../../components/PageHeader';
import Navbar from '../../components/Navbar';
import { useParams, useHistory } from 'react-router-dom';
import warningIcon from '../../assets/images/icons/warning.svg';

import './styles.css';
import Input from '../../components/Input';

function PreQuestionairo() {
	const history = useHistory();
	const token = localStorage.getItem('token');

	const [anos, setAnos] = useState('');
	const [scrum, setScrum] = useState('');
	const [js, setJs] = useState('');
	const [bd, setBd] = useState('');
	const [php, setPhp] = useState('');
	const [show, setShown] = useState(false);
	const [niveis, setNiveis] = useState([]);

	const EnviarFormulario = async (e: React.FormEvent) => {
		e.preventDefault();
		let post = {
			anos: anos,
			scrum: scrum,
			js: js,
			bd: bd,
			php: php,
		};

		await axios
			.post(
				process.env.REACT_APP_API_URL + '/prequestionario?token=' + token,
				post
			)
			.then(function (response) {
				if (response.status === 200) {
					alert(response.data.message);
					history.push('/painel_candidato');
				}
			})
			.catch(error => {
				if (error.response) {
					if (error.response.status === 403) {
						localStorage.removeItem('token');
						history.push('/');
					} else if (error.response.status === 401) {
						history.goBack();
					}

					alert(error.response.data.message);
				} else {
					alert(error.message);
				}
			});
	};

	useEffect(() => {
		const isDone = async () => {
			let result = null;

			await axios
				.get(
					process.env.REACT_APP_API_URL +
						'/prequestionario/isdone?token=' +
						token
				)
				.then(function (response) {
					if (response.status === 200) {
						result = response.data.result;
					}
				})
				.catch(error => {
					if (error.response) {
						if (error.response.status === 403) {
							localStorage.removeItem('token');
							history.push('/');
						} else if (error.response.status === 401) {
							history.goBack();
						}

						alert(error.response.data.message);
					} else {
						alert(error.message);
					}
				});

			return result;
		};

		const fetchNiveis = async () => {
			let result = [];

			await axios
				.get(
					process.env.REACT_APP_API_URL +
						'/dadosAuxiliares/niveis?token=' +
						token
				)
				.then(function (response) {
					if (response.status === 200) {
						result = response.data;
					}
				});

			return result;
		};

		isDone().then(res => {
			if (res === false) {
				setShown(true);
			} else if (res === true) {
				history.push('/painelCandidato');
			}
		});

		fetchNiveis().then(niveis => {
			setNiveis(niveis);
		});
	}, []);

	if (!show) {
		return (
			<div id='painel-form' className='container'>
				<Navbar title='CV Analytics' description='' />
				<main>
					<form onSubmit={EnviarFormulario}></form>
				</main>
			</div>
		);
	} else {
		return (
			<div id='painel-form' className='container'>
				<Navbar
					title='CV Analytics'
					description='Por favor, preencha os dados abaixo para que possamos te conhecer melhor.'
				/>
				<main>
					<form onSubmit={EnviarFormulario}>
						<fieldset>
							<legend>Formulário Pré Teste</legend>
							<Input
								required
								name='anos'
								label='Quantos anos de experiência profissional você tem?'
								placeholder='Escolha um valor'
								value={anos}
								options={[
									{ value: '1', label: 'Um ano' },
									{ value: '2', label: 'Dois anos' },
									{ value: '3', label: 'Três anos' },
									{ value: '4', label: 'Quatro anos' },
									{ value: '5', label: 'Cinco anos ou mais' },
								]}
								onChange={e => {
									setAnos(e.target.value);
								}}
							/>
							<Input
								required
								name='scrum'
								label='Qual sua familiaridade com o framework ágil scrum?'
								placeholder='Escolha um valor'
								value={scrum}
								options={niveis}
								onChange={e => {
									setScrum(e.target.value);
								}}
							/>
							<Input
								required
								name='bd'
								label='Qual sua familiaridade com banco de dados?'
								placeholder='Escolha um valor'
								value={bd}
								options={niveis}
								onChange={e => {
									setBd(e.target.value);
								}}
							/>
							<Input
								required
								name='js'
								label='Qual sua familiaridade com JavaScript?'
								placeholder='Escolha um valor'
								value={js}
								options={niveis}
								onChange={e => {
									setJs(e.target.value);
								}}
							/>
							<Input
								required
								name='php'
								label='Qual sua familiaridade com PHP?'
								placeholder='Escolha um valor'
								value={php}
								options={niveis}
								onChange={e => {
									setPhp(e.target.value);
								}}
							/>
						</fieldset>
						<footer>
							<p>
								<img src={warningIcon} alt='Aviso importante' />
								Importante! <br />
								Preencha todos os dados
							</p>
							<button type='submit'>Enviar Formulário</button>
						</footer>
					</form>
				</main>
			</div>
		);
	}
}

export default PreQuestionairo;
