import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import backIcon from '../../assets/images/icons/back.svg';
import jwt from 'jwt-decode';
import Navbar from '../../components/Navbar';
import './styles.css';
import Input from '../../components/Input';
import warningIcon from '../../assets/images/icons/warning.svg';

function PainelCandidato() {
	let token = localStorage.getItem('token');
	let user = jwt(token);
	const [provaFeita, setProvaFeita] = useState(true);

	const finaliza = async (e: React.FormEvent) => {
		e.preventDefault();

		setProvaFeita(false);

		alert('Prova concluída com sucesso!.');
	};

	if (user.type.includes('recrutador')) {
		alert('Acesso não autorizado!');
		return <div></div>;
	} else if (provaFeita) {
		return (
			<div id='painel-form' className='container'>
				<Navbar
					title='CV Analytics'
					description='Avaliação - 10 Minutos Restantes'
				/>
				<main>
					<legend></legend>
					<form onSubmit={finaliza}>
						<fieldset>
							<legend>Avaliação</legend>
							<h6>
								<br></br>
								Nos exercícios a seguir, selecione a opção correta que preenche
								a lacuna da série:
								<br></br>
							</h6>
							<Input
								required
								name='anos'
								label='1. MCD, NEF, OGH,____, QKL.'
								placeholder='Escolha um valor'
								options={[
									{ value: '1', label: 'ABC' },
									{ value: '2', label: 'OGI' },
									{ value: '3', label: 'NIJ' },
									{ value: '4', label: 'MKL' },
								]}
							/>
							<Input
								required
								name='anos'
								label='2. B5CD,_____, BCD7, B8CD, BC9D. (01)'
								placeholder='Escolha um valor'
								options={[
									{ value: '1', label: 'B6CA' },
									{ value: '2', label: 'B3DC' },
									{ value: '3', label: 'B7CD' },
									{ value: '4', label: 'B6CA' },
									{ value: '5', label: 'B4CC' },
								]}
							/>
							<h6>
								<br></br>
								Nos próximos exercícios, selecione a opção que indica o próximo
								número da série:
								<br></br>
							</h6>
							<Input
								required
								name='anos'
								label='3. Considere a série de números: 51, 9, 51, 12, 51, 15, 51,… Qual é o próximo número?'
								placeholder='Escolha um valor'
								options={[
									{ value: '1', label: '52' },
									{ value: '2', label: '57' },
									{ value: '3', label: '11' },
									{ value: '4', label: '12' },
									{ value: '5', label: '15' },
								]}
							/>
							<Input
								required
								name='anos'
								label='4. Considere a série de números: 23, 24, 27, 28, 31, 32,… Qual é o próximo número?'
								placeholder='Escolha um valor'
								options={[
									{ value: '1', label: '27' },
									{ value: '2', label: '29' },
									{ value: '3', label: '31' },
									{ value: '4', label: '24' },
									{ value: '5', label: '26' },
								]}
							/>
							<h6>
								<br></br>
								Nos próximos exercícios, indique se a terceira sentença é
								verdadeira, falsa ou incerta:
								<br></br>
							</h6>
							<Input
								required
								name='anos'
								label='5. Todas as árvores do parque são floridas. Algumas árvores do parque são ipês amarelos. Todos os ipês amarelos são árvores floridas. Se as duas primeiras sentenças são verdadeiras, a terceira é:'
								placeholder='Escolha um valor'
								options={[
									{ value: '1', label: 'Verdadeira' },
									{ value: '2', label: 'False' },
								]}
							/>
							<Input
								required
								name='anos'
								label='6. Maria corre mais rápido do que Ana. Sílvia corre mais rápido do que Maria. Ana corre mais rápido do que Sílvia. Se as duas primeiras sentenças são verdadeiras, a terceira é: '
								placeholder='Escolha um valor'
								options={[
									{ value: '1', label: 'Verdadeira' },
									{ value: '2', label: 'Falsa' },
								]}
							/>
							<h6>
								<br></br>
								Conhecimentos Gerais:
								<br></br>
							</h6>
							<Input
								required
								name='anos'
								label='7. Pelo que o Scrum Master é responsável?'
								placeholder='Escolha um valor'
								options={[
									{
										value: '1',
										label:
											'Por ensinar Scrum e buscar que seja adotado e utilizado corretamente',
									},
									{
										value: '2',
										label:
											'Por definir métricas e gerenciar o desempenho do Time de Desenvolvimento',
									},
									{
										value: '3',
										label:
											'Por definir as tarefas que o Time de Desenvolvimento deverá fazer na Sprint',
									},
								]}
							/>
							<Input
								required
								name='anos'
								label='8. Que frase melhor descreve a principal responsabilidade do Product Owner?'
								placeholder='Escolha um valor'
								options={[
									{ value: '1', label: 'O ScrumMaster.' },
									{ value: '2', label: 'O Time de Desenvolvimento.' },
									{ value: '3', label: 'O Product Owner.' },
									{ value: '4', label: 'O Gerente de Projetos' },
								]}
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

export default PainelCandidato;
