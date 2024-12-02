// HospitalList.js
import React, { useState, useEffect } from 'react';
import styles from '../styles/HospitalList.module.css';
import HospitalCard from './HospitalCard'; // Import HospitalCard component

const HospitalList = ({ city, hospitalName, doctorTypes }) => {
	const [hospitalData, setHospitalData] = useState([]);
	const [filteredData, setFilteredData] = useState([]);
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchHospitalData = async () => {
			setLoading(true);
			try {
				// Build the query string dynamically based on the filters
				let query = '';
				if (city) query += `city=${city}&`;
				if (hospitalName) query += `hospitalName=${hospitalName}&`;
				if (doctorTypes) query += `doctorTypes=${doctorTypes}&`;

				// Strip off the trailing '&' if present
				if (query.endsWith('&')) query = query.slice(0, -1);

				const response = await fetch(
					`http://localhost:3500/hospitalsApi/hospitals?${query}`
				);
				if (response.ok) {
					const data = await response.json();
					setHospitalData(data);
					setFilteredData(data); // Set the initial filtered data as the full dataset
					setError('');
				} else {
					setError('Failed to fetch hospital data.');
				}
			} catch (error) {
				setError('Error fetching hospital data.');
			} finally {
				setLoading(false);
			}
		};

		fetchHospitalData();
	}, [city, hospitalName, doctorTypes]);

	useEffect(() => {
		// Filter the data based on the selected filters (client-side filtering)
		const applyFilters = () => {
			let filtered = [...hospitalData];

			if (city) {
				filtered = filtered.filter((hospital) => hospital.location === city);
			}
			if (hospitalName) {
				filtered = filtered.filter((hospital) =>
					hospital.hospital_name
						.toLowerCase()
						.includes(hospitalName.toLowerCase())
				);
			}
			if (doctorTypes) {
				filtered = filtered.filter((hospital) =>
					hospital.doctor_types.some((type) =>
						type.toLowerCase().includes(doctorTypes.toLowerCase())
					)
				);
			}

			setFilteredData(filtered);
		};

		applyFilters();
	}, [city, hospitalName, doctorTypes, hospitalData]);

	return (
		<section className={styles.hospitalSection}>
			<div className={styles.hospitalList}>
				{loading && <p>Loading hospitals...</p>}
				{error && <p className={styles.error}>{error}</p>}
				{filteredData.length > 0
					? filteredData.map((hospital, index) => (
							<HospitalCard
								key={index}
								name={hospital.hospital_name}
								doctors={hospital.doctor_types.join(', ')}
								address={hospital.address}
								emergency={hospital.emergency_number}
							/>
					  ))
					: !loading && <p>No hospitals found based on your filters.</p>}
			</div>
		</section>
	);
};

export default HospitalList;
