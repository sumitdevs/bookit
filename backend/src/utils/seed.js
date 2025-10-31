import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Experience from '../models/Experience.js';
import Promo from '../models/Promo.js';

dotenv.config({ path: '.env' });

const connect = async () => {
  if (!process.env.MONGO_URI) {
    console.error('Set MONGO_URI in .env');
    process.exit(1);
  }
  await mongoose.connect(process.env.MONGO_URI);
};

const seed = async () => {
  await connect();

  await Experience.deleteMany({});
  await Promo.deleteMany({});

  const experiences = [
    {
      title: 'Kayaking',
      shortDescription: 'Curated small-group experience with certified guides.',
      longDescription: 'Safety first with gear included. Enjoy kayaking with trained instructors.',
      category: 'Udupi',
      images: [{ url: 'https://images.unsplash.com/photo-1512100356356-de1b84283e18?ixlib?auto=format&fit=crop&q=70&w=720', alt: 'Kayaking' }],
      slots: [
        { date: '2025-11-01', time: '04:00', available: 5, price: 999 },
        { date: '2025-11-02', time: '05:00', available: 3, price: 1299 },
        { date: '2025-11-03', time: '06:00', available: 2, price: 1199 },
        { date: '2025-11-04', time: '07:00', available: 4, price: 999 },
        { date: '2025-11-05', time: '08:00', available: 2, price: 1399 },
        { date: '2025-11-06', time: '09:00', available: 3, price: 999 }
      ]
    },
    {
      title: 'Nandi Hills Sunrise',
      shortDescription: 'Witness breathtaking sunrise views with a local guide.',
      longDescription: 'Perfect for early risers looking for adventure and peace.',
      category: 'Bangalore',
      images: [{ url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=70&w=720', alt: 'Nandi Hills' }],
      slots: [
        { date: '2025-11-01', time: '04:30', available: 10, price: 899 },
        { date: '2025-11-02', time: '05:30', available: 8, price: 999 },
        { date: '2025-11-03', time: '06:30', available: 5, price: 1199 },
        { date: '2025-11-04', time: '07:30', available: 2, price: 899 },
        { date: '2025-11-05', time: '08:30', available: 7, price: 1299 },
        { date: '2025-11-06', time: '09:30', available: 9, price: 1399 }
      ]
    },
    {
      title: 'Coffee Trail',
      shortDescription: 'Explore scenic coffee plantations with a local expert.',
      longDescription: 'Learn about coffee making and enjoy complimentary tastings.',
      category: 'Coorg',
      images: [{ url: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&q=70&w=720', alt: 'Coffee Trail' }],
      slots: [
        { date: '2025-11-03', time: '10:00', available: 6, price: 1299 },
        { date: '2025-11-04', time: '11:00', available: 4, price: 1399 },
        { date: '2025-11-04', time: '13:00', available: 6, price: 1399 },
        { date: '2025-11-04', time: '14:00', available: 8, price: 1599 },
        { date: '2025-11-04', time: '15:00', available: 2, price: 1699 },
        { date: '2025-11-04', time: '16:00', available: 3, price: 1299 }
      ]
    },
    {
      title: 'Boat Cruise',
      shortDescription: 'Enjoy a peaceful boat cruise with refreshments.',
      longDescription: 'Cruise along scenic backwaters with a guide and snacks.',
      category: 'Sunderban',
      images: [{ url: 'https://plus.unsplash.com/premium_photo-1681883748238-12c0089484c2?auto=format&fit=crop&q=70&w=720', alt: 'Boat Cruise' }],
      slots: [
        { date: '2025-11-06', time: '16:00', available: 12, price: 999 },
        { date: '2025-11-07', time: '17:00', available: 10, price: 999 },
        { date: '2025-11-07', time: '18:00', available: 5, price: 1099 },
        { date: '2025-11-07', time: '19:00', available: 8, price: 1199 },
        { date: '2025-11-07', time: '20:00', available: 3, price: 1299 },
        { date: '2025-11-07', time: '21:00', available: 2, price: 1399 }
      ]
    },
    {
      title: 'Bunjee Jumping',
      shortDescription: 'Thrilling experience for adventure seekers.',
      longDescription: 'Experience a safe and certified jump with trained professionals.',
      category: 'Manali',
      images: [{ url: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=70&w=720', alt: 'Bunjee Jumping' }],
      slots: [
        { date: '2025-11-05', time: '08:00', available: 8, price: 999 },
        { date: '2025-11-06', time: '09:00', available: 6, price: 1099 },
        { date: '2025-11-06', time: '10:00', available: 5, price: 999 },
        { date: '2025-11-06', time: '12:00', available: 6, price: 1199 },
        { date: '2025-11-06', time: '14:00', available: 8, price: 1299 },
        { date: '2025-11-06', time: '16:00', available: 2, price: 1399 }
      ]
    },
    {
      title: 'River Rafting',
      shortDescription: 'Exciting white-water rafting experience.',
      longDescription: 'Join professional rafters for an unforgettable water adventure.',
      category: 'Rishikesh',
      images: [{ url: 'https://images.unsplash.com/photo-1658355686821-f412c8397a0d?ixlib?auto=format&fit=crop&q=70&w=720', alt: 'Rafting' }],
      slots: [
        { date: '2025-11-05', time: '09:00', available: 15, price: 1199 },
        { date: '2025-11-06', time: '11:00', available: 10, price: 1199 },
        { date: '2025-11-06', time: '13:00', available: 10, price: 1299 },
        { date: '2025-11-06', time: '15:00', available: 8, price: 1399 },
        { date: '2025-11-06', time: '16:00', available: 6, price: 1499 },
        { date: '2025-11-06', time: '17:00', available: 7, price: 1199 }
      ]
    },
    {
      title: 'Camping Under the Stars',
      shortDescription: 'Stay overnight at a scenic campsite with bonfire.',
      longDescription: 'Includes dinner, tents, and local folk performances.',
      category: 'Wayanad',
      images: [{ url: 'https://images.unsplash.com/photo-1503264116251-35a269479413?auto=format&fit=crop&q=70&w=720', alt: 'Camping' }],
      slots: [
        { date: '2025-11-08', time: '19:00', available: 10, price: 1499 },
        { date: '2025-11-09', time: '20:00', available: 8, price: 1599 },
        { date: '2025-11-09', time: '21:00', available: 6, price: 1699 },
        { date: '2025-11-09', time: '22:00', available: 3, price: 1799 },
        { date: '2025-11-09', time: '23:00', available: 7, price: 1499 },
        { date: '2025-11-09', time: '01:00', available: 8, price: 1599 }
      ]
    },
    {
      title: 'Kayaking',
      shortDescription: 'Paddle through serene backwaters surrounded by lush greenery.',
      longDescription: 'Experience the calm beauty of Kerala’s backwaters on a guided kayaking tour.',
      category: 'Chennai',
      images: [{ url: 'https://images.unsplash.com/photo-1506929562872-bb421503ef21?ixlib?auto=format&fit=crop&q=70&w=720', alt: 'Kayaking' }],
      slots: [
        { date: '2025-11-10', time: '11:00', available: 12, price: 1200 },
        { date: '2025-11-11', time: '12:00', available: 10, price: 1300 },
        { date: '2025-11-11', time: '13:00', available: 11, price: 1400 },
        { date: '2025-11-11', time: '14:00', available: 9, price: 1500 },
        { date: '2025-11-11', time: '15:00', available: 6, price: 1600 },
        { date: '2025-11-11', time: '16:00', available: 4, price: 1200 }
      ]
    }
  ];

  await Experience.insertMany(experiences);

  await Promo.insertMany([
    { code: 'SAVE10', type: 'percentage', value: 10 },
    { code: 'FLAT100', type: 'flat', value: 100 }
  ]);

  console.log('✅ Database seeded with experiences & promo codes');
  process.exit(0);
};

seed().catch(err => {
  console.error(err);
  process.exit(1);
});
