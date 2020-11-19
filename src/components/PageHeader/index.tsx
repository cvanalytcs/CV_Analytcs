import React from 'react';

import { Link, useHistory } from 'react-router-dom';
import backIcon from '../../assets/images/icons/back.svg';

import './styles.css';

interface pageHeaderProps {
	title: string;
	description?: string;
}

const PageHeader: React.FC<pageHeaderProps> = props => {
	let history = useHistory();

	function handleClick(e) {
		history.goBack();
	}

	return (
		<header className='page-header'>
			<div className='top-bar-container'>
				<div onClick={handleClick}>
					<img src={backIcon} alt='Voltar' />
				</div>
			</div>
			<div className='header-content'>
				<strong>{props.title}</strong>
				{props.description && <p>{props.description}</p>}

				{props.children}
			</div>
		</header>
	);
};

export default PageHeader;
