import mongoose from 'mongoose';

const dataSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phoneNo: { type: String, required: true },
  branch: { type: String, required: true },
  fees: { type: Number, required: true }
});

export default mongoose.model('Data', dataSchema);
