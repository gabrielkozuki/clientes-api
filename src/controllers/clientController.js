import * as clientRepository from '../repositories/clientRepository.js';

export async function create(req, res, next) {
  try {
    const client = await clientRepository.createClient(req.body);

    return res.status(201).json(client);
  } catch (error) {
    next(error);
  }
}
