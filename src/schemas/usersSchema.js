import Joi from "joi";

const usersSchema = Joi.object({
  fullname: Joi.string().required(),
  username: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).max(20).required(),
  retypePassword: Joi.string()
    .valid(Joi.ref("password"))
    .min(8)
    .max(20)
    .required(),
  admin: Joi.boolean()
}).unknown();
const loginSchema = Joi.object({
  email: Joi.string(),
  username: Joi.string(),
  password: Joi.string().required()
})
  .xor("username", "email")
  .unknown();
export { usersSchema, loginSchema };
