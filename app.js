require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const router = require('./routes/index');
const { limiter } = require('./middlewares/rateLimiter');

const error = require('./middlewares/error');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { NODE_ENV, URL_DB, PORT = 3000 } = process.env;

const app = express();

mongoose.connect(NODE_ENV === 'production' ? URL_DB : 'mongodb://localhost:27017/moviesdb');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());
app.use(limiter);

app.use(requestLogger);
app.use(router);
app.use(errorLogger);
app.use(errors());
app.use(error);
app.listen(PORT, () => {});
