import { NextFunction, Request, Response } from 'express';
import { validate as isUUID } from 'uuid';
import { AppError } from '../errors';

export const verifyIsUUIDMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const id = req.params.id;

  if (!isUUID(id)) throw new AppError('id must be a valid uuid');

  return next();
};
