import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import Input from '../../components/Input';
import axios from 'axios';
import { useHistory, useParams } from 'react-router-dom';
import './styles.css';

function EditarUsuario() {
	let token = localStorage.getItem('token');
	let history = useHistory();

	const [user, setUser] = useState<any>({});

	const { id }: any = useParams();
	const [nome, setNome] = useState('');
	const [sobreNome, setSobrenome] = useState('');
	const [cpf, setCpf] = useState('');
	const [email, setEmail] = useState('');
	const [tipo, setTipo] = useState('candidato');
	const [ativo, setAtivo] = useState(true);

	const EnviarFormulario = async (e: React.FormEvent) => {
		e.preventDefault();

		await axios
			.post(
				process.env.REACT_APP_API_URL + '/usuarios/saveUser?token=' + token,
				{
					nome: nome,
					sobrenome: sobreNome,
					cpf: cpf,
					email: email,
					ativo: ativo,
				}
			)
			.then(function (response) {
				if (response.status === 200) {
					alert(response.data.message);
					history.push('/usuarios');
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
		const fetchUser = async () => {
			let output = [];

			await axios
				.get(
					process.env.REACT_APP_API_URL +
						'/usuarios/getUser?token=' +
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

						alert(error.response.data.message);
					} else {
						alert(error.message);
					}
				});

			return output;
		};

		fetchUser().then(res => {
			setUser(res);

			setNome(res['nome']);
			setSobrenome(res['sobrenome']);
			setEmail(res['email']);
			setCpf(res['cpf']);
			setAtivo(res['ativo']);
			setTipo(res['tipo']);
		});
	}, []);

	if (Object.keys(user).length == 0)
		return (
			<div id='painel-form' className='container'>
				<Navbar title='CV Analytics' description='Editar usuário' />

				<main></main>
			</div>
		);
	else
		return (
			<div id='painel-form' className='container'>
				<Navbar title='CV Analytics' description={'Editar usuário'} />

				<main>
					<form>
						<fieldset>
							<h2> Dados Cadastrais</h2>
							<br></br>
							<Input required disabled name='cpf' label='CPF' value={cpf} />
							<Input
								required
								name='nome'
								label='Nome'
								value={nome}
								onChange={e => {
									setNome(e.target.value);
								}}
							/>
							<Input
								required
								name='sobrenome'
								label='Sobrenome'
								value={sobreNome}
								onChange={e => {
									setSobrenome(e.target.value);
								}}
							/>
							<Input
								required
								name='email'
								label='Email'
								value={email}
								onChange={e => {
									setEmail(e.target.value);
								}}
							/>
							<Input
								required
								disabled
								name='tipo'
								label='Tipo de acesso'
								value={tipo}
								onChange={e => {
									setEmail(e.target.value);
								}}
							/>
						</fieldset>
						<footer>
							<p></p>
							<button type='submit' onClick={EnviarFormulario}>
								Salvar
							</button>
						</footer>
					</form>
				</main>
			</div>
		);
}

export default EditarUsuario;
