import mongoose from 'mongoose';

const dataSchema = new mongoose.Schema({
  AnimeCategories:{type:String, required:true},
  Animename: { type: String, required: true },
  writername: { type: String, required: true },
  art: { type: String, required: true },
  Reads: { type: String, required:false },
  Description:{ type: String, required: true },
  AnimeImage: { type: String, required: true },
});

export default mongoose.model('Data', dataSchema);
