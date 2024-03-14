import Genres from "../database/models/Genres.js";
import ErrorSearch from "../errors/ErrorSearch.js";
import companiesSchema from "../schemas/companiesSchema.js";

async function getGenre(req, resp, next) {
  try {
    const { _id } = req.params;
    let genre = await Genres.findById(_id);
    if (!genre) {
      throw new ErrorSearch("Role not found!");
    }
    genre = genre.toJSON();
    return resp.status(200).json(genre);
  } catch (error) {
    next(error);
  }
}
async function getGenres(req, resp, next) {
  try {
    const genres = await Genres.find();
    return resp.status(200).json(genres);
  } catch (error) {
    next(error);
  }
}
async function createGenre(req, resp, next) {
  try {
    await companiesSchema.validateAsync(req.body);
    let genre = await Genres.create(req.body);
    genre = genre.toJSON();
    return resp.status(200).json(genre);
  } catch (error) {
    next(error);
  }
}
async function updateGenre(req, resp, next) {
  try {
    const { _id } = req.params;
    await companiesSchema.validateAsync(req.body);
    let genre = await Genres.findById(_id);
    if (!genre) {
      throw new ErrorSearch("Role not found!");
    }
    await genre.updateOne(req.body);
    genre = genre.toJSON();
    genre = {
      ...genre,
      ...req.body
    };
    return resp.status(200).json(genre);
  } catch (error) {
    next(error);
  }
}
async function deleteGenre(req, resp, next) {
  try {
    const { _id } = req.params;
    let genre = await Genres.findById(_id);
    if (!genre) {
      throw new ErrorSearch("Role not found!");
    }
    await genre.deleteOne();
    genre = genre.toJSON();
    return resp.status(200).json(genre);
  } catch (error) {
    next(error);
  }
}
export { getGenre, getGenres, createGenre, updateGenre, deleteGenre };
