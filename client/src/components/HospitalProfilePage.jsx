import React from 'react';
import { useParams } from 'react-router-dom';
import styles from '../styles/ProfilePage.module.css';

const HospitalProfilePage = () => {
	const { hospitalName } = useParams();

	return (
		<div>
			{/* Header Section */}
			<header className={styles.header}>
				<div className={styles['header-image']}>
					<img
						src={
							`/images/Hospitals/${hospitalName}.jpeg` ||
							'/images/default_hospital.jpeg'
						}
						alt={`${hospitalName} Logo`}
					/>
				</div>
				<div className={styles['header-content']}>
					<h1>{hospitalName}</h1>
					<p>Multi-Specialty Hospital</p>
					<p>Established 1995</p>
				</div>
			</header>

			{/* Profile Section */}
			<section className={styles.profile}>
				<div className={styles.container}>
					{/* Hospital Info */}
					<div className={styles['profile-info']}>
						<h2>Hospital Information</h2>
						<ul>
							<li>
								<strong>Hospital Name:</strong> {hospitalName}
							</li>
							<li>
								<strong>Location:</strong> City Center, Main Road
							</li>
							<li>
								<strong>Contact Number:</strong> (123) 456-7890
							</li>
							<li>
								<strong>Email:</strong> info@
								{hospitalName.toLowerCase().replace(/\s+/g, '')}.com
							</li>
							<li>
								<strong>Website:</strong> www.
								{hospitalName.toLowerCase().replace(/\s+/g, '')}.com
							</li>
						</ul>
					</div>

					{/* Facilities */}
					<div className={styles['profile-education']}>
						<h2>Facilities</h2>
						<ul>
							<li>24/7 Emergency Services</li>
							<li>Advanced ICU Units</li>
							<li>Modern Operation Theaters</li>
							<li>Pharmacy</li>
							<li>Ambulance Services</li>
							<li>Diagnostic Center</li>
							<li>Blood Bank</li>
							<li>Cafeteria</li>
						</ul>
					</div>

					{/* Departments */}
					<div className={styles['profile-certifications']}>
						<h2>Departments</h2>
						<ul>
							<li>Cardiology</li>
							<li>Neurology</li>
							<li>Orthopedics</li>
							<li>Pediatrics</li>
							<li>Gynecology</li>
							<li>Dermatology</li>
							<li>ENT</li>
							<li>General Medicine</li>
						</ul>
					</div>

					{/* Statistics */}
					<div className={styles['profile-experience']}>
						<h2>Hospital Statistics</h2>
						<ul>
							<li>
								<strong>Total Beds:</strong> 250
							</li>
							<li>
								<strong>ICU Beds:</strong> 50
							</li>
							<li>
								<strong>Operation Theaters:</strong> 10
							</li>
							<li>
								<strong>Doctors:</strong> 100+
							</li>
							<li>
								<strong>Nurses:</strong> 200+
							</li>
							<li>
								<strong>Annual Patients:</strong> 50,000+
							</li>
						</ul>
					</div>

					{/* Visiting Hours */}
					<div className={styles['profile-services']}>
						<h2>Visiting Hours</h2>
						<ul>
							<li>
								<strong>General Visiting Hours:</strong> 10:00 AM - 8:00 PM
							</li>
							<li>
								<strong>ICU Visiting Hours:</strong> 11:00 AM - 12:00 PM, 5:00
								PM - 6:00 PM
							</li>
							<li>
								<strong>Emergency Services:</strong> 24/7
							</li>
						</ul>
					</div>

					{/* Insurance */}
					<div className={styles['profile-testimonials']}>
						<h2>Insurance & Payment</h2>
						<ul>
							<li>
								<strong>Insurance Accepted:</strong> Yes
							</li>
							<li>
								<strong>Major Insurance Providers:</strong> Blue Cross, Aetna,
								United Healthcare
							</li>
							<li>
								<strong>Payment Methods:</strong> Cash, Credit Card, Insurance,
								EMI
							</li>
						</ul>
					</div>

					{/* Contact Button */}
					<div className={styles['booking-section']}>
						<h2>Contact Us</h2>
						<button className={styles['book-button']}>Contact Hospital</button>
					</div>
				</div>
			</section>
		</div>
	);
};

export default HospitalProfilePage;
