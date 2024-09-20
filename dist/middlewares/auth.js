"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth = (req, res, next) => {
    try {
        if (!req.headers.authorization) {
            return res.status(401).json({
                suucess: false,
                message: "Unauthorized"
            });
        }
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        req.tokenData = {
            id: decoded.id,
            role: decoded.role,
            email: decoded.email
        };
        next();
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Authentication error",
            error: error
        });
    }
};
exports.auth = auth;
