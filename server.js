
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { resolve } = require('path');
const menuRoutes = require('./routes'); // Import routes properly

require("dotenv").config();
const express = require("express");

const { MongoClient } = require("mongodb");


const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());  

const connectdataBse = require("./dataBase");
// database()
const app = express();
require('dotenv').config();

const PORT = process.env.PORT || 8000;


const client = new MongoClient(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
connectdataBse();

let dbStatus = "Disconnected";


// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error('MongoDB Connection Error:', err));

// Serve Static Files
app.use(express.static('static'));

// Routes
app.get('/', (req, res) => {
  res.sendFile(resolve(__dirname, 'pages/index.html'));
});

// Register Routes
app.use('/api', menuRoutes); // Prefix the API routes with `/api`

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});