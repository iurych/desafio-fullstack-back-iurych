import { NextFunction, Request, Response } from 'express';
import { Repository } from 'typeorm';
import { Client } from '../entities/client.entity';
import { AppDataSource } from '../data-source';
import { AppErorr } from '../errors';

export const ensureUniqueDataMiddleware = async (
  req: Request,
  _res: Response,
  next: NextFunction
): Promise<void> => {
  const clientRepo: Repository<Client> = AppDataSource.getRepository(Client);
  const { email, phoneNumber, fullName } = req.body;

  if (fullName) {
    const exist: boolean = await clientRepo.exist({
      where: { fullName: fullName },
    });

    if (exist) throw new AppErorr('This name already exist', 409);
  }

  if (email) {
    const exist: boolean = await clientRepo.exist({
      where: { email: email },
    });

    if (exist) throw new AppErorr('Email already exist', 409);
  }

  if (phoneNumber) {
    const exist: boolean = await clientRepo.exist({
      where: { phoneNumber: phoneNumber },
    });

    if (exist)
      throw new AppErorr('This Phone Number has already been registered', 409);
  }

  return next();
};
