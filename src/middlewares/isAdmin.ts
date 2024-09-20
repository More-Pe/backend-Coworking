import { NextFunction, Request, Response } from 'express';

export const isAdmin = (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        if (!req.tokenData) {
            return res.status(401).json({
                success: false,
                message: 'Token missing or invalid',
            });
        }

        if (req.tokenData.role !== 'admin') {
            return res.status(403).json({
                success: false,
                message: 'Unauthorized access',
            });
        }

        next();
    } catch (error) {
        console.error('Error in isAdmin middleware:', error);
        res.status(500).json({
            success: false,
            message: "Internal server error. You don't have permissions.",
        });
    }
};
