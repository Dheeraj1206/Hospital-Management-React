const express = require('express');
const router = express.Router();
const Department = require('../models/department'); // Import the Department model

router.get('/departments', async (req, res) => {
  const searchTitle = req.query.searchTitle || '';
  const searchDescription = req.query.searchDescription || '';

  // Pagination settings
  const { page = 1, limit = 15, sort = 'title' } = req.query;
  const skip = (page - 1) * limit;

  // Construct query object dynamically based on provided search fields
  const query = {};

  if (searchTitle) {
    query.title = { $regex: searchTitle, $options: 'i' }; // Case-insensitive search on title
  }
  if (searchDescription) {
    query.description = { $regex: searchDescription, $options: 'i' }; // Case-insensitive search on description
  }

  try {
    // Query the database for the total number of departments matching the query (for pagination)
    const totalDepartments = await Department.countDocuments(query);

    // Query the database for the paginated department data
    const departments = await Department.find(query)
      .skip(skip) // Apply skip for pagination
      .limit(Number(limit)) // Limit results based on the provided limit
      .sort(sort); // Sort the results based on the 'sort' parameter

    // Calculate total pages
    const totalPages = Math.ceil(totalDepartments / limit);

    // Send both departments data and total pages in the response
    res.json({
      departments,
      totalPages,
    });
  } catch (error) {
    console.error(error); // Log error for debugging
    res.status(500).json({ message: 'Something went wrong' });
  }
});

module.exports = router;
