// server/src/index.ts
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { connectDB } from './config/database';
import { errorHandler } from './middleware/errorHandler';
import { logger } from './utils/logger';
import authRoutes from './routes/authRoutes';

// Load environment variables
dotenv.config({ path: path.join(process.cwd(), '.env') });

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, '../../client/dist')));

// Routes
app.use('/api/auth', authRoutes);
app.get('*', (_req, res) => {  // Changed 'req' to '_req'
  res.sendFile(path.join(__dirname, '../../client/dist/index.html'));
});

// Error handling
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    // Initialize database connection
    await connectDB();
    
    app.listen(PORT, () => {
      logger.info(`Server running on port ${PORT}`);
    });
  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();