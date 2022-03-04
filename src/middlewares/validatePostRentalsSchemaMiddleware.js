import postRentalsSchema from "../schemas/postRentalsSchema.js";

export default function validatePostRentalsSchemaMiddleware(req, res, next){
    const validation = postRentalsSchema.validate(req.body);
    if (validation.error) {
        res.sendStatus(422);
        return null;
    }
    next();
}