import { Request, Response } from 'express';
import { AuthService } from './auth.service';

export const register = async (req: Request, res: Response) => {
    try {
        const { email, password, startup } = req.body;

        if (!email || !password || !startup) {
            return res.status(400).json({
                success: false,
                message: 'Email, password, and startup are required',
            });
        }

        const newPerson = await AuthService.register(email, password, startup);

        return res.status(201).json({
            success: true,
            message: 'User registered successfully',
            data: newPerson,
        });
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: error.message || 'User registration failed',
        });
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Email and password are required',
            });
        }

        const { token } = await AuthService.login(email, password);

        return res.status(200).json({
            success: true,
            message: 'User authenticated',
            token: token,
        });
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: error.message || 'User login failed',
        });
    }
};
