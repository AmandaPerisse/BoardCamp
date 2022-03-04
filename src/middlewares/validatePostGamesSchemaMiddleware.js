import postGamesSchema from "../schemas/postGamesSchema.js";

export default function validatePostGamesSchemaMiddleware(req, res, next){
    req.body.stockTotal = parseInt(req.body.stockTotal);
    req.body.pricePerDay = parseInt(req.body.pricePerDay);
    const validation = postGamesSchema.validate(req.body);
    if (validation.error) {
        res.sendStatus(422);
        return null;
    }
    next();
}