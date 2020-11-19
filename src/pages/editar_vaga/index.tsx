import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import Input from '../../components/Input';
import axios from 'axios';
import { useHistory, useParams } from 'react-router-dom';
import './styles.css';

function EditarVaga() {
	let token = localStorage.getItem('token');
	let history = useHistory();
	const [vaga, setVaga] = useState<any>({});
	const [dummy, setDummy] = useState(false);

	const { id }: any = useParams();
	const [nome, setNome] = useState('');
	const [descricao, setDescricao] = useState('');
	const [local, setLocal] = useState('');
	const [selectedRequisitos, setSRequisitos] = useState([]);
	const [selectedNiveis, setSNiveis] = useState([]);

	//Items do select
	const [requisitos, setRequisitos] = useState([]);
	const [niveis, setNiveis] = useState([]);

	let vagaMock = {
		id: null,
		nome: null,
		descricao: null,
		local: null,
		requisitos: [{ nome: null, nivel: null }],
	};

	const removeRequisito = (e: React.FormEvent, i) => {
		e.preventDefault();

		vaga.requisitos.splice(i, 1);
		setVaga(vaga);
		setDummy(!dummy);
	};

	const addRequisito = (e: React.FormEvent) => {
		e.preventDefault();

		vaga.requisitos.push({ nome: null, nivel: null });

		setVaga(vaga);
		setDummy(!dummy);
	};
	const EnviarFormulario = async (e: React.FormEvent) => {
		e.preventDefault();

		await axios
			.post(process.env.REACT_APP_API_URL + '/vagas/edit?token=' + token, vaga)
			.then(function (response) {
				if (response.status === 200) {
					//alert(response.data.message);
					history.push('/vagas');
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

					//alert(error.response.data.message);
				} else {
					//alert(error.message);
				}
			});
	};

	useEffect(() => {
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

		const fetchRequisitos = async () => {
			let result = [];

			await axios
				.get(
					process.env.REACT_APP_API_URL +
						'/dadosAuxiliares/requisitos?token=' +
						token
				)
				.then(function (response) {
					if (response.status === 200) {
						result = response.data;
					}
				});

			return result;
		};

		const fetchVaga = async () => {
			let output = [];

			await axios
				.get(
					process.env.REACT_APP_API_URL +
						'/getVaga?token=' +
						token +
						'&id=' +
						id
				)
				.then(response => {
					if (response.status === 200) {
						output = response.data;
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

						//alert(error.response.data.message);
					} else {
						//alert(error.message);
					}
				});

			return output;
		};

		fetchVaga().then(res => {
			let reslen = Object.keys(res).length;

			return reslen > 0 ? setVaga(res) : setVaga(vagaMock);
		});

		fetchNiveis().then(niveis => {
			setNiveis(niveis);
		});

		fetchRequisitos().then(req => {
			setRequisitos(req);
		});
	}, []);

	if (Object.keys(vaga).length == 0)
		return (
			<div id='painel-form' className='container'>
				<Navbar
					title='CV Analytics'
					description='Editar e gerenciar vagas disponíveis.'
				/>

				<main></main>
			</div>
		);
	else
		return (
			<div id='painel-form' className='container'>
				<Navbar
					title='CV Analytics'
					description='Editar e gerenciar vagas disponíveis.'
				/>

				<main>
					<form>
						<fieldset>
							<h2> Informações Básicas </h2>
							<Input
								required
								name='nome'
								label='Nome'
								value={vaga.nome}
								onChange={e => {
									setNome(e.target.value);
								}}
							/>
							<Input
								required
								name='Descricao'
								label='Descrição'
								value={vaga.descricao}
								onChange={e => {
									setDescricao(e.target.value);
								}}
							/>
							<Input
								required
								name='local'
								label='Local'
								value={vaga.local}
								onChange={e => {
									setLocal(e.target.value);
								}}
							/>

							<h2>Conhecimentos Necessários</h2>
							{vaga.requisitos.map((x, i) => {
								if (i > 0)
									return (
										<div>
											<hr></hr>
											<Input
												name='conhecimento'
												label='Conhecimento'
												value={x.nome}
												options={[
													{ value: '1', label: 'Javascript' },
													{ value: '2', label: 'Scrum' },
													{ value: '1', label: 'Java' },
													{ value: '1', label: 'Python' },
													{ value: '1', label: 'Lógica' },
													{ value: '1', label: 'PHP' },
													{ value: '1', label: 'Banco de dados' },
												]}
												onChange={e => {
													setSRequisitos(e.target.value);
												}}
											/>

											<Input
												name='nivel'
												label='Nível de conhecimento'
												value={x.nível}
												options={[
													{ value: '1', label: 'Básicoa' },
													{ value: '1', label: 'Intermediário' },
													{ value: '1', label: 'Avançado' },
												]}
												onChange={e => {
													setSNiveis(e.target.value);
												}}
											/>

											<button
												className='btn-add'
												onClick={e => removeRequisito(e, i)}
											>
												Remover
											</button>
										</div>
									);
								else
									return (
										<div>
											<hr></hr>
											<Input
												name='conhecimento'
												label='Conhecimento'
												value={x.nome}
												options={[
													{ value: '1', label: 'Javascript' },
													{ value: '2', label: 'Scrum' },
													{ value: '1', label: 'Java' },
													{ value: '1', label: 'Python' },
													{ value: '1', label: 'Lógica' },
													{ value: '1', label: 'PHP' },
													{ value: '1', label: 'Banco de dados' },
												]}
												onChange={e => {
													setSRequisitos(e.target.value);
												}}
											/>

											<Input
												name='nivel'
												label='Nível de conhecimento'
												value={x.nível}
												options={[
													{ value: '1', label: 'Básico' },
													{ value: '1', label: 'Intermediário' },
													{ value: '1', label: 'Avançado' },
												]}
												onChange={e => {
													setSNiveis(e.target.value);
												}}
											/>
										</div>
									);
							})}
							<button className='btn-add' onClick={e => addRequisito(e)}>
								Adicionar Conhecimento
							</button>
						</fieldset>
						<footer>
							<p></p>
							<button type='submit' onClick={EnviarFormulario}>
								Enviar
							</button>
						</footer>
					</form>
				</main>
			</div>
		);
}

export default EditarVaga;
