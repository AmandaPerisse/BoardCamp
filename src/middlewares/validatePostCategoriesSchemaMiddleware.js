import postCategoriesSchema from '../schemas/postCategoriesSchema.js';

export default function validatePostCategoriesSchemaMiddleware(req, res, next){
    const validation = postCategoriesSchema.validate(req.body);
    if (validation.error) {
        res.sendStatus(400);
        return null;
    }
    next();
}