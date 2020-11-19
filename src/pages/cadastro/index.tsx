import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';
import warningIcon from '../../assets/images/icons/warning.svg';

import './styles.css';
import Input from '../../components/Input';
import PageHeader from '../../components/PageHeader';

function CadastroUser() {
	const [nome, setNome] = useState('');
	const [sobrenome, setSobrenome] = useState('');
	const [cpf, setCpf] = useState('');
	const [mail, setMail] = useState('');
	const [senha, setSenha] = useState('');
	const [senhaConfirm, setSenhaConfirm] = useState('');
	const { tipo }: any = useParams();
	const history = useHistory();

	const EnviarCadastro = async (e: React.FormEvent) => {
		e.preventDefault();

		if (senha !== senhaConfirm) {
			alert('As senhas não batem');
			return;
		}

		let cad = {
			nome: nome,
			sobrenome: sobrenome,
			email: mail,
			cpf: cpf,
			senha: senha,
			senhaConfirm: senhaConfirm,
			tipo: tipo,
		};

		await axios
			.post(process.env.REACT_APP_API_URL + '/cadastro', cad)
			.then(function (response) {
				if (response.status === 200) {
					alert(response.data.message);
					history.push('/login');
				}
			})
			.catch(function (error) {
				if (error.response) alert(error.response.data.message);
				else {
					alert('Erro ao contactar servidor');
				}
			});
	};

	return (
		<div id='painel-form' className='container'>
			<PageHeader title='O Primeiro passo é preencher todos os campos do cadastro.' />
			<main>
				<form onSubmit={EnviarCadastro}>
					<fieldset>
						<legend>Criação de Usuário</legend>
						<Input
							required
							name='cpf'
							label='CPF'
							value={cpf}
							placeholder='Digite seu cpf'
							minLength={14}
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
							name='name'
							label='Nome'
							value={nome}
							placeholder='Digite seu primeiro nome'
							minLength={4}
							maxLength={50}
							type={'text'}
							required
							onChange={e => {
								setNome(e.target.value);
							}}
						/>
						<Input
							name='sobrenome'
							label='Sobrenome'
							value={sobrenome}
							placeholder='Digite seu segundo nome'
							minLength={4}
							maxLength={50}
							type={'text'}
							required
							onChange={e => {
								setSobrenome(e.target.value);
							}}
						/>

						<Input
							name='email'
							label='E-mail'
							value={mail}
							placeholder='exemplo@provedor.com'
							maxLength={50}
							type={'email'}
							required
							onChange={e => {
								setMail(e.target.value);
							}}
						/>
						<Input
							name='senha'
							label='Senha'
							value={senha}
							placeholder='Digite sua senha'
							type={'password'}
							minLength={8}
							maxLength={48}
							onChange={e => {
								setSenha(e.target.value);
							}}
						/>
						<Input
							name='senha2'
							label='Confirmação de Senha'
							value={senhaConfirm}
							placeholder='Confirme sua senha'
							type={'password'}
							minLength={8}
							maxLength={48}
							onChange={e => {
								setSenhaConfirm(e.target.value);
							}}
						/>
					</fieldset>

					<footer>
						<p>
							<img src={warningIcon} alt='Aviso importante' />
							Importante! <br />
							Preencha todos os dados
						</p>
						<button type='submit'>Enviar Cadastro</button>
					</footer>
				</form>
			</main>
		</div>
	);
}

export default CadastroUser;
