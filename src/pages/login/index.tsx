import React, { useState } from 'react';
import axios from 'axios';
import PageHeader from '../../components/PageHeader';
import { useHistory } from 'react-router-dom';
import jwt from 'jwt-decode';

import Input from '../../components/Input';

import './styles.css';

function Login() {
	const history = useHistory();
	const token = localStorage.getItem('token');
	const [cpf, setCpf] = useState('');
	const [senha, setSenha] = useState('');

	if (token) {
		localStorage.removeItem('token');
	}

	const EnviarLogin = async (e: React.FormEvent) => {
		e.preventDefault();
		const token = btoa(`${cpf}:${senha}`);

		await axios
			.post(process.env.REACT_APP_API_URL + '/login', null, {
				headers: {
					Authorization: `Basic ${token}`,
				},
			})
			.then(function (response) {
				if (response.status === 200) {
					localStorage.setItem('token', response.data.token);
					let user = jwt(response.data.token);

					if (user.type.includes('candidato')) {
						history.push('/preQuestionario');
					} else if (user.type.includes('recrutador')) {
						history.push('/painelRecrutador');
					}
				}
			})
			.catch(function (error) {
				if (error.response) alert(error.response.data.message);
				else {
					alert(error.message);
				}
			});
	};

	return (
		<div id='painel-form' className='container'>
			<PageHeader title='Cv Analytics - Login' />

			<main>
				<form onSubmit={EnviarLogin}>
					<fieldset>
						<legend>Login na Aplicação</legend>
						<Input
							required
							name='cpf'
							label='CPF'
							value={cpf}
							placeholder='Digite seu cpf'
							minLength={14}
							maxLength={14}
							mask={[
								/\d/,
								/\d/,
								/\d/,
								'.',
								/\d/,
								/\d/,
								/\d/,
								'.',
								/\d/,
								/\d/,
								/\d/,
								'-',
								/\d/,
								/\d/,
							]}
							guide={false}
							onChange={e => {
								setCpf(e.target.value);
							}}
						/>

						<Input
							name='senha'
							label='Senha'
							minlengh={8}
							maxlengh={48}
							value={senha}
							placeholder='*****'
							type={'password'}
							onChange={e => {
								setSenha(e.target.value);
							}}
						/>
					</fieldset>

					<footer>
						<p></p>
						<button type='submit'>Entrar </button>
					</footer>
				</form>
			</main>
		</div>
	);
}

export default Login;
