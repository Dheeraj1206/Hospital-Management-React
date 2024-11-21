require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const DB_URI = process.env.MONGO_URI;
const path = require('path');

const app = express();

// Middleware
app.use(express.json()); // Using built-in Express middleware
app.use(cors());

if (!DB_URI) {
	console.error('MongoDB URI is not defined!');
	process.exit(1);
}

// Database connection
mongoose
	.connect(DB_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => console.log('Database connected successfully'))
	.catch((err) => console.error('Database connection error:', err));

// Routes
app.use('/api', require('./routes/doctors')); // Ensure this route file exists
app.use(
	'/images',
	express.static(path.join(__dirname, '/client/public/images'))
);

// Catch-all for undefined routes
app.use((req, res, next) => {
	res.status(404).json({ message: 'Route not found' });
});

// Serve static files

// Start the server
const PORT = 3500;
app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});
