import * as clientRepository from '../repositories/clientRepository.js';

export async function create(req, res, next) {
  try {
    const client = await clientRepository.createClient(req.body);

    return res.status(201).json(client);
  } catch (error) {
    next(error);
  }
}

export async function getAll(req, res, next) {
  try {
    const { page = 1, limit = 10 } = req.query;

    const clients = await clientRepository.getAllClients({ page, limit })
    return res.status(200).json(clients);
  } catch(error) {
    next(error);
  }
}
