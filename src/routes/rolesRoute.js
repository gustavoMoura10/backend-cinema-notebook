import { Router } from "express";
import {
  createRole,
  deleteRole,
  getRole,
  getRoles,
  updateRole
} from "../controller/rolesController.js";
import { isAdmin } from "../middlewares/authorization.js";

const route = Router();
route.get("/:_id", getRole);
route.get("/", getRoles);
route.post("/", isAdmin, createRole);
route.put("/:_id", isAdmin, updateRole);
route.delete("/:_id", isAdmin, deleteRole);

export default route;
