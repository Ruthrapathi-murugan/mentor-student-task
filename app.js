import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import mentorRoutes from './routes/mentor.js';
import studentRoutes from './routes/student.js';

dotenv.config();

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

app.use('/mentors', mentorRoutes);
app.use('/students', studentRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
