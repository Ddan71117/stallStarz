"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.login = exports.signup = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
const signup = async (req, res) => {
    try {
        const { username, password } = req.body;
        const existingUser = await User_1.default.findOne({
            where: { username }
        });
        if (existingUser) {
            return res.status(400).json({ message: 'Username already exists' });
        }
        const user = await User_1.default.create({
            username,
            password
        });
        return res.status(201).json({
            message: 'User created successfully',
            user: {
                id: user.id,
                username: user.username
            }
        });
    }
    catch (error) {
        console.error('Signup error:', error);
        return res.status(500).json({ message: 'Error creating user' });
    }
};
exports.signup = signup;
const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User_1.default.findOne({
            where: { username }
        });
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const isValidPassword = await user.comparePassword(password);
        if (!isValidPassword) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const token = jsonwebtoken_1.default.sign({ id: user.id }, process.env.JWT_SECRET || 'your-secret-key', { expiresIn: '24h' });
        return res.json({
            token,
            user: {
                id: user.id,
                username: user.username
            }
        });
    }
    catch (error) {
        console.error('Login error:', error);
        return res.status(500).json({ message: 'Error logging in' });
    }
};
exports.login = login;
const verifyToken = async (req, res) => {
    try {
        const authHeader = req.headers.authorization;
        const token = authHeader === null || authHeader === void 0 ? void 0 : authHeader.replace('Bearer ', '');
        if (!token) {
            return res.status(401).json({ message: 'No token provided' });
        }
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || 'your-secret-key');
        const user = await User_1.default.findOne({
            where: { id: decoded.id }
        });
        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }
        return res.json({
            user: {
                id: user.id,
                username: user.username
            }
        });
    }
    catch (error) {
        console.error('Token verification error:', error);
        return res.status(401).json({ message: 'Invalid token' });
    }
};
exports.verifyToken = verifyToken;
//# sourceMappingURL=authController.js.map