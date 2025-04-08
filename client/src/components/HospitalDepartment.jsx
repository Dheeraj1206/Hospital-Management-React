import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/HospitalDepartment.module.css'; // Assuming typo in file name should be 'HospitalDepartment'

function Departments() {
	const [departments, setDepartments] = useState([]);
	const navigate = useNavigate();

	useEffect(() => {
		fetch('http://localhost:3500/departmentsApi/departments')
			.then((response) => response.json())
			.then((data) => {
				// Check if the data contains the "departments" field
				if (data && Array.isArray(data.departments)) {
					setDepartments(data.departments); // Set the departments array
				} else {
					console.error('Departments data not found or is not an array');
				}
			})
			.catch((error) => console.error('Error fetching data:', error));
	}, []);

	const handleDepartmentClick = (departmentTitle) => {
		navigate(`/departments/${departmentTitle}`);
	};

	return (
		<div>
			<header className={styles.header}>
				<h1>Our Hospital Departments</h1>
			</header>

			<main className={styles.departmentsGrid}>
				{/* Safe check for the departments state */}
				{departments.length > 0 ? (
					departments.map((department, index) => (
						<article
							key={department._id}
							className={styles.departmentCard}
							style={{ '--order': index + 1 }}
							onClick={() => handleDepartmentClick(department.title)}
						>
							<img
								src={
									`/images/Department/${department.title}.jpg` ||
									'/images/default_hospital.jpeg'
								} // Add a fallback image if needed
								alt={`${department.title} Department`}
								loading="lazy"
							/>
							<div className={styles.cardContent}>
								<h2>{department.title}</h2>
								<p>{department.description}</p>
								<button
									className={styles.learnMoreBtn}
									onClick={(e) => {
										e.stopPropagation();
										handleDepartmentClick(department.title);
									}}
								>
									Learn More
								</button>
							</div>
						</article>
					))
				) : (
					<p>No departments available.</p>
				)}
			</main>
		</div>
	);
}

export default Departments;
