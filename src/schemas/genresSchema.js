import Joi from "joi";

const genresSchema = Joi.object({
  name: Joi.string().required(),
}).unknown();
export default genresSchema;
