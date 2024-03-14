import Joi from "joi";

const countriesSchema = Joi.object({
  name: Joi.string().required(),
  acronym: Joi.string().uppercase().max(3),
  imagePath: Joi.string()
}).unknown();
export default countriesSchema;
