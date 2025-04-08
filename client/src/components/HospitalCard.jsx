// HospitalCard.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/HospitalList.module.css';

const HospitalCard = ({ name, doctors, address, emergency }) => {
	const navigate = useNavigate();

	const handleClick = () => {
		navigate(`/hospitals/${name}`);
	};

	return (
		<div
			className={styles.hospitalCard}
			onClick={handleClick}
			style={{ cursor: 'pointer' }}
		>
			<img
				src={
					`/images/Hospitals/${name}.jpeg` || '/images/default_hospital.jpeg'
				}
				alt={`${name} Logo`}
				className={styles.hospitalLogo}
			/>
			<div className={styles.hospitalDetails}>
				<h2>{name}</h2>
				<p>
					<strong>Types of Doctors:</strong> {doctors || 'Not available'}
				</p>
				<p>
					<strong>Number of Doctors:</strong>{' '}
					{doctors ? doctors.split(', ').length : 'N/A'}
				</p>
				<p>
					<strong>Address:</strong> {address || 'Address not available'}
				</p>
				<p>
					<strong>Emergency Number:</strong> {emergency || 'Not available'}
				</p>
			</div>
		</div>
	);
};

export default HospitalCard;
