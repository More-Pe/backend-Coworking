
import dotenv from 'dotenv';
import { AppDataSource } from './database/db';
import authRouter from './modules/authentication/auth.routes';
import express from 'express';
import cors from 'cors';

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:4000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use('/api', authRouter);

const PORT = process.env.PORT || 4000;

AppDataSource.initialize()
	.then(() => {
		console.log('Database connected');
		app.listen(PORT, () => {
			console.log(`Server is running on port ${PORT}`);
		});
	})
	.catch((error) => {
		console.log(error);
	});
