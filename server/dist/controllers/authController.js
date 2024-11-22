"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.signup = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
const logger_1 = require("../utils/logger");
const signup = async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        const existingUser = await User_1.default.findOne({ where: { username } });
        if (existingUser) {
            return res.status(400).json({ message: 'Username already exists' });
        }
        await User_1.default.create({
            username,
            password,
        });
        logger_1.logger.info(`New user registered: ${username}`);
        return res.status(201).json({ message: 'User created successfully' });
    }
    catch (error) {
        logger_1.logger.error('Signup error:', error);
        if (error.name === 'SequelizeValidationError') {
            return res.status(400).json({
                message: 'Validation error',
                errors: error.errors.map((e) => e.message),
            });
        }
        return res.status(500).json({ message: 'Error creating user' });
    }
};
exports.signup = signup;
const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        const user = await User_1.default.findOne({ where: { username } });
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const isValidPassword = await user.comparePassword(password);
        if (!isValidPassword) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const token = jsonwebtoken_1.default.sign({ id: user.id }, process.env.JWT_SECRET || 'your-secret-key', { expiresIn: '24h' });
        logger_1.logger.info(`User logged in: ${username}`);
        return res.json({
            token,
            user: {
                id: user.id,
                username: user.username,
            },
        });
    }
    catch (error) {
        logger_1.logger.error('Login error:', error);
        return res.status(500).json({ message: 'Error logging in' });
    }
};
exports.login = login;
//# sourceMappingURL=authController.js.map