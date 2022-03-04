import postCustomersSchema from "../schemas/postCustomersSchema.js";

export default function validatePostCustomersSchemaMiddleware(req, res, next){

    const validation = postCustomersSchema.validate(req.body);
    if (validation.error) {
        res.sendStatus(422);
        return null;
    }
    next();
}