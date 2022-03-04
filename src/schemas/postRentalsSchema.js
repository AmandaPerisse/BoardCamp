import joi from 'joi';

const postRentalsSchema = joi.object({
    customerId: joi.number().integer().required(),
    gameId: joi.number().integer().required(),
    daysRented: joi.number().min(0).integer().required()
});

export default postRentalsSchema;