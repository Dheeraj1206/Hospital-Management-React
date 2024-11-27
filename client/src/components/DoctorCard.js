import React from 'react';
import styles from '../styles/DoctorsCard.module.css'; // Importing styles as a CSS module

const DoctorCard = ({
    name,
    specialty,
    location,
    image,
    experience,
    degree,
}) => {
    return (
        <div className={styles['doctor-card']}> {/* Using the CSS module class */}
            <img src={image} alt={`Image of ${name}`} />
            <h2>{name}</h2>
            <div className={styles.line}> {/* Applying styles from the module */}
                <span className={styles.bold}>Specialty:</span>{' '}
                <span className={styles['non-bold']}>{specialty}</span>
            </div>
            <div className={styles.line}>
                <span className={styles.bold}>Location:</span>{' '}
                <span className={styles['non-bold']}>{location}</span>
            </div>
            <div className={styles.line}>
                <span className={styles.bold}>Experience:</span>{' '}
                <span className={styles['non-bold']}>{experience}</span>
            </div>
            <div className={styles.line}>
                <span className={styles.bold}>Degree:</span>{' '}
                <span className={styles['non-bold']}>{degree}</span>
            </div>
            <button className={styles['book-appointment-btn']}>Book Appointment</button> {/* Applying button class from the module */}
        </div>
    );
};

export default DoctorCard;
