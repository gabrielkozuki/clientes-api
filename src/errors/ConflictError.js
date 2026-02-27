  import { AppError } from './AppError.js';

  export class ConflictError extends AppError {
    constructor() {
      super('Conflito de dados', 409);
      
      this.details = [{
        message: `Os dados informados já estão em uso.`
      }]
    }

  }