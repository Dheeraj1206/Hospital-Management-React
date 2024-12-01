import React, { useState, useEffect } from 'react';
import styles from '../styles/FilterBar.module.css';

const HospitalSearch = ({
  city,
  hospitalName,
  doctorTypes,
  setCity,
  setHospitalName,
  setDoctorTypes,
  cityList,
  specialityData,
  hospitalData,
}) => {
  const handleCityChange = (e) => setCity(e.target.value);
  const handleHospitalNameChange = (e) => setHospitalName(e.target.value);
  const handleDoctorTypesChange = (e) => setDoctorTypes(e.target.value);

  return (
    <section className={styles.searchSection}>
      <div className={styles.searchContainer}>
        {/* City Dropdown */}
        <div className={styles.selectGroup}>
          <select value={city} onChange={handleCityChange} className={styles.dropdown}>
            <option value="">Select City</option>
            {cityList.map((cityItem) => (
              <option key={cityItem} value={cityItem}>
                {cityItem}
              </option>
            ))}
          </select>
        </div>

        {/* Hospital Name Dropdown */}
        <div className={styles.selectGroup}>
          <select
            value={hospitalName}
            onChange={handleHospitalNameChange}
            className={styles.dropdown}
          >
            <option value="">Select Hospital</option>
            {hospitalData.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
        </div>

        {/* Speciality Dropdown */}
        <div className={styles.selectGroup}>
          <select
            value={doctorTypes}
            onChange={handleDoctorTypesChange}
            className={styles.dropdown}
          >
            <option value="">Select Speciality</option>
            {specialityData.map((speciality) => (
              <option key={speciality} value={speciality}>
                {speciality}
              </option>
            ))}
          </select>
        </div>
      </div>
    </section>
  );
};

export default HospitalSearch;
