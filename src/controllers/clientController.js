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

export async function getById(req, res, next) {
  try {
    const { id } = req.params;
    const client = await clientRepository.getClient(id);

    return res.status(200).json(client);
  } catch(error) {
    next(error);
  }
}

export async function update(req, res, next) {
  try {
    const { id } = req.params;
    const client = await clientRepository.updateClient(id, req.body);

    return res.status(200).json(client);
  } catch (error) {
    next(error);
  }
}

export async function partialUpdate(req, res, next) {
  try {
    const { id } = req.params;
    const client = await clientRepository.partialUpdateClient(id, req.body);

    return res.status(200).json(client);
  } catch (error) {
    next(error);
  }
}

export async function remove(req, res, next) {
  try {
    const { id } = req.params;
    await clientRepository.deleteClient(id);

    return res.status(204).send();
  } catch (error) {
    next(error);
  }
}