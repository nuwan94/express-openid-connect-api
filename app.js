const express = require('express');
const dotenv = require('dotenv');
const { auth, requiresAuth } = require('express-openid-connect');
const { port } = require('./configs/appConfig');

const app = express();
dotenv.config();

app.use(
  auth({
    authRequired: false,
    auth0Logout: true,
    issuerBaseURL: process.env.ISSUER_BASE_URL,
    baseURL: process.env.BASE_URL,
    clientID: process.env.CLIENT_ID,
    secret: process.env.SECRET,
  })
);

app.get('/', (req, res) => {
  res.status(200);
  res.send(req.oidc.isAuthenticated() ? 'Logged In' : 'Logged Out');
});

app.get('/profile', requiresAuth(), (req, res) => {
  res.send(JSON.stringify(req.oidc.user));
});

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});
