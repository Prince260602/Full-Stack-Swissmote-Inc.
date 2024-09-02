// const express = require('express');
// const cors = require('cors');
// const mongoose = require('mongoose');

// const app = express();
// const port = 3000;

// app.use(cors());
// app.use(express.json());

// // Connect to MongoDB (Replace with your MongoDB URI)
// mongoose.connect('mongodb://localhost:27017/mydatabase', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// });

// const dataSchema = new mongoose.Schema({
//   name: String,
//   phoneNo: String,
//   branch: String,
//   fees: Number
// });

// const Data = mongoose.model('Data', dataSchema);

// // Endpoint to get data with pagination, sorting, and filtering
// app.get('/api/data', async (req, res) => {
//   try {
//     const { page = 1, limit = 10, sort = 'name', search = '' } = req.query;
//     const query = search ? { name: new RegExp(search, 'i') } : {};

//     const data = await Data.find(query)
//       .sort(sort)
//       .skip((page - 1) * limit)
//       .limit(Number(limit));

//     const total = await Data.countDocuments(query);

//     res.json({
//       data,
//       total
//     });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// app.listen(port, () => {
//   console.log(`Server running on http://localhost:${port}`);
// });


import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import dataRoutes from './routes/dataRoutes.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/data', dataRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
