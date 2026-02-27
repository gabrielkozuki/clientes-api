import { Router } from 'express';
import { validateRequest } from '../middlewares/validateRequest.js';
import { createClientSchema } from '../validations/clientSchema.js';
import * as clientController from '../controllers/clientController.js';

const router = Router();

router.post('/clients', validateRequest(createClientSchema), clientController.create);

export default router;
