import Persons from "../database/models/Persons.js";
import ErrorSearch from "../errors/ErrorSearch.js";
import personsSchema from "../schemas/personsSchema.js";
async function getPerson(req, resp, next) {
  try {
    const { _id } = req.params;
    let person = await Persons.findById(_id).populate("nacionalities");
    if (!person) {
      throw new ErrorSearch("Person not found!");
    }
    person = person.toJSON();
    return resp.status(200).json(person);
  } catch (error) {
    next(error);
  }
}
async function getPersons(req, resp, next) {
  try {
    const persons = await Persons.find();
    return resp.status(200).json(persons);
  } catch (error) {
    next(error);
  }
}
async function createPerson(req, resp, next) {
  try {
    await personsSchema.validateAsync(req.body);
    let person = await Persons.create(req.body);
    person = person.toJSON();
    return resp.status(200).json(person);
  } catch (error) {
    next(error);
  }
}
async function updatePerson(req, resp, next) {
  try {
    const { _id } = req.params;
    await personsSchema.validateAsync(req.body);
    let person = await Persons.findById(_id);
    if (!person) {
      throw new ErrorSearch("Person not found!");
    }
    await person.updateOne(req.body);
    person = person.toJSON();
    person = {
      ...person,
      ...req.body
    };
    return resp.status(200).json(person);
  } catch (error) {
    next(error);
  }
}
async function deletePerson(req, resp, next) {
  try {
    const { _id } = req.params;
    let person = await Persons.findById(_id);
    if (!person) {
      throw new ErrorSearch("Person not found!");
    }
    await person.deleteOne();
    person = person.toJSON();
    return resp.status(200).json(person);
  } catch (error) {
    next(error);
  }
}
export { getPerson, getPersons, createPerson, updatePerson, deletePerson };
