import React, { useState, useEffect } from 'react';
import '../styles/SearchContainer.css';

const SearchContainer = () => {
	const [specialtyQuery, setSpecialtyQuery] = useState('');
	const [doctorQuery, setDoctorQuery] = useState('');
	const [doctorSuggestions, setDoctorSuggestions] = useState([]);
	const [specialtySuggestions, setSpecialtySuggestions] = useState([]);
	const [region, setRegion] = useState('');
	const [error, setError] = useState('');
	const [debouncedSearch, setDebouncedSearch] = useState('');

	useEffect(() => {
		const handler = setTimeout(() => {
			setDebouncedSearch(specialtyQuery || doctorQuery);
		}, 500);

		return () => {
			clearTimeout(handler);
		};
	}, [specialtyQuery, doctorQuery]);

	useEffect(() => {
		if (!debouncedSearch) {
			setDoctorSuggestions([]);
			setSpecialtySuggestions([]);
			setError('');
			return;
		}

		const fetchSuggestions = async () => {
			try {
				const response = await fetch(
					`http://localhost:3500/api/doctors?searchSpeciality=${specialtyQuery}&searchDoctor=${doctorQuery}&region=${region}`
				);
				if (!response.ok) {
					console.error(
						'Failed to fetch suggestions, Status:',
						response.status
					);
					setError('Failed to fetch doctor suggestions. Please try again.');
					return;
				}
				const contentType = response.headers.get('content-type');
				const data = await response.json();
				const doctors = data.filter((doctor) => doctor.name);
				const specialties = data.filter((doctor) => doctor.specialty);
				setDoctorSuggestions(doctors);
				setSpecialtySuggestions(specialties);
				setError('');
			} catch (error) {
				console.error('Error fetching suggestions:', error);
				setError('An error occurred while fetching suggestions.');
			}
		};

		fetchSuggestions();
	}, [debouncedSearch, region, specialtyQuery, doctorQuery]);

	const handleSpecialtyInputChange = (e) => {
		const searchText = e.target.value;
		setSpecialtyQuery(searchText);
	};

	const handleDoctorInputChange = (e) => {
		const searchText = e.target.value;
		setDoctorQuery(searchText);
	};

	const handleRegionChange = (e) => {
		setRegion(e.target.value);
	};

	const handleSpecialtyClick = (specialty) => {
		setSpecialtyQuery(specialty); // Fill the input with the clicked specialty
		setSpecialtySuggestions([]); // Clear suggestions after selection
		setDebouncedSearch(''); // Reset debounced search to stop further fetching
	};

	const handleDoctorClick = (doctorName) => {
		setDoctorQuery(doctorName); // Fill the input with the clicked doctor's name
		setDoctorSuggestions([]); // Clear suggestions after selection
	};

	return (
		<div className="search-container">
			<h2>Find a Doctor</h2>
			<p>Search doctors by specialty, condition, or doctor's name</p>
			<div className="search-box">
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
					<div className="suggestion-box">
						{specialtyQuery && specialtySuggestions.length > 0 ? (
							<ul className="suggestions-list">
								{specialtySuggestions.map((doctor) => (
									<li
										key={doctor.specialty}
										onClick={() => handleDoctorClick(doctor.specialty)}
									>
										{doctor.specialty}
									</li>
								))}
							</ul>
						) : specialtyQuery && specialtySuggestions.length === 0 ? (
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
					<div className="suggestion-box">
						{doctorQuery && doctorSuggestions.length > 0 ? (
							<ul className="suggestions-list">
								{doctorSuggestions.map((doctor) => (
									<li
										key={doctor.name}
										onClick={() => handleDoctorClick(doctor.name)}
									>
										{doctor.name}
									</li>
								))}
							</ul>
						) : doctorQuery && doctorSuggestions.length === 0 ? (
							<p>No doctors found</p>
						) : null}
					</div>
				</div>
			</div>
			{error && <p className="error-message">{error}</p>}
		</div>
	);
};

export default SearchContainer;
