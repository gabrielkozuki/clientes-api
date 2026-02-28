import mongoose from "mongoose";
import logger from "./logger.js";

const MONGODB_URI = process.env.MONGODB_URI || "";

export async function connectToDatabase() {
  try {
    await mongoose.connect(MONGODB_URI);
    logger.info('Conectado ao MongoDB');
  } catch (error) {
    logger.error({ err: error }, 'Erro ao conectar ao MongoDB');
    process.exit(1);
  }
}

export default mongoose;