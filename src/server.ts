
import dotenv from 'dotenv';
import { AppDataSource } from './database/db';
import authRouter from './modules/authentication/auth.routes';
import accessRouter from './modules/access/access.routes';
import administrationRouter from './modules/administration/administration.routes';
import roomRouter from './modules/room/room.routes';
import personRouter from './modules/person/person.routes';
import accessHistoryRouter from './modules/access_history/access_history.routes';
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
app.use('/api/accesses', accessRouter);
app.use('/api/administration', administrationRouter);
app.use('/api/rooms', roomRouter);
app.use('/api/persons', personRouter);
app.use('/api/access_histories', accessHistoryRouter);



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
