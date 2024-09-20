import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { AuthService } from './auth.service'

export const register = async (req: Request, res: Response) => {
	try {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({
				success: false,
				errors: errors.array(),
			});
		}

		const { email, password_hash } = req.body;
		const newPerson = await AuthService.registerPerson(email, password_hash);

		return res.status(201).json({
			success: true,
			message: 'Person registered successfully',
			data: newPerson,
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: 'Person cannot be registered',
			error: error,
		});
	}
};

export const login = async (req: Request, res: Response) => {
	try {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({
				success: false,
				errors: errors.array(),
			});
		}

		const { email, password_hash } = req.body;
		const { token, person } = await AuthService.loginPerson(email, password_hash);

		res.status(200).json({
			success: true,
			message: 'Person logged in',
			token: token,
			person: person,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: 'Person cannot be logged in',
			error: error,
		});
	}
};
