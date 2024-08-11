import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import mentorRoutes from './routes/mentor.js';
import studentRoutes from './routes/student.js';

// Load environment variables
dotenv.config();

const app = express();
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch((error) => console.log('MongoDB connection error:', error));

// Set up routes
app.use('/mentors', mentorRoutes);
app.use('/students', studentRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
