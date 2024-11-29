import { logger } from '../utils/logger';
export const errorHandler = (err, _req, res, _next) => {
    logger.error(err.stack);
    if (err.name === 'ValidationError') {
        return res.status(400).json({
            message: 'Validation Error',
            errors: err.message
        });
    }
    return res.status(500).json({
        message: 'Internal Server Error',
        error: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
    });
};
//# sourceMappingURL=errorHandler.js.map