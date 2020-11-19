import React from 'react';
import { Link } from 'react-router-dom';

import './styles.css';

const GerenciadorListItem = ({ nome, descricao, local, id, tipo, ...rest }) => {
	let url = '';

	if (tipo == 'vaga') url = 'editarVaga/';
	if (tipo == 'user') url = 'perfil/';

	return (
		<div>
			<div className='courses-container'>
				<div className='course'>
					<div className='course-preview'>
						<h5>{nome}</h5>
						<small className=''>{local}</small>
					</div>
					<div className='course-info'>
						<small>{descricao}</small>
						<Link to={url}>
							<button className='btn'>Ver</button>
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default GerenciadorListItem;
