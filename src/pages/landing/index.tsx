import React from 'react';
import { Link } from 'react-router-dom';

import logoImg from '../../assets/images/log8.png';
import landingImg from '../../assets/images/landing.svg';
import studyIcon from '../../assets/images/icons/study.svg';
import giveClassesIcon from '../../assets/images/icons/give-classes.svg';

import './styles.css';

function Landing() {
	return (
		<div id='page-landing'>
			<div id='page-landing-content' className='container'>
				<div className='logo-container'>
					<img src={logoImg} alt='Proffy' />
					<h2>Sua plataforma para se aplicar para vagas</h2>
				</div>
				<img src={landingImg} alt='Plataforma de estudos' className='hero' />

				<div className='buttons-container'>
					<Link to='/login' className='study'>
						<img src={studyIcon} alt='Estudar' />
						Já tenho acesso.
					</Link>

					<Link to='/cadastro/candidato' className='give-classes'>
						<img src={giveClassesIcon} alt='Dar aulas' />
						Quero me cadastrar.
					</Link>
				</div>
			</div>
		</div>
	);
}

export default Landing;
