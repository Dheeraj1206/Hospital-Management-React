import React, { useState, useEffect } from 'react';
import DoctorCard from './DoctorCard';

const DoctorList = () => {
    const [doctors, setDoctors] = useState([]);

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const response = await fetch('http://localhost:3500/api/doctors');
                if (response.ok) {
                    const data = await response.json();
                    setDoctors(data);
                } else {
                    console.error('Failed to fetch doctors');
                }
            } catch (error) {
                console.error('Error fetching doctors:', error);
            }
        };

        fetchDoctors();
    }, []);

    return (
        <div className="doctor-list">
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
