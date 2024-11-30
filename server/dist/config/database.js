"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = void 0;
const sequelize_1 = require("sequelize");
const logger_1 = require("../utils/logger");
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: path_1.default.join(process.cwd(), '.env') });
const isProduction = process.env.NODE_ENV === 'production';
let sequelize;
if (isProduction && process.env.DATABASE_URL) {
    sequelize = new sequelize_1.Sequelize(process.env.DATABASE_URL, {
        dialect: 'postgres',
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false
            }
        },
        define: {
            timestamps: true,
            underscored: true,
        }
    });
}
else {
    sequelize = new sequelize_1.Sequelize({
        dialect: 'postgres',
        host: process.env.DB_HOST || 'localhost',
        port: parseInt(process.env.DB_PORT || '5432'),
        username: process.env.DB_USERNAME || 'postgres',
        password: process.env.DB_PASSWORD || '',
        database: 'auth_app',
        logging: (msg) => logger_1.logger.debug(msg),
        define: {
            timestamps: true,
            underscored: true,
        }
    });
}
const connectDB = async () => {
    try {
        await sequelize.authenticate();
        logger_1.logger.info('Database connection established successfully');
        // Sync database in both development and production
        await sequelize.sync({ alter: true });
        logger_1.logger.info('Database synced successfully');
    }
    catch (error) {
        logger_1.logger.error('Unable to connect to the database:', error);
        if (error instanceof Error) {
            logger_1.logger.error('Error details:', {
                message: error.message,
                stack: error.stack,
                name: error.name
            });
        }
        process.exit(1);
    }
};
exports.connectDB = connectDB;
exports.default = sequelize;
//# sourceMappingURL=database.js.map