import Roles from "../database/models/Roles.js";
import ErrorSearch from "../errors/ErrorSearch.js";
import rolesSchema from "../schemas/rolesSchema.js";
async function getRole(req, resp, next) {
  try {
    const { _id } = req.params;
    let role = await Roles.findById(_id).populate("nacionalities");
    if (!role) {
      throw new ErrorSearch("Role not found!");
    }
    role = role.toJSON();
    return resp.status(200).json(role);
  } catch (error) {
    next(error);
  }
}
async function getRoles(req, resp, next) {
  try {
    const roles = await Roles.find().populate("person");
    return resp.status(200).json(roles);
  } catch (error) {
    next(error);
  }
}
async function createRole(req, resp, next) {
  try {
    await rolesSchema.validateAsync(req.body);
    let role = await Roles.create(req.body);
    role = role.toJSON();
    return resp.status(200).json(role);
  } catch (error) {
    next(error);
  }
}
async function updateRole(req, resp, next) {
  try {
    const { _id } = req.params;
    await rolesSchema.validateAsync(req.body);
    let role = await Roles.findById(_id);
    if (!role) {
      throw new ErrorSearch("Role not found!");
    }
    await role.updateOne(req.body);
    role = role.toJSON();
    role = {
      ...role,
      ...req.body
    };
    return resp.status(200).json(role);
  } catch (error) {
    next(error);
  }
}
async function deleteRole(req, resp, next) {
  try {
    const { _id } = req.params;
    let role = await Roles.findById(_id);
    if (!role) {
      throw new ErrorSearch("Role not found!");
    }
    await role.deleteOne();
    role = role.toJSON();
    return resp.status(200).json(role);
  } catch (error) {
    next(error);
  }
}
export { getRole, getRoles, createRole, updateRole, deleteRole };
