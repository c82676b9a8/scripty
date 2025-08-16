const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
const app = express();
require('dotenv').config();

// Enable CORS
app.use(cors());

// JSONBin credentials
const API_URL = 'https://api.jsonbin.io/v3/b/6881eeb57b4b8670d8a67ea9/latest';
const API_KEY = process.env.API_KEY;

app.get('/users', async (req, res) => {
    try {
        const response = await fetch(API_URL, {
            headers: {
                'X-Master-Key': API_KEY,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            return res.status(500).json({ error: 'Failed to fetch data from JSONBin' });
        }

        const data = await response.json();
        res.json(data.record);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'An error occurred while fetching user data' });
    }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
