import React from 'react';
import { useParams } from 'react-router-dom';
import styles from '../styles/ProfilePage.module.css';

const DepartmentProfilePage = () => {
	const { departmentName } = useParams();

	return (
		<div>
			{/* Header Section */}
			<header className={styles.header}>
				<div className={styles['header-image']}>
					<img
						src={
							`/images/Department/${departmentName}.jpg` ||
							'/images/default_hospital.jpeg'
						}
						alt={`${departmentName} Department`}
					/>
				</div>
				<div className={styles['header-content']}>
					<h1>{departmentName} Department</h1>
					<p>Specialized Medical Care</p>
					<p>24/7 Emergency Services</p>
				</div>
			</header>

			{/* Profile Section */}
			<section className={styles.profile}>
				<div className={styles.container}>
					{/* Department Info */}
					<div className={styles['profile-info']}>
						<h2>Department Information</h2>
						<ul>
							<li>
								<strong>Department Name:</strong> {departmentName}
							</li>
							<li>
								<strong>Location:</strong> Main Hospital Building, Floor 2
							</li>
							<li>
								<strong>Contact Number:</strong> (123) 456-7890
							</li>
							<li>
								<strong>Email:</strong>{' '}
								{departmentName.toLowerCase().replace(/\s+/g, '')}@medline.com
							</li>
						</ul>
					</div>

					{/* Services */}
					<div className={styles['profile-education']}>
						<h2>Services Offered</h2>
						<ul>
							<li>Specialized Consultations</li>
							<li>Diagnostic Services</li>
							<li>Treatment Procedures</li>
							<li>Emergency Care</li>
							<li>Follow-up Care</li>
						</ul>
					</div>

					{/* Doctors */}
					<div className={styles['profile-certifications']}>
						<h2>Our Specialists</h2>
						<ul>
							<li>Dr. John Smith (Head of Department)</li>
							<li>Dr. Sarah Johnson</li>
							<li>Dr. Michael Brown</li>
							<li>Dr. Emily Davis</li>
							<li>Dr. Robert Wilson</li>
						</ul>
					</div>

					{/* Facilities */}
					<div className={styles['profile-experience']}>
						<h2>Department Facilities</h2>
						<ul>
							<li>Modern Examination Rooms</li>
							<li>Advanced Diagnostic Equipment</li>
							<li>Specialized Treatment Units</li>
							<li>24/7 Emergency Response</li>
							<li>Patient Recovery Rooms</li>
						</ul>
					</div>

					{/* Operating Hours */}
					<div className={styles['profile-services']}>
						<h2>Operating Hours</h2>
						<ul>
							<li>
								<strong>Regular Hours:</strong> 8:00 AM - 8:00 PM
							</li>
							<li>
								<strong>Emergency Services:</strong> 24/7
							</li>
							<li>
								<strong>Appointment Hours:</strong> 9:00 AM - 5:00 PM
							</li>
						</ul>
					</div>

					{/* Contact Button */}
					<div className={styles['booking-section']}>
						<h2>Book an Appointment</h2>
						<button className={styles['book-button']}>Book Now</button>
					</div>
				</div>
			</section>
		</div>
	);
};

export default DepartmentProfilePage;
