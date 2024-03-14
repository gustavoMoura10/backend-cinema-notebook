import { Router } from "express";
import {
  createCompany,
  deleteCompany,
  getCompanies,
  getCompany,
  updateCompany
} from "../controller/companiesController.js";
import { isAdmin } from "../middlewares/authorization.js";

const route = Router();
route.get("/:_id", getCompany);
route.get("/", getCompanies);
route.post("/", isAdmin, createCompany);
route.put("/:_id", isAdmin, updateCompany);
route.delete("/:_id", isAdmin, deleteCompany);

export default route;
