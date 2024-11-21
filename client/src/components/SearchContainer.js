import React, { useState, useEffect } from 'react';

const SearchContainer = () => {
	const [specialtyQuery, setSpecialtyQuery] = useState('');
	const [doctorQuery, setDoctorQuery] = useState('');
	const [doctorSuggestions, setDoctorSuggestions] = useState([]);
	const [specialtySuggestions, setSpecialtySuggestions] = useState([]);
	const [region, setRegion] = useState(''); // Default region
	const [error, setError] = useState(''); // State to manage error messages
	const [debouncedSearch, setDebouncedSearch] = useState('');

	useEffect(() => {
		const handler = setTimeout(() => {
			setDebouncedSearch(specialtyQuery || doctorQuery);
		}, 500); // Delay in ms (500ms debounce)

		return () => {
			clearTimeout(handler); // Clean up previous timeout if inputs change
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
						{specialtyQuery && specialtySuggestions.length > 0 && (
							<ul className="suggestions-list">
								{specialtySuggestions.map((doctor) => (
									<li key={doctor.specialty}>{doctor.specialty}</li>
								))}
							</ul>
						)}
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
						{doctorQuery && doctorSuggestions.length > 0 && (
							<ul className="suggestions-list">
								{doctorSuggestions.map((doctor) => (
									<li key={doctor.name}>{doctor.name}</li>
								))}
							</ul>
						)}
					</div>
				</div>
			</div>
			{error && <p className="error-message">{error}</p>}
		</div>
	);
};

export default SearchContainer;
