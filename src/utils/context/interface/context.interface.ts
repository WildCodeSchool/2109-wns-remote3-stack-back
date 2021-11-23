import { Request, Response } from 'express';

export interface IContext {
  userId?: string,
  req: Request,
  res: Response,
}
