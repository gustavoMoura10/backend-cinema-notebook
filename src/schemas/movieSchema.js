import Joi from "joi";

const moviesSchema = Joi.object({
  title: Joi.string().required(),
  originalLanguage: Joi.string()
    .alphanum()
    .max(3)
    .min(2)
    .lowercase()
    .required(),
  description: Joi.string().required(),
  releaseDate: Joi.date().required(),
  runtime: Joi.number().required(),
  imagePath: Joi.string()
}).unknown();
export default moviesSchema;
