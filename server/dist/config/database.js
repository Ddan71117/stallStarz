import { Sequelize } from 'sequelize';
import { logger } from '../utils/logger';
import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.join(process.cwd(), '.env') });
const isProduction = process.env.NODE_ENV === 'production';
let sequelize;
if (isProduction) {
    sequelize = new Sequelize(process.env.DATABASE_URL, {
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
    sequelize = new Sequelize({
        dialect: 'postgres',
        host: process.env.DB_HOST || 'localhost',
        port: parseInt(process.env.DB_PORT || '5432'),
        username: process.env.DB_USERNAME || 'postgres',
        password: process.env.DB_PASSWORD || '',
        database: 'auth_app',
        logging: (msg) => logger.debug(msg),
        define: {
            timestamps: true,
            underscored: true,
        }
    });
}
export const connectDB = async () => {
    try {
        await sequelize.authenticate();
        logger.info('Database connection established successfully');
        if (process.env.NODE_ENV === 'development') {
            await sequelize.sync({ alter: true });
            logger.info('Database synced successfully');
        }
    }
    catch (error) {
        logger.error('Unable to connect to the database:', error);
        if (error instanceof Error) {
            logger.error('Error details:', {
                message: error.message,
                stack: error.stack,
                name: error.name
            });
        }
        process.exit(1);
    }
};
export default sequelize;
//# sourceMappingURL=database.js.map