import React from 'react';

import { Link, useHistory } from 'react-router-dom';
import backIcon from '../../assets/images/icons/back.svg';

import './styles.css';

interface navbarProps {
	title: string;
	description?: string;
}
const Navbar: React.FC<navbarProps> = props => {
	let history = useHistory();
	let token = localStorage.getItem('token');

	function handleClick(e) {
		history.goBack();
	}

	function logout(e) {
		localStorage.removeItem('token');
		history.push('/');
	}

	return (
		<header className='movement'>
			<div className='top-bar-container'>
				<div onClick={handleClick}>
					<img src={backIcon} alt='Voltar' />
				</div>
			</div>
			<div className='perfil'>
				<Link to={'/perfil?token=' + token}>Perfil</Link>
			</div>
			<div className='sair'>
				<a onClick={logout}>Sair</a>
			</div>
			<div className='header-content'>
				{props.description && <strong>{props.description}</strong>}
			</div>
		</header>
	);
};
export default Navbar;
