import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { connectDB } from './config/database';
import { errorHandler } from './middleware/errorHandler';
import { logger } from './utils/logger';
import authRoutes from './routes/authRoutes';
dotenv.config({ path: path.join(process.cwd(), '.env') });
const app = express();
app.use(cors({
    origin: process.env.NODE_ENV === 'production'
        ? 'https://stallstarz.onrender.com'
        : 'http://localhost:5173',
    credentials: true
}));
app.use(express.json());
app.use('/api/auth', authRoutes);
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../../client/dist')));
    app.get('*', (_req, res) => {
        res.sendFile(path.join(__dirname, '../../client/dist/index.html'));
    });
}
app.use(errorHandler);
const PORT = process.env.PORT || 3000;
const startServer = async () => {
    try {
        await connectDB();
        app.listen(PORT, () => {
            logger.info(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
        });
    }
    catch (error) {
        logger.error('Failed to start server:', error);
        process.exit(1);
    }
};
startServer();
//# sourceMappingURL=index.js.map