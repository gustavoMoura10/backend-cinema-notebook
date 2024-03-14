import { Router } from "express";
import {
  createCountry,
  deleteCountry,
  getCountry,
  getCountries,
  updateCountry
} from "../controller/countriesController.js";
import { isAdmin } from "../middlewares/authorization.js";

const route = Router();
route.get("/:_id", getCountry);
route.get("/", getCountries);
route.post("/", isAdmin, createCountry);
route.put("/:_id", isAdmin, updateCountry);
route.delete("/:_id", isAdmin, deleteCountry);

export default route;
