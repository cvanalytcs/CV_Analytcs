import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import axios from 'axios';
import { Redirect, Link, Route, useHistory } from 'react-router-dom';
import GerenciadorListItem from '../../components/GerenciadorListItem';
import './styles.css';

function GerenciarVagas() {
	let token = localStorage.getItem('token');
	let history = useHistory();
	let perPage = 3;

	const [vagas, setVaga] = useState<any[]>([]);
	const [filteredVagas, setFiltered] = useState<any[]>([]);

	let editarVaga = id => {
		history.push('/ver_resultado/' + id);
	};

	let getPagination = vagas => {
		let pages = Math.ceil(vagas.length / perPage);
		if (pages > 1) return Array.from(new Array(pages), (x, i) => i + 1);
		return [];
	};

	let paginateFilter = pg => {
		return vagas.slice(pg * perPage - perPage, pg * perPage);
	};

	useEffect(() => {
		let fetchVagas = async () => {
			let output = [];

			await axios
				.get(process.env.REACT_APP_API_URL + '/vagas?token=' + token)
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

		fetchVagas().then(res => {
			setVaga(res);
			setFiltered(res.slice(0, perPage));
		});
	}, []);

	return (
		<div id='vagas' className='container'>
			<Navbar
				title='CV Analytics'
				description='Performance e compatibilidade dos candidatos'
			/>

			<main>
				<legend></legend>

				<div className='jobs'>
					{vagas.length === 0 ? (
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
						filteredVagas.map((vaga, i) => (
							<GerenciadorListItem
								nome={vaga.nome}
								descricao='Acessar relatórios de performance e perfis dos candidatos, resultados disponíveis.'
								local={vaga.local}
								id={vaga.id}
								tipo='a'
							></GerenciadorListItem>
						))
					)}
					<div className='pagination'>
						{getPagination(vagas).map((x, i) => (
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
export default GerenciarVagas;
