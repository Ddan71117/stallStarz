import jwt from 'jsonwebtoken';
import User from '../models/User';
export const signup = async (req, res) => {
    try {
        const { username, password } = req.body;
        const existingUser = await User.findOne({
            where: { username }
        });
        if (existingUser) {
            return res.status(400).json({ message: 'Username already exists' });
        }
        const user = await User.create({
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
export const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({
            where: { username }
        });
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const isValidPassword = await user.comparePassword(password);
        if (!isValidPassword) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET || 'your-secret-key', { expiresIn: '24h' });
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
export const verifyToken = async (req, res) => {
    try {
        const authHeader = req.headers.authorization;
        const token = authHeader?.replace('Bearer ', '');
        if (!token) {
            return res.status(401).json({ message: 'No token provided' });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
        const user = await User.findOne({
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
//# sourceMappingURL=authController.js.map