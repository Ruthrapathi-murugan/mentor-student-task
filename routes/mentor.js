import express from 'express';
import Mentor from '../models/mentor.js';
import Student from '../models/student.js';

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

// Get all students assigned to a mentor
router.get('/:mentorId/students', async (req, res) => {
  try {
    const mentorId = req.params.mentorId;

    const students = await Student.find({ mentor: mentorId });

    if (students.length === 0) {
      return res.status(404).json({ message: 'No students found for this mentor' });
    }

    res.status(200).json(students);
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
  