const express = require('express');
const router = express.Router();
const Doctor = require('../models/doctor');

router.get('/doctors', async (req, res) => {
  const searchDoctor = req.query.searchDoctor || '';
  const searchSpeciality = req.query.searchSpeciality || '';
  const region = req.query.region || '';

  // Pagination settings
  const { page = 1, limit = 28, sort = 'name' } = req.query;
  const skip = (page - 1) * limit;

  // Construct query object dynamically based on provided search fields
  const query = {};

  if (searchDoctor) {
    query.name = { $regex: searchDoctor, $options: 'i' };
  }
  if (searchSpeciality) {
    query.specialty = { $regex: searchSpeciality, $options: 'i' };
  }
  if (region) {
    query.location = { $regex: region, $options: 'i' };
  }

  try {
    // Query the database for the total number of doctors matching the query (for pagination)
    const totalDoctors = await Doctor.countDocuments(query);

    // Query the database for the paginated doctors data
    const doctors = await Doctor.find(query)
      .skip(skip) // Apply skip for pagination
      .limit(Number(limit)) // Limit results based on the provided limit
      .sort(sort); // Sort the results based on the 'sort' parameter

    // Calculate total pages
    const totalPages = Math.ceil(totalDoctors / limit);

    // Send both doctors data and total pages in the response
    res.json({
      doctors,
      totalPages,
    });
  } catch (error) {
    console.error(error); // Log error for debugging
    res.status(500).json({ message: 'Something went wrong' });
  }
});

module.exports = router;
