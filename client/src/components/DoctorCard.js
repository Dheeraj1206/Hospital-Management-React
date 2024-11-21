import React from 'react';

const DoctorCard = ({ name, specialty, location, image, experience }) => {
  return (
    <div className="doctor-card">
      <img src={image} alt={`Image of ${name}`} />
      <h2>{name}</h2>
      <p><strong>Specialty:</strong> {specialty}</p>
      <p><strong>Location:</strong> {location}</p>
      <p><strong>Experience:</strong> {experience}</p>
    </div>
  );
};

export default DoctorCard;