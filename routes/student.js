import express from "express";
import mongoose from "mongoose";
import Student from "../models/student.js";

const router = express.Router();

// Create a new student
router.post('/', async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: 'Name is required' });
    }

    const student = new Student({ name });
    const savedStudent = await student.save();

    res.status(201).json(savedStudent);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Assign a mentor to a student
router.put("/:id/assign-mentor", async (req, res) => {
  try {
    const studentId = req.params.id;
    const { mentorId } = req.body;

    if (!mongoose.Types.ObjectId.isValid(studentId) || !mongoose.Types.ObjectId.isValid(mentorId)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }

    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    student.previousMentor = student.mentor;
    student.mentor = mentorId;

    const updatedStudent = await student.save();
    res.status(200).json(updatedStudent);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get the previous mentor for a student
router.get("/:studentId/previous-mentor", async (req, res) => {
  try {
    const studentId = req.params.studentId;

    const student = await Student.findById(studentId).populate("previousMentor");

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    if (!student.previousMentor) {
      return res.status(404).json({ message: "No previous mentor found for this student" });
    }

    res.status(200).json(student.previousMentor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


export default router;
