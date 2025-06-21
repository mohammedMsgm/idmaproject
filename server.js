import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './src/api/auth.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// CORS configuration for production and development
const corsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? [
        process.env.FRONTEND_URL || 'https://idmaproject-1.onrender.com',
        'https://idmaproject-1.onrender.com', // Your actual frontend URL
        'https://your-frontend-app.onrender.com' // Fallback
      ]
    : ['http://localhost:5173', 'http://127.0.0.1:5173'],
  credentials: true,
  optionsSuccessStatus: 200
};

// Middleware
app.use((req, res, next) => {
  console.log(`🌐 ${req.method} ${req.path} from origin: ${req.get('origin')}`);
  next();
});

app.use(cors(corsOptions));
app.use(express.json());

// Routes
app.use('/api', authRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Backend server running on port ${PORT}`);
  console.log(`📡 API available at http://localhost:${PORT}/api`);
});

export default app;
