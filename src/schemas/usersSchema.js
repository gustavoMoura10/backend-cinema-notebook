import Joi from "joi";
const usersUpdate = Joi.object({
  fullname: Joi.string(),
  username: Joi.string(),
  email: Joi.string().email(),
  password: Joi.string().min(8).max(20),
  imagePath: Joi.any()
});
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
  imagePath: Joi.any()
});
const loginSchema = Joi.object({
  login: Joi.string().required(),
  password: Joi.string().required()
}).unknown();
export { usersSchema, loginSchema, usersUpdate };
