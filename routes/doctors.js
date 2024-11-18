const express = require('express');
const router = express.Router();
const Doctor = require('../models/doctor');

router.get('/doctors', async (req, res) => {
	const search = req.query.search || '';

	// Early return if no search term is provided
	// if (!search.trim()) {
	// 	return res.json([]); // Return empty array for no search term
	// }

	const { page = 1, limit = 10, sort = 'name' } = req.query;
	const skip = (page - 1) * limit;

	try {
		const search = req.query.search || ''; // Default to empty if no search query
		const doctors = await Doctor.find({
			$or: [
        { specialty: { $regex: search, $options: 'i' } },
        { name: { $regex: search, $options: 'i' } },
			],
		});

		res.json(doctors);
	} catch (error) {
		console.error(error); // Log error for debugging
		res.status(500).json({ message: 'Something went wrong' });
	}
});

module.exports = router;
