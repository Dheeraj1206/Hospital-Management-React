const mongoose = require('mongoose');

// Define Doctor schema
const doctorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  specialty: { type: String, required: true },
  location: { type: String, required: true },
});

// Export the model
module.exports = mongoose.model('Doctor', doctorSchema);
