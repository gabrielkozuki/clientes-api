import { describe, it, expect, vi, beforeEach } from 'vitest';

import { mockMongooseClient as mockClient } from './mocks.js';
import Client from '../models/Client.js';
import { 
  createClient,
  getClient,
  getAllClients,
  updateClient,
  partialUpdateClient,
  deleteClient
} from '../repositories/clientRepository.js';

import { ConflictError } from '../errors/ConflictError.js';
import { NotFoundError } from '../errors/NotFoundError.js';

vi.mock('../models/Client.js', () => ({
  default: {
    create: vi.fn(),
    findById: vi.fn(),
    find: vi.fn(),
    countDocuments: vi.fn(),
    findByIdAndUpdate: vi.fn(),
    findByIdAndDelete: vi.fn(),
  },
}));

beforeEach(() => {
  vi.clearAllMocks();
});

describe('createClient', () => {
  it('deve criar e retornar o cliente mapeado', async () => {
    Client.create.mockResolvedValue(mockClient);

    const result = await createClient({ name: 'João da Silva', email: 'joao@email.com', document: '12345678901' });

    expect(result).toMatchObject({
      id: mockClient._id,
      name: mockClient.name,
      email: mockClient.email,
      document: mockClient.document,
    });
  });

  it('deve lançar ConflictError quando erro 11000', async () => {
    Client.create.mockRejectedValue({ code: 11000 });

    await expect(createClient({})).rejects.toThrow(ConflictError);
  });
});

describe('getClient', () => {
  it('deve retornar o cliente mapeado', async () => {
    Client.findById.mockResolvedValue(mockClient);

    const result = await getClient('507f1f77bcf86cd799439011');

    expect(result).toMatchObject({
      id: mockClient._id,
      name: mockClient.name,
    });
  });

  it('deve lançar NotFoundError quando cliente não encontrado', async () => {
    Client.findById.mockResolvedValue(null);

    await expect(getClient('507f1f77bcf86cd799439011')).rejects.toThrow(NotFoundError);
  });
});

describe('getAllClients', () => {
  it('deve retornar lista paginada', async () => {
    Client.find.mockReturnValue({
      limit: vi.fn().mockReturnThis(),
      skip: vi.fn().mockReturnThis(),
      sort: vi.fn().mockResolvedValue([mockClient]),
    });
    Client.countDocuments.mockResolvedValue(1);

    const result = await getAllClients({ page: 1, limit: 10 });

    expect(result).toMatchObject({
      clients: expect.any(Array),
      totalPages: 1,
      currentPage: 1,
      count: 1,
    });
  });
});

describe('updateClient', () => {
  it('deve retornar o cliente atualizado', async () => {
    Client.findByIdAndUpdate.mockResolvedValue(mockClient);

    const result = await updateClient('507f1f77bcf86cd799439011', { name: 'Novo Nome' });

    expect(result).toMatchObject({ name: mockClient.name });
  });

  it('deve lançar NotFoundError quando cliente não encontrado', async () => {
    Client.findByIdAndUpdate.mockResolvedValue(null);

    await expect(updateClient('507f1f77bcf86cd799439011', {})).rejects.toThrow(NotFoundError);
  });

  it('deve lançar ConflictError quando erro 11000', async () => {
    Client.findByIdAndUpdate.mockRejectedValue({ code: 11000 });

    await expect(updateClient('507f1f77bcf86cd799439011', {})).rejects.toThrow(ConflictError);
  });
});

describe('partialUpdateClient', () => {
  it('deve retornar o cliente parcialmente atualizado', async () => {
    Client.findByIdAndUpdate.mockResolvedValue(mockClient);

    const result = await partialUpdateClient('507f1f77bcf86cd799439011', { name: 'Novo Nome' });

    expect(result).toMatchObject({ name: mockClient.name });
  });

  it('deve lançar NotFoundError quando cliente não encontrado', async () => {
    Client.findByIdAndUpdate.mockResolvedValue(null);

    await expect(partialUpdateClient('507f1f77bcf86cd799439011', {})).rejects.toThrow(NotFoundError);
  });

  it('deve lançar ConflictError quando erro 11000', async () => {
    Client.findByIdAndUpdate.mockRejectedValue({ code: 11000 });

    await expect(partialUpdateClient('507f1f77bcf86cd799439011', {})).rejects.toThrow(ConflictError);
  });
});

describe('deleteClient', () => {
  it('deve deletar o cliente sem retornar nada', async () => {
    Client.findByIdAndDelete.mockResolvedValue(mockClient);

    await expect(deleteClient('507f1f77bcf86cd799439011')).resolves.toBeUndefined();
  });

  it('deve lançar NotFoundError quando cliente não encontrado', async () => {
    Client.findByIdAndDelete.mockResolvedValue(null);

    await expect(deleteClient('507f1f77bcf86cd799439011')).rejects.toThrow(NotFoundError);
  });
});