import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import experiencesRoutes from './routes/experiences.routes.js';
import bookingsRoutes from './routes/bookings.routes.js';
import promoRoutes from './routes/promo.routes.js';

const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(morgan('dev'));

app.use('/api/experiences', experiencesRoutes);
app.use('/api/bookings', bookingsRoutes);
app.use('/api/promo', promoRoutes);

app.get('/', (req, res) => res.json({ ok: true, message: 'BookIt backend' }));

export default app;
