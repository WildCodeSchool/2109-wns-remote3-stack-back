import { Request, Response } from 'express';
import { mockDeep, MockProxy } from 'jest-mock-extended';
import { IContext } from '@utils/context/interface/context.interface';

// eslint-disable-next-line import/prefer-default-export
export const createMockContext = (): MockProxy<IContext> => ({
  req: mockDeep<Request>(),
  res: mockDeep<Response>(),
});
