import 'reflect-metadata';
import 'express-async-errors';
import express, { Application } from 'express';
import { errorHandler } from './errors';
import { userRoutes } from './routes/clients.routes';
import { loginRoutes } from './routes/login.routes';
import { contactRoutes } from './routes/contact.routes';
import cors from 'cors';

const app: Application = express();

app.use(express.json());

app.use(cors({ origin: 'http://localhost:5173' }));

app.use('/clients', userRoutes);
app.use('/login', loginRoutes);
app.use('/contacts', contactRoutes);

app.use(errorHandler);
export default app;
