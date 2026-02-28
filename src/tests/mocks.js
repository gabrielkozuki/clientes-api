
export const mockMongooseClient = { // documento retornado pelo Mongoose
  _id: '507f1f77bcf86cd799439011',
  name: 'João da Silva',
  email: 'joao@email.com',
  document: '12345678901',
  created_at: new Date(),
  updated_at: new Date(),
};

export const mockMappedClient = { // objeto mapeado no controller
  id: '507f1f77bcf86cd799439011',
  name: 'João da Silva',
  email: 'joao@email.com',
  document: '12345678901',
  createdAt: mockMongooseClient.created_at,
  updatedAt: mockMongooseClient.updated_at,
};
