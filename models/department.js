const mongoose = require('mongoose');

// Define Department schema
const departmentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
});

// Export the model
module.exports = mongoose.model('Department', departmentSchema);
