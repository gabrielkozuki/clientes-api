import { describe, it, expect, vi, beforeEach } from 'vitest';

import { mockMappedClient as mockClient } from './mocks.js';
import * as clientController from '../controllers/clientController.js';
import * as clientRepository from '../repositories/clientRepository.js';

import { NotFoundError } from '../errors/NotFoundError.js';
import { ConflictError } from '../errors/ConflictError.js';

vi.mock('../repositories/clientRepository.js', () => ({
  createClient: vi.fn(),
  getAllClients: vi.fn(),
  getClient: vi.fn(),
  updateClient: vi.fn(),
  partialUpdateClient: vi.fn(),
  deleteClient: vi.fn(),
}));

const mockReq = (overrides = {}) => ({
  body: {},
  params: {},
  query: {},
  ...overrides,
});

const mockRes = () => {
  const res = {};

  res.status = vi.fn().mockReturnValue(res);
  res.json = vi.fn().mockReturnValue(res);
  res.send = vi.fn().mockReturnValue(res);

  return res;
};

const mockNext = vi.fn();

beforeEach(() => {
  vi.clearAllMocks();
});

describe('create', () => {
  it('deve retornar 201 com o cliente criado', async () => {
    clientRepository.createClient.mockResolvedValue(mockClient);
    const req = mockReq({ body: { name: 'João', email: 'joao@email.com', document: '12345678901' } });
    const res = mockRes();

    await clientController.create(req, res, mockNext);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(mockClient);
  });

  it('deve chamar next com erro em caso de falha', async () => {
    const error = new ConflictError();
    clientRepository.createClient.mockRejectedValue(error);
    const req = mockReq({ body: {} });
    const res = mockRes();

    await clientController.create(req, res, mockNext);

    expect(mockNext).toHaveBeenCalledWith(error);
  });
});

describe('getAll', () => {
  it('deve retornar 200 com a lista de clientes', async () => {
    const mockResult = { clients: [mockClient], totalPages: 1, currentPage: 1, count: 1 };
    clientRepository.getAllClients.mockResolvedValue(mockResult);
    const req = mockReq({ query: { page: 1, limit: 10 } });
    const res = mockRes();

    await clientController.getAll(req, res, mockNext);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockResult);
  });
});

describe('getById', () => {
  it('deve retornar 200 com o cliente encontrado', async () => {
    clientRepository.getClient.mockResolvedValue(mockClient);
    const req = mockReq({ params: { id: '507f1f77bcf86cd799439011' } });
    const res = mockRes();

    await clientController.getById(req, res, mockNext);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockClient);
  });

  it('deve chamar next com NotFoundError quando cliente não encontrado', async () => {
    const error = new NotFoundError();
    clientRepository.getClient.mockRejectedValue(error);
    const req = mockReq({ params: { id: '507f1f77bcf86cd799439011' } });
    const res = mockRes();

    await clientController.getById(req, res, mockNext);

    expect(mockNext).toHaveBeenCalledWith(error);
  });
});

describe('update', () => {
  it('deve retornar 200 com o cliente atualizado', async () => {
    clientRepository.updateClient.mockResolvedValue(mockClient);
    const req = mockReq({ params: { id: '507f1f77bcf86cd799439011' }, body: { name: 'Novo Nome' } });
    const res = mockRes();

    await clientController.update(req, res, mockNext);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockClient);
  });
});

describe('partialUpdate', () => {
  it('deve retornar 200 com o cliente parcialmente atualizado', async () => {
    clientRepository.partialUpdateClient.mockResolvedValue(mockClient);
    const req = mockReq({ params: { id: '507f1f77bcf86cd799439011' }, body: { name: 'Novo Nome' } });
    const res = mockRes();

    await clientController.partialUpdate(req, res, mockNext);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockClient);
  });
});

describe('remove', () => {
  it('deve retornar 204 sem corpo', async () => {
    clientRepository.deleteClient.mockResolvedValue(undefined);
    const req = mockReq({ params: { id: '507f1f77bcf86cd799439011' } });
    const res = mockRes();

    await clientController.remove(req, res, mockNext);

    expect(res.status).toHaveBeenCalledWith(204);
    expect(res.send).toHaveBeenCalled();
  });

  it('deve chamar next com NotFoundError quando cliente não encontrado', async () => {
    const error = new NotFoundError();
    clientRepository.deleteClient.mockRejectedValue(error);
    const req = mockReq({ params: { id: '507f1f77bcf86cd799439011' } });
    const res = mockRes();

    await clientController.remove(req, res, mockNext);

    expect(mockNext).toHaveBeenCalledWith(error);
  });
});