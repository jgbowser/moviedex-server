require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');

const app = express();

app.use(morgan('dev'));

app.listen(8000, () => console.log('Listening on PORT 8000'));
