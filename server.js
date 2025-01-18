import express from 'express';
import dotenv from 'dotenv';
// const connectDB = require('./config/db');
// const authRoutes = require('./routes/authRoutes');
// const jobRoutes = require('./routes/jobRoutes');
// const userRoutes = require('./routes/userRoutes');
// const { errorHandler } = require('./middleware/errorMiddleware');

dotenv.config();
// connectDB();

const app = express();
app.use(express.json());

// app.use('/api/auth', authRoutes);
// app.use('/api/jobs', jobRoutes);
// app.use('/api/users', userRoutes);

// app.use(errorHandler);
app.get('/',(req,resp) => {
    resp.status(200).json({message:'Server deployed dev 1'})
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));