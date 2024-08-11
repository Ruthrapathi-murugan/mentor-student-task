import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required']
  },
  mentor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Mentor',
    default: null // Allow null if no mentor is assigned
  }
});

const Student = mongoose.model('Student', studentSchema);

export default Student;
