const express = require('express');
const router = express.Router();
const Hospital = require('../models/hospital');

router.get('/hospitals', async (req, res) => {
	const hospitalName = req.query.hospitalName || '';
	const doctorTypes = req.query.doctorTypes || '';
	const doctorNumber = req.query.doctorNumber || '';
	const address = req.query.address || '';
	const city = req.query.city || '';
	const hospitalEmergencyNumber = req.query.hospitalEmergencyNumber || '';
	const imageUrl = req.query.imageUrl || '';

	// Construct query object dynamically based on provided search fields
	const query = {};

	if (city) {
		query.location = { $regex: city, $options: 'i' };
	}
	if (hospitalName) {
		query.hospital_name = { $regex: hospitalName, $options: 'i' };
	}
	if (doctorTypes) {
		query.doctor_types = { $in: doctorTypes.split(',') };
	}
	if (doctorNumber) {
		query.number_of_doctors = Number(doctorNumber);
	}
	if (address) {
		query.address = { $regex: address, $options: 'i' };
	}
	if (hospitalEmergencyNumber) {
		query.emergency_number = { $regex: hospitalEmergencyNumber, $options: 'i' };
	}
	if (imageUrl) {
		query.image_url = { $regex: imageUrl, $options: 'i' };
	}

	try {
		// Query the database with the dynamically built query object
		const hospitals = await Hospital.find(query);

		res.json(hospitals);
	} catch (error) {
		console.error(error); // Log error for debugging
		res.status(500).json({ message: 'Something went wrong' });
	}
});

module.exports = router;
