import express from 'express';
import Mentor from '../models/mentor.js';

const router = express.Router();

// Create a new mentor
router.post('/', async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: 'Name is required' });
    }

    const mentor = new Mentor({ name });
    await mentor.save();

    res.status(201).json(mentor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all mentors
router.get('/', async (req, res) => {
  try {
    const mentors = await Mentor.find();
    res.status(200).json(mentors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
