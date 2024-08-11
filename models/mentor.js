import mongoose from 'mongoose';

const mentorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required']
  }
  // Add other fields if needed
});

const Mentor = mongoose.model('Mentor', mentorSchema);

export default Mentor;
