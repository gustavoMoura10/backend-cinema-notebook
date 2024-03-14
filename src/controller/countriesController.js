import Countries from "../database/models/Countries.js";
import ErrorSearch from "../errors/ErrorSearch.js";
import countriesSchema from "../schemas/countriesSchema.js";
async function getCountry(req, resp, next) {
  try {
    const { _id } = req.params;
    let country = await Countries.findById(_id);
    if (!country) {
      throw new ErrorSearch("Country not found!");
    }
    country = country.toJSON();
    return resp.status(200).json(country);
  } catch (error) {
    next(error);
  }
}
async function getCountries(req, resp, next) {
  try {
    const countries = await Countries.find();
    return resp.status(200).json(countries);
  } catch (error) {
    next(error);
  }
}
async function createCountry(req, resp, next) {
  try {
    await countriesSchema.validateAsync(req.body);
    let country = await Countries.create(req.body);
    country = country.toJSON();
    return resp.status(200).json(country);
  } catch (error) {
    next(error);
  }
}
async function updateCountry(req, resp, next) {
  try {
    const { _id } = req.params;
    await countriesSchema.validateAsync(req.body);
    let country = await Countries.findById(_id);
    if (!country) {
      throw new ErrorSearch("Country not found!");
    }
    await country.updateOne(req.body);
    country = country.toJSON();
    country = {
      ...country,
      ...req.body
    };
    return resp.status(200).json(country);
  } catch (error) {
    next(error);
  }
}
async function deleteCountry(req, resp, next) {
  try {
    const { _id } = req.params;
    let country = await Countries.findById(_id);
    if (!country) {
      throw new ErrorSearch("Country not found!");
    }
    await country.deleteOne();
    country = country.toJSON();
    return resp.status(200).json(country);
  } catch (error) {
    next(error);
  }
}
export {
  getCountry,
  getCountries,
  createCountry,
  updateCountry,
  deleteCountry
};
