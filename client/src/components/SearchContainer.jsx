import React, { useState, useEffect } from 'react';
import styles from '../styles/SearchContainer.module.css';

const SearchContainer = () => {
	const [specialtyQuery, setSpecialtyQuery] = useState('');
	const [doctorQuery, setDoctorQuery] = useState('');
	const [doctorSuggestions, setDoctorSuggestions] = useState([]);
	const [specialtySuggestions, setSpecialtySuggestions] = useState([]);
	const [region, setRegion] = useState('');
	const [error, setError] = useState('');
	const [debouncedSearch, setDebouncedSearch] = useState('');
	const [isSuggestionClicked, setIsSuggestionClicked] = useState(false);
	const [specialtyFound, setSpecialtyFound] = useState(false);
	const [doctorFound, setDoctorFound] = useState(false);

	useEffect(() => {
		setError('');
		const handler = setTimeout(() => {
			setDebouncedSearch(specialtyQuery || doctorQuery);
		}, 500);

		return () => {
			clearTimeout(handler);
		};
	}, [specialtyQuery, doctorQuery]);

	useEffect(() => {
		if (!debouncedSearch) {
			console.log('Debounce triggered');
			setDoctorSuggestions([]);
			setSpecialtySuggestions([]);
			setError('');
			return;
		}
		if (!isSuggestionClicked) {
			const fetchSuggestions = async () => {
                console.log('FetchSuggestion triggered');
                try {
                  const response = await fetch(
                    `http://localhost:3500/doctorsApi/doctors?searchSpeciality=${specialtyQuery}&searchDoctor=${doctorQuery}&region=${region}`
                  );
                  if (!response.ok) {
                    console.error('Failed to fetch suggestions, Status:', response.status);
                    setError('Failed to fetch doctor suggestions. Please try again.');
                    return;
                  }
                  const contentType = response.headers.get('content-type');
                  let data = await response.json();
              
                  // Now data is an object with a 'doctors' key, so access that key
                  if (data && Array.isArray(data.doctors)) {
                    const doctors = data.doctors.filter((doctor) => doctor.name);
                    const specialties = data.doctors.filter((doctor) => doctor.specialty);
                    setDoctorSuggestions(doctors);
                    setSpecialtySuggestions(specialties);
                  } else {
                    console.error('Expected an array inside "doctors", but got:', data);
                    setError('Unexpected data format received from the server.');
                  }
                  setError('');
                } catch (error) {
                  console.error('Error fetching suggestions:', error);
                  setError('An error occurred while fetching suggestions.');
                }
              };
              

			fetchSuggestions();
		}
		setTimeout(() => {
			setIsSuggestionClicked(false);
		}, 600);
	}, [debouncedSearch, region, specialtyQuery, doctorQuery]);

	const handleSpecialtyInputChange = (e) => {
		const searchText = e.target.value;
		setSpecialtyQuery(searchText);
		setSpecialtyFound(false);
	};

	const handleDoctorInputChange = (e) => {
		const searchText = e.target.value;
		setDoctorQuery(searchText);
		setDoctorFound(false);
	};

	const handleRegionChange = (e) => {
		setRegion(e.target.value);
	};

	const handleSpecialtyClick = (specialty) => {
		setSpecialtyQuery(specialty);
		setSpecialtySuggestions([]);
		setIsSuggestionClicked(true);
		setSpecialtyFound(true);
	};

	const handleDoctorClick = (doctorName) => {
		setDoctorQuery(doctorName);
		setDoctorSuggestions([]);
		setIsSuggestionClicked(true);
		setDoctorFound(true);
	};

	return (
		<div className={styles['search-container']}>
			{' '}
			{/* Apply styles from the CSS module */}
			<h2>Find a Doctor</h2>
			<p>Search doctors by specialty, condition, or doctor's name</p>
			<div className={styles['search-box']}>
				{' '}
				{/* Apply styles from the CSS module */}
				<select value={region} onChange={handleRegionChange}>
					<option value="">All</option>
					<option value="Bangalore">Bangalore</option>
					<option value="Mumbai">Mumbai</option>
					<option value="Chennai">Chennai</option>
					<option value="Delhi">Delhi</option>
				</select>
				<div>
					<input
						type="text"
						placeholder="Search by specialty"
						value={specialtyQuery}
						onChange={handleSpecialtyInputChange}
					/>
					<div className={styles['suggestion-box']}>
						{' '}
						{/* Apply styles from the CSS module */}
						{specialtyQuery &&
						specialtySuggestions.length > 0 &&
						!specialtyFound ? (
							<ul className={styles['suggestions-list']}>
								{' '}
								{/* Apply styles from the CSS module */}
								{specialtySuggestions.map((doctor) => (
									<li
										key={doctor.specialty}
										onClick={() => handleSpecialtyClick(doctor.specialty)}
									>
										{doctor.specialty}
									</li>
								))}
							</ul>
						) : specialtyQuery &&
						  specialtySuggestions.length === 0 &&
						  !specialtyFound ? (
							<p>No Specialty found</p>
						) : null}
					</div>
				</div>
				<div>
					<input
						type="text"
						placeholder="Search by doctor's name"
						value={doctorQuery}
						onChange={handleDoctorInputChange}
					/>
					<div className={styles['suggestion-box']}>
						{' '}
						{/* Apply styles from the CSS module */}
						{doctorQuery && doctorSuggestions.length > 0 && !doctorFound ? (
							<ul className={styles['suggestions-list']}>
								{' '}
								{/* Apply styles from the CSS module */}
								{doctorSuggestions.map((doctor) => (
									<li
										key={doctor.name}
										onClick={() => handleDoctorClick(doctor.name)}
									>
										{doctor.name}
									</li>
								))}
							</ul>
						) : doctorQuery &&
						  doctorSuggestions.length === 0 &&
						  !doctorFound ? (
							<p>No doctors found</p>
						) : null}
					</div>
				</div>
			</div>
			{error && <p className={styles['error-message']}>{error}</p>}{' '}
			{/* Apply styles from the CSS module */}
		</div>
	);
};

export default SearchContainer;
