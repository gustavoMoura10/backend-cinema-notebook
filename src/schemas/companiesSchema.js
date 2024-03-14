import Joi from "joi";

const companiesSchema = Joi.object({
  name: Joi.string().required(),
  country: Joi.string().hex().length(24)
}).unknown();
export default companiesSchema;
