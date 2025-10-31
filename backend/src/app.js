import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
// import morgan from 'morgan';
import experiencesRoutes from './routes/experiences.routes.js';
import bookingsRoutes from './routes/bookings.routes.js';
import promoRoutes from './routes/promo.routes.js';
import connectDB from './config/db.js';

const app = express();
const PORT = process.env.PORT || 5000;

dotenv.config({ path: '.env' });

app.use(cors({ origin: "*" }));
app.use(express.json());
// app.use(morgan('dev'));

connectDB();

app.use('/api/experiences', experiencesRoutes);
app.use('/api/bookings', bookingsRoutes);
app.use('/api/promo', promoRoutes);

app.get('/', (req, res) => res.json({ ok: true, message: 'BookIt backend' }));

app.listen(PORT, ()=>{
    console.log(`server is running on http://localhost:${PORT}`);
});
