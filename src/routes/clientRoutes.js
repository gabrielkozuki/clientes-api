import { Router } from 'express';

import * as clientController from '../controllers/clientController.js';
import { validateRequestBody, validateRequestParams, validateRequestRouteParams } from '../middlewares/validateRequest.js';

import { zodClientSchema, zodPartialClientSchema } from '../validations/clientSchema.js';
import { paginationSchema, documentIdParamsSchema } from '../validations/paramsSchema.js';

const router = Router();

router.post('/clients', validateRequestBody(zodClientSchema), clientController.create);
router.get('/clients', validateRequestParams(paginationSchema), clientController.getAll);
router.get('/clients/:id', validateRequestRouteParams(documentIdParamsSchema), clientController.getById);
router.put('/clients/:id', validateRequestRouteParams(documentIdParamsSchema), validateRequestBody(zodClientSchema), clientController.update);
router.patch('/clients/:id', validateRequestRouteParams(documentIdParamsSchema), validateRequestBody(zodPartialClientSchema), clientController.partialUpdate);
router.delete('/clients/:id', validateRequestRouteParams(documentIdParamsSchema), clientController.remove);

export default router;
