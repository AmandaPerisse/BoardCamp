import joi from 'joi';

const postGamesSchema = joi.object({
    name: joi.string().required(),
    image: joi.string().required(),
    stockTotal: joi.number().integer().min(0).required(),
    categoryId: joi.number().integer().min(0).required(),
    pricePerDay: joi.number().integer().min(0).required()
});

export default postGamesSchema;