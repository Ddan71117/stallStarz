import { Sequelize } from 'sequelize';
import { logger } from '../utils/logger';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

const isProduction = process.env.NODE_ENV === 'production';

// Render's DATABASE_URL
const databaseUrl = "postgresql://stallstarz_user:GlaSKWgapYT3ZYftCcbhyUlq46uujZN8@dpg-ct38v3tumphs73dptgc0-a.oregon-postgres.render.com/stallstarz_db";

let sequelize: Sequelize;

if (isProduction) {
  sequelize = new Sequelize(databaseUrl, {
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
    },
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    logging: (msg) => logger.debug(msg)
  });
} else {
  // Local development configuration
  sequelize = new Sequelize({
    dialect: 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '5432'),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    logging: (msg) => logger.debug(msg)
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
  } catch (error) {
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