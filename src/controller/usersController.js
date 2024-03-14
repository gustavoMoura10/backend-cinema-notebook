import Users from "../database/models/Users.js";
import ErrorSearch from "../errors/ErrorSearch.js";
import ErrorUnauthorized from "../errors/ErrorUnauthorized.js";
import { usersSchema, loginSchema } from "../schemas/usersSchema.js";
import bcrypt from "bcryptjs";
import { generateJWT } from "../utils.js";

async function getUser(req, resp, next) {
  try {
    const { _id } = req.params;
    let user = await Users.findById(_id).populate("nacionalities");
    if (!user) {
      throw new ErrorSearch("User not found!");
    }
    user = user.toJSON();
    return resp.status(200).json(user);
  } catch (error) {
    next(error);
  }
}
async function getUsers(req, resp, next) {
  try {
    const users = await Users.find();
    return resp.status(200).json(users);
  } catch (error) {
    next(error);
  }
}
async function loginUser(req, resp, next) {
  try {
    await loginSchema.validateAsync(req.body);
    const { email, username, password } = req.body;
    let search = {};
    if (email) search.email = email;
    if (username) search.username = username;
    let user = await Users.findOne(search);
    if (!user) {
      throw new ErrorSearch("User not found!");
    }
    user = user.toJSON();
    const compare = bcrypt.compareSync(password, user.password);
    if (!compare) {
      throw new ErrorUnauthorized("Wrong Password");
    }
    delete user.password;
    const token = generateJWT(user);
    return resp.status(200).json({ user, token });
  } catch (error) {
    next(error);
  }
}
async function newTokenUser(req, resp, next) {
  try {
    const _id = req.headers["_id"];
    let user = await Users.findById(_id);
    user = user.toJSON();
    delete user.password;
    const token = generateJWT(user);
    return resp.status(200).json({ user, token });
  } catch (error) {
    next(error);
  }
}
async function createUser(req, resp, next) {
  try {
    await usersSchema.validateAsync(req.body);
    let user = await Users.create(req.body);
    user = user.toJSON();
    delete user.password;
    return resp.status(200).json(user);
  } catch (error) {
    next(error);
  }
}
async function updateUser(req, resp, next) {
  try {
    const { _id } = req.params;
    await usersSchema.validateAsync(req.body);
    let user = await Users.findById(_id);
    if (!user) {
      throw new ErrorSearch("User not found!");
    }
    await user.updateOne(req.body);
    user = user.toJSON();
    user = {
      ...user,
      ...req.body
    };
    return resp.status(200).json(user);
  } catch (error) {
    next(error);
  }
}
async function deleteUser(req, resp, next) {
  try {
    const { _id } = req.params;
    let user = await Users.findById(_id);
    if (!user) {
      throw new ErrorSearch("User not found!");
    }
    await user.deleteOne();
    user = user.toJSON();
    return resp.status(200).json(user);
  } catch (error) {
    next(error);
  }
}
export {
  getUser,
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  loginUser,
  newTokenUser
};
