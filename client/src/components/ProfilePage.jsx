import React, { useState, useEffect } from 'react';
import styles from '../styles/ProfilePage.module.css'; // Import the CSS module

import { useParams } from 'react-router-dom';

const ProfilePage = () => {
	const { doctorName } = useParams(); // Extract doctor name from URL
	const [doctorData, setDoctorData] = useState(null); // State to store fetched doctor data
	const [error, setError] = useState(''); // State for error handling

	useEffect(() => {
		const fetchDoctorProfile = async () => {
			try {
				const response = await fetch(
					`http://localhost:3500/doctorsApi/doctors?searchDoctor=${doctorName}`
				);

				if (!response.ok) {
					throw new Error('Failed to fetch doctor profile');
				}

				const data = await response.json();
				console.log(doctorName);
				console.log(data.doctors);
				// Search for the doctor based on the extracted name
				const doctor = data.doctors?.find((doc) => doc.name === doctorName);

				if (doctor) {
					setDoctorData(doctor); // Set the doctor data if found
				} else {
					setError('Doctor not found'); // Handle if no matching doctor is found
				}
			} catch (error) {
				setError(error.message); // Set error message in case of a fetch error
			}
		};

		fetchDoctorProfile();
	}, [doctorName]); // Re-fetch data if doctorName changes

	if (error) {
		return <div className={styles['error-message']}>{error}</div>;
	}

	if (!doctorData) {
		return <div>Loading...</div>; // Show loading message while fetching data
	}

	return (
		<div>
			{/* Header Section */}
			<header className={styles.header}>
				<div className={styles.container}>
					<h1>Dr. {doctorData.name}</h1>
					<h1>{doctorData.degree}</h1>
					<p>Board Certified {doctorData.specialty}</p>
				</div>
			</header>

			{/* Profile Section */}
			<section className={styles.profile}>
				<div className={styles.container}>
					<div className={styles['profile-info']}>
						<h2>Personal Information</h2>
						<ul>
							<li>
								<strong>Full Name:</strong> Dr. {doctorData.name}
							</li>
							<li>
								<strong>Specialization:</strong> {doctorData.specialty}
							</li>
							<li>
								<strong>Languages Spoken:</strong> English, Hindi
							</li>
							<li>
								<strong>Phone:</strong> (123) 456-7890
							</li>
							<li>
								<strong>Email:</strong>{' '}
								<a
									href="https://mail.google.com/mail/?view=cm&fs=1&to=dr.{doctorData.name.toLowerCase().replace(/\s+/g, '')}@medline.com"
									target="_blank"
								>
									dr.{doctorData.name.toLowerCase().replace(/\s+/g, '')}
									@medline.com
								</a>
							</li>
							<li>
								<strong>Website:</strong>{' '}
								<a href="/">
									www.medline.com
								</a>
							</li>
						</ul>
					</div>

					<div className={styles['profile-education']}>
						<h2>Education</h2>
						<ul>
							<li>
								<strong>M.D.,</strong> Stanford University School of Medicine,
								2005
							</li>
							<li>
								<strong>B.S. in Biology,</strong> University of California, Los
								Angeles, 2001
							</li>
						</ul>
					</div>

					<div className={styles['profile-certifications']}>
						<h2>Certifications & Licensure</h2>
						<ul>
							<li>
								Board Certified, American Board of Internal Medicine
								(Cardiology)
							</li>
							<li>State Medical License, California Medical Board</li>
							<li>
								Advanced Cardiovascular Life Support (ACLS), Certified since
								2007
							</li>
							<li>Basic Life Support (BLS), Certified since 2006</li>
						</ul>
					</div>

					<div className={styles['profile-experience']}>
						<h2>Professional Experience</h2>
						<p>
							<strong>Cardiologist - Medline</strong>
							<br />
							San Francisco, CA | January 2010 – Present
						</p>
						<p>
							<strong>
								Resident, Cardiology Department - California Medical Center
							</strong>
							<br />
							Los Angeles, CA | July 2005 – June 2010
						</p>
					</div>

					<div className={styles['profile-services']}>
						<h2>Services Offered</h2>
						<ul>
							<li>Cardiac Consultations</li>
							<li>Stress Testing & Imaging</li>
							<li>Echocardiograms</li>
						</ul>
					</div>

					<div className={styles['profile-testimonials']}>
						<h2>Patient Testimonials</h2>
						<blockquote>
							<p>
								"Dr. Smith took the time to explain my condition thoroughly and
								made sure I was comfortable with the treatment plan. He
								genuinely cares about his patients and goes above and beyond in
								providing excellent care." – Emily R.
							</p>
						</blockquote>
						<blockquote>
							<p>
								"After struggling with heart issues for years, Dr. Smith helped
								me understand my diagnosis and provided a clear, practical path
								to recovery. I feel like I'm in the best hands possible!" –
								Michael W.
							</p>
						</blockquote>
					</div>
				</div>
			</section>
		</div>
	);
};

export default ProfilePage;
