// HospitalCard.js
import React from 'react';
import styles from '../styles/HospitalList.module.css';

const HospitalCard = ({name, doctors, address, emergency }) => (
	<div className={styles.hospitalCard}>
		<img
			src={`/images/Hospitals/${name}.jpeg` || '/images/default_hospital.jpeg'} // Fallback to a default image if no image_url is provided
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

export default HospitalCard;
