import Joi from "joi";
import mongoose from "mongoose";
import HttpError from "../errors/HttpError.js";
import ErrorSearch from "../errors/ErrorSearch.js";
import ErrorUnauthorized from "../errors/ErrorUnauthorized.js";
/* eslint-disable no-unused-vars */
async function httpErrorResponse(error, req, resp, next) {
  console.log(error);
  if (
    error instanceof Joi.ValidationError ||
    error instanceof mongoose.Error.CastError ||
    error instanceof mongoose.Error.ValidationError
  ) {
    new HttpError(error.message, 400).response(resp);
  } else if (error instanceof ErrorSearch) {
    new HttpError(error.message, 404).response(resp);
  } else if (error instanceof ErrorUnauthorized) {
    new HttpError(error.message, 401).response(resp);
  } else {
    new HttpError().response(resp);
  }
}

export default httpErrorResponse;
