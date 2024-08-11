import express from 'express';
import mongoose from 'mongoose';
import Student from '../models/student.js';

const router = express.Router();

// Assign a mentor to a student
router.put('/:id/assign-mentor', async (req, res) => {
  try {
    const studentId = req.params.id; // Student ID from URL
    const { mentorId } = req.body; // Mentor ID from request body

    // Validate the ObjectId format
    if (!mongoose.Types.ObjectId.isValid(studentId) || !mongoose.Types.ObjectId.isValid(mentorId)) {
      return res.status(400).json({ message: 'Invalid ID format' });
    }

    // Find the student by ID
    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    // Update the mentor field
    student.mentor = mentorId;
    const updatedStudent = await student.save();

    // Return the updated student
    res.status(200).json(updatedStudent);
  } catch (error) {
    console.error('Error assigning mentor:', error); // Log the error
    res.status(500).json({ message: error.message });
  }
});

export default router;
