import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import axios from 'axios';
import { Redirect, Link, Route, useHistory } from 'react-router-dom';
import GerenciadorListItem from '../../components/GerenciadorListItem';
import './styles.css';

function GerenciadorResultados() {
	let token = localStorage.getItem('token');
	let history = useHistory();
	let perPage = 3;

	const [user, setUser] = useState<any[]>([]);
	const [filteredUsers, setFiltered] = useState<any[]>([]);

	let editarUsuario = id => {
		history.push('/editarUsuario/' + id);
	};

	let getPagination = param => {
		let pages = Math.ceil(param.length / perPage);
		if (pages > 1) return Array.from(new Array(pages), (x, i) => i + 1);
		return [];
	};

	let paginateFilter = pg => {
		return user.slice(pg * perPage - perPage, pg * perPage);
	};

	useEffect(() => {
		let fetchUsuarios = async () => {
			let output = [];

			await axios
				.get(process.env.REACT_APP_API_URL + '/usuarios?token=' + token)
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

		fetchUsuarios().then(res => {
			setUser(res);
			setFiltered(res.slice(0, perPage));
		});
	}, []);

	return (
		<div id='vagas' className='container'>
			<Navbar title='CV Analytics' description='Gerenciador de Usuarios' />

			<main>
				<legend></legend>

				<div className='jobs'>
					{user.length === 0 ? (
						<small
							className='loading'
							style={{
								marginTop: '20px',
								display: 'inline',
								textAlign: 'center',
							}}
						>
							Carregando...
						</small>
					) : (
						filteredUsers.map(user => (
							<GerenciadorListItem
								nome={user.nome + ' ' + user.sobrenome}
								descricao={user.email}
								local={user.tipo + ' - ' + (user.ativo ? 'Ativo' : 'Inativo')}
								id={user.id}
								tipo='user'
							></GerenciadorListItem>
						))
					)}
					<div className='pagination'>
						{getPagination(user).map((x, i) => (
							<button
								className='btn-page'
								onClick={() => setFiltered(paginateFilter(x))}
							>
								{x}
							</button>
						))}
					</div>
				</div>
			</main>
		</div>
	);
}
export default GerenciadorResultados;
