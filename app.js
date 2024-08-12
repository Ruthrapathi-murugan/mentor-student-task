import express from 'express';
import mongoose from 'mongoose';
import studentRoutes from './routes/student.js';
import mentorRoutes from './routes/mentor.js';

const app = express();
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/yourDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.error('Connection error', error);
});

// Mount the routers
app.use('/students', studentRoutes);
app.use('/mentors', mentorRoutes);

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
