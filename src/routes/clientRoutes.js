import { Router } from 'express';

import * as clientController from '../controllers/clientController.js';
import { validateRequestBody, validateRequestParams } from '../middlewares/validateRequest.js';

import { createClientSchema } from '../validations/clientSchema.js';
import { paginationSchema } from '../validations/filtersSchema.js';

const router = Router();

router.post('/clients', validateRequestBody(createClientSchema), clientController.create);
router.get('/clients', validateRequestParams(paginationSchema), clientController.getAll);

export default router;
