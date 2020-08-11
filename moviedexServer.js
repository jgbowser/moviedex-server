require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const movieData = require('./movie-data.json');

const app = express();

app.use(morgan('dev'));
app.use(validateBearerToken);

// Search Handler/Utility functions

function validateBearerToken(req, res, next) {
  const API_TOKEN = process.env.API_TOKEN;
  const authToken = req.get('Authorization');

  if(!authToken || authToken.split(' ')[1] !== API_TOKEN ) {
    return res.status(401).json({ error: 'Please provide a valid Authorization Token'});
  }
  next();
}

function handleGenreSearch(req, res, next) {
  const { genre } = req.query;
  
  if(genre) {
    const genreLower = genre.toLowerCase();
    let movies = [...movieData.movies];
    movies = movies.filter(movie => movie.genre.toLowerCase().includes(genreLower));
    return res.status(200).json(movies);
  }
  next();
}


//API Request/Response handler
app.get('/movie', handleGenreSearch, (req, res) => res.send('Hello'));

app.listen(8000, () => console.log('Listening on PORT 8000'));
