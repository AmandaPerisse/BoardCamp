import { Router } from 'express';
import { postCustomers, getCustomers, getCustomersId, putCustomers } from '../controllers/customers.js';
import validatePostCustomersSchemaMiddleware from '../middlewares/validatePostCustomersSchemaMiddleware.js';

const categoriesRouter = Router();

categoriesRouter.post("/customers", validatePostCustomersSchemaMiddleware, postCustomers);
categoriesRouter.put("/customers:id", validatePostCustomersSchemaMiddleware, putCustomers);
categoriesRouter.get("/customers", getCustomers);
categoriesRouter.get("/customers:id", getCustomersId);

export default categoriesRouter;