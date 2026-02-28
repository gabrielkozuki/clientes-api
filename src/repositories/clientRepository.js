import Client from '../models/Client.js';
import { ConflictError } from '../errors/ConflictError.js';
import { NotFoundError } from '../errors/NotFoundError.js';

export async function createClient(data) {
  try {
    const client = await Client.create(data);

    return {
      id: client._id,
      name: client.name,
      email: client.email,
      document: client.document,
      createdAt: client.created_at,
    };
  } catch (error) {
    if (error.code === 11000) { // MongoDB E11000: chave duplicada
      throw new ConflictError();
    }

    throw error;
  }
}

export async function getAllClients({ page, limit }) {
  try {
    const clients = await Client.find()
      .limit(limit)
      .skip((page - 1) * limit)
      .sort({ created_at: -1 })

    const count = await Client.countDocuments();

    return {
      clients,
      totalPages: Math.ceil(count / limit),
      currentPage: parseInt(page)
    };
  } catch (error) {
    throw error;
  }
}

export async function getClient(id) {
  try {
    const client = await Client.findById(id);

    if (!client) throw new NotFoundError();

    return {
      id: client._id,
      name: client.name,
      email: client.email,
      document: client.document,
      createdAt: client.created_at,
      updatedAt: client.updated_at,
    };
  } catch (error) {
    throw error;
  }
}

export async function updateClient(id, data) {
  try {
    const client = await Client.findByIdAndUpdate(id, data, { // atualiza apenas os campos fornecidos em data
      new: true, // retornar dado já atualizado
      runValidators: true, // faz validações seguindo o model Client
      overwrite: true
    });

    if (!client) throw new NotFoundError();

    return {
      id: client._id,
      name: client.name,
      email: client.email,
      document: client.document,
      createdAt: client.created_at,
      updatedAt: client.updated_at,
    };
  } catch (error) {
    throw error;
  }
}

export async function partialUpdateClient(id, data) {
  try {
    const client = await Client.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true
    });

    if (!client) throw new NotFoundError();

    return {
      id: client._id,
      name: client.name,
      email: client.email,
      document: client.document,
      createdAt: client.created_at,
      updatedAt: client.updated_at,
    };
  } catch (error) {
    throw error;
  }
}