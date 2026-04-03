import express from 'express';
import cors from 'cors';
import alertRoutes from './routes/alertRoutes.js';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/alerts',alertRoutes);

// Health check
app.get('/', (req, res) => {
  res.json({ message: 'Pipeline Alert Management API is running' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, error: 'Route not found' });
});

// Global error handler
app.use((err, req, res, next) => {
  console.log(err);
  
  console.error('Server Error:', err.message);
  res.status(500).json({ success: false, error: 'Internal server error' });
});

export default app;
