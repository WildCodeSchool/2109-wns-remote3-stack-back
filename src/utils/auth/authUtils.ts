import { CookieOptions, Request, Response } from 'express';
import jwt, { SignOptions } from 'jsonwebtoken';
import { ApolloError, AuthenticationError } from 'apollo-server-errors';
import { APP_TOKENIZATION_SECRET } from '@environments/application';
import { ONE_DAY } from '@constants/time';
import IUser from '@user/types/user.type';
import UserService from '@user/user.service';
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
    if (error instanceof Error) {
      log.error(error);
      throw new ApolloError(`User unauthenticated, ${error}`);
    }
    throw new ApolloError('User unauthenticated');
  }
}

function isTokenExpired(expiresIn: number, emittedAt: number) {
  return Date.now() > (expiresIn + emittedAt);
}

async function getUserId(req: Request, res: Response) {
  const token = req.cookies.stack_session;
  if (token) {
    const { userId, expiresIn, emittedAt } = getTokenPayload(token);
    if (isTokenExpired(expiresIn, emittedAt)) {
      res.clearCookie('stack_session');
      log.warn('Session expired');
      throw new AuthenticationError('Session expired');
    }
    let user;
    try {
      user = await UserService().findById(userId);
    } catch (error) {
      log.error(error);
      throw new AuthenticationError('User unauthenticated');
    }
    if (!user) {
      res.clearCookie('stack_session');
      log.warn('Session expired');
      throw new AuthenticationError('Session expired');
    }
    return userId;
  }
  return '';
}

function createVerificationURL(token: string) {
  return `${process.env.FRONTEND_URL}/verifyUser&token=${token}`;
}

export {
  createToken,
  getUserId,
  isTokenExpired,
  getTokenPayload,
  createVerificationURL,
};
