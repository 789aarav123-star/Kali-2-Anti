require('dotenv').config();
const express = require('express');
const path = require('path');
const morgan = require('morgan');
const restaurantData = require('./data/restaurantData');

const app = express();
const PORT = process.env.PORT || 3000;

// View Engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Security & SEO Headers
app.use((req, res, next) =>
