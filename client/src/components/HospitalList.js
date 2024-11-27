import React from 'react';
import styles from '../styles/HospitalList.module.css';

const HospitalCard = ({ image, name, doctors, address, emergency }) => (
  <div className={styles.hospitalCard}>
    <img src={image} alt={`${name} Logo`} className={styles.hospitalLogo} />
    <div className={styles.hospitalDetails}>
      <h2>{name}</h2>
      <p>
        <strong>Types of Doctors:</strong> {doctors}
      </p>
      <p>
        <strong>Number of Doctors:</strong> {doctors.split(', ').length}
      </p>
      <p>
        <strong>Address:</strong> {address}
      </p>
      <p>
        <strong>Emergency Number:</strong> {emergency}
      </p>
    </div>
  </div>
);

const HospitalList = () => {
  const hospitals = [
    {
      image: '/images/Hospitals/1st.jpeg',
      name: 'Hospital 1',
      doctors:
        'Cardiologists, Neurologists, Surgeons, Endocrinologists, Psychiatrists',
      address: '123 Main St, Bangalore',
      emergency: '+91 123 456 7890',
    },
    {
      image: '/images/Hospitals/2nd.jpeg',
      name: 'Hospital 2',
      doctors:
        'Pediatricians, Dermatologists, Orthopedic Surgeons, Cardiologists, Psychiatrists',
      address: '456 Elm St, Mumbai',
      emergency: '+91 987 654 3210',
    },
    // Add more hospitals here...
  ];

  return (
    <section className={styles.hospitalSection}>
      <div className={styles.hospitalList}>
        {hospitals.map((hospital, index) => (
          <HospitalCard key={index} {...hospital} />
        ))}
      </div>
    </section>
  );
};

export default HospitalList;
