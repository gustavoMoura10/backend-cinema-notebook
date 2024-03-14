import Joi from "joi";

const rolesSchema = Joi.object({
  function: Joi.string().required()
}).unknown();
export default rolesSchema;
