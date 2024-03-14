import Companies from "../database/models/Companies.js";
import ErrorSearch from "../errors/ErrorSearch.js";
import companiesSchema from "../schemas/companiesSchema.js";

async function getCompany(req, resp, next) {
  try {
    const { _id } = req.params;
    let company = await Companies.findById(_id).populate("country");
    if (!company) {
      throw new ErrorSearch("Role not found!");
    }
    company = company.toJSON();
    return resp.status(200).json(company);
  } catch (error) {
    next(error);
  }
}
async function getCompanies(req, resp, next) {
  try {
    const companies = await Companies.find().populate("country");
    return resp.status(200).json(companies);
  } catch (error) {
    next(error);
  }
}
async function createCompany(req, resp, next) {
  try {
    await companiesSchema.validateAsync(req.body);
    let company = await Companies.create(req.body);
    company = company.toJSON();
    return resp.status(200).json(company);
  } catch (error) {
    next(error);
  }
}
async function updateCompany(req, resp, next) {
  try {
    const { _id } = req.params;
    await companiesSchema.validateAsync(req.body);
    let company = await Companies.findById(_id);
    if (!company) {
      throw new ErrorSearch("Role not found!");
    }
    await company.updateOne(req.body);
    company = company.toJSON();
    company = {
      ...company,
      ...req.body
    };
    return resp.status(200).json(company);
  } catch (error) {
    next(error);
  }
}
async function deleteCompany(req, resp, next) {
  try {
    const { _id } = req.params;
    let company = await Companies.findById(_id);
    if (!company) {
      throw new ErrorSearch("Role not found!");
    }
    await company.deleteOne();
    company = company.toJSON();
    return resp.status(200).json(company);
  } catch (error) {
    next(error);
  }
}
export {
  getCompany,
  getCompanies,
  createCompany,
  updateCompany,
  deleteCompany
};
