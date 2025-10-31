import Experience from '../models/Experience.js';

export const listExperiences = async (req, res) => {
  try {
    const experiences = await Experience.find()
      .select('title shortDescription images category')
      .lean();
    res.json({ success: true, data: experiences });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getExperience = async (req, res) => {
  try {
    const exp = await Experience.findById(req.params.id).lean();
    if (!exp) return res.status(404).json({ success:false, message: 'Experience not found' });
    res.json({ success:true, data: exp });
  } catch (err) {
    res.status(500).json({ success:false, message: err.message });
  }
};
