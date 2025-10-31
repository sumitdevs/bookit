import mongoose from 'mongoose';

const SlotSchema = new mongoose.Schema({
  date: { type: String, required: true }, // YYYY-MM-DD
  time: { type: String, required: true }, // e.g. "17:00"
  available: { type: Number, required: true, min: 0 },
  price: { type: Number, required: true, min: 0 }
}, { _id: true });

const BookingSchema = new mongoose.Schema({
  email: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  quantity: { type: Number, required: true, min: 1 }
}, { _id: false });

const ExperienceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  shortDescription: { type: String },
  longDescription: { type: String },
  category: { type: String },
  images: [{ url: String, alt: String }],
  slots: [SlotSchema],

  bookings: [BookingSchema],

  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Experience', ExperienceSchema);
