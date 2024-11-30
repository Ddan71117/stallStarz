"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const database_1 = require("./config/database");
const errorHandler_1 = require("./middleware/errorHandler");
const logger_1 = require("./utils/logger");
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
// Load environment variables
dotenv_1.default.config({ path: path_1.default.join(process.cwd(), '.env') });
const app = (0, express_1.default)();
// Middleware
app.use((0, cors_1.default)({
    origin: process.env.NODE_ENV === 'production'
        ? 'https://stallstarz.onrender.com' // Update this with your Render URL
        : 'http://localhost:5173',
    credentials: true
}));
app.use(express_1.default.json());
// API Routes
app.use('/api/auth', authRoutes_1.default);
// Serve static files in production
if (process.env.NODE_ENV === 'production') {
    // Serve static files from the React app
    app.use(express_1.default.static(path_1.default.join(__dirname, '../../client/dist')));
    // Handle React routing, return all requests to React app
    app.get('*', (_req, res) => {
        res.sendFile(path_1.default.join(__dirname, '../../client/dist/index.html'));
    });
}
// Error handling
app.use(errorHandler_1.errorHandler);
// Start server
const PORT = process.env.PORT || 3000;
const startServer = async () => {
    try {
        // Initialize database connection
        await (0, database_1.connectDB)();
        app.listen(PORT, () => {
            logger_1.logger.info(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
        });
    }
    catch (error) {
        logger_1.logger.error('Failed to start server:', error);
        process.exit(1);
    }
};
startServer();
//# sourceMappingURL=index.js.map