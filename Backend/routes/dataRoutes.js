import express from 'express';
const router = express.Router();
import Data from '../models/dataModel.js';

// Create new data
router.post('/', async (req, res) => {
  const { name, phoneNo, branch, fees } = req.body;
  try {
    const newData = new Data({ name, phoneNo, branch, fees });
    const savedData = await newData.save();
    res.status(201).json(savedData);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all data with optional filtering
router.get('/', async (req, res) => {
  const { name, phoneNo, branch } = req.query;
  const filter = {};

  if (name) filter.name = new RegExp(name, 'i'); // case-insensitive search
  if (phoneNo) filter.phoneNo = phoneNo;
  if (branch) filter.branch = branch;

  try {
    const data = await Data.find(filter);
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update data by ID
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, phoneNo, branch, fees } = req.body;

  try {
    const updatedData = await Data.findByIdAndUpdate(id, { name, phoneNo, branch, fees }, { new: true });
    if (!updatedData) return res.status(404).json({ message: 'Data not found' });
    res.json(updatedData);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete data by ID
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedData = await Data.findByIdAndDelete(id);
    if (!deletedData) return res.status(404).json({ message: 'Data not found' });
    res.json({ message: 'Data deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
