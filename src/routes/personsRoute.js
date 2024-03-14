import { Router } from "express";
import {
  createPerson,
  deletePerson,
  getPerson,
  getPersons,
  updatePerson
} from "../controller/personsController.js";
import { isAdmin } from "../middlewares/authorization.js";

const route = Router();
route.get("/:_id", getPerson);
route.get("/", getPersons);
route.post("/", isAdmin, createPerson);
route.put("/:_id", isAdmin, updatePerson);
route.delete("/:_id", isAdmin, deletePerson);

export default route;
