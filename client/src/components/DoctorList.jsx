import React, { useState, useEffect } from 'react';
import DoctorCard from './DoctorCard';
import styles from '../styles/DoctorList.module.css';

const DoctorList = () => {
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    
    const pageSize = 28;

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const response = await fetch(`http://localhost:3500/doctorsApi/doctors?page=${currentPage}&limit=${pageSize}`);
                if (response.ok) {
                    const data = await response.json();
                    setDoctors(data.doctors || []);
                    setTotalPages(data.totalPages || 1);
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
    }, [currentPage]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [currentPage]);

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(prevPage => prevPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(prevPage => prevPage - 1);
        }
    };

    if (loading) {
        return <p>Loading doctors...</p>;
    }

    return (
        <div className={styles['doctor-list']}>
            {error && <p>{error}</p>}
            {doctors && doctors.length > 0 ? (
                doctors.map((doctor) => (
                    <DoctorCard
                        key={doctor._id + doctor.name}
                        name={doctor.name}
                        specialty={doctor.specialty}
                        location={doctor.location}
                        experience={doctor.experience}
                        degree={doctor.degree || '/images/default-doctor.png'}
                        gender={doctor.gender}
                    />
                ))
            ) : (
                <p>No doctors available.</p>
            )}
            {totalPages > 1 && (
                <div className={styles.pagination}>
                    <button onClick={handlePrevPage} disabled={currentPage === 1}>Previous</button>
                    <span>Page {currentPage} of {totalPages}</span>
                    <button onClick={handleNextPage} disabled={currentPage === totalPages}>Next</button>
                </div>
            )}
        </div>
    );
};

export default DoctorList;
