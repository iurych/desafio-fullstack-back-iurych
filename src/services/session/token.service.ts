import { AppDataSource } from '../../data-source';
import { Client } from '../../entities/client.entity';
import { AppError } from '../../errors';
import { tLoginRequest } from '../../interfaces/login.interface';
import { Repository } from 'typeorm';
import { compare } from 'bcryptjs';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

export const createTokenService = async (
  payload: tLoginRequest
): Promise<string> => {
  const clientRepo: Repository<Client> = AppDataSource.getRepository(Client);

  const client: Client | null = await clientRepo.findOneBy({
    email: payload.email,
  });

  if (!client) throw new AppError('Invalid Credentials', 401);

  const passwordMatch: boolean = await compare(
    payload.password,
    client.password
  );

  if (!passwordMatch) throw new AppError('Invalid Credentials', 401);

  const token: string = jwt.sign(
    { email: payload.email },
    process.env.SECRET_KEY!,
    {
      expiresIn: '24h',
      subject: String(client.id),
    }
  );

  return token;
};
