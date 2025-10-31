import Promo from '../models/Promo.js';

export const validatePromo = async (req, res) => {
  const { code } = req.body;

  if (!code) {
    return res.status(400).json({ success: false, message: 'Promo code required' });
  }

  try {
    const promo = await Promo.findOne({ code: code.toUpperCase() }).lean();

    if (!promo) {
      return res.status(404).json({ success: false, message: 'Invalid promo code' });
    }

    const now = new Date();
    const valid =
      (!promo.validFrom || promo.validFrom <= now) &&
      (!promo.validTo || promo.validTo >= now);

    if (!valid) {
      return res.status(400).json({ success: false, message: 'Promo code expired' });
    }

    return res.json({ success: true, data: promo });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
