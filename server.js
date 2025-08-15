const express = require('express');
const fetch = require('node-fetch');
const app = express();

const API_URL = 'https://api.jsonbin.io/v3/b/6881eeb57b4b8670d8a67ea9/latest';
const API_KEY = '$2a$10$D9MnBNmGXxinptCs1jFHUuAxy9eG2DDpq4JW/0zwUCuS06Wn9OS8u';



app.get('/users', async (req, res) => {
  try {
    const response = await fetch(API_URL, {
      headers: { 'X-Master-Key': API_KEY }
    });
    const data = await response.json();
    res.json(data.record);
  } catch (e) {
    res.status(500).send('Error fetching user data');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
