import { createTokenService } from '../services/session/token.service';
import { Request, Response } from 'express';

export const createTokenController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const login = req.body;
  const token: string = await createTokenService(login);

  return res.json({ token });
};
