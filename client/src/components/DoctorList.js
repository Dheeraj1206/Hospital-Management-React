import React, { useState, useEffect } from 'react';
import DoctorCard from './DoctorCard';
import styles from '../styles/DoctorList.module.css';

const DoctorList = () => {
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const response = await fetch('http://localhost:3500/api/doctors');
                if (response.ok) {
                    const data = await response.json();
                    setDoctors(data);
                } else {
                    setError('Failed to fetch doctors');
                }
            } catch (error) {
                setError('Error fetching doctors');
            } finally {
                setLoading(false);
            }
        };

        fetchDoctors();
    }, []);

    if (loading) {
        return <p>Loading doctors...</p>;
    }

    return (
        <div className={styles['doctor-list']}>
            {error && <p>{error}</p>}
            {doctors.length > 0 ? (
                doctors.map((doctor) => (
                    <DoctorCard
                        key={doctor._id+doctor.name}
                        name={doctor.name}
                        specialty={doctor.specialty}
                        location={doctor.location}
                        experience={doctor.experience}
                        image={doctor.image || '/images/default-doctor.png'}
                        degree={doctor.degree || '/images/default-doctor.png'}
                    />
                ))
            ) : (
                <p>No doctors available.</p>
            )}
        </div>
    );
};

export default DoctorList;
