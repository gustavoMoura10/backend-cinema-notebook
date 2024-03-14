import Movies from "../database/models/Movies.js";
import ErrorSearch from "../errors/ErrorSearch.js";
import moviesSchema from "../schemas/movieSchema.js";
async function getMovie(req, resp, next) {
  try {
    const { _id } = req.params;
    let movie = await Movies.findById(_id);
    if (!movie) {
      throw new ErrorSearch("Movie not found!");
    }
    movie = movie.toJSON();
    return resp.status(200).json(movie);
  } catch (error) {
    next(error);
  }
}
async function getMovies(req, resp, next) {
  try {
    const movies = await Movies.find().populate(
      "crew.person crew.role companies genres"
    );

    return resp.status(200).json(movies);
  } catch (error) {
    next(error);
  }
}
async function createMovie(req, resp, next) {
  try {
    await moviesSchema.validateAsync(req.body);
    let movie = await Movies.create(req.body);
    movie = movie.toJSON();
    return resp.status(200).json(movie);
  } catch (error) {
    next(error);
  }
}
async function updateMovie(req, resp, next) {
  try {
    const { _id } = req.params;
    await moviesSchema.validateAsync(req.body);
    let movie = await Movies.findById(_id);
    if (!movie) {
      throw new ErrorSearch("Movie not found!");
    }
    await movie.updateOne(req.body);
    movie = movie.toJSON();
    movie = {
      ...movie,
      ...req.body
    };
    return resp.status(200).json(movie);
  } catch (error) {
    next(error);
  }
}
async function deleteMovie(req, resp, next) {
  try {
    const { _id } = req.params;
    let movie = await Movies.findById(_id);
    if (!movie) {
      throw new ErrorSearch("Movie not found!");
    }
    await movie.deleteOne();
    movie = movie.toJSON();
    return resp.status(200).json(movie);
  } catch (error) {
    next(error);
  }
}
export { getMovie, getMovies, createMovie, updateMovie, deleteMovie };
