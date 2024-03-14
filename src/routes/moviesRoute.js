import { Router } from "express";
import {
  createMovie,
  deleteMovie,
  getMovie,
  getMovies,
  updateMovie
} from "../controller/moviesController.js";
import { isAdmin } from "../middlewares/authorization.js";

const route = Router();
route.get("/:_id", getMovie);
route.get("/", getMovies);
route.post("/", isAdmin, createMovie);
route.put("/:_id", isAdmin, updateMovie);
route.delete("/:_id", isAdmin, deleteMovie);

export default route;
