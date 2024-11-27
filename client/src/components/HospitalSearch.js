import React, { useState } from 'react';
import styles from '../styles/HospitalSearch.module.css'


const HospitalSearch = () => {
  const [hospital, setHospital] = useState('');
  const [speciality, setSpeciality] = useState('');
  const [experience, setExperience] = useState('');
  const [doctor, setDoctor] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    console.log({ hospital, speciality, experience, doctor });
  };

  return (
    <section className={styles.searchSection}>
      <div className={styles.searchContainer}>
        <div className={styles.selectGroup}>
          <i className="fas fa-hospital"></i>
          <select value={hospital} onChange={(e) => setHospital(e.target.value)}>
            <option value="">Select Hospital</option>
            <option value="apollo">Apollo Hospital</option>
            <option value="fortis">Fortis Healthcare</option>
            <option value="max">Max Healthcare</option>
            <option value="medanta">Medanta</option>
            <option value="aiims">AIIMS</option>
          </select>
        </div>

        <div className={styles.selectGroup}>
          <i className="fas fa-user-md"></i>
          <select value={speciality} onChange={(e) => setSpeciality(e.target.value)}>
            <option value="">Select Speciality</option>
            <option value="cardiology">Cardiology</option>
            <option value="neurology">Neurology</option>
            <option value="orthopedics">Orthopedics</option>
            <option value="pediatrics">Pediatrics</option>
            <option value="oncology">Oncology</option>
          </select>
        </div>

        <div className={styles.selectGroup}>
          <i className="fas fa-briefcase"></i>
          <select value={experience} onChange={(e) => setExperience(e.target.value)}>
            <option value="">Select Experience</option>
            <option value="5">5 Years</option>
            <option value="10">10 Years</option>
            <option value="15">15 Years</option>
          </select>
        </div>

        <div className={styles.selectGroup}>
          <i className="fas fa-user"></i>
          <select value={doctor} onChange={(e) => setDoctor(e.target.value)}>
            <option value="">Select Doctor</option>
            <option value="dr-smith">Dr. Smith</option>
            <option value="dr-jones">Dr. Jones</option>
            <option value="dr-williams">Dr. Williams</option>
          </select>
        </div>

        <button type="submit" className={styles.searchButton} onClick={handleSearch}>
          <i className="fas fa-search"></i> SEARCH
        </button>
      </div>
    </section>
  );
};

export default HospitalSearch;
