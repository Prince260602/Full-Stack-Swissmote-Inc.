import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import dataRoutes from './routes/dataRoutes.js'; 

dotenv.config(); 

const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors()); 
app.use(express.json());


app.use('/uploads', express.static('uploads')); 

// routes
app.use('/api/data', dataRoutes); 



// mongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
