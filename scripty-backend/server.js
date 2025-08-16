const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
require('dotenv').config();  // Load environment variables from .env

const app = express();
const API_URL = 'https://api.jsonbin.io/v3/b/6881eeb57b4b8670d8a67ea9/latest';  // JSONBin endpoint
const API_KEY = process.env.API_KEY;  // Get API key from .env

app.use(cors());  // Enable CORS for frontend requests

app.get('/users', async (req, res) => {
    try {
        const response = await fetch(API_URL, {
            headers: {
                'X-Master-Key': API_KEY,  // Pass API key in the headers
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            return res.status(500).json({ error: 'Failed to fetch data from JSONBin' });
        }

        const data = await response.json();
        res.json(data.record);  // Send the user data to frontend
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while fetching user data' });
    }
});

// Set the port to listen on (Heroku or Render will use the provided port)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
