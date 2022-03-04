import joi from 'joi';

const postCustomersSchema = joi.object({
    cpf: joi.string().min(11).max(11).required(),
    phone: joi.string().min(10).max(11).required(),
    name: joi.string().required(),
    birthday: joi.date().iso().required()
});

export default postCustomersSchema;