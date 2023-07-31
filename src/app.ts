import 'reflect-metadata';
import 'express-async-errors';
import express, { Application } from 'express';
import { errorHandler } from './errors';
import { userRoutes } from './routes/clients.routes';

const app: Application = express();

app.use(express.json());

app.use('/clients', userRoutes);

app.use(errorHandler);
export default app;
