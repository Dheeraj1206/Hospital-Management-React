const mongoose = require('mongoose');

// Define Hospital schema
const hospitalSchema = new mongoose.Schema({
	hospital_name: { type: String, required: true },
	doctor_types: { type: [String], required: true },
	number_of_doctors: { type: Number, required: true },
	address: { type: String, required: true },
	location: { type: String, required: true },
	emergency_number: { type: String, required: true },
	image_url: { type: String, required: true },
});

// Export the model
module.exports = mongoose.model('Hospital', hospitalSchema);
