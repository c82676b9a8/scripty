const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const port = 3000;

const DISCORD_CLIENT_ID = process.env.DISCORD_CLIENT_ID;
const DISCORD_CLIENT_SECRET = process.env.DISCORD_CLIENT_SECRET;
const DISCORD_REDIRECT_URI = process.env.DISCORD_REDIRECT_URI;

app.get('/callback', async (req, res) => {
  const code = req.query.code;  // The authorization code

  // Exchange the code for an access token
  const tokenResponse = await axios.post('https://discord.com/api/oauth2/token', new URLSearchParams({
    client_id: DISCORD_CLIENT_ID,
    client_secret: DISCORD_CLIENT_SECRET,
    code: code,
    grant_type: 'authorization_code',
    redirect_uri: DISCORD_REDIRECT_URI,
    scope: 'identify'
  }), {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  });

  const accessToken = tokenResponse.data.access_token;

  // Fetch the user's Discord info
  const userResponse = await axios.get('https://discord.com/api/v10/users/@me', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    }
  });

  res.send(`Hello ${userResponse.data.username}`);
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
