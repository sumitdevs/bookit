import express from 'express';
import { listExperiences, getExperience } from '../controllers/experiences.controller.js';
const router = express.Router();

router.get('/', listExperiences);
router.get('/:id', getExperience);

export default router;
