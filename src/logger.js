import pino from 'pino';

const isDevelopment = process.env.NODE_ENV !== 'production';

const devTransport = {
  target: 'pino-pretty',
  options: {
    colorize: true,
    translateTime: 'HH:MM:ss',
    ignore: 'pid,hostname',
  },
};

const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
  transport: isDevelopment ? devTransport : {},
});

export default logger;