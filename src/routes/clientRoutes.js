import { Router } from 'express';

import * as clientController from '../controllers/clientController.js';
import { validateRequestBody, validateRequestParams, validateRequestRouteParams } from '../middlewares/validateRequest.js';

import { createClientSchema } from '../validations/clientSchema.js';
import { paginationSchema, documentIdParamsSchema } from '../validations/paramsSchema.js';

const router = Router();

router.post('/clients', validateRequestBody(createClientSchema), clientController.create);
router.get('/clients', validateRequestParams(paginationSchema), clientController.getAll);
router.get('/clients/:id', validateRequestRouteParams(documentIdParamsSchema), clientController.getById);

export default router;
