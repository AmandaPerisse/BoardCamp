import { Router } from 'express';
import { postCategories, getCategories } from '../controllers/categories.js';
import validatePostCategoriesSchemaMiddleware from '../middlewares/validatePostCategoriesSchemaMiddleware.js';

const categoriesRouter = Router();

categoriesRouter.post("/categories", validatePostCategoriesSchemaMiddleware, postCategories);
categoriesRouter.get("/categories", getCategories);

export default categoriesRouter;