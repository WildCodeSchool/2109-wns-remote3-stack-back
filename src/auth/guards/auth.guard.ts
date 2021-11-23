import { MiddlewareFn } from 'type-graphql';
import { AuthenticationError } from 'apollo-server-errors';
import { IContext } from '../../utils/context/interface/context.interface';
import { log } from '../../utils/logger/logger';

const AuthGuard: MiddlewareFn<IContext> = async ({ context }, next) => {
  if (!context.userId) {
    log.warn('Unauthenticated');
    throw new AuthenticationError('Unauthenticated');
  }
  return next();
};

export { AuthGuard as default };
