import Client from '../models/Client.js';
import { ConflictError } from '../errors/ConflictError.js';

export async function createClient(data) {
  try {
    const client = await Client.create(data);

    return {
      id: client._id,
      name: client.name,
      email: client.email,
      createdAt: client.createdAt,
    };
  } catch (error) {
    if (error.code === 11000) { // MongoDB E11000: chave duplicada
      throw new ConflictError();
    }

    throw error;
  }
}
