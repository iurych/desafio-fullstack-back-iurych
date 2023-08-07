import { NextFunction, Request, Response } from 'express';
import { Repository } from 'typeorm';
import { Client } from '../entities/client.entity';
import { AppDataSource } from '../data-source';
import { AppError } from '../errors';

export const verifyClientByIdMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const clientRepo: Repository<Client> = AppDataSource.getRepository(Client);

  const client: Client | null = await clientRepo.findOneBy({
    id: req.params.id,
  });

  if (!client) throw new AppError('client not found', 404);

  res.locals.client = client;

  return next();
};
