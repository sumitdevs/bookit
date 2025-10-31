import mongoose from 'mongoose';

const PromoSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  type: { type: String, enum: ['percentage','flat'], required: true },
  value: { type: Number, required: true }, // 10 for 10% or 100 for flat100
  validFrom: Date,
  validTo: Date,
  usageLimit: Number,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Promo', PromoSchema);
