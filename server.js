const express = require('express');
const history = require('connect-history-api-fallback');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Set NODE_ENV variable
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// Load values into process.env
if (process.env.NODE_ENV === 'test') {
  require('dotenv').config({ path: '.env.test' })
} else if (process.env.NODE_ENV === 'development') {
  require('dotenv').config({ path: '.env.development' })
}

// Initialize app
const app = express();

// Apply middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
// app.use(history());

// API routes
app.get('/', (req, res)=>{
  res.send({text: 'server is working'})
})

// Start server on PORT
const port = process.env.PORT || 5000;
app.listen(port, ()=>console.log(`Server started on port ${port}, env=${process.env.NODE_ENV}`))