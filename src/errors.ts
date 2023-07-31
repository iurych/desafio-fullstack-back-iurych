import { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';

export class AppErorr extends Error {
  statusCode: number;
  constructor(message: string, statusCode: number = 400) {
    super(message);
    this.statusCode = statusCode;
  }
}

export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
): Response | void => {
  if (error instanceof AppErorr) {
    return res.status(error.statusCode).json({ message: error.message });
  } else if (error instanceof ZodError) {
    return res.status(400).json({ message: error.flatten().fieldErrors });
  }
  console.error(error);

  return res.status(500).json({ message: 'Internal Serve Error' });
};
