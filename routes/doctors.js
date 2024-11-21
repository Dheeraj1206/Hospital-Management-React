const express = require('express');
const router = express.Router();
const Doctor = require('../models/doctor');

router.get('/doctors', async (req, res) => {
	const searchDoctor = req.query.searchDoctor || '';
	const searchSpeciality = req.query.searchSpeciality || '';
	const region = req.query.region || '';

	// Early return if no search term is provided
	// if (!search.trim()) {
	// 	return res.json([]); // Return empty array for no search term
	// }

	const { page = 1, limit = 10, sort = 'name' } = req.query;
	const skip = (page - 1) * limit;

	try {
		const searchDoctor = req.query.searchDoctor || '';
		const searchSpeciality = req.query.searchSpeciality || '';
		const doctors = await Doctor.find({
			$and: [
				{ specialty: { $regex: searchSpeciality, $options: 'i' } },
				{ name: { $regex: searchDoctor, $options: 'i' } },
				{ location: { $regex: region, $options: 'i' } },
			],
		});
		res.json(doctors);
	} catch (error) {
		console.error(error); // Log error for debugging
		res.status(500).json({ message: 'Something went wrong' });
	}
});

module.exports = router;
