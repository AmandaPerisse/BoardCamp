import joi from 'joi';

const postCategoriesSchema = joi.object({
    name: joi.string().required()
});

export default postCategoriesSchema;