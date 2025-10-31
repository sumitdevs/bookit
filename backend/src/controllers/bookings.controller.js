import mongoose from 'mongoose';
import Experience from '../models/Experience.js';
import Booking from '../models/Booking.js';
import Promo from '../models/Promo.js';

export const createBooking = async (req, res) => {
  const { experienceId, slotId, user, guests = 1, promoCode } = req.body;

  if (!experienceId || !slotId || !user?.name || !user?.email) {
    return res.status(400).json({ success: false, message: 'Missing required fields' });
  }

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // Check for existing booking by same user and slot
    const existingBooking = await Booking.findOne({
      experience: experienceId,
      slotId,
      'user.email': user.email
    }).session(session);

    if (existingBooking) {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).json({
        success: false,
        message: 'You have already booked this slot.'
      });
    }

    // Atomically reduce slot availability
    const updatedExperience = await Experience.findOneAndUpdate(
  {
    _id: new mongoose.Types.ObjectId(experienceId),
    'slots._id': new mongoose.Types.ObjectId(slotId),
    'slots.available': { $gte: guests }
  },
  { $inc: { 'slots.$.available': -guests } },
  { new: true, session }
);



    if (!updatedExperience) {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).json({
        success: false,
        message: 'Slot not available or insufficient seats.'
      });
    }

    // Retrieve updated slot info
    const slot = updatedExperience.slots.id(slotId);
    if (!slot) {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).json({
        success: false,
        message: 'Slot not found.'
      });
    }

    // Calculate total price (with promo)
    let totalPrice = slot.price * guests;

    if (promoCode) {
      const promo = await Promo.findOne({ code: promoCode.toUpperCase() }).session(session);
      if (promo) {
        const now = new Date();
        const valid =
          (!promo.validFrom || promo.validFrom <= now) &&
          (!promo.validTo || promo.validTo >= now);

        if (valid) {
          if (promo.type === 'percentage') {
            totalPrice -= totalPrice * (promo.value / 100);
          } else {
            totalPrice = Math.max(0, totalPrice - promo.value);
          }
        }
      }
    }

    // Create booking and embed summary in Experience
    const [booking] = await Booking.create(
      [
        {
          experience: experienceId,
          slotId,
          user,
          guests,
          totalPrice,
          promoCode,
          status: 'confirmed'
        }
      ],
      { session }
    );

    // Embed minimal booking info in Experience (optional, for history)
    await Experience.updateOne(
      { _id: experienceId },
      {
        $push: {
          bookings: {
            email: user.email,
            date: slot.date,
            time: slot.time,
            quantity: guests
          }
        }
      },
      { session }
    );

    await session.commitTransaction();
    session.endSession();

    return res.status(201).json({
      success: true,
      message: 'Booking confirmed successfully!',
      data: booking
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    return res.status(500).json({
      success: false,
      message: error.message || 'Server error'
    });
  }
};
