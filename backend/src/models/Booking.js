import mongoose from 'mongoose';

const BookingSchema = new mongoose.Schema({
  experience: { type: mongoose.Schema.Types.ObjectId, ref: 'Experience', required: true },
  slotId: { type: mongoose.Schema.Types.ObjectId, required: true },
  user: {
    name: { type: String, required: true },
    email: { type: String, required: true }
  },
  guests: { type: Number, default: 1, min: 1 },
  totalPrice: { type: Number, required: true },
  promoCode: { type: String },
  status: { type: String, enum: ['confirmed','failed'], default: 'confirmed' },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Booking', BookingSchema);
