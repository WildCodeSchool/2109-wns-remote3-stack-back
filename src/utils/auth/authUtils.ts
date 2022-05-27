import { CookieOptions, Request } from 'express';
import jwt, { SignOptions } from 'jsonwebtoken';
import { ApolloError, AuthenticationError } from 'apollo-server-errors';
import { APP_TOKENIZATION_SECRET } from '../../environments';
import { ONE_DAY } from '../../constants';
import IUser from '../../models/user/types/user.type';
import UserService from '../../models/user/user.service';
import { log } from '../logger/logger';

export interface IToken {
  expiresIn: number,
  emittedAt: number,
  userId: string,
}

export const COOKIE_SETTINGS: CookieOptions = {
  // cookie is for all my domain
  path: '/',
  // HTTPS?
  secure: true,
  // only usable in my domain
  sameSite: 'none',
  // not readable by the browser
  httpOnly: true,
};

// Set an expiration data for our token
function generateTokenSettings() {
  return {
    expiresIn: ONE_DAY,
    emittedAt: Date.now(),
  };
}

function createToken(
  user: Omit<IUser, 'password'>,
  tokenOptions: SignOptions = {},
): string {
  const tokenSettings = { ...generateTokenSettings(), ...tokenOptions };
  return jwt.sign(
    {
      userId: user.id,
      ...tokenSettings,
    },
    APP_TOKENIZATION_SECRET,
  );
}

function getTokenPayload(token: string): IToken {
  try {
    return jwt.verify(token, APP_TOKENIZATION_SECRET) as IToken;
  } catch (error) {
    throw new ApolloError('User unauthenticated');
  }
}

function isTokenExpired(expiresIn: number, emittedAt: number) {
  return Date.now() > (expiresIn + emittedAt);
}

async function getUserId(req: Request) {
  const token = req.headers.authorization;
  if (token) {
    const { userId, expiresIn, emittedAt } = getTokenPayload(token);
    if (isTokenExpired(expiresIn, emittedAt)) {
      log.warn('Session expired');
      throw new AuthenticationError('Session expired');
    }
    let user;
    try {
      user = await UserService().findById(userId);
    } catch (error) {
      throw new AuthenticationError('User unauthenticated');
    }
    if (!user) {
      log.warn('Session expired');
      throw new AuthenticationError('Session expired');
    }
    return userId;
  }
  return '';
}

export {
  createToken,
  getUserId,
  isTokenExpired,
  getTokenPayload,
};
