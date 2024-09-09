import 'dotenv/config';
import { AppDataSource } from './database/db';
import express from 'express';

AppDataSource.initialize()
	.then(() => {
		console.log('Database connected');
	})
	.catch((error) => {
		console.log(error);
	});
