import React from 'react';

const DoctorCard = ({
	name,
	specialty,
	location,
	image,
	experience,
	degree,
}) => {
	return (
		<div className="doctor-card">
			<img src={image} alt={`Image of ${name}`} />
			<h2>{name}</h2>
			<div className="line">
				<span className="bold">Specialty:</span>{' '}
				<span className="non-bold">{specialty}</span>
			</div>
			<div className="line">
				<span className="bold">Location:</span>{' '}
				<span className="non-bold">{location}</span>
			</div>
			<div className="line">
				<span className="bold">Experience:</span>{' '}
				<span className="non-bold">{experience}</span>
			</div>
			<div className="line">
				<span className="bold">Degree:</span>{' '}
				<span className="non-bold">{degree}</span>
			</div>
		</div>
	);
};

export default DoctorCard;
