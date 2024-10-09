
import express from 'express';
import multer from 'multer';
import Data from '../models/dataModel.js';
import path from 'path';

const router = express.Router();


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); 
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); 
  }
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png/; 
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = fileTypes.test(file.mimetype);

    if (extname && mimetype) {
      return cb(null, true);
    } else {
      cb('Images only!'); 
    }
  }
});

//create
router.post('/', upload.single('AnimeImage'), async (req, res) => {
  const { AnimeCategories, Animename, writername, art, Reads, Description } = req.body;

 
  if (!AnimeCategories || !Animename || !writername || !art || !Description) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const AnimeImage = req.file ? `/uploads/${req.file.filename}` : null; 

  try {
    const newData = new Data({
      AnimeCategories,
      Animename,
      writername,
      art,
      Reads,
      Description,
      AnimeImage
    });
    const savedData = await newData.save();
    res.status(201).json(savedData);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// get all
router.get('/', async (req, res) => {
  const { AnimeCategories, Animename, writername, art } = req.query;
  const filter = {};

  if (AnimeCategories) filter.AnimeCategories = new RegExp(AnimeCategories, 'i');
  if (Animename) filter.Animename = new RegExp(Animename, 'i');
  if (writername) filter.writername = new RegExp(writername, 'i');
  if (art) filter.art = new RegExp(art, 'i');

  try {
    const data = await Data.find(filter);
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//update
router.put('/:id', upload.single('AnimeImage'), async (req, res) => {
  const { id } = req.params;
  const { AnimeCategories, Animename, writername, art, Reads, Description } = req.body;

  
  if (!AnimeCategories || !Animename || !writername || !art || !Description) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const AnimeImage = req.file ? `/uploads/${req.file.filename}` : undefined; 

  try {
    const updatedData = await Data.findByIdAndUpdate(
      id,
      { AnimeCategories, Animename, writername, art, Reads, Description, ...(AnimeImage && { AnimeImage }) },
      { new: true }
    );
    if (!updatedData) return res.status(404).json({ message: 'Data not found' });
    res.json(updatedData);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//delete
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


//get single from id
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const data = await Data.findById(id);
    if (!data) return res.status(404).json({ message: 'Data not found' });
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


export default router;
