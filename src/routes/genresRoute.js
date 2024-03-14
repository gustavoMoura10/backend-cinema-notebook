import { Router } from "express";
import {
  createGenre,
  deleteGenre,
  getGenres,
  getGenre,
  updateGenre
} from "../controller/genresController.js";
import { isAdmin } from "../middlewares/authorization.js";

const route = Router();
route.get("/:_id", getGenre);
route.get("/", getGenres);
route.post("/", isAdmin, createGenre);
route.put("/:_id", isAdmin, updateGenre);
route.delete("/:_id", isAdmin, deleteGenre);

export default route;
