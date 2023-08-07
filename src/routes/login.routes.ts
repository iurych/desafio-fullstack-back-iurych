import { Router } from 'express';
import { createTokenSchema } from '../schemas/login.schema';
import { validateBodyMiddleware } from '../middleware/body.validate.mid';
import { createTokenController } from '../controllers/login.controller';

export const loginRoutes: Router = Router();

loginRoutes.post(
  '',
  validateBodyMiddleware(createTokenSchema),
  createTokenController
);
