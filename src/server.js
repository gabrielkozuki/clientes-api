import 'dotenv/config';
import express from 'express';
import swaggerUi from 'swagger-ui-express';
import { readFileSync } from 'fs';
import { load } from 'js-yaml';
import { pinoHttp } from 'pino-http';

import { connectToDatabase } from './db.js';
import clientRoutes from './routes/clientRoutes.js';
import { errorHandler } from './middlewares/errorHandler.js';
import logger from './logger.js';

const app = express();
const PORT = process.env.PORT || 3000;

const swaggerDocument = load(readFileSync('./src/swagger.yml', 'utf8'));

app.use(pinoHttp(logger));
app.use(express.json());
app.use(clientRoutes);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(errorHandler);

try {
  await connectToDatabase();
  
  app.listen(PORT, () => {
    logger.info(`Express rodando na porta ${PORT}`);
  });
} catch (error) {
  logger.error({ err: error }, 'Falha ao iniciar servidor');
  process.exit(1);
}