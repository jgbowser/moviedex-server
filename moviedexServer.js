require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const movieData = require('./movie-data.js');

const app = express();

app.use(morgan('dev'));

function validateBearerToken(req, res, next) {
  const API_TOKEN = process.env.API_TOKEN;
  const authToken = req.get('Authorization');

  if(!authToken || authToken.split(' ')[1] !== API_TOKEN ) {
    return res.status(401).json({ error: 'Please provide a valid Authorization Token'});
  }
  next();
}

app.use(validateBearerToken);

app.get('/movie', (req, res) => {
  res.send('Working');
});

app.listen(8000, () => console.log('Listening on PORT 8000'));
