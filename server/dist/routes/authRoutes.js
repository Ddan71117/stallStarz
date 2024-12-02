"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = require("../controllers/authController");
const auth_1 = require("../middleware/auth");
const authRouter = express_1.default.Router();
// Auth routes
authRouter.post('/signup', authController_1.signup);
authRouter.post('/login', authController_1.login);
authRouter.get('/verify', auth_1.auth, authController_1.verifyToken);
exports.default = authRouter;
//# sourceMappingURL=authRoutes.js.map