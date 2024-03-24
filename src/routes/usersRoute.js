import { Router } from "express";
import {
  createUser,
  deleteUser,
  getUser,
  getUsers,
  loginUser,
  newTokenUser,
  updateUser
} from "../controller/usersController.js";
import { isYou, jwtToken } from "../middlewares/authorization.js";

const route = Router();
route.get("/revalidateToken", jwtToken, newTokenUser);
route.get("/:_id", jwtToken, getUser);
route.get("/", jwtToken, getUsers);
route.post("/", createUser);
route.post("/login", loginUser);
route.put("/:_id", jwtToken, isYou, updateUser);
route.delete("/:_id", jwtToken, isYou, deleteUser);

export default route;
