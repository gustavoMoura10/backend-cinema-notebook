import Joi from "joi";

const personsSchema = Joi.object({
  name: Joi.string().required(),
  biography: Joi.string(),
  imagePath: Joi.string(),
  gender: Joi.string().valid("M", "F", "NB").uppercase().max(3),
  birthday: Joi.date().required(),
  deathday: Joi.date(),
  nacionalities: Joi.array().required()
}).unknown();
export default personsSchema;
