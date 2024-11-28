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
const databaseUrl = "postgresql://stallstarz_user:GlaSKWgapYT3ZYftCcbhyUlq46uujZN8@dpg-ct38v3tumphs73dptgc0-a.oregon-postgres.render.com/stallstarz_db";
let sequelize;
if (process.env.NODE_ENV === 'production') {
    sequelize = new sequelize_1.Sequelize(databaseUrl, {
        dialect: 'postgres',
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false
            }
        },
        logging: (msg) => logger_1.logger.debug(msg),
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    });
}
else {
    sequelize = new sequelize_1.Sequelize({
        dialect: 'postgres',
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT || '5432'),
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        logging: (msg) => logger_1.logger.debug(msg),
        dialectOptions: {
            ssl: false,
            client_encoding: 'utf8'
        },
        define: {
            timestamps: true,
            underscored: true,
        },
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    });
}
const connectDB = async () => {
    try {
        await sequelize.authenticate();
        logger_1.logger.info('Database connection established successfully');
        if (process.env.NODE_ENV === 'development') {
            await sequelize.sync({ alter: true });
            logger_1.logger.info('Database synced successfully');
        }
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