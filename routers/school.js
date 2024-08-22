const express = require('express');
const router = express.Router();
const connection = require('../Database/config');

// Add School API
router.post('/addSchool', (req, res) => {
    try {
        const { name, address, latitude, longitude } = req.body;

        if (!name || !address || !latitude || !longitude) {
            return res.status(400).json({ error: 'All fields are required.' });
        }

        const sql = 'INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)';
        const values = [name, address, parseFloat(latitude), parseFloat(longitude)];

        connection.query(sql, values, (err, result) => {
            if (err) {
                console.error('Database Error:', err); // Log error details for debugging
                return res.status(500).json({ error: 'Database error.', message: err });
            }
            res.status(201).json({ message: 'School added successfully.' });
        });
    }
    catch {
        console.log("err hai", err);
    }
    connection.end();
});

// calculating distance 
function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of the Earth in km
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in km
}

// List Schools API
router.get('/listSchools', (req, res) => {
    try {
        const { latitude, longitude } = req.query;

        if (!latitude || !longitude) {
            return res.status(400).json({ error: 'User latitude and longitude are required.' });
        }

        connection.query('SELECT * FROM schools', (err, results) => {
            if (err) return res.status(500).json({ error: 'Database error.' });
            const userLat = parseFloat(latitude);
            const userLon = parseFloat(longitude);

            const schoolsWithDistance = results.map(school => {
                const distance = calculateDistance(userLat, userLon, school.latitude, school.longitude);
                return { ...school, distance };
            });

            schoolsWithDistance.sort((a, b) => a.distance - b.distance);

            res.json(schoolsWithDistance);
        });
    }
    catch {
        console.log("err hai")
    }
});

module.exports = router;