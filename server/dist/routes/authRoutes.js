"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = require("../controllers/authController");
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
// Auth routes
router.post('/signup', authController_1.signup);
router.post('/login', authController_1.login);
router.get('/verify', auth_1.auth, authController_1.verifyToken);
exports.default = router;
//# sourceMappingURL=authRoutes.js.map