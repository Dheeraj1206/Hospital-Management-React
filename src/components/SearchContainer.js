import React, { useState } from 'react';

const SearchContainer = () => {
	const [query, setQuery] = useState('');
	const [suggestions, setSuggestions] = useState([]);
	const [error, setError] = useState('');

	const fetchSuggestions = async (searchText) => {
		if (!searchText) {
			setSuggestions([]);
			setError(''); // Clear error on empty input
			return;
		}
		try {
			const response = await fetch(
				`http://localhost:3500/api/doctors?search=${searchText}`
			);
			if (!response.ok) {
				console.error('Failed to fetch suggestions, Status:', response.status);
				setError('Failed to fetch doctor suggestions. Please try again.');
				return;
			}
			const contentType = response.headers.get('content-type');
			if (contentType && contentType.includes('application/json')) {
				const data = await response.json();
				setSuggestions(data);
				setError(''); // Clear error on success
			} else {
				console.error('Expected JSON but got:', contentType);
				setError('Unexpected response format. Please contact support.');
			}
		} catch (error) {
			console.error('Error fetching suggestions:', error);
			setError('An error occurred while fetching suggestions.');
		}
	};

	const handleInputChange = (e) => {
		const searchText = e.target.value;
		setQuery(searchText);
		fetchSuggestions(searchText);
	};

	return (
		<div className="search-container">
			<h2>Find a Doctor</h2>
			<p>Search doctors by specialty, condition, or doctor's name</p>
			<div className="search-box">
				<select>
					<option value="Bangalore">Bangalore</option>
					<option value="Mumbai">Mumbai</option>
					<option value="Chennai">Chennai</option>
				</select>
				<input
					type="text"
					placeholder="Search by specialty or doctor's name"
					value={query}
					onChange={handleInputChange}
				/>
				<button>Search</button>
			</div>
			{suggestions.length > 0 && (
				<ul className="suggestions-list">
					{suggestions.map((doctor) => (
						<li key={doctor.id}>
							{doctor.name} - {doctor.specialty}
						</li>
					))}
				</ul>
			)}
		</div>
	);
};

export default SearchContainer;
