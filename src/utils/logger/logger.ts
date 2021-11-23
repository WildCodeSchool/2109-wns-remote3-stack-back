import winston, { format } from 'winston';
import httpContext from 'express-http-context';
import { NODE_ENV } from '../../environments';

const IS_LOCAL = NODE_ENV !== 'production';

const {
  combine, timestamp: ts, printf, colorize,
} = format;

const appFormat = printf(({
  level, message, timestamp, ...meta
}) => {
  let logMessage;
  const { context, ...data } = meta.metadata;
  if (IS_LOCAL) {
    const heapUsed = process.memoryUsage().heapUsed / 1024 / 1024;
    const formattedMemoryUsage = (Math.round(heapUsed * 100) / 100);
    logMessage = `${timestamp} [${level.toUpperCase()}] | [Memory: ${formattedMemoryUsage}MB]: ${message}`;
    if (Object.keys(data).length > 0) {
      logMessage += `\n${JSON.stringify(data, null, 2)}`;
    }
  } else {
    logMessage = {
      level: level.toUpperCase(), timestamp, message,
    };
    if (Object.keys(data).length > 0) {
      logMessage = { ...logMessage, context, data };
    } else {
      logMessage = { ...logMessage, context };
    }
    logMessage = JSON.stringify(logMessage);
  }
  return logMessage;
});

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: combine(
    ts(),
    winston.format.metadata({ fillExcept: ['message', 'level', 'timestamp', 'label'] }),
    appFormat,
    colorize({
      all: IS_LOCAL,
    }),
  ),
  transports: [
    new winston.transports.Console(),
  ],
});

function logging(msg: string, data: any | undefined, level: 'info' | 'debug' | 'warn' | 'error' | 'verbose') {
  // I know it's a bit ugly, but terribly useful to get execution context
  const err = new Error();
  const functionRoute = err.stack?.split('\n')?.[3]?.split('/') || null;
  const functionName = functionRoute?.[functionRoute?.length - 1].split('.')?.[0] || null;
  // Append the function name who called this log function,
  // the http request ID for tracability, and the user ID (if there is one)
  const context = { functionName, requestId: httpContext.get('requestId') || 'global', userId: httpContext.get('userId') || 'global' };
  logger[level](msg, { ...data, context });
}

function info(message: string, data?: any) {
  logging(message, data, 'info');
}

function debug(message: string, data?: any) {
  logging(message, data, 'debug');
}

function trace(message: string, data?: any) {
  logging(message, data, 'debug');
}

function verbose(message: string, data?: any) {
  logging(message, data, 'verbose');
}

function warn(message: string, data?: any) {
  logging(message, data, 'warn');
}

function error(err: unknown, detail?: unknown) {
  if (err instanceof Error) {
    logging(err.name, { message: err.message, stack: err.stack }, 'error');
  }
  logging(String(err), detail, 'error');
}

const log = {
  info,
  debug,
  trace,
  verbose,
  warn,
  error,
};

export { log, logger };
